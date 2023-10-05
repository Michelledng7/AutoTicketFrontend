import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {
	const { username, isAdmin, isManager } = useAuth()
	useTitle(`Order Tickets for ${username}`)
	const date = new Date()
	const today = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'full',
		timeStyle: 'long',
	}).format(date)

	const content = (
		<section className='welcome'>
			<p>{today}</p>
			<h1>Welcome: {username}</h1>
			<p>
				<Link to='/dash/tickets'>View the tickets</Link>
			</p>
			<p>
				<Link to='/dash/tickets/new'>Add New ticket</Link>
			</p>

			{(isAdmin || isManager) && (
				<p>
					<Link to='/dash/users'>View Users Settings</Link>
				</p>
			)}
			{(isAdmin || isManager) && (
				<p>
					<Link to='/dash/users/new'>Add New User</Link>
				</p>
			)}
		</section>
	)

	return content
}

export default Welcome
