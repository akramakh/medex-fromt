import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {FaTelegramPlane, FaSearch} from 'react-icons/fa';
import Avatar from '../../components/avatar';
import UserChat from './userChat';
import MessageItem from './messageItem';
import ChatBox from './chatBox';
import {fetchUserMessages, fetchUserChats} from '../../actions/index';
import ChatLanding from '../../assets/img/chat.svg';

import './style.scss';

const userMessages = [
{
    id: 1,
    user: {
        id: 10,
        first_name: "ss",
        last_name: 'dddddd',
        username: 'ddd',
        avatar: null
    },
    last_message: {
        id: 100,
        text: "last message text",
        created_at: "2021-01-07T14:15:41.526843Z"
    },
    unread_count: 5
},
{
    id: 2,
    user: {
        id: 20,
        first_name: "sdfa",
        last_name: 'dsa',
        username: 'ff',
        avatar: null
    },
    last_message: {
        id: 200,
        text: "last message text",
        created_at: "2021-01-07T14:15:41.526843Z"
    },
    unread_count: 0
},
{
    id: 3,
    user: {
        id: 30,
        first_name: "adasdf",
        last_name: 'ssc',
        username: 'sse',
        avatar: null
    },
    last_message: {
        id: 300,
        text: "last message text",
        created_at: "2021-01-07T14:15:41.526843Z"
    },
    unread_count: 1
},
{
    id: 4,
    user: {
        id: 40,
        first_name: "ssdad",
        last_name: 'dddfd',
        username: 'dfff',
        avatar: null
    },
    last_message: {
        id: 400,
        text: "last message text",
        created_at: "2021-01-07T12:15:41.526843Z"
    },
    unread_count: 0
},
{
    id: 5,
    user: {
        id: 50,
        first_name: "werqrfd",
        last_name: 'dddawesrd',
        username: 'sdaa',
        avatar: null
    },
    last_message: {
        id: 500,
        text: "last message text",
        created_at: "2021-01-07T12:15:41.526843Z"
    },
    unread_count: 0
},
];

export default function Chat() {
	const dispatch = useDispatch();

	const [userChats, setUserChats] = useState([]);
	const [messages, setMessages] = useState([]);
	const [userChat, setUserChat] = useState(null);
	
	const {authReducer: {user}} = useSelector(state => state);
	console.log('messages', messages)
    useEffect(() => {
		dispatch(fetchUserChats((success, data) => {
			if(success){
				console.log('data', data);
				setUserChats(data);

			}
		}));
	}, [dispatch]);

    const renderUserChats = () => {
        const data = userChats.map(item => {
            return <UserChat onSelect={() => setUserChat(item)} item={item} />
        });
        return (
            <div class="chat-scroll">
                {data}
            </div>
        )
	}
    const renderChatLanding = () => {
        
        return (
            <div class="chat-landing">
                <img src={ChatLanding} />
            </div>
        )
	}

    return (
        <div class="content">
				<div class="container-fluid">
					<div class="row">
						<div class="col-xl-12">
							<div class="chat-window">
							
								<div class="chat-cont-left">
									<div class="chat-header">
										<span>Chats</span>
										<a href="javascript:void(0)" class="chat-compose" >
											<i class="material-icons">control_point</i>
										</a>
									</div>
									<form class="chat-search">
										<div class="input-group">
											<div class="input-group-prepend">
												<FaSearch />
											</div>
											<input type="text" class="form-control" placeholder="Search" />
										</div>
									</form>
									<div class="chat-users-list">
										{renderUserChats()}
									</div>
								</div>

								{userChat ? <ChatBox userChat={userChat} /> : renderChatLanding()}
								
							</div>
						</div>
					</div>

				</div>

			</div>	
    )
}
