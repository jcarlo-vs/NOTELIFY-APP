import { useSelector } from 'react-redux'
import styled from 'styled-components'
import darkLogo from '../assets/logo/darkLogo.png'
import lightLogo from '../assets/logo/lightLogo.png'
const Logo = ({ small }) => {
	const { theme } = useSelector((store) => store.note)
	return (
		<LogoWrapper small={small}>
			<img
				className='img'
				src={theme === 'light' ? lightLogo : darkLogo}
				alt=''
			/>
		</LogoWrapper>
	)
}
export default Logo

const LogoWrapper = styled.div`
	width: ${({ small }) => (small ? '10rem' : '20rem')};

	img {
		/* filter: drop-shadow(0 0 0.05rem white); */
	}
`
