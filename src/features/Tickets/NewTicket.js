import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersApiSlice';
import NewTicketForm from './NewTicketForm';

const NewTicket = () => {
	const users = useSelector(selectAllUsers);
	const content = users ? <NewTicketForm users={users} /> : <p> Loading...</p>;
	return content;
};

export default NewTicket;
