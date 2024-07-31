import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AuthenticationContainer from '../../styles/layouts/AuthenticationContainer.styled';
import Container from '../../styles/layouts/Container.styled';
import BackButton from '../../styles/shared/button/BackButton.styled';
import signup from '../../../api/authentication/signup';

const SignUp = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cfPassword, setCfPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		signup(username, email, password)
			.then(() => {
				navigate('/login');
			}).catch((error) => {
				alert(error);
			});
	};

	return (
		<Container>
			<AuthenticationContainer onSubmit={handleSubmit}>
				<BackButton to='/'><i className='bi bi-arrow-left' style={{'fontSize': '25px'}}></i></BackButton>
				<h1>Sign Up</h1>
				<AuthenticationContainer.Group className="mb-3">
					<AuthenticationContainer.Control id="id" type="username" placeholder="Username" required pattern='[a-zA-Z\-_]{3,20}' value={username} onChange={(e) => setUsername(e.target.value)}/>
				</AuthenticationContainer.Group>
				<AuthenticationContainer.Group className="mb-3">
					<AuthenticationContainer.Control id="mail" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
				</AuthenticationContainer.Group>
				<AuthenticationContainer.Group className="mb-3">
					<AuthenticationContainer.Control id="password" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
				</AuthenticationContainer.Group>
				<AuthenticationContainer.Group className="mb-3">
					<AuthenticationContainer.Control id="cfpassword" type="password" placeholder="Confirm Password" required value={cfPassword} onChange={(e) => setCfPassword(e.target.value)}/>
				</AuthenticationContainer.Group>
				<p>Already Signed Up ? <Link to='/login'>Login</Link></p>
				<Button variant='success' type='submit'>Submit</Button>
			</AuthenticationContainer>
		</Container>
	);
};

export default SignUp;
