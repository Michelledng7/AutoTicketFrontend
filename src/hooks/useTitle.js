import { useEffect } from 'react'

const useTitle = title => {
	useEffect(() => {
		const prevTitle = document.title
		document.title = title
		return () => (document.title = prevTitle) //when unmounts change title back to previous title
	}, [title])
}

export default useTitle
