import { useGetTicketsQuery } from './ticketsApiSlice'
import Ticket from './Ticket'
import useAuth from '../../hooks/useAuth'

const TicketList = () => {
	const { username, isManager, isAdmin } = useAuth()
	const {
		data: tickets,
		isSuccess,
		isLoading,
		isError,
		error,
	} = useGetTicketsQuery('ticketList', {
		pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	})
	let content
	if (isSuccess) {
		const { ids, entities } = tickets
		console.log(tickets)
		//apply the useAuth hook to filter the users

		let filteredIds //ticket id
		if (isManager || isAdmin) {
			filteredIds = [...ids]
			console.log(filteredIds)
		} else {
			//console.log(ids.map(ticketId => entities[ticketId].user))
			filteredIds = ids.filter(
				ticketId => entities[ticketId].username === username
			)
		}
		console.log(filteredIds)

		const tableContent =
			ids?.length &&
			filteredIds.map(ticketId => <Ticket key={ticketId} ticketId={ticketId} />)

		content = (
			<table className='table table--tickets'>
				<thead className='table__thead'>
					<tr>
						<th scope='col' className='table__th ticket__status'>
							Ticket Status
						</th>
						<th scope='col' className='table__th ticket__created'>
							Created
						</th>
						<th scope='col' className='table__th ticket__updated'>
							Updated
						</th>
						<th scope='col' className='table__th ticket__title'>
							Title
						</th>
						<th scope='col' className='table__th ticket__username'>
							Owner
						</th>
						<th scope='col' className='table__th ticket__edit'>
							Edit
						</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		)
	}
	return content
}

export default TicketList
