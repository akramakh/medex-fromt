import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {FaTelegramPlane, FaSearch} from 'react-icons/fa';
import { Spin, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Avatar from '../../components/avatar';
import UserChat from './userChat';
import MessageItem from './messageItem';
import {fetchUserMessages, createUserMessages} from '../../actions/index';

export default function ChatBox({userChat}) {
    const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);
	// const [userChat, setUserChat] = useState(0);
	
    const {authReducer: {user: currentUser}} = useSelector(state => state);
    useEffect(() => {
        setUser(userChat.user);
    }, [userChat.user]);

    useEffect(() => {
        dispatch(fetchUserMessages(userChat.user.id, (success, data) => {
            if(success){
                console.log('data', data);
                
				const preparedMessages = prepareMessages(data);
                setMessages(preparedMessages);
                setLoading(false);
			}
		}));
    }, [dispatch, userChat]);

    useEffect(() => {
        if (message.trim().length === 0){
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    }, [message]);
    
    const handleSubmit = () => {
        setDisabled(true);
        if (message.trim().length === 0){
            return;
        }
        const data = {
            message,
            receiver: user.id
        }
        dispatch(createUserMessages(data, (success, data) => {
            if(success){
                console.log('data', data);
                setMessage("");
                if (messages.length > 0){
                    const last_group = messages[messages.length - 1];
                    if (last_group.length > 0){
                        const last_msg = last_group[last_group.length - 1];
                        if (last_msg.sender.id === currentUser.id){
                            last_group.push(data);
                            const new_messages = messages.filter((e, i) => i < messages.length-1);
                            new_messages.push(last_group);
                            setMessages(new_messages);
                        }else{
                            const gg = [data];
                            setMessages([...messages, gg]);
                        }

                    }else{
                        last_group.push(data);
                    }

                }else{
                    const new_group = [];
                    const new_msg = data;
                    new_group.push(new_msg);
                    setMessages([new_group]);
                }
			}
		}));
    }

    const prepareMessages = (msgs) => {
		const allMessages = [];
		let groupedMessages = [];
		let oldUser = msgs.length? msgs[0].sender : null;
		msgs.map((item, index) => {
			
			if (oldUser.id !== item.sender.id){
				allMessages.push(groupedMessages);
				groupedMessages = [];
			}
			groupedMessages.push(item);
			if(index === msgs.length - 1){
				allMessages.push(groupedMessages);
			}
			oldUser = item.sender;

		});
		return allMessages;
    }
    
    
    const renderUserInfo = () => {
		let fullName = user.first_name ? `${user.first_name} ${user.last_name}` : `${user.username}` ;
		if (user.role === 'doctor'){
			fullName = `Dr. ${fullName}`;
		}
        return (
            <div class="media">
				<div class="media-img-wrap">
					<Avatar user={user} width="50px" height="50px" circle />
				</div>
				<div class="media-body">
					<div class="user-name">{fullName}</div>
					<div class="user-status">online</div>
				</div>
			</div>
        )
    }

    const renderMessages = () => {
        if (!messages || messages.length === 0){
            return <Empty />
        }
		let date = null;
		const data = messages.map(group => {
			const first_msg = group[0];
			const otherClasses = first_msg.sender.id === currentUser.id ? "sent" : "received";
			const avatar = first_msg.sender.id === currentUser.id ? null : <Avatar user={first_msg.sender} width="30px" height="30px" circle />;

			return (
				<li key={first_msg.id} class={`media ${otherClasses}`}>
					{avatar}
					<div class="media-body">
						{
							group.map(msg => {
								// const msg_date = moment(msg.timestamps).format("MM-DD-YYYY")
								// if (msg_date !== date){
								// 	return (
								// 		<>
								// 			<li class="chat-date">{date}</li>
								// 			<MessageItem item={msg} />
								// 		</>
								// 	)
								// }
								return (<MessageItem item={msg} />)
							})
						}
						
					</div>
				</li>
			)
		});
		
        return (
            <ul class="list-unstyled">
				{data}
			</ul>
        )
    }

    if (loading){
        const antIcon = <LoadingOutlined spin />;
        return (
            <div class="chat-cont-right">
                <div className="spinner">
                    <Spin indicator={antIcon} /> 
                </div>
            </div>
        )
    }
    
    return (
        <div class="chat-cont-right">
            <div class="chat-header">
                <a id="back_user_list" href="javascript:void(0)" class="back-user-list">
                    <i class="material-icons">chevron_left</i>
                </a>
                {renderUserInfo()}
                <div class="chat-options">
                    <a href="javascript:void(0)" data-toggle="modal" data-target="#voice_call">
                        <i class="material-icons">local_phone</i>
                    </a>
                    <a href="javascript:void(0)" data-toggle="modal" data-target="#video_call">
                        <i class="material-icons">videocam</i>
                    </a>
                    <a href="javascript:void(0)">
                        <i class="material-icons">more_vert</i>
                    </a>
                </div>
            </div>
            <div class="chat-body">
                <div class="chat-scroll">
                    {renderMessages()}
                </div>
            </div>
            <div class="chat-footer">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div id="btn-file" class="btn-file btn">
                            <i class="fa fa-paperclip"></i>
                            <input type="file" />
                        </div>
                    </div>
                    <input type="text" class="input-msg-send form-control" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type something" />
                    <div class="input-group-append">
                        <button type="button" class="btn msg-send-btn" onClick={handleSubmit} disabled={disabled}><FaTelegramPlane /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
