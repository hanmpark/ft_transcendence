import React, { useState } from 'react';
import SearchFriendsContainer, { SearchInput, Dropdown, FriendItem } from './styles/SearchFriends.styled';

export const SearchFriends = ({ onOpenChat }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [friends, setFriends] = useState(['Alice', 'Bob', 'Brandonation', 'Evanescence', 'Hanministrateur', 'Kianatomy']);

	const filteredFriends = friends.filter(friend =>
	friend.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<SearchFriendsContainer>
			<SearchInput
				id="search-input"
				type="text"
				placeholder="Search for Friends..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			{searchQuery && (
				<Dropdown>
					{filteredFriends.map((friend, index) => (
						<FriendItem key={index} onClick={() => onOpenChat(friend)}>
							{friend}
						</FriendItem>
					))}
				</Dropdown>
				)}
			</SearchFriendsContainer>
		);
};
