import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import API from '../api/api';
import { useLocation } from "react-router-dom";
import logger from "../api/logger";
import { formatUserData } from "../api/user";
import { GetBlockedUsers, GetFriends, GetRequests } from "../scripts/relation";
import { useNotification } from "./NotificationContext";

const WS_CHAT_URL = process.env.REACT_APP_ENV === 'production' ? '/ws/chat/?token=' : 'ws://localhost:8000/ws/chat/?token=';
const WS_STATUS_URL =  process.env.REACT_APP_ENV === 'production' ? '/ws/status/?token=' : 'ws://localhost:8000/ws/status/?token='

export const RelationContext = createContext({
	conversations: [],
});

const RelationProvider = ({ children }) => {
	const location = useLocation();
	const { addNotification } = useNotification();
	const socketStatus = useRef(null);
	const socketChat = useRef(null);
	const pathnameRef = useRef(location.pathname);
	const [conversations, setConversations] = useState([
				{
					"conversationID": "conv_MTcyNjMwMjg5NjQ2MDc3Mg",
					"conversationType": "private_message",
					"participants": [
						{
							"userID": "user_MTcyNjMwMTc5NTA5MjQ1MjA",
							"username": "bsoubaig",
							"displayName": null,
							"lang": "fr",
							"avatarID": null,
							"bannerID": null,
							"bio": null,
							"flags": 1
						},
						{
							"userID": "user_MTcyNjMwMTkxMzk0Nzg5NTU",
							"username": "evmorvan",
							"displayName": null,
							"lang": "fr",
							"avatarID": null,
							"bannerID": null,
							"bio": null,
							"flags": 1
						}
					],
					"messages": [
						{
							"messageID": "msg_MTcyNjMxOTU5OTk4MDg4MzI",
							"content": "Hello, how are you?",
							"sender": {
								"userID": "user_MTcyNjMwMTc5NTA5MjQ1MjA",
								"username": "bsoubaig",
								"displayName": null,
								"lang": "fr",
								"avatarID": null,
								"bannerID": null,
								"bio": null,
								"flags": 1
							},
							"createdAt": "2024-09-14T13:15:22.116212Z"
						},
						{
							"messageID": "msg_MTcyNjMxOTk2NDg4MjY2Mjc",
							"content": "YOU STINK BRO LMAOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",
							"sender": {
								"userID": "user_MTcyNjMwMTc5NTA5MjQ1MjA",
								"username": "bsoubaig",
								"displayName": null,
								"lang": "fr",
								"avatarID": null,
								"bannerID": null,
								"bio": null,
								"flags": 1
							},
							"createdAt": "2024-09-14T13:20:05.103983Z"
						}
					]
				},
				{
					"conversationID": "conv_MTcyNjMwMjg5NjQ2MDc7Mg",
					"conversationType": "private_message",
					"participants": [
						{
							"userID": "user_MTcyNjMwMTc5NTA5MjQ1MjA",
							"username": "johndoe",
							"displayName": null,
							"lang": "en",
							"avatarID": null,
							"bannerID": null,
							"bio": null,
							"flags": 1
						},
						{
							"userID": "user_MTcyNjMwMTkxMzk0Nzg5NTU",
							"username": "janedoe",
							"displayName": null,
							"lang": "en",
							"avatarID": null,
							"bannerID": null,
							"bio": null,
							"flags": 1
						}
					],
					"messages": [
						{
							"messageID": "msg_MTcyNjMxOTU5OTk4MDg4MzI",
							"content": "Hi, nice to meet you!",
							"sender": {
								"userID": "user_MTcyNjMwMTc5NTA5MjQ1MjA",
								"username": "johndoe",
								"displayName": null,
								"lang": "en",
								"avatarID": null,
								"bannerID": null,
								"bio": null,
								"flags": 1
							},
							"createdAt": "2024-09-14T13:15:22.116212Z"
						},
						{
							"messageID": "msg_MTcyNjMxOTk2NDg4MjY2Mjc",
							"content": "Nice to meet you too!",
							"sender": {
								"userID": "user_MTcyNjMwMTkxMzk0Nzg5NTU",
								"username": "janedoe",
								"displayName": null,
								"lang": "en",
								"avatarID": null,
								"bannerID": null,
								"bio": null,
								"flags": 1
							},
							"createdAt": "2024-09-14T13:20:05.103983Z"
						}
					]
				}
			]);
	const [relations, setRelations] = useState([]);
	const [friends, setFriends] = useState([]);
	const [requests, setRequests] = useState([]);
	const [blockedUsers, setBlockedUsers] = useState([]);
	const [isRefetch, setIsRefetch] = useState(false);

	const setActivity = location => {
		if (location.state?.mode === 'ai') {
			return 'PLAYING_VS_AI';
		} else if (location.state?.mode === '1v1') {
			return 'PLAYING_MULTIPLAYER';
		} else if (location === '/game-local') {
			return 'PLAYING_LOCAL';
		}
		return 'HOME';
	};

	useEffect(() => {
		API.get('users/@me/relationships')
			.then(relationships => {
				setRelations(relationships.data);
				setFriends(GetFriends(relationships.data));
				setRequests(GetRequests(relationships.data));
				setBlockedUsers(GetBlockedUsers(relationships.data));
			})
			.catch(err => {
				console.error(err?.response?.data?.error || 'An error occurred.');
			})
			.finally(() => {
				setIsRefetch(false);
			})
	}, [isRefetch]);

	useEffect(() => {
		socketChat.current = new WebSocket(WS_CHAT_URL + localStorage.getItem('token'));
		socketChat.current.onopen = () => {
			logger('WebSocket for Chat connection opened');
		};
		socketChat.current.onmessage = event => {
			const response = JSON.parse(event.data);
			if (response.type === 'conversation_update') {
				API.get('chat/conversations')
					.then(response => {
						setConversations(response.data.conversations);
					})
					.catch(error => {
						console.error('Failed to update conversations:', error);
					});
			} else if (response.type === 'friend_request') {
				const userFrom = formatUserData({
					...response.data.from,
					status: response.status
				});
				const userTo = formatUserData({
					...response.data.to,
					status: response.status
				});
				setIsRefetch(true);
				if (userFrom.status === 'pending') {
					addNotification('info', `You have a friend request from ${userFrom.displayName}.`);
				} else if (userFrom.status === 'rejected') {
					addNotification('info', `${userTo.displayName} rejected your friend request.`);
				} else if (userFrom.status === 'accepted') {
					addNotification('info', `${userTo.displayName} accepted your friend request.`);
				};
			}
		};
		socketChat.current.onerror = error => {
			console.error('WebSocket for Chat encountered an error:', error);
		};

		return () => {
			if (socketChat.current && socketChat.current.readyState === WebSocket.OPEN) {
				socketChat.current.close();
				logger('WebSocket for Chat closed');
			}
		};
	}, [addNotification]);

	useEffect(() => {
		socketStatus.current = new WebSocket(WS_STATUS_URL + localStorage.getItem('token'));
		socketStatus.current.onopen = () => {
			logger('WebSocket for Status connection opened');
		};
		socketStatus.current.onmessage = event => {
			const response = JSON.parse(event.data);
			if (response.type === 'heartbeat') {
				socketStatus.current.send(JSON.stringify({
					type: 'heartbeat',
					activity: setActivity(pathnameRef.current)
				}));
			} else if (response.type === 'connection_event') {
				setIsRefetch(true);
			}
		};
		socketStatus.current.onerror = error => {
			console.error('WebSocket for Status encountered an error:', error);
		};

		return () => {
			if (socketStatus.current && socketStatus.current.readyState === WebSocket.OPEN) {
				socketStatus.current.close();
				logger('WebSocket for Status closed');
			}
		};
	}, []);

	useEffect(() => {
		pathnameRef.current = location.pathname;
	}, [location.pathname]);

	return (
		<RelationContext.Provider value={{
			conversations,
			setConversations,
			relations,				// get the relations
			setRelations,			// change the relations
			friends,				// get the friends
			setFriends,				// change the friends
			requests,				// get the requests users
			setRequests,			// change the requests
			blockedUsers,			// get the blocked users
			setBlockedUsers,		// change the blocked users
			setIsRefetch,			// refetch the relations when set to true
		}}>
			{ children }
		</RelationContext.Provider>
	);
};

export const useRelation = () => useContext(RelationContext);

export default RelationProvider;
