import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RecentChats() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        setChats([
            { userId: 'user123', userName: 'User 123' },
            { userId: 'user456', userName: 'User 456' },
        ]);
    }, []);

    const navigate = useNavigate();

    const handleClick = (userId) => {
        navigate(`/chat/${userId}`);
    };

    return (
        <div>
            <h2>Recent Chats</h2>
            <ul>
                {chats.map((chat) => (
                    <li key={chat.userId} onClick={() => handleClick(chat.userId)}>
                        {chat.userName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentChats;
