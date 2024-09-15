import styled from "styled-components";

// ToggleContainer is the main wrapper
export const ToggleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem 0;
`;

// ToggleLabel is for optional text next to the toggle
export const ToggleLabel = styled.span`
	font-size: 1rem;
	margin-right: 10px;
	color: #fff;
`;

// ToggleSwitch is the actual toggle switch
export const ToggleSwitch = styled.label`
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;

	input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	input:checked + span {
		background-color: #4caf50;
	}

	input:checked + span:before {
		transform: translateX(26px);
	}
`;

// Slider is the sliding part of the toggle switch
export const Slider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	transition: 0.4s;
	border-radius: 34px;

	&:before {
		position: absolute;
		content: "";
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
	}
`;

// Container for the 2FA setup section
export const TwoFAContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgba(20, 20, 20, 0.5);
	padding: 2rem;
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
	max-width: 400px;
	margin: 0 auto;
`;

// Styled paragraph text
export const TwoFAText = styled.p`
	color: rgba(255, 255, 255, 0.9);
	font-family: 'Inter', sans-serif;
	margin-bottom: 1.5rem;
	font-size: 1.1rem;
	text-align: center;
`;

// Styled input field for the authentication code
export const AuthCodeInput = styled.input`
	padding: 0.75rem;
	width: 100%;
	border-radius: 5px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	background-color: rgba(25, 25, 25, 0.5);
	color: #fff;
	margin-bottom: 1.5rem;
	font-size: 1rem;
	transition: all 0.3s ease;

	&:focus {
		outline: none;
		border-color: rgba(164, 69, 178, 0.7);
		box-shadow: 0 0 10px rgba(164, 69, 178, 0.5);
	}
`;

// Styled button for verifying the code
export const VerifyButton = styled.button`
	padding: 0.75rem 2rem;
	border: none;
	border-radius: 5px;
	background-color: rgba(164, 69, 178, 0.7);
	color: #fff;
	font-size: 1rem;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background-color: rgba(164, 69, 178, 0.9);
		box-shadow: 0 0 15px rgba(164, 69, 178, 0.7);
	}

	&:disabled {
		background-color: rgba(164, 69, 178, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}
`;

// QRCode container
export const QRCodeWrapper = styled.div`
	margin-bottom: 1.5rem;
	background-color: #fff;
	padding: 1rem;
	border-radius: 10px;
`;
