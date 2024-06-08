import React, { useState, useEffect } from 'react';

import AddCommentIcon from '@mui/icons-material/AddComment';
import SearchIcon from '@mui/icons-material/Search';

import { 
    Box, 
    TextField, 
    IconButton,
  } from '@mui/material';

function RecentChats() {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

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

    const [currentChat, setChat] = useState('Tjerk Symens');


    const handleClick = (otherUserId, otherUserName) => {
        setChat(otherUserName);
        console.log('clicked', otherUserName, currentChat);
        window.location.href = `/chat/${otherUserId}`;
    };

    const createNewChat = () => {
        //moet nieuwe chat openenen
        //nu console log
        console.log('create new chat');
    };

    // search
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchKeywords, setSearchKeywords] = useState([]);

    // Function to handle adding search keyword
    const handleAddKeyword = () => {
        if (searchKeyword.trim() !== '') {
            setSearchKeywords([...searchKeywords, searchKeyword.trim()]);
            setSearchKeyword('');
        }
    };
  
    // Function to handle removing search keyword
    const handleRemoveKeyword = (keywordToRemove) => {
        setSearchKeywords(searchKeywords.filter(keyword => keyword !== keywordToRemove));
    };
  
    // Function to handle search keyword input change
    const handleChange = (event) => {
        setSearchKeyword(event.target.value);
    };
  
    // Function to handle search keyword input onEnter
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddKeyword();
        }
    }

    const [active, setActive] = useState('favourites');

    const favouritesActive = () => {
        setActive('favourites');
    }

    const allActive = () => {
        setActive('all');
    }

    return (
        <div className='chats__list'>
            <h3 className='no__padding'>Chat</h3>
            <div className='chat__list__options'>
                <div className='add-chat__button'>
                    <AddCommentIcon onClick={createNewChat} sx={{ fontSize: 28 }} />
                </div>
                <Box display="flex" alignItems="center" gap={2} mb={2} sx={{ width: '100%' }} >
                    <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search..."
                    className="form-control-custom"
                    value={searchKeyword}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                        endAdornment: (
                        <IconButton onClick={handleAddKeyword}>
                            <SearchIcon className="search-icon" style={{ fontSize: 40 }} />
                        </IconButton>
                        ),
                    }}
                    />
                </Box>
                <div className='chat__list__filters'>
                    <button
                        onClick={favouritesActive}
                        className={active === 'favourites' ? 'blue__button chat__list__filter active' : 'white__button chat__list__filter'}
                    >
                        Favourites
                    </button>
                    <button 
                        onClick={allActive} 
                        className={active === 'all' ? 'blue__button chat__list__filter active' : 'white__button chat__list__filter'}
                    >
                        All
                    </button>
                </div>
            </div>
            <div className='chats__list--chats'>
            {loading ? (
                <p>Loading...</p>
            ) : chats.length > 0 ? (
                <ul className='looped-chats__list'>
                    {chats.reverse().map((chat) => {
                        // Reverse the array here
                        const otherUserId = chat.sender._id === userId ? chat.receiver._id : chat.sender._id;
                        const otherUserName =
                            chat.sender._id === userId
                                ? `${chat.receiver.firstName} ${chat.receiver.lastName}`
                                : `${chat.sender.firstName} ${chat.sender.lastName}`;
                        const otherUserImage =
                            chat.sender._id === userId ? chat.receiver.imageLink : chat.sender.imageLink;

                        return (
                            <li 
                                className={currentChat === otherUserName ? 'chat__lists--chat active' : 'chat__lists--chat inactive'}
                                key={chat.id} 
                                onClick={() => handleClick(otherUserId, otherUserName)}
                            >
                                <div className='chat__lists--chat__image'>
                                    <img src={otherUserImage} alt={otherUserName} />
                                </div>
                                <div className='chat__info'>
                                    <h6 className='chat__info--name no__padding h6__strong'>{otherUserName}</h6>
                                    <p className='chat__info--message no__padding'>{chat.content}</p>
                                </div>
                                <p className='chat__time no__padding'>{new Date(chat.timestamp).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No recent chats</p>
            )}
            </div>
            <div className='more-people__button'>
                <a className='underline' href="#">Find more people to chat with!</a>
            </div>
        </div>
    );
}

export default RecentChats;
