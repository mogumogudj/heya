import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import RecentChats from '../components/RecentChats';
import NavApp from '../components/NavApp.jsx';
import '../css/chat.css';
import { Divider } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Footer from '../../shared/components/Footer.jsx';

const socket = io(`${import.meta.env.VITE_API_URL}`, {
    path: '/socket.io/',
});

function Chat() {
    const { otherUserId: urlOtherUserId } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [otherUserId, setOtherUserId] = useState(urlOtherUserId);
    const [otherUserInfo, setOtherUserInfo] = useState({ firstName: 'User', lastName: '', imageLink: '' });
    const [isUserSelected, setIsUserSelected] = useState(!!urlOtherUserId);
    const [userImage, setUserImage] = useState('');
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        const fetchUserInfo = async (id) => {
            try {
                const userInfoResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`);
                const userInfoData = await userInfoResponse.json();
                setOtherUserInfo(userInfoData);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };

        const fetchUserImage = async () => {
            try {
                const userInfoResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
                const userInfoData = await userInfoResponse.json();
                setUserImage(userInfoData.imageLink);
            } catch (error) {
                console.error('Failed to fetch current user info:', error);
            }
        };

        fetchUserImage();

        if (urlOtherUserId) {
            fetchUserInfo(urlOtherUserId);
        }

        socket.on('receiveMessage', (msg) => {
            setMessages((prevMessages) => [msg, ...prevMessages]);
            scrollToBottom();
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [userId, urlOtherUserId]);

    useEffect(() => {
        if (otherUserId) {
            const fetchMessages = async () => {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/messages/all/${userId}/${otherUserId}`,
                    );
                    const data = await response.json();
                    setMessages(data);
                } catch (error) {
                    console.error('Failed to fetch chats:', error);
                }
            };
            fetchMessages();
        }
    }, [otherUserId, userId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        messagesContainerRef.current?.scrollTo({ top: messagesContainerRef.current.scrollHeight, behavior: 'smooth' });
    };

    const sendMessage = () => {
        const newMessage = {
            content: messageInput,
            timestamp: new Date().toISOString(),
            userId: userId,
            sentToUserId: otherUserId,
        };
        socket.emit('sendMessage', newMessage);
        setMessageInput('');
    };

    const handleInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    const handleUserSelection = async (selectedUserId) => {
        setIsUserSelected(true);
        setOtherUserId(selectedUserId);
        navigate(`/chat/${selectedUserId}`);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/all/${userId}/${selectedUserId}`);
            const data = await response.json();
            setMessages(data);
            await fetchUserInfo(selectedUserId);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    };

    return (
        <div className="page__container">
            <NavApp />
            <div className="content chat">
                <div className="chat__content">
                    <RecentChats onSelectUser={handleUserSelection} />
                    <Divider orientation="vertical" variant="middle" />
                    <div className="chat--active">
                        {isUserSelected ? (
                            <>
                                <div className="active--chat__header">
                                    <div className="active--chat__person">
                                        <div className="chat__lists--chat__image">
                                            <img
                                                src={otherUserInfo.imageLink || '../placeholder-profile-image.jpg'}
                                                alt="User"
                                                className={!otherUserInfo.imageLink ? 'placeholder' : ''}
                                            />
                                        </div>
                                        <h6 className="chat__info--name no__padding h6__strong">{`${otherUserInfo.firstName} ${otherUserInfo.lastName}`}</h6>
                                    </div>
                                </div>
                                <div className="messages chat__messages" ref={messagesContainerRef}>
                                    {messages
                                        .slice()
                                        .reverse()
                                        .map((msg, index) => (
                                            <div
                                                key={index}
                                                className={`message ${msg.userId === userId ? 'sender' : 'receiver'}`}
                                            >
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
                                                <img
                                                    className={`message__image ${msg.userId === userId ? userImage : otherUserInfo.imageLink ? '' : 'placeholder'}`}
                                                    src={
                                                        msg.userId === userId
                                                            ? userImage
                                                            : otherUserInfo.imageLink || 'path/to/placeholder-image.png'
                                                    }
                                                    alt="User"
                                                />
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
                            </>
                        ) : (
                            <div className="no-chat-selected">Please select a chat to start messaging</div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Chat;
