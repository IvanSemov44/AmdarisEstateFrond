import { useEffect, useState } from "react";
import * as messageService from '../../Services/MessageService';

export default function useGetAllMessagesForUser(userId) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let ignore = false;
        messageService.getAll(userId)
            .then(result => {
                if (!ignore) setMessages(result);
            })
        return () => ignore = true;
    }, [userId]);

    return messages;
}