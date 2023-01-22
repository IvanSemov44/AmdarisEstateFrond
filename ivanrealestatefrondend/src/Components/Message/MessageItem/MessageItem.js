import { useState } from "react";

import {
    Fab,
    Accordion,
    Typography,
    AccordionDetails,
    AccordionSummary,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as messageService from '../../../Services/MessageService';

const MessageItem = ({
    message,
    userId,
    setIsDelete
}) => {
    const colorDefault = message.isRead ? "" : "blue";

    const [color, setColor] = useState(colorDefault);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setIsDelete(isExpanded ? panel : false);
        setColor("");

        if (color === "" && !message.isRead)
            messageService.update(userId, message.id, { ...message, isRead: true });
    };
    const deleteHandler = () => messageService.deleteMessage(userId, message.id)
        .then(setIsDelete(true));

    return (
        <>
            <Accordion
                sx={{ backgroundColor: color }}
                expanded={expanded === 'panel'}
                onChange={handleChange('panel')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Name: {message.name}
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Email: {message.email}
                    </Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {message.text}
                    </Typography>
                    <Fab color="primary" aria-label="delete" type="button" onClick={deleteHandler}>
                        <DeleteIcon />
                    </Fab>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default MessageItem;