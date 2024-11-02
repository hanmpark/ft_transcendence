import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useRelation } from "../../../context/RelationContext";
import { useTournament } from "../../../context/TournamentContext";
import {
	ActiveFriendContainer,
	ButtonContainer,
	FriendItem,
	FriendProfilePicture,
	JoinTournamentContainer,
	KickButton,
	ModalContainer,
	ModalOverlay,
	PageContainer,
	PlayerCard,
	PlayerList,
	WaitingMessage,
} from "../styles/Tournament/JoinTournament.styled";
import PongButton from "../../../styles/shared/PongButton.styled";
import API from "../../../api/api";
import { useNotification } from "../../../context/NotificationContext";
import Loader from "../../../styles/shared/Loader.styled";

const JoinTournament = () => {
	const navigate = useNavigate();
	const { addNotification } = useNotification();
	const { tournament, updateTournament, isStartDisabled } = useTournament();
	const { tournamentID } = useParams();
	const { friends } = useRelation();
	const [invite, setInvite] = useState(false);
	const [activeFriends, setActiveFriends] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTournament = async () => {
			try {
				const response = await API.get(`/tournaments/${tournamentID}`);
				console.log('JoinTournament.js: fetchTournament', response.data);
				updateTournament(response.data);
			} catch (error) {
				addNotification('error', error.response?.data?.error || 'Error fetching tournament data');
			} finally {
				setLoading(false);
			}
		};

		fetchTournament();
	}, [tournamentID, addNotification, updateTournament]);

	useEffect(() => {
		setActiveFriends(friends.filter(friend => !!friend.status.online));
	}, [friends]);

	const handleKickPlayer = async (userID) => {
		try {
			await API.post(`/tournaments/${tournamentID}/kick`, { user_id: userID });
		} catch (error) {
			console.error("Error kicking player:", error);
		}
	};

	const handleInvite = () => {
		setInvite(true);
	};

	const handleInviteFriends = async () => {
		try {
			const inviteeIDs = activeFriends.map(friend => friend.userID);
			await API.put(`/tournaments/${tournamentID}`, { participants: inviteeIDs });
			setInvite(false);
		} catch (error) {
			console.error("Error inviting friends:", error);
		}
	};

	const handleStartTournament = async () => {
		try {
			await API.post(`/tournaments/${tournamentID}/start`);
		} catch (error) {
			console.error("Error starting tournament:", error);
		}
	};

	if (loading || !tournament) {
		return <Loader />;
	}

	return (
		<>
			<PageContainer>
				<h1>Tournament</h1>
				<h2>{tournament.name}</h2>
				<JoinTournamentContainer>
					<PlayerList>
						{tournament.participants.map((player) => (
							<PlayerCard key={player.userID}>
								{player.displayName || player.username}
								{tournament.owner.userID === player.userID ? null : (
									<KickButton onClick={() => handleKickPlayer(player.userID)}>✖</KickButton>
								)}
							</PlayerCard>
						))}
					</PlayerList>
					<ButtonContainer>
						<PongButton type="button" $width="150px" onClick={() => navigate(-1)}>Back</PongButton>
						<PongButton type="button" $width="150px" onClick={handleInvite}>Invite</PongButton>
						<PongButton type="button" $width="150px" disabled={isStartDisabled} onClick={handleStartTournament}>Start</PongButton>
					</ButtonContainer>
					<WaitingMessage>
						{isStartDisabled ? (
							<>
								<p>Waiting for more players to join...</p>
								<Spinner animation="border" />
							</>
						) : (
							<p>Ready to start!</p>
						)}
					</WaitingMessage>
				</JoinTournamentContainer>
			</PageContainer>
			{invite && (
				<ModalOverlay>
					<ModalContainer>
						<h2>Invite Friends</h2>
						<ActiveFriendContainer>
							{activeFriends.length ? (
								activeFriends.map((friend) => (
									<FriendItem key={friend.userID}>
										<FriendProfilePicture src={friend.avatarID} alt={`${friend.username}'s avatar`} />
										{friend.displayName || friend.username}
									</FriendItem>
								))
							) : (
								<p>No active friends available to invite</p>
							)}
						</ActiveFriendContainer>
						<ButtonContainer>
							<PongButton type="button" $width="150px" onClick={() => setInvite(false)}>
								Cancel
							</PongButton>
							<PongButton type="button" $width="150px" onClick={handleInviteFriends}>
								Invite
							</PongButton>
						</ButtonContainer>
					</ModalContainer>
				</ModalOverlay>
			)}
		</>
	);
};

export default JoinTournament;
