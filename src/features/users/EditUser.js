import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux';
// import { selectUserById } from './usersApiSlice';
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from './usersApiSlice'

const EditUser = () => {
	const { id } = useParams()
	//const user = useSelector((state) => selectUserById(state, id));
	const { user } = useGetUsersQuery('userList', {
		selectFromResult: ({ data }) => ({
			user: data?.entities[id],
		}),
	})
	const content = user ? <EditUserForm user={user} /> : 'Loading User'

	return content
}

export default EditUser
