import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/MainPage';
import Login from './components/Login';
import DashLayout from './components/DashLayout';
function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<MainPage />} />
				<Route path='login' element={<Login />} />
				<Route path='dash' element={<DashLayout />} />
			</Route>
		</Routes>
	);
}

export default App;
