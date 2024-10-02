import React, { useContext, useEffect, useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import LanguageDropdown from "./LanguageDropdown";
import SearchBar from "./SearchBar";
import {
	FriendsNavLinkContainer,
	NavContainer,
	NavItemsContainer,
	RequestPopUp,
	StyledNavLink,
} from "./styles/Navigation.styled";
import { TitleLink } from "../../styles/shared/Title.styled";
import API from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import { RelationContext } from "../../context/RelationContext";
import { useNotification } from "../../context/NotificationContext";

const ConnectedNavBar = () => {
	const { addNotification } = useNotification();
	const { setUser } = useContext(AuthContext);
	const { relations } = useContext(RelationContext);
	const [language, setLanguage] = useState("en");
	const [requestsLen, setRequestsLen] = useState(0);
	const userID = localStorage.getItem("userID");

	useEffect(() => {
		setRequestsLen(relations.filter(relation => relation.status === 0 && relation.target.userID === userID).length);
	}, [relations, userID]);

	const handleLanguage = event => {
		setLanguage(event.target.value);
		API.patch('users/@me/profile', { lang: event.target.value })
			.then(() => {
				setUser(prev => ({
					...prev,
					lang: event.target.value,
				}))
			})
			.catch(err => {
				addNotification('error', `${err?.response?.data?.error || 'An error occurred.'}`);
			});
	};

	return (
		<NavContainer>
			<NavItemsContainer $gap='100px'>
				<TitleLink to='/'>PONG</TitleLink>
				<NavItemsContainer $gap='100px'>
					<FriendsNavLinkContainer>
						<StyledNavLink to="/friends">FRIENDS</StyledNavLink>
						{!!requestsLen && <RequestPopUp>{requestsLen}</RequestPopUp>}
					</FriendsNavLinkContainer>
					<StyledNavLink to="/">LEADERBOARD</StyledNavLink>
					<StyledNavLink to="shop">SHOP</StyledNavLink>
					<StyledNavLink to="playmenu">PLAY</StyledNavLink>
				</NavItemsContainer>
			</NavItemsContainer>
			<NavItemsContainer>
				<SearchBar/>
				<ProfileDropdown/>
				<LanguageDropdown handleChange={handleLanguage} language={language}/>
			</NavItemsContainer>
		</NavContainer>
	);
};

export default ConnectedNavBar;
