import { useGetTicketsQuery } from './ticketApiSlice';
import Ticket from './Ticket';

const TicketList = () => {
	const {
		data: tickets,
		isSuccess,
		isLoading,
		isError,
		error,
	} = useGetTicketsQuery();

	let content;
	if (isLoading) content = <p>Loading ...</p>;
	if (isError) content = <p className={errmsg}>{error?.data?.message}</p>;

	if (isSuccess) {
		const { ids } = tickets;

		const tableContent = ids?.length
			? ids.map((ticketId) => <Ticket key={ticketId} ticketId={ticketId} />)
			: null;

		content = (
			<table className='table table--tickets'>
				<thead className='table__thead'>
					<tr>
						<th scope='col' className='table__th ticket__status'>
							UserName
						</th>
						<th scope='col' className='table__th ticket__created'>
							Created
						</th>
						<th scope='col' className='table__th ticket__updated'>
							Updated
						</th>
					</tr>
				</thead>
			</table>
		);
	}
};

export default TicketList;
