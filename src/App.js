import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/MainPage';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import TicketList from './features/Tickets/TicketList';
import UserList from './features/users/UserList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditTicket from './features/Tickets/EditTicket';
import Prefetch from './features/auth/Prefetch';
import NewTicket from './features/Tickets/NewTicket';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<MainPage />} />
				<Route path='login' element={<Login />} />
				/*Protected Routes*/
				<Route element={<Prefetch />}>
					<Route path='dash' element={<DashLayout />}>
						<Route index element={<Welcome />} />
						<Route path='tickets'>
							<Route index element={<TicketList />} />
							<Route path=':id' element={<EditTicket />} />
							<Route path='new' element={<NewTicket />} />
						</Route>
						<Route path='users'>
							<Route index element={<UserList />} />
							<Route path=':id' element={<EditUser />} />
							<Route path='new' element={<NewUserForm />} />
						</Route>
					</Route>
				</Route>
				/*End of Protected Routes*/
			</Route>
		</Routes>
	);
}

export default App;
