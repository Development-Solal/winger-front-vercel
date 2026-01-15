import { useState, useRef, useEffect } from "react";
import { ChevronLeft, MoreVertical, Send, Smile } from "lucide-react";
import type { Conversation, Message } from "@/models/Chat";
import { BASE_URL } from "@/utils/api";
import Avatar from "../../assets/profile-pic-icon.png";
import { useUser } from "@/context/AuthContext";
import { formatTimestamp } from "@/utils/utilts";
import EmojiPicker from "./EmojiPicket";
import { t } from "i18next";
import { GetAllAideService } from "@/services/AideService";

interface ChatWindowProps {
  chat: Conversation;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBack?: () => void;
  onBlockUser: (userId: string) => void;
  onDeactivate: (conversationId: number, aidant_id: string) => void;
}

export default function ChatWindow({
  chat,
  messages,
  onSendMessage,
  onBack,
  onBlockUser,
  onDeactivate,
}: ChatWindowProps) {
  const { user } = useUser();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentAideId, setCurrentAideId] = useState<string | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const justSentMessage = useRef(false);
  const destinationParticipant = chat.Participants.find((participant) => participant.aidant_id !== user?.id);

  useEffect(() => {
    if (!destinationParticipant?.aidant_id) return;

    GetAllAideService(destinationParticipant?.aidant_id)
      .then((res) => {
        setCurrentAideId(res[0].id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [destinationParticipant?.aidant_id]);

  // Handle keyboard visibility
  // useEffect(() => {
  //     const handleFocus = () => {
  //         setKeyboardVisible(true);
  //         setShowEmojiPicker(false);
  //         // Scroll to bottom when keyboard opens
  //         setTimeout(() => {
  //             if (messagesEndRef.current) {
  //                 messagesEndRef.current.scrollIntoView({behavior: "smooth"});
  //             }
  //         }, 100);
  //     };

  //     const handleBlur = () => {
  //         setKeyboardVisible(false);
  //     };

  //     const textarea = inputRef.current;
  //     if (textarea) {
  //         textarea.addEventListener("focus", handleFocus);
  //         textarea.addEventListener("blur", handleBlur);

  //         return () => {
  //             textarea.removeEventListener("focus", handleFocus);
  //             textarea.removeEventListener("blur", handleBlur);
  //         };
  //     }
  // }, []);

  useEffect(() => {
    const handleFocus = () => {
      setKeyboardVisible(true);
      setShowEmojiPicker(false);
      // NO automatic scrolling when keyboard opens
    };

    const handleBlur = () => {
      setKeyboardVisible(false);
    };

    const textarea = inputRef.current;
    if (textarea) {
      textarea.addEventListener("focus", handleFocus);
      textarea.addEventListener("blur", handleBlur);

      return () => {
        textarea.removeEventListener("focus", handleFocus);
        textarea.removeEventListener("blur", handleBlur);
      };
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll to bottom when messages update
  //   useEffect(() => {
  //       if (messagesEndRef.current) {
  //           messagesEndRef.current.scrollIntoView({behavior: "smooth"});
  //       }
  //   }, [messages]);

  useEffect(() => {
    // Only scroll if keyboard is NOT visible
    if (messagesEndRef.current && !keyboardVisible) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }
  }, [messages, chat.id, keyboardVisible]);
  useEffect(() => {
    if (justSentMessage.current && messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        justSentMessage.current = false; // Reset flag
      }, 80);
    }
  }, [messages]);
  const handleSend = () => {
    if (newMessage.trim()) {
      justSentMessage.current = true;
      onSendMessage(newMessage);
      setNewMessage("");
      // inputRef.current?.focus();
    }
  };

  const addEmoji = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
    // inputRef.current?.focus();
  };

  useEffect(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [newMessage]);

  const openFiche = () => {
    if (!currentAideId) return;
    const encodedAideId = btoa(currentAideId.toString());
    window.open(`/recherche/fiche/${encodedAideId}/null`, "_blank");
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header */}
      <div className="p-1.5 bg-light-pink flex items-center border-l border-light-pink flex-shrink-0">
        {onBack && (
          <button onClick={onBack} className="mr-2 text-black">
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="flex items-center flex-1">
          <img
            src={BASE_URL + "assets/" + destinationParticipant?.ProfileAidant?.profile_pic || Avatar}
            alt={destinationParticipant?.ProfileAidant?.first_name}
            className="w-10 h-10 rounded-full mr-3 cursor-pointer"
            onClick={() => openFiche()}
          />
          <div>
            <h2 className="font-medium text-[#111b21]">
              {destinationParticipant?.ProfileAidant?.first_name} {destinationParticipant?.ProfileAidant?.last_name}
            </h2>
            <p className="text-xs text-[#667781]">
              {destinationParticipant?.ProfileAidant?.online ? (
                <span className="flex items-center gap-2 text-green-500 font-medium">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  {t("fiche.online")}
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-500 font-medium">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  {t("fiche.offline")}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative" ref={menuRef}>
            <button className="text-[#54656f]" onClick={() => setShowMenu(!showMenu)}>
              <MoreVertical size={20} />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white shadow-md rounded-md z-10 w-48">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-logo-red"
                  onClick={() => {
                    if (destinationParticipant) {
                      onBlockUser(destinationParticipant.aidant_id);
                    }
                    setShowMenu(false);
                  }}>
                  Bloquer {destinationParticipant?.ProfileAidant?.first_name}
                </button>

                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-logo-red"
                  onClick={() => {
                    if (destinationParticipant) {
                      onDeactivate(chat.id, destinationParticipant.aidant_id);
                    }
                    setShowMenu(false);
                  }}>
                  Créditer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container - Flexible and scrollable */}
      <div
        ref={messagesContainerRef}
        className="flex-1 p-4 bg-[#efeae2] bg-opacity-30 overflow-y-auto"
        style={{ backgroundSize: "210px auto" }}>
        <div className="">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[65%] p-2 px-3 rounded-lg relative ${
                  message.sender_id === user?.id ? "bg-pale-pink text-[#111b21]" : "bg-white text-[#111b21]"
                }`}>
                <p className="whitespace-pre-wrap break-words">{message.message_text}</p>
                <span className="text-[10px] text-[#5e656a] float-right ml-2 mt-1">
                  {formatTimestamp(message.sent_at)}
                  {message.sender_id === user?.id && (
                    <>
                      {message?.MessageStatuses?.[0]?.status === "sent" && <span className="ml-1 font-bold">✓✓</span>}
                      {message?.MessageStatuses?.[0]?.status === "read" && (
                        <span className="ml-1 text-[#53bdeb] font-bold">✓✓</span>
                      )}
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Container - Always visible at bottom */}
      <div className="p-3 bg-[#f0f2f5] flex items-end gap-2 flex-shrink-0 border-t border-gray-200">
        <button
          className="text-[#54656f] flex-shrink-0"
          onClick={() => {
            if (showEmojiPicker) {
              setShowEmojiPicker(false);
              // inputRef.current?.focus();
            } else {
              // inputRef.current?.blur();
              setTimeout(() => setShowEmojiPicker(true), 300);
            }
          }}>
          <Smile size={24} />
        </button>

        <div className="flex-1 bg-white rounded-lg px-3 py-2 min-h-[40px] flex items-center">
          <textarea
            ref={inputRef}
            placeholder="Tapez votre message"
            className="w-full outline-none border-none resize-none bg-transparent max-h-[120px]"
            rows={1}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter" && !e.shiftKey) {
            //     e.preventDefault();
            //     handleSend();
            //   }
            onKeyDown={(e) => {
  // Shift+Enter to send
  if (e.key === "Enter" && e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
            }}
          />
        </div>

        <button className="text-[#54656f] flex-shrink-0" onClick={handleSend}>
          <Send size={24} />
        </button>
      </div>

      {/* Emoji Picker - Only show when keyboard is not visible */}
      {showEmojiPicker && !keyboardVisible && (
        <div className="border-t border-gray-200 bg-white flex-shrink-0">
          <EmojiPicker onSelectEmoji={addEmoji} onClose={() => setShowEmojiPicker(false)} />
        </div>
      )}
    </div>
  );
}
