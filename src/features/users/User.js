import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

const User = ({ userId }) => {
	//const user = useSelector((state) => selectUserById(state, userId));
	console.log(userId)
	const { user } = useGetUsersQuery('userList', {
		selectFromResult: ({ data }) => ({
			user: data?.entities[userId],
		}),
	})
	console.log(user)
	const navigate = useNavigate()
	if (user) {
		const handleEdit = () => navigate(`/dash/users/${userId}`)
		const userRolesString = user.roles.toString().replaceAll(',', ', ')
		const cellStatus = user.active ? '' : 'table_cell--inactive'
		return (
			<tr className='table_row user'>
				<td className={`table__cell ${cellStatus}`}>{user.username}</td>
				<td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
				<td className={`table__cell ${cellStatus}`}>
					<button className='icon-button table__button' onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			</tr>
		)
	} else return null
}

const memoizedUser = memo(User)
export default User
