import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecentChats from '../components/RecentChats';

function Chat() {
    const { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        setMessages([
            { content: 'Hello!', timestamp: '2022-01-01T12:00:00.000Z', sentByUserId: 'user123' },
            { content: 'Hi there!', timestamp: '2022-01-01T12:05:00.000Z', sentByUserId: userId },
        ]);
    }, [userId]);

    const sendMessage = () => {
        setMessages([
            ...messages,
            { content: messageInput, timestamp: new Date().toISOString(), sentByUserId: 'currentUserId' },
        ]);
        setMessageInput('');
    };

    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    return (
        <div className="page__container">
            <div className="content">
                <div className="chat-container">
                    <div className="recent-chats">
                        <RecentChats />
                    </div>
                    <div className="chat-messages">
                        <h2>Chat with User {userId}</h2>
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <div key={index} className="message">
                                    <p>{msg.content}</p>
                                    <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                value={messageInput}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
