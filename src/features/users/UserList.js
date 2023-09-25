import { useGetUsersQuery } from './usersApiSlice';
import User from './User';

const UserList = () => {
	const {
		data: users,
		error,
		isLoading,
		isSuccess,
		isError,
	} = useGetUsersQuery('userList', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});
	console.log(users);

	let content;
	if (isLoading) content = <h1>Loading...</h1>;
	if (isError) content = <p> Error:{error.data.message} </p>;
	if (isSuccess) {
		const { ids, entities } = users;
		console.log(entities);
		console.log(ids);
		const tableContent =
			ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

		content = (
			<table className='table table--users'>
				<thead className='table__thead'>
					<tr>
						<th scope='col' className='table__th user__username'>
							UserName
						</th>
						<th scope='col' className='table__th user__roles'>
							Roles
						</th>
						<th scope='col' className='table__th user__edit'>
							Edit
						</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		);

		return content;
	}
};

export default UserList;
