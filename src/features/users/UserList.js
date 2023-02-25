import { useGetUsersQuery } from './usersApiSlice';
import { selectAllUsers, selectById, selectIds } from './usersApiSlice';
import User from './User';

const UserList = () => {
	const { data, error, isLoading, isSuccess, isError } = useGetUsersQuery();
	console.log(data);

	let content;
	if (isLoading) content = <h1>Loading...</h1>;
	if (isError) content = <p> Error:{error.data.message} </p>;
	if (isSuccess) {
		const { ids } = data;
		console.log(ids);
		const tableContent = ids?.length
			? ids.map((userId) => {
					<User key={userId} userId={userId} />;
			  })
			: null;
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
				<tbody>tc{tableContent}</tbody>
			</table>
		);
	}
	return content;
};

export default UserList;
