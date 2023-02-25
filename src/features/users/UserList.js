import { useGetUsersQuery } from './usersApiSlice';
import { selectAllUsers, selectById, selectIds } from './usersApiSlice';

const UserList = () => {
	const { data, error, isLoading, isSuccess, isError } = useGetUsersQuery();
	console.log(data);

	let content;
	if (isLoading) content = <h1>Loading...</h1>;
	if (isError) content = <p> Error:{error.data.message} </p>;
	if (isSuccess) {
		const { ids } = data;
		const tableContent = ids?.length
			? ids.map((userId) => {
					<User key={userId} userId={userId} />;
			  })
			: null;
		content = (
			<table>
				<thead>
					<tr>
						<th>UserName</th>
						<th>Roles</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		);
	}
	return content;
};

export default UserList;
