import { useGetTicketsQuery } from './ticketsApiSlice'
import Ticket from './Ticket'
import { useGetUsersQuery } from '../users/usersApiSlice'
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

	const { users } = useGetUsersQuery('userList', {
		selectFromResult: ({ data }) => ({
			//user: data?.ids.map(id => data?.entities[id]),
			users: data?.ids.map(id => data.entities[id]),
		}),
	})

	console.log(users)
	console.log(users.map(user => user.username))

	const filteredUsers = users.filter(user => user.username === username)
	console.log(filteredUsers)
	console.log(filteredUsers[0].username)

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
			filteredIds = ids.filter(
				item => entities[item].user === filteredUsers[0]._id
			)
			//console.log(ids.map(ticketId => entities[ticketId].user))
			// filteredIds = ids.filter(
			// 	ticketId => entities[ticketId].user === username
			// const userIds = ids.map(ticketId => entities[ticketId].user)
			// console.log(userIds)
			// filteredIds = userIds.map(id => id.username)
			console.log(filteredIds)
		}
		console.log(filteredIds)

		const tableContent =
			ids?.length &&
			filteredIds?.map(ticketId => (
				<Ticket key={ticketId} ticketId={ticketId} />
			))

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
