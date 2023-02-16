import { useGetUsersQuery } from './usersApiSlice';
import { selectAllUsers, selectById, selectIds } from './usersApiSlice';

const UserList = () => {
	const { data, error, isLoading } = useGetUsersQuery();
	console.log(data);

	return <h1>UserList: {data.ids[0]}</h1>;
};

export default UserList;
