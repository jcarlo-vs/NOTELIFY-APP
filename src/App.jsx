import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'

import SharedLayout from './pages/dashboard/MainLayout'
import Landing from './pages/Landing'
import ProtectedRoute from './pages/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GlobalStyle } from './components/globalStyles'
import { useSelector } from 'react-redux'
import MainLayout from './pages/dashboard/MainLayout'

const App = () => {
	const { theme } = useSelector((store) => store.note)
	return (
		<Wrapper>
			<GlobalStyle theme={theme} />
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<MainLayout />
						</ProtectedRoute>
					}></Route>

				<Route
					path='/landing'
					element={<Landing />}
				/>
				<Route
					path='/register'
					element={<LoginPage />}
				/>
			</Routes>
			<ToastContainer position='top-center' />
		</Wrapper>
	)
}

const Wrapper = styled.div``
export default App
