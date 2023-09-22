import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faFileCirclePlus,
	faFilePen,
	faUserGear,
	faUserPlus,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useToSendLogoutMutation } from '../features/auth/authApiSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DASH_REGEX = /^\/dash(\/)?$/;
const TICKETS_REGEX = /^\/dash\/tickets(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
	const [logout, { isSuccess, isLoading }] = useToSendLogoutMutation();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { isManager, isAdmin } = useAuth();

	useEffect(() => {
		if (isSuccess) navigate('/');
	}, [isSuccess, navigate]);

	const onNewTicketClicked = () => navigate('/tickets/new');
	const onNewUserClicked = () => navigate('/dash/users/new');
	const onTicketsClicked = () => navigate('/dash/tickets');
	const onUsersClicked = () => navigate('/dash/users');

	let dashClass = null;
	if (
		!DASH_REGEX.test(pathname) &&
		!TICKETS_REGEX.test(pathname) &&
		!USERS_REGEX.test(pathname)
	) {
		dashClass = 'dash-header__container--small';
	}

	let newTicketButton = null;
	if (TICKETS_REGEX.test(pathname)) {
		newTicketButton = (
			<button
				className='icon-button'
				title='New Ticket'
				onClick={onNewTicketClicked}
			>
				<FontAwesomeIcon icon={faFileCirclePlus} />
			</button>
		);
	}

	let newUserButton = null;
	if (USERS_REGEX.test(pathname)) {
		newUserButton = (
			<button
				className='icon-button'
				title='New User'
				onClick={onNewUserClicked}
			>
				<FontAwesomeIcon icon={faUserPlus} />
			</button>
		);
	}

	let usersButton = null;
	if (isManager || isAdmin) {
		if (USERS_REGEX.test(pathname)) {
			usersButton = (
				<button
					className='icon-button'
					title='User Profile'
					onClick={onUsersClicked}
				>
					<FontAwesomeIcon icon={faUserGear} />
				</button>
			);
		}
	}

	let ticketsButton = null;
	if (TICKETS_REGEX.test(pathname) && pathname.includes('/dash')) {
		ticketsButton = (
			<button
				className='icon-button'
				title='Ticket List'
				onClick={onTicketsClicked}
			>
				<FontAwesomeIcon icon={faFilePen} />
			</button>
		);
	}
	const logoutButton = (
		<button className='icon-button' title='Logout' onClick={logout}>
			<FontAwesomeIcon icon={faRightFromBracket} />
		</button>
	);

	let buttonContent;
	if (isLoading) {
		buttonContent = <p>Logging Out...</p>;
	} else {
		buttonContent = (
			<>
				{logoutButton}
				{newTicketButton}
				{newUserButton}
				{ticketsButton}
				{usersButton}
			</>
		);
	}

	const content = (
		<header>
			<div>
				<Link to='dash'>
					<h1>Tech Ticket system</h1>
				</Link>
				<nav>{buttonContent}</nav>
			</div>
		</header>
	);
	return content;
};

export default DashHeader;
