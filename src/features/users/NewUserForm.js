import { useState, useEffect } from 'react';
import { useAddNewUserMutation } from './usersApiSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../config/roles';
import { isContentEditable } from '@testing-library/user-event/dist/utils';

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

	//validate username
	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
	}, [username]);

	//validate password
	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));
	}, [password]);

	//check isSuccess status, need to set to empty and navigate to users page
	useEffect(() => {
		if (isSuccess) {
			setUsername('');
			setPassword('');
			setRoles([]);
			navigate('/dash/users');
		}
	}, [isSuccess, navigate]);

	const onUsernameChanged = (e) => setUsername(e.target.value);
	const onPasswordChanged = (e) => setPassword(e.target.value);

	const onRolesChanged = (e) => {
		const values = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setRoles(values);
	};

	const canSave =
		[roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
	const onSaveUserClicked = async (e) => {
		e.preventDafault();
		if (canSave) {
			await addNewUser({ username, password, roles });
		}
	};

	const options = Object.values(ROLES).map((role) => {
		return (
			<option key={role} value={role}>
				{role}
			</option>
		);
	});

	const errClass = isError ? 'errmsg' : 'offscreen';
	const validUserClass = !validUsername ? 'form__input--incomplete' : '';
	const validPwdClass = !validPassword ? 'form__iput--incomplete' : '';
	const validRolesClass = !Boolean(roles.length)
		? 'form__input--incomplete'
		: '';

	const content = (
		<>
			<p className={errClass}>{error?.data?.message}</p>
			<form className='form' onSubmit={onSaveUserClicked}>
				<div className='form__title-row'>
					<h2>New User</h2>
					<div className='form__action-buttons'>
						<button className='icon-button' title='Save' disabled={!canSave}>
							<FontAwesomeIcon icon={faSave} />
						</button>
					</div>
				</div>
				<label className='form_label' htmlFor='username'>
					Username: <span className='nowrap'> [8-20 letters]</span>
				</label>
				<input
					className={`form__input ${validUserClass}`}
					id='username'
					name='username'
					type='text'
					autoComplete='off'
					value={username}
					onChange={onUsernameChanged}
				/>
				<label className='form__label' htmlFor='password'>
					Password: <span>[8-20 chars including !@#$]</span>
				</label>
				<input
					className={`form__input ${validPwdClass}`}
					id='password'
					name='password'
					type='password'
					value={password}
					onChange={onPasswordChanged}
				/>
				<label className='form__label' htmlFor='roles'>
					Assigned Roles:
				</label>
				<select
					id='roles'
					name='roles'
					className={`form__select ${validRolesClass}`}
					multiple={true}
					size='3'
					value={roles}
					onChange={onRolesChanged}
				>
					{options}
				</select>
			</form>
		</>
	);

	return content;
};

export default NewUserForm;
