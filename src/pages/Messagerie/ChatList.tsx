import {Conversation, BlockUserModel} from "@/models/Chat";
import Avatar from "../../assets/profile-pic-icon.png";
import {BASE_URL} from "@/utils/api";
import {useUser} from "@/context/AuthContext";
import {formatTimestampChat} from "@/utils/utilts";
import {UserX} from "lucide-react";

interface ChatListProps {
  chats: Conversation[];
  activeChat: Conversation | null;
  onSelectChat: (chat: Conversation) => void;
  blockedUsers: BlockUserModel[];
  onUnblockUser: (userId: string) => void;
  onReactivateChat: (chatId: number) => void;
  activeTab: "chats" | "blocked";
  onChangeTab: (tab: "chats" | "blocked") => void;
  unreadCounts: Record<string, number>;
}

export default function ChatList({
  chats,
  activeChat,
  onSelectChat,
  blockedUsers,
  onUnblockUser,
  onReactivateChat,
  activeTab,
  onChangeTab, unreadCounts
}: ChatListProps) {
  const {user} = useUser();
  return (
    <>
      {/* Header */}
      <div className="p-3 bg-light-pink flex justify-between items-center">
        <h1 className="text-xl font-semibold text-black">
          {activeTab === "chats" ? "Messages" : "Utilisateurs bloqués"}
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "chats" ? "text-mid-pink border-b-2 border-mid-pink" : "text-gray-500"
          }`}
          onClick={() => onChangeTab("chats")}>
          Messages
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "blocked" ? "text-mid-pink border-b-2 border-mid-pink" : "text-gray-500"
          }`}
          onClick={() => onChangeTab("blocked")}>
          Bloqués
          {blockedUsers.length > 0 && (
            <span className="ml-2 bg-mid-pink text-white rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
              {blockedUsers.length}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      {/* <div className="px-3 py-2 bg-white">
        <div className="bg-[#f0f2f5] rounded-lg flex items-center px-3 py-1.5">
          <Search size={18} className="text-[#54656f] mr-2" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent border-none outline-none w-full text-sm"
          />
        </div>
      </div> */}

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "chats" ? (
          chats.map(chat => {
            const destinationParticipant = chat.Participants.find(participant => participant.aidant_id !== user?.id);
            console.log("1", destinationParticipant);
            const unreadCount = unreadCounts[chat.id] || 0;
            return destinationParticipant !== undefined ? (
              <div
                key={chat.id}
                onClick={() => {
                  if (chat.is_active) onSelectChat(chat);
                }}
                className={`flex items-center p-3 cursor-pointer border-b border-[#f5f6f6] 
                    ${chat.is_active ? "hover:bg-[#f5f6f6]" : "opacity-50 cursor-not-allowed"} 
                    ${activeChat?.id === chat.id ? "bg-[#f0f2f5]" : ""}`}>
                <div className="relative mr-3">
                  <img
                    src={BASE_URL + "assets/" + destinationParticipant?.ProfileAidant?.profile_pic || Avatar}
                    alt={destinationParticipant?.ProfileAidant?.first_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {destinationParticipant?.ProfileAidant?.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-black truncate">
                      {destinationParticipant?.ProfileAidant?.first_name}
                    </h3>
                    {/* Timestamp and unread messages (if needed) */}
                    {chat.is_active ? (
                        <div className="flex flex-col items-end gap-1">
                             <span className={`text-xs ${"text-dark-pink font-medium"}`}>
                              {formatTimestampChat(chat.last_message_at)}
                              </span>
                          {unreadCount > 0 && (
                              <span className="bg-mid-pink text-white rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-medium">
                                  {unreadCount}
                              </span>
                          )}

                            </div>
                    ) : (
                      <button
                        onClick={e => {
                          e.stopPropagation(); // Prevent clicking the chat
                          onReactivateChat(chat.id);
                        }}
                        className="px-3 py-1 bg-mid-pink text-white rounded-md text-sm hover:bg-mid-pink transition-colors">
                        Réactiver
                      </button>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    {/* Last message preview and unread count (if needed) */}
                    {/* <p className="text-sm text-[#667781] truncate">{lastMessage?.message_text}</p> */}
                    {/* {lastMessage?.MessageStatuses[0].status == "sent" && (
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {unreadMsg}
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            );
          })
        ) : // Blocked users list
        blockedUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-500">
            <UserX size={48} className="mb-2 text-gray-400" />
            <p>Aucun utilisateur bloqué</p>
            <p className="text-sm mt-1">Les utilisateurs bloqués apparaîtront ici</p>
          </div>
        ) : (
          blockedUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between p-3 border-b border-[#f5f6f6]">
              <div className="flex items-center">
                <img
                  src={BASE_URL + "assets/" + user.Blocked?.profile_pic || Avatar}
                  alt={user.Blocked?.first_name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium text-[#111b21]">{user.Blocked?.first_name}</h3>
                  <p className="text-sm text-[#667781]">Bloqué(e)</p>
                </div>
              </div>
              <button
                onClick={() => onUnblockUser(user.Blocked.id)}
                className="px-3 py-1 bg-dark-pink text-white rounded-md text-sm hover:bg-mid-pink transition-colors">
                Débloquer
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
