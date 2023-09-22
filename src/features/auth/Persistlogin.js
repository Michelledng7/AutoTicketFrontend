//remain login even refresh application
import { Outlet, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';

const Persistlogin = () => {
	const [persist] = usePersist();
	const token = useSelector(selectCurrentToken);
	const effectRan = useRef(false);
	const [success, setSuccess] = useState(false);

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation();

	useEffect(() => {
		if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
			// React 18 Strict Mode

			const verifyRefreshToken = async () => {
				console.log('verifying refresh token');
				try {
					//const response =
					await refresh();
					//const { accessToken } = response.data
					setSuccess(true);
				} catch (err) {
					console.error(err);
				}
			};

			if (!token && persist) verifyRefreshToken();
		}

		return () => (effectRan.current = true);

		// eslint-disable-next-line
	}, []);

	let content;
	if (!persist) {
		console.log('no persist');
		content = <Outlet />;
	} else if (isLoading) {
		//token : no; persist: yes
		console.log('loading');
		content = <p>Loading ...</p>;
	} else if (isError) {
		console.log('error');
		content = (
			<p className='errmsg'>
				{error?.data?.message}
				<Link to='/login'>Please login again</Link>.
			</p>
		);
	} else if (isSuccess && success) {
		//token : yes; persist: yes
		console.log('success');
		content = <Outlet />;
	} else if (token && isUninitialized) {
		//token: yes, persist: yes
		console.log('uninitialized');
		console.log(isUninitialized);
		content = <Outlet />;
	}
	return content;
};

export default Persistlogin;
