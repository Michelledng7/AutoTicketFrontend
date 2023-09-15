import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useLoginMutation } from './authApiSlice';
import { setCredentials } from './authSlice';

const Login = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onUsernameChanged = (e) => setUsername(e.target.value);
	const onPasswordChanged = (e) => setPassword(e.target.value);

	const [login, { isLoading }] = useLoginMutation();
	const errClass = errMsg ? 'errmsg' : 'offscreen'; //class errmsg

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { accessToken } = await login({ username, password }).unwrap();
			dispatch(setCredentials({ accessToken }));
			setUsername('');
			setPassword('');
			navigate('/dash');
		} catch (err) {
			if (!err.status) {
				setErrMsg('No Server Response');
			} else if (err.status === 400) {
				setErrMsg('Missing username or password');
			} else if (err.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg(err.data?.message);
			}
			//errRef.current.focus();
		}
	};
	// useEffect(() => {
	// 	userRef.current.focus();
	// }, []);

	// useEffect(() => {
	// 	if (isError) {
	// 		setErrMsg('Login Failed');
	// 		setUsername('');
	// 		setPassword('');
	// 		navigate('/');
	// 	}
	// }, [isError, navigate]);

	if (isLoading) return <p>Loading ...</p>;

	const validUsernameClass = !username ? 'form__input--incomplete' : '';

	const content = (
		<form onSubmit={(e) => e.preventDefault()}>
			<h1>Store Staff Login</h1>
			<p ref={errRef} className={errClass} aria-live='assertive'>
				{errMsg}
			</p>
			<div>
				<label htmlFor='username'>User Name</label>
				<input
					className={`form__input ${validUsernameClass}`}
					id='username'
					name='username'
					ref={userRef}
					type='text'
					value={username}
					autoComplete='off'
					onChange={onUsernameChanged}
					required
				/>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					name='password'
					type='password'
					value={password}
					onChange={onPasswordChanged}
					required
				/>
			</div>
			<button className='form_submit-button' onClick={handleLogin}>
				Login
			</button>
		</form>
	);
	return content;
};

export default Login;
