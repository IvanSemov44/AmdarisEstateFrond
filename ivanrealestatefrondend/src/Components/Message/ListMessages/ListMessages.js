import { useContext, useEffect, useState } from "react";

import MessageItem from "../MessageItem/MessageItem";
import { AuthContext } from "../../../contexts/AuthContext";
import * as messageService from '../../../Services/MessageService';
import { Typography } from "@mui/material";

const ListMessages = () => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        let ignore = false;
        messageService.getAll(user.id)
            .then(result => {
                if (!ignore) setMessages(result);
            })
        return () => ignore = true;
    }, [user.id, isDelete]);

    return (
        <>{messages[0]
            ? messages.map(x =>
                <MessageItem key={x.id} message={x} userId={user.id} setIsDelete={setIsDelete} />
            )
            : <Typography sx={{ color: 'text.secondary',textAlign:"center",fontSize:50,m:20 }}>
                No Message For You
            </Typography>
        }
        </>
    );
};

export default ListMessages;