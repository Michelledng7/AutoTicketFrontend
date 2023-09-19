// //remain login even refresh application
// import { Outlet, Link } from 'react-router-dom';
// import { useEffect, useRef, useState } from React;
// import { useRefreshMutation } from './authApiSlice'
// import usePersist from '../../hooks/usePersist'
// import { useSelector } from 'react-redux';
// import { selectCurrentToken } from './authSlice'

// const Persistlogin = () => {
//     const [persist] = usePersist()
//     const token = useSelector(selectCurrentToken)
//     const effectRan = useRef(false)
//     const [success, setSuccess] = useState(false)

//     const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation()

//   return (
//     <div>Persistlogin</div>
//   )
// }

// export default Persistlogin
