import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/MainPage';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import TicketList from './features/Tickets/TicketList';
import UserList from './features/users/UserList';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<MainPage />} />
				<Route path='login' element={<Login />} />
				/*Protected Routes*/
				<Route path='dash' element={<DashLayout />}>
					<Route index element={<Welcome />} />
					<Route path='tickets'>
						<Route index element={<TicketList />} />
					</Route>
					<Route path='users'>
						<Route index element={<UserList />} />
					</Route>
				</Route>
				/*End of Protected Routes*/
			</Route>
		</Routes>
	);
}

export default App;
