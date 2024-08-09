import styled, { keyframes } from "styled-components";

export const BannerSection = styled.section`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	z-index: 100;
	min-height: 90vh;
	border-bottom: 5px solid #fff;
	${({ height }) => height && `height: ${height};`}

	& > h1 {
		color: rgb(200,200,200);
		font-family: 'Orbitron', serif;
		font-size: 70px;
		z-index: 100;
		margin-bottom: 30px;
	}
`;

const totalPaddles = 6;

const BannerPaddle = styled.div`
	position: absolute;
	width: 70px;
	height: 350px;
	bottom: -50vh;
	background-color: white;
	border-radius: 100px;
`;

const getRotationAnimation = (scale, rotation) => keyframes`
	100% {
		transform: scale(${scale}) rotate(${rotation}deg);
		bottom: 150vh;
	}
`;

const StyledBannerPaddle = styled(BannerPaddle)`
	left: ${props => props.$left}%;
	filter: blur(${props => props.$blurPx}px);
	transform: scale(${props => 0.3 * props.$i - 0.6});
	animation: ${props => getRotationAnimation(0.3 * props.$i - 0.6, props.$dir)} ${props => props.$animationDuration}s linear infinite;
	animation-delay: ${props => props.$animationDelay}s;
`;

export const BannerPaddles = () => {
	const paddles = [];

	for (let i = 1; i <= totalPaddles + 1; i++) {
		const left = i % 2 ? Math.random() * 45 : 55 + Math.random() * 30;
		const animationDuration = 6 + Math.random() * 15;
		const animationDelay = Math.random() * 6;
		const blurPx = i * 2;

		const paddle = (
			<StyledBannerPaddle
				key={i}
				$left={left}
				$i={i}
				$dir={Math.floor(Math.random() * 2) ? 360 : -360}
				$blurPx={blurPx}
				$animationDuration={animationDuration}
				$animationDelay={animationDelay}
			/>
		);

		paddles.push(paddle);
	}

	return (
		<>
			{paddles}
		</>
	);
};
