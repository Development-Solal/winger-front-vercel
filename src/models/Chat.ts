export interface MessageData {
    conversation_id: string;
    sender_id: string,
    destination_id: string,
    message_text: string,
}

export interface User {
    id: string
    name: string
    avatar: string
    online: boolean
}

export interface MessageStatuses{
  message_id: number,
  user_id: number,
  status: "sent" | "read",
}

export interface Message {
    id: number
    message_text: string
    sent_at: string
    sender_id: string
    destination_id: string
    conversation_id: string
    MessageStatuses: MessageStatuses[]
}

export interface ParticipantUser {
  id: string
  profile_pic: string
  first_name: string
  last_name: string
  online: string
}

export interface Conversation {
    id: number
    Participants: {
      aidant_id: string
      conversation_id: string
      ProfileAidant: {
        profile_pic: string
        first_name: string
        last_name: string
        online: string
      }
    }[]
    last_message_at: string
    is_active: boolean
    unread_count:number
}
  
export interface BlockUserModel {
    id: string,
    blocker_id: string,
    blocked_id: string,
    Blocked: {
        id: string,
        first_name: string,
        last_name: string,
        profile_pic: string
    }
}