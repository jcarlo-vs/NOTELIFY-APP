import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logoImage from '../assets/images/landing1.svg'
import Logo from '../components/Logo'

const Landing = () => {
	return (
		<Wrapper>
			<nav className='container'>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						<span>Secure and Store</span> your important matters
					</h1>
					<p>
						The best solution in storing your notes. <br />
						Own your data.
					</p>

					<Link
						to={'/register'}
						className='btn'>
						Login/Register
					</Link>
				</div>
				<div className='image_container'>
					<img
						src={logoImage}
						alt='Landing Image'
						className='img'
					/>
				</div>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;

	nav {
		flex: 0.1;
	}
	.page {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding-bottom: 5rem;
	}
	.info {
		flex: 1;
		width: 100%;
	}

	.image_container {
		flex: 1;
		width: 100%;
	}

	@media (max-width: 1000px) {
		.image_container {
			display: none;
		}
	}

	@media (max-width: 600px) {
		.info h1 {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 400px) {
		.info h1 {
			font-size: 1.8rem;
		}
	}
`

export default Landing
