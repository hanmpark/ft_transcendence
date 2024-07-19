import styled from 'styled-components';
import Offcanvas from 'react-bootstrap/Offcanvas';

const StyledFriendsList = styled(Offcanvas)`
	.offcanvas-title {
		font-weight: 900;
		font-size: 2rem;
	}
	.btn-close {
		box-shadow: none;
	}
`;

export default StyledFriendsList;
