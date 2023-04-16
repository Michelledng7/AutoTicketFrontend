import { useState, useEffect } from 'react';
import { useAddNewUserMutation } from './usersApiSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../config/roles';

//regex for validation
const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
	const [addNewUser, { isLoading, isSuccess, isError, error }] =
		useAddNewUserMutation();
	const navigate = useNavigate();

	const [username, setUsername] = useState();
	const [validUsername, setValidUsername] = useState();
	const [password, setPassword] = useState();
	const [validPassword, setValidPassword] = useState();
	const [roles, setRoles] = useState(['Employee']);

	//validate username, pwd
	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));
	}, [password]);

	useEffect(() => {
		if (isSuccess) {
			setUsername('');
			setPassword('');
			setRoles([]);
			navigate('/dash/users');
		}
	}, [isSuccess, navigate]);

	return <div>NewUserForm</div>;
};

export default NewUserForm;
