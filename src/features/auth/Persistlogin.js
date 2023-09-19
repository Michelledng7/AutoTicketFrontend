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

//  useEffect(() => {

//         if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

//             const verifyRefreshToken = async () => {
//                 console.log('verifying refresh token')
//                 try {
//                     //const response =
//                     await refresh()
//                     //const { accessToken } = response.data
//                     setTrueSuccess(true)
//                 }
//                 catch (err) {
//                     console.error(err)
//                 }
//             }

//             if (!token && persist) verifyRefreshToken()
//         }

//         return () => effectRan.current = true

//         // eslint-disable-next-line
//  }, [])

//     const content = (

//     )

//   return content
// }

// export default Persistlogin
