import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	AuthenticationSection,
	AuthButton,
	FormContainer,
	Input,
	ErrorMessage
} from "./styles/Authentication.styled";
import axios from "axios";

const TwoFactorAuth = ({ setIsTwoFactorAuth }) => {
	const navigate = useNavigate();
	const [authCode, setAuthCode] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [platforms, setPlatforms] = useState([]);

	// useEffect(() => {
	// 	axios.get("http://localhost:8888/api/v1/auth/totp/platform_availability")
	// 		.then((res) => {
	// 			console.log(res.data);
	// 		})
	// 		.catch((err) => {
	// 			setError(err);
	// 		});
	// }, []);

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	setLoading(true);
	// 	setError("");

	// 	// Make an API call to verify the 2FA code
	// 	API.post("/auth/verify-2fa", { code: authCode })
	// 		.then((response) => {
	// 			setLoading(false);
	// 			if (response.data.success) {
	// 				navigate("/");
	// 			} else {
	// 				setError("Invalid authentication code. Please try again.");
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			setLoading(false);
	// 			setError("Something went wrong. Please try again.");
	// 		});
	//   };

	return (
		<AuthenticationSection>
			<FormContainer>
				<h1>Two Factor Authentication</h1>
				<p>Enter the 6-digit code generated by your authentication app.</p>
				<Input
					type="text"
					id="authCode"
					placeholder="Enter 6-digit authentication code"
					value={authCode}
					onChange={(e) => setAuthCode(e.target.value)}
				/>

				{error && <ErrorMessage>{error}</ErrorMessage>}

				<AuthButton type="submit" disabled={loading}>
					{loading ? "Verifying..." : "Verify Code"}
				</AuthButton>
				<AuthButton type="AuthButton" onClick={() => setIsTwoFactorAuth(false)}>
					Back
				</AuthButton>
			</FormContainer>
		</AuthenticationSection>
	);
};

export default TwoFactorAuth;
