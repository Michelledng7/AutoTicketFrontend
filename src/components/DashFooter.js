import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const DashFooter = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	console.log(pathname);

	const OnGoHomeClicked = () => navigate('/dash');
	let backHomeButton = null;
	if (pathname !== '/dash') {
		backHomeButton = (
			<button
				className='dash-footer__button icon-button'
				title='Home'
				onClick={OnGoHomeClicked}
			>
				<FontAwesomeIcon icon={faHouse} />
			</button>
		);
	}

	const content = (
		<footer className='dash-footer'>
			{backHomeButton}
			<p>Current User:</p>
			<p>Status: </p>
		</footer>
	);

	return content;
};

export default DashFooter;
