import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import RecentChats from '../components/RecentChats';
import NavApp from '../components/NavApp.jsx';

const socket = io(`${import.meta.env.VITE_API_URL}`, {
    path: '/socket.io/',
});

function Chat() {
    const { otherUserId: urlOtherUserId } = useParams();
    const userId = localStorage.getItem('userId');
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [otherUserId, setOtherUserId] = useState(urlOtherUserId);
    const [otherUserInfo, setOtherUserInfo] = useState({ firstName: 'User', lastName: '' });
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                let response;
                if (otherUserId) {
                    response = await fetch(`${import.meta.env.VITE_API_URL}/messages/all/${userId}/${otherUserId}`);
                } else {
                    response = await fetch(`${import.meta.env.VITE_API_URL}/messages/recent/${userId}`);
                }
                const data = await response.json();
                setMessages(data);

                if (data.length > 0) {
                    const recentOtherUserId =
                        otherUserId || (data[0].sender._id === userId ? data[0].receiver._id : data[0].sender._id);
                    setOtherUserId(recentOtherUserId);
                    await fetchUserInfo(recentOtherUserId, data);
                }
            } catch (error) {
                console.error('Failed to fetch recent chats:', error);
            }
        };

        const fetchUserInfo = async (id, messages) => {
            try {
                const userInfoResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`);
                const userInfoData = await userInfoResponse.json();
                setOtherUserInfo(userInfoData);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                if (messages && messages.length > 0) {
                    const recentMessage = messages[0];
                    const fallbackUserInfo =
                        recentMessage.sender._id === userId ? recentMessage.receiver : recentMessage.sender;
                    setOtherUserInfo(fallbackUserInfo);
                }
            }
        };

        fetchChats();

        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, [userId, otherUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        const newMessage = {
            content: messageInput,
            timestamp: new Date().toISOString(),
            userId: userId,
            sentToUserId: urlOtherUserId,
        };
        socket.emit('sendMessage', newMessage);
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
        setMessageInput('');
    };

    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    return (
        <div className="page__container">
            <NavApp />
            <div className="content">
                {urlOtherUserId ? (
                    <div className="chat-container" key={urlOtherUserId}>
                        <div className="recent-chats">
                            <RecentChats />
                        </div>
                        <div className="chat-messages">
                            <h2>Chat with {`${otherUserInfo.firstName} ${otherUserInfo.lastName}`}</h2>
                            <div className="messages">
                                {messages
                                    .slice()
                                    .reverse()
                                    .map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`message ${msg.userId === userId ? 'sender' : 'receiver'}`}
                                        >
                                            <p>{msg.content}</p>
                                            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                    ))}
                                <div ref={messagesEndRef} />
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
                ) : (
                    <RecentChats key={urlOtherUserId} />
                )}
            </div>
        </div>
    );
}

export default Chat;
