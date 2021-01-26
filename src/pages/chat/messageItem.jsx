import React from 'react';
import moment from 'moment';

export default function MessageItem({item}) {
    const time = moment(item.timestamp).format("LT");
    return (
        <div key={item.id} class="msg-box">
            <div>
                <p>{item.message}</p>
                <ul class="chat-msg-info">
                    <li>
                        <div class="chat-time">
                            <span>{time}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
