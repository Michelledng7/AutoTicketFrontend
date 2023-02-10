import { Link } from 'react-router-dom';

const MainPage = () => {
	const content = (
		<section>
			<header>
				<h1>
					Welcome to <span>Sportsman</span>
				</h1>
			</header>

			<main className='public_main'>
				<p>
					Reach out to your friends and family and share your favorite sports
					moments with them.
				</p>
				<address>
					online services 24/7
					<a href='Tel: +613 66666666'>(03) 6666-6666 </a>
				</address>
				<br />
			</main>
			<footer></footer>
		</section>
	);

	return content;
};

export default MainPage;
