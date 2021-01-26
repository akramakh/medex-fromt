import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Avatar from '../../components/avatar';

export default function UserChat({item, onSelect}) {
    const [user, setUser] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [unReadCount, setUnReadCount] = useState(0);

    useEffect(() => {
        if (item){
            setUser(item.user);
            setLastMessage(item.last_message);
            setUnReadCount(item.unread_count);
        }
    }, [item]);

    let fullName = user ? user.first_name ? `${user.first_name} ${user.last_name}` : `${user.username}` : "--";
    if (user && user.role === 'doctor'){
        fullName = `Dr. ${fullName}`;
    }
    const a = moment();
    const b = moment(lastMessage ? lastMessage.timestamp : null);
    const date = a.to(b);
    return (
        <div key={item.id} className="user-chat" onClick={onSelect}>
            <a class="media">
                <div class="media-img-wrap">
                    <Avatar user={user} width="50px" height="50px" circle />
                </div>
                <div class="media-body">
                    <div>
                        <div class="user-name">{fullName}</div>
                        <div class="user-last-chat">{lastMessage ? lastMessage.message : "--"}</div>
                    </div>
                    <div>
                        <div class="last-chat-time block">{date}</div>
                        {unReadCount > 0 ? <div class="badge badge-success badge-pill">{unReadCount}</div> : null}
                    </div>
                </div>
            </a>
        </div>
    )
}
