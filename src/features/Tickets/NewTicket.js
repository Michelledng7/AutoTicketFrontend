import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersApiSlice';
import NewTicketForm from './NewTicketForm';

const NewTicket = () => {
	const users = useSelector(selectAllUsers);

	if (!users?.length) return <p>Not Currently Available</p>;
	const content = <NewTicketForm users={users} />;

	return content;
};

export default NewTicket;
