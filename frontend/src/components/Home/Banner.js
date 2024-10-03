import React from "react";
import { useNavigate } from "react-router-dom";
import {
	BannerPaddle,
	BannerPaddlesContainer,
	BannerSection,
	PlayButton,
} from "./styles/Banner.styled";
import { useTranslation } from "react-i18next";

const Banner = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<>
			<BannerSection>
				<BannerPaddlesContainer>
					<BannerPaddle
						$left={10}
						$blurPx={2}
						$rotation={30}
						$scale={0.9}
						$direction={360}
						$animationDuration={23}
					/>
					<BannerPaddle
						$left={30}
						$blurPx={4}
						$rotation={10}
						$scale={0.7}
						$direction={-360}
						$animationDuration={10}
					/>
					<BannerPaddle
						$left={50}
						$blurPx={6}
						$rotation={85}
						$scale={1}
						$direction={360}
						$animationDuration={16}
					/>
					<BannerPaddle
						$left={70}
						$blurPx={8}
						$rotation={55}
						$scale={1.2}
						$direction={-360}
						$animationDuration={22}
					/>
					<BannerPaddle
						$left={90}
						$blurPx={10}
						$rotation={10}
						$scale={0.6}
						$direction={360}
						$animationDuration={11}
					/>
				</BannerPaddlesContainer>
				<h1>{t('home.welcome')}</h1>
				<PlayButton variant="light" onClick={() => navigate("/game")}>
					{t('home.playButton')}
				</PlayButton>
			</BannerSection>
		</>
	);
};

export default Banner;
