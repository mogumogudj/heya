import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, IconButton } from '@mui/material';

function RecentChats({ onSelectUser }) {
    const [chats, setChats] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [activeChatId, setActiveChatId] = useState(null);

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

                allChats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                setChats(allChats);
                setFilteredChats(allChats);
            } catch (error) {
                console.error('Failed to fetch recent chats:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
                const data = await response.json();
                setAllUsers(data);
            } catch (error) {
                console.error('Failed to fetch all users:', error);
            }
        };

        fetchChats();
        fetchAllUsers();
    }, [userId]);

    const handleSearch = (keyword) => {
        const filteredChats = chats.filter(
            (chat) =>
                `${chat.sender.firstName} ${chat.sender.lastName}`.toLowerCase().includes(keyword.toLowerCase()) ||
                `${chat.receiver.firstName} ${chat.receiver.lastName}`.toLowerCase().includes(keyword.toLowerCase()),
        );

        const filteredUsers = allUsers.filter((user) =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(keyword.toLowerCase()),
        );

        setFilteredChats(filteredChats);
        setFilteredUsers(filteredUsers);
    };

    const handleChange = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        handleSearch(keyword);
    };

    const handleChatClick = (chatId) => {
        setActiveChatId(chatId);
    };

    return (
        <div className="chats__list">
            <h1 className="no__padding">Chat</h1>
            <div className="chat__list__options">
                <Box display="flex" alignItems="center" gap={2} mb={2} sx={{ width: '100%', paddingTop: '32px' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        className="form-control-custom"
                        value={searchKeyword}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon className="search-icon" style={{ fontSize: 40 }} />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
            </div>
            <div className="chats__list--chats">
                {loading ? (
                    <p>Loading...</p>
                ) : searchKeyword.length === 0 ? (
                    filteredChats.length > 0 ? (
                        <ul className="looped-chats__list">
                            {filteredChats.map((chat) => {
                                const otherUserId = chat.sender._id === userId ? chat.receiver._id : chat.sender._id;
                                const otherUserName =
                                    chat.sender._id === userId
                                        ? `${chat.receiver.firstName} ${chat.receiver.lastName}`
                                        : `${chat.sender.firstName} ${chat.sender.lastName}`;
                                const otherUserImage =
                                    chat.sender._id === userId ? chat.receiver.imageLink : chat.sender.imageLink;

                                return (
                                    <li
                                    className={`chat__lists--chat ${activeChatId === chat.id ? 'active' : 'chat__lists--chat inactive'}`}
                                        key={chat.id}
                                        onClick={() => {
                                                onSelectUser(otherUserId);
                                                handleChatClick(chat.id);
                                            }
                                        }
                                    >
                                        <div className="chat__lists--chat__image">
                                            <img
                                                src={otherUserImage || 'path/to/placeholder-image.png'}
                                                alt={otherUserName}
                                                className={!otherUserImage ? 'placeholder' : ''}
                                            />
                                        </div>
                                        <div className="chat__info">
                                            <h6 className="chat__info--name no__padding h6__strong">{otherUserName}</h6>
                                            <p className="chat__info--message no__padding">{chat.content}</p>
                                        </div>
                                        <p className="chat__time no__padding">
                                            {new Date(chat.timestamp).toLocaleString('en-GB', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                            })}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="no__chats__box">
                            <p className="no-chats__message">No recent chats</p>
                        </div>
                    )
                ) : filteredUsers.length > 0 ? (
                    <ul className="looped-chats__list">
                        {filteredUsers.map((user) => (
                            <li className="chat__lists--chat chat__lists--chat--search" key={user._id} onClick={() => onSelectUser(user._id)}>
                                <div className="chat__lists--chat__image">
                                    <img
                                        src={user.imageLink || 'path/to/placeholder-image.png'}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className={!user.imageLink ? 'placeholder' : ''}
                                    />
                                </div>
                                <div className="chat__info chat__info--search">
                                    <h6 className="chat__info--name no__padding h6__strong">{`${user.firstName} ${user.lastName}`}</h6>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="no-users__box">
                        <p className="no-users__message">No users found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecentChats;
