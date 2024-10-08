import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../context/AuthContext';
import RelationProvider from '../../context/RelationContext';
import ConnectedRoot from './ConnectedRoot';
import ConnectedNavBar from '../Navigation/ConnectedNavigation';

const Root = () => {
	const location = useLocation();
	const { isLoggedIn } = useContext(AuthContext);
	const [showPersistentUI, setShowPersistentUI] = useState(true);

	useEffect(() => {
		if (location.pathname.includes('/game')) {
			setShowPersistentUI(false);
		} else {
			setShowPersistentUI(true);
		}
	}, [location]);

	return (
		<>
			{showPersistentUI ? (
				<>
					{isLoggedIn ? (
						<RelationProvider>
							<ConnectedNavBar/>
							<main>
								<ConnectedRoot/>
								<Outlet/>
							</main>
							<Footer/>
						</RelationProvider>
					) : (
						<>
							<NavBar/>
							<main>
								<Outlet/>
							</main>
							<Footer/>
						</>
					)}
				</>
			) : (
				<main>
					<Outlet/>
				</main>
			)}
		</>
	);
};

export default Root;
