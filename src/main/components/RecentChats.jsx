import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RecentChats() {
    const [latestChat, setLatestChat] = useState(null);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/all/{userId}`);
                const data = await response.json();
                console.log(data);
                const uniqueChats = [];
                const uniqueUserIds = new Set();
                data.forEach((chat) => {
                    if (!uniqueUserIds.has(chat.userId)) {
                        uniqueUserIds.add(chat.userId);
                        uniqueChats.push(chat);
                    }
                });

                const sortedChats = uniqueChats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                const latestChat = sortedChats[0];

                const timestamp = new Date(latestChat.timestamp);
                const now = new Date();
                if (timestamp.toDateString() === now.toDateString()) {
                    const hours = timestamp.getHours();
                    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
                    latestChat.timestamp = `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
                } else {
                    const options = { day: 'numeric', month: 'long' };
                    latestChat.timestamp = timestamp.toLocaleDateString(undefined, options);
                }

                setLatestChat(latestChat);
            } catch (error) {
                console.error('Failed to fetch recent chats:', error);
            }
        };

        fetchChats();
    }, [userId]);

    const handleClick = (userId) => {
        navigate(`/chat/${userId}`);
    };

    return (
        <div>
            <h2>Recent Chats</h2>
            {latestChat && (
                <ul>
                    <li key={latestChat.sender.id} onClick={() => handleClick(latestChat.sender.id)}>
                        <img src={latestChat.sender.imageLink} alt="" />
                        <h3>{`${latestChat.sender.firstName} ${latestChat.sender.lastName} `}</h3>
                        <span>{latestChat.timestamp}</span>
                        <p>{latestChat.content}</p>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default RecentChats;
