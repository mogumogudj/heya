import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import RecentChats from '../components/RecentChats';
import NavApp from '../components/NavApp.jsx';
import '../css/chat.css';
import { Divider } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

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

        socket.on('receiveMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
            scrollToBottom();
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [userId, otherUserId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = () => {
        const newMessage = {
            content: messageInput,
            timestamp: new Date().toISOString(),
            userId: userId,
            sentToUserId: urlOtherUserId,
        };
        socket.emit('sendMessage', newMessage);
        setMessageInput('');
    };

    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    return (
        <div className="page__container">
            <NavApp />
            <div className="content chat">
                <div className="chat__content">
                    <RecentChats />
                    <Divider orientation="vertical" variant="middle" />
                    <div className="chat--active">
                        <div className="active--chat__header">
                            <div className="active--chat__person">
                                <div className="chat__lists--chat__image">
                                    <img src="../tjerk.webp" alt="Tjerk Symens" />
                                </div>
                                <h6 className="chat__info--name no__padding h6__strong">{`${otherUserInfo.firstName} ${otherUserInfo.lastName}`}</h6>
                            </div>
                        </div>
                        <div className="messages chat__messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.userId === userId ? 'sender' : 'receiver'}`}>
                                    <h6 className="no__padding message__text">{msg.content}</h6>
                                    <svg
                                        className="message__balloon--svg"
                                        width="20"
                                        height="14"
                                        viewBox="0 0 20 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M15.0285 0H0C0 7.73199 6.26801 14 14 14H20V13.6709C18.5689 12.4697 17.3842 10.9871 16.5262 9.30324C15.4038 7.10032 15.107 4.39657 15.0285 0Z"
                                        />
                                    </svg>
                                    <img className="message__image" src="../tjerk.webp" />
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="input-box chat__input">
                            <input
                                type="text"
                                value={messageInput}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                            />
                            <button onClick={sendMessage}>
                                <SendRoundedIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
