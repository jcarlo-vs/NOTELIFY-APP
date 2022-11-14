import styled, { css } from 'styled-components'
import { CgProfile } from 'react-icons/cg'
import { logoutUser } from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
const NavbarLogout = ({ mobile }) => {
	const { user } = useSelector((store) => store.user)
	const [showLogout, setShowLogout] = useState(false)
	const dispatch = useDispatch()
	const logoutHandler = () => {
		setShowLogout((prev) => !prev)
	}
	return (
		<Wrapper
			className='nav_buttons'
			mobile={mobile}>
			<button
				className='btn btn-hipster'
				onClick={logoutHandler}>
				<CgProfile />
				{user.user.name.slice(0, 30)}
			</button>
			<button
				className={`btn btn-hipster logout ${showLogout && 'show_logout'}`}
				onClick={() => dispatch(logoutUser())}>
				LOGOUT ?
			</button>
		</Wrapper>
	)
}
export default NavbarLogout
const Wrapper = styled.div`
	position: relative;
	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.logout {
		position: absolute;
		right: 0;
		bottom: -100%;
		display: none;
	}

	.btn.logout {
		font-size: 0.7rem;
		font-weight: bold;
		min-width: 6rem;
	}
	.show_logout {
		display: block;
	}

	@media (max-width: 820px) {
		.navbar {
			padding: 5px;
		}
		.btn {
			font-size: 15px;
		}

		.btn.logout {
			font-size: 0.6rem;
			padding: 0.5rem;
			min-width: 5rem;
		}
	}
`
