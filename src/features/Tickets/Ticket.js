import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectTicketById } from './ticketsApiSlice';

const Ticket = ({ ticketId }) => {
	const ticket = useSelector((state) => selectTicketById(state, ticketId));
	const navigate = useNavigate();
	if (ticket) {
		const created = new Date(ticket.createdAt).toLocaleString('en-US', {
			day: 'numeric',
			month: 'long',
		});
		const updated = new Date(ticket.updatedAt).toLocaleString('en-US', {
			day: 'numeric',
			month: 'long',
		});
		const handleEdit = () => navigate(`/dash/tickets/${ticketId}`);
		return (
			<tr className='table__row'>
				<td className='table__cell ticket__status'>
					{ticket.completed ? (
						<span className='ticket__status--completed'>Completed</span>
					) : (
						<span className='ticket__status --open'>Open</span>
					)}
				</td>
				<td className='table__cell ticket__created'>{created}</td>
				<td className='table__cell ticket__updated'>{updated}</td>
				<td className='table__cell'>{ticket.title}</td>
				<td className='table__cell ticket__username'>{ticket.username}</td>

				<td className='table__cell'>
					<button onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			</tr>
		);
	} else return null;
};

export default Ticket;
