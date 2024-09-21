import styled from "styled-components";

export const BlockedUserList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 15px;
	max-height: 400px;
	overflow-y: auto;
`;

export const BlockedUserItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: rgba(0, 0, 0, 0.1);
	padding: 15px;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const BlockedUserAvatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 15px;
`;

export const BlockedUserName = styled.span`
	font-size: 1.2rem;
	color: #fff;
	font-weight: 600;
`;

export const UnblockButton = styled.button`
	background-color: #ff4d4d;
	color: white;
	border: none;
	padding: 10px 15px;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	font-weight: bold;

	&:hover {
		background-color: #ff1a1a;
	}

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`;