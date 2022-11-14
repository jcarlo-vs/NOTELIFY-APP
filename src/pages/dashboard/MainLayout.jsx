import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import MainContent from '../../components/MainContent'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const MainLayout = () => {
	const { isContentOpen } = useSelector((store) => store.note)

	return (
		<Wrapper>
			<div className='container main-layout'>
				<div className={`left-container ${isContentOpen && 'hide'}`}>
					<Sidebar />
				</div>
				<div className={`right-container ${isContentOpen && 'active'}`}>
					<Navbar />
					<MainContent />
				</div>
			</div>
		</Wrapper>
	)
}
export default MainLayout

const Wrapper = styled.div`
	min-height: 100vh;
	border: solid 2px red;
	display: flex;
	justify-content: center;
	align-items: center;

	.main-layout {
		display: flex;
		min-height: 80vh;
		max-height: 80vh;
		gap: 5px;
		background-color: #fff;
		border-radius: 1rem;
	}

	.left-container {
		flex: 0.3;
		max-height: 100%;
	}

	.right-container {
		flex: 1;
		max-height: 100%;
		display: flex;
		flex-direction: column;
	}

	.active {
		display: flex !important;
		flex: 1;
	}

	.hide {
		display: none;
	}

	@media (max-width: 1150px) {
		.left-container {
			flex: 0.5;
		}
	}
	@media (max-width: 820px) {
		.left-container {
			flex: 0.8;
		}
	}

	@media (max-width: 550px) {
		.left-container {
			flex: 1;
		}
		.right-container {
			display: none;
		}
	}

	@media (min-width: 550px) {
		.hide {
			display: flex;
		}
	}
`
