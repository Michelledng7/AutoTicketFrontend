import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
	const token = useSelector(selectCurrentToken);
	console.log(token);
	let isManager = false;
	let isAdmin = false;
	let status = 'Employee';

	if (token) {
		const decoded = jwtDecode(token);
		const { username, roles } = decoded.UserInfo;
		console.log(decoded);
		console.log(roles);

		isManager = roles.includes('Manager');
		isAdmin = roles.includes('Admin');

		if (isManager) status = 'Manager';
		if (isAdmin) status = 'Admin';

		return { username, roles, status, isManager, isAdmin };
	}
	return { username: '', roles: [], isManager, isAdmin, status };
};

export default useAuth;
