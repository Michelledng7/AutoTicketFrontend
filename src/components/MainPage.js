import { Link } from 'react-router-dom'

const MainPage = () => {
	const content = (
		<section className='public'>
			<header>
				<h1>
					Welcome to <span>Sportsman</span>
				</h1>
			</header>

			<main className='public_main'>
				<p>
					Sportsman friendly staff is ready to serve your friends and family and
					share our favorite sports moments with you.
				</p>
				<br></br>
				<address className='public_addr'>
					online services 24/7 https://sportsman.render.com
					<p>
						Tel <a href='Tel: +613 66666666'>(03) 6666-6666 </a>
					</p>
				</address>
				<br />
			</main>
			<footer className='dash-footer'>
				<Link to='/login'>Login</Link>
			</footer>
		</section>
	)

	return content
}

export default MainPage
