import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RecentChats() {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/all/${userId}`);
                const data = await response.json();

                const chatsByUser = new Map();

                data.forEach((chat) => {
                    const otherUserId = chat.sender._id !== userId ? chat.sender._id : chat.receiver._id;

                    if (
                        !chatsByUser.has(otherUserId) ||
                        new Date(chat.timestamp) > new Date(chatsByUser.get(otherUserId).timestamp)
                    ) {
                        chatsByUser.set(otherUserId, chat);
                    }
                });

                const allChats = Array.from(chatsByUser.values());

                setChats(allChats);
            } catch (error) {
                console.error('Failed to fetch recent chats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [userId]);

    const handleClick = (otherUserId) => {
        navigate(`/chat/${otherUserId}`);
    };

    return (
        <div>
            <h2>Recent Chats</h2>
            {loading ? (
                <p>Loading...</p>
            ) : chats.length > 0 ? (
                <ul>
                    {chats.map((chat) => {
                        const otherUserId = chat.sender._id === userId ? chat.receiver._id : chat.sender._id;
                        const otherUserName =
                            chat.sender._id === userId
                                ? `${chat.receiver.firstName} ${chat.receiver.lastName}`
                                : `${chat.sender.firstName} ${chat.sender.lastName}`;
                        const otherUserImage =
                            chat.sender._id === userId ? chat.receiver.imageLink : chat.sender.imageLink;

                        return (
                            <li key={chat.id} onClick={() => handleClick(otherUserId)}>
                                <img src={otherUserImage} alt="" />
                                <h3>{otherUserName}</h3>
                                <span>{new Date(chat.timestamp).toLocaleString()}</span>
                                <p>{chat.content}</p>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No recent chats</p>
            )}
        </div>
    );
}

export default RecentChats;
