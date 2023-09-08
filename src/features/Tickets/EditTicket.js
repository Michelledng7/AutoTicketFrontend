import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTicketById } from './ticketsApiSlice';
import { selectAllUsers } from '../users/usersApiSlice';
import EditTicketForm from './EditTicketForm';

const EditTicket = () => {
	const { id } = useParams();
	console.log(id);
	const ticket = useSelector((state) => selectTicketById(state, id));
	const users = useSelector(selectAllUsers);
	const content =
		ticket && users ? (
			<EditTicketForm ticket={ticket} users={users} />
		) : (
			<p> Loading ...</p>
		);
	return content;
};

export default EditTicket;
