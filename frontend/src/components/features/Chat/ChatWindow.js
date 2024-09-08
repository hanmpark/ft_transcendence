import React, { useState } from 'react';
import styled from 'styled-components';
import CloseButton from 'react-bootstrap/CloseButton';
import { Arrow } from './Arrow.js';

const ChatWindowContainer = styled.div`
	flex: 1;
	background-color: #f9f9f9;
	display: flex;
	flex-direction: column;
	position: relative !important;
	margin-right: 1%;
	max-width: 350px;
	height: ${({ isMinimized }) => (isMinimized ? '40px' : '500px')};
	transition: height 0.3s ease;
`;

const ChatHeader = styled.div`
	padding: 10px;
	background-color: #000;
	border: 1px solid #ddd;
	font-weight: bold;
	color: #fff;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`;

const ChatMessages = styled.div`
	flex: 1;
	padding: 10px;
	overflow-y: auto;
	color: #333;
	display: ${({ isMinimized }) => (isMinimized ? 'none' : 'block')};
	transition: display 0.3s ease;
`;

const ChatInputContainer = styled.div`
	padding: 10px;
	background-color: #fff;
	border-top: 1px solid #ddd;
	display: ${({ isMinimized }) => (isMinimized ? 'none' : 'block')};
	transition: display 0.3s ease;
`;

const ChatInput = styled.input`
	width: 100%;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 4px;
`;

const ActionButtonContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
`;

export const ChatWindow = ({ friendname, messages, onClose, isMinimized, onToggleMinimize }) => {
	const [isActive, setIsActive] = useState(false);
	const [isArrowActive, setIsArrowActive] = useState(false);

	const handleToggle = () => {
		setIsActive(!isActive);
		onToggleMinimize();
		setIsArrowActive(!isArrowActive);
	};

	return (
		<ChatWindowContainer isMinimized={isMinimized}>
			<ChatHeader onClick={handleToggle}>
				{friendname}
				<ActionButtonContainer>
					<Arrow
						onClick={handleToggle}
						ArrowAnimate={isArrowActive}/>
					<CloseButton variant='white' onClick={onClose} />
				</ActionButtonContainer>
			</ChatHeader>
			<ChatMessages isMinimized={isMinimized}>
				<div>{messages.text}</div>
			</ChatMessages>
			<ChatInputContainer isMinimized={isMinimized}>
				<ChatInput placeholder="Type a message..." />
			</ChatInputContainer>
		</ChatWindowContainer>
	);
};