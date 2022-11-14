import styled from 'styled-components'

import logoDark from '../assets/logo/darkNotelify.png'
import logoLight from '../assets/logo/lightNotelify.png'
import { BsArrowLeftCircle } from 'react-icons/bs'
import NavbarLogout from './NavbarLogout'
import { useDispatch } from 'react-redux'
import { contentToggler } from '../features/noteSlice'
const Navbar = () => {
	const dispatch = useDispatch()

	return (
		<Wrapper>
			<nav className='navbar'>
				<div
					className='back_container'
					onClick={() => {
						dispatch(contentToggler())
					}}>
					<BsArrowLeftCircle className='icon' />
				</div>
				<div className='image_container'>
					<img
						src={logoLight}
						alt=''
						className='img'
					/>
				</div>
				<div className='logout_container'>
					<NavbarLogout />
				</div>
			</nav>
		</Wrapper>
	)
}
export default Navbar

const Wrapper = styled.div`
	padding: 0.2rem;
	height: 100%;
	flex: 0.1;
	.navbar {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		border-bottom: 1px solid #ddd;
	}
	.image_container {
		width: 10rem;
	}
	.back_container {
		display: flex;
		display: none;
	}
	.icon {
		font-size: 2rem;
		border-radius: 1000px;
		&:hover {
			background-color: var(--primary-500);
			color: white;
		}
	}

	@media (max-width: 820px) {
		.image_container {
			width: 7rem;
		}
	}

	@media (max-width: 550px) {
		.logout_container {
			display: none;
		}
		.back_container {
			display: flex;
			cursor: pointer;
		}
	}
`
