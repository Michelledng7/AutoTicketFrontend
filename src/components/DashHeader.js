import { Link } from 'react-router-dom';
import React from 'react';

const DashHeader = () => {
	const content = (
		<header>
			<div>
				<Link to='dash'>
					<h1>Tech Ticket system</h1>
				</Link>
				<nav>{/*navigation button placeholder */}</nav>
			</div>
		</header>
	);
	return content;
};

export default DashHeader;
