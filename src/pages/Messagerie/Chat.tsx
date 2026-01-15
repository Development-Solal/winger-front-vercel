import {useState, useEffect, useRef, useCallback} from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import {useMobile} from "@/hooks/use-mobile";
import type {BlockUserModel, Conversation, Message} from "@/models/Chat";
import {useUser} from "@/context/AuthContext";
import {
    BlockUser,
    CreateConversation,
    DeactivateChat,
    GetBlockedUsers,
    GetMessages,
    GetUserConversations,
    ReactivateChat,
    SendMessage,
    UnblockUser,
} from "@/services/ChatService";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {getSocket} from "@/utils/socket";

const Chat = () => {
    const navigate = useNavigate();
    const {user} = useUser();
    const isMobile = useMobile();
    const {encodedId} = useParams();

    const [showChatList, setShowChatList] = useState(true);

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [aidantId, setAidantId] = useState<string>();
    const [blockedUsers, setBlockedUsers] = useState<BlockUserModel[]>([]);
    const [activeTab, setActiveTab] = useState<"chats" | "blocked">("chats");
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

    const refreshTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, []);

    useEffect(() => {
        if (encodedId && encodedId != "default") {
            setAidantId(atob(encodedId.toString()));
        }
    }, [encodedId]);

    useEffect(() => {
        if (!user || !selectedConversation) return;

        const destinationParticipant = selectedConversation.Participants.find(
            participant => participant.aidant_id !== user?.id
        );
        setAidantId(destinationParticipant?.aidant_id);
    }, [selectedConversation, user]);

    // NEW: Helper to extract unread counts from backend response
    const extractUnreadCounts = useCallback((conversations: Conversation[]) => {
        const counts: Record<string, number> = {};
        conversations.forEach(conv => {
            if (conv.unread_count && conv.unread_count > 0) {
                counts[conv.id] = conv.unread_count;
            }
        });
        setUnreadCounts(counts);
    }, []);

    const refreshConversations = useCallback(() => {
        if (!user) return;
        GetUserConversations(user.id)
            .then(res => {
                setConversations(res);
                extractUnreadCounts(res); // Extract counts from backend

                // Merge with existing local unread counts to prevent overwriting
                setUnreadCounts(prev => {
                    const newCounts = {...prev};
                    res.forEach((conv: Conversation) => {
                        // Only update if we don't have a local count (i.e., don't override incremented counts)
                        if (!(conv.id in prev)) {
                            if (conv.unread_count && conv.unread_count > 0) {
                                newCounts[conv.id] = conv.unread_count;
                            }
                        }
                    });
                    return newCounts;
                });
            })
            .catch(err => console.error("Error fetching conversations:", err));
    }, [user, extractUnreadCounts]);

    const fetchBlockUsers = () => {
        if (!user) return;
        GetBlockedUsers(user.id)
            .then(res => {
                setSelectedConversation(null);
                setBlockedUsers(res);
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        fetchBlockUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        localStorage.removeItem("newMessageReceived");
        window.dispatchEvent(new Event("storage"));
    }, [messages]);

    //  Fetch conversations when component mounts
    useEffect(() => {
        if (!user) return;

        GetUserConversations(user.id)
            .then(res => {
                if (res.length > 0) {
                    setConversations(res);
                    extractUnreadCounts(res); // Extract counts from backend

                    const selectedConversation = res.find((conversation: Conversation) =>
                        conversation.Participants.some(participant => participant.aidant_id == aidantId)
                    );

                    if (!selectedConversation) {
                        startNewConversation(res);
                    } else {
                        if (!selectedConversation?.is_active) {
                            setSelectedConversation(null);
                        } else if (selectedConversation?.is_active) {
                            setSelectedConversation(selectedConversation);
                            loadMessages(selectedConversation.id);
                        }
                    }
                } else {
                    console.log("No conversations found, starting a new one...");
                    startNewConversation(res);
                }
            })
            .catch(err => console.error("Error fetching conversations:", err));


    }, [aidantId, user]);


    useEffect(() => {
        const socket = getSocket();

        socket.on("newMessage", message => {
            console.log("New message received:", message);
            if (selectedConversation?.id === message.conversation_id) {
                setMessages(prevMessages => {
                    // Prevent duplicates
                    const exists = prevMessages.some(msg => msg.id === message.id);
                    if (exists) return prevMessages;
                    return [...prevMessages, message];
                });

                socket.emit("markAsRead", {conversationId: message.conversation_id, aidantId: user?.id});
                setUnreadCounts(prev => ({
                    ...prev,
                    [message.conversation_id]: 0
                }));

                // Update conversation timestamp in local state
                setConversations(prev =>
                    prev.map(conv =>
                        conv.id === message.conversation_id
                            ? {
                                ...conv,
                                last_message_at: message.sent_at,
                                unread_count: 0 // Keep at 0 since conversation is open
                            }
                            : conv
                    )
                );
            } else {
                setUnreadCounts(prev => ({
                    ...prev,
                    [message.conversation_id]: (prev[message.conversation_id] || 0) + 1
                }));

                setConversations(prev =>
                    prev.map(conv =>
                        conv.id === message.conversation_id
                            ? {
                                ...conv,
                                last_message_at: message.sent_at,
                                unread_count: (conv.unread_count || 0) + 1 // Increment local unread_count
                            }
                            : conv
                    ).sort((a, b) => {
                        // Re-sort by last_message_at to move updated conversation to top
                        const dateA = new Date(a.last_message_at || 0).getTime();
                        const dateB = new Date(b.last_message_at || 0).getTime();
                        return dateB - dateA;
                    })
                );
            }
        });

        return () => {
            socket.off("newMessage");
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }
        };
    }, [selectedConversation, user?.id]);

    const startNewConversation = (oldConvo: Conversation[]) => {
        if (user && aidantId)
            CreateConversation(user.id, aidantId)
                .then(res => {
                    const newConv = res;
                    setConversations([...oldConvo, newConv]);
                    setSelectedConversation(newConv);
                    loadMessages(newConv.id);
                })
                .catch(err => {
                    console.error("Error creating conversation:", err);

                    // Check if the error is due to no credits
                    if (err.response?.data?.error === "You need credits or an active subscription to start a conversation.") {
                        navigate(`/credits/${encodedId}`);
                    }
                });
    };


    const loadMessages = (conversationId: string) => {
        if (conversationId) {
            GetMessages(conversationId)
                .then(res => {
                    setMessages(res);
                    const socket = getSocket();
                    socket.emit("joinConversation", conversationId);

                    // Clear unread count when opening conversation
                    setUnreadCounts(prev => ({
                        ...prev,
                        [conversationId]: 0
                    }));

                    if (res.length > 0 && user) {
                        if (res[res.length - 1].destination_id == user.id) {
                            socket.emit("markAsRead", {conversationId, aidantId: user.id});
                        }
                    }
                })
                .catch(err => console.error("Error fetching messages:", err));
        }
    }


    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        loadMessages(conversation.Participants[0].conversation_id);

        // Clear unread count for this conversation
        setUnreadCounts(prev => ({
            ...prev,
            [conversation.id]: 0
        }));
    };

    const handleChatSelect = (conversation: Conversation) => {
        handleSelectConversation(conversation);
        if (isMobile) {
            setShowChatList(false);
        }
    };

    const handleBackToList = () => {
        setShowChatList(true);
    };

    const handleSendMessage = (messageText: string) => {
        if (!user) return;

        if (!messageText.trim() || !selectedConversation) return;

        if (!aidantId) return;

        const messageData = {
            conversation_id: selectedConversation.id.toString(),
            sender_id: user?.id,
            destination_id: aidantId,
            message_text: messageText,
        };

        SendMessage(messageData)
            .then(res => {
                const socket = getSocket();
                socket.emit("sendMessage", res);
            })
            .catch(err => console.error("Error sending message:", err));
    };

    const handleBlockUser = (userId: string) => {
        if (!user) return;
        BlockUser(user.id, userId)
            .then(res => {
                toast.success(res.message);
                refreshConversations();
                fetchBlockUsers();
                handleBackToList();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleUnblockUser = (userId: string) => {
        if (!user) return;
        UnblockUser(user.id, userId)
            .then(res => {
                toast.success(res.message);
                refreshConversations();
                fetchBlockUsers();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleDeactivateChat = (conversationId: number, aidantId: string) => {
        if (!user) return;
        DeactivateChat(conversationId.toString(), aidantId)
            .then(res => {
                toast.success(res.message);
                refreshConversations();
                setSelectedConversation(null);
                handleBackToList();
            })
            .catch(err => {
                console.error(err);
                toast.error(err?.response?.data?.error);
            });
    };

    const handleReactivateChat = (conversationId: number) => {
        if (!user) return;
        ReactivateChat(conversationId.toString(), user?.id)
            .then(res => {
                toast.success(res.message);
                refreshConversations();
            })
            .catch(err => {
                console.error(err);
                toast.error(err?.response?.data?.error);
            });
    };

    return (
        <div
            className="flex w-full h-[80vh] max-h-screen overflow-hidden bg-[#f0f2f5] shadow-xl rounded-md mx-auto my-0 lg:my-4 lg:max-w-6xl">
            {/* Chat list panel */}
            {(showChatList || !isMobile) && (
                <div className={`${isMobile ? "w-full" : "w-1/3 border-r"} bg-white flex flex-col`}>
                    <ChatList
                        chats={conversations}
                        activeChat={selectedConversation}
                        onSelectChat={handleChatSelect}
                        blockedUsers={blockedUsers}
                        onUnblockUser={handleUnblockUser}
                        onReactivateChat={handleReactivateChat}
                        activeTab={activeTab}
                        onChangeTab={setActiveTab}
                        unreadCounts={unreadCounts}
                    />
                </div>
            )}

            {/* Chat window panel */}
            {(!showChatList || !isMobile) && (
                <div className={`${isMobile ? "w-full" : "w-2/3"} flex flex-col overflow-hidden`}>
                    {selectedConversation && (
                        <ChatWindow
                            chat={selectedConversation}
                            messages={messages}
                            onSendMessage={handleSendMessage}
                            onBack={isMobile ? handleBackToList : undefined}
                            onBlockUser={handleBlockUser}
                            onDeactivate={handleDeactivateChat}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Chat;