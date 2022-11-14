import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { loginUser, registerUser } from '../features/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
}

const LoginPage = () => {
	const { user, isLoading } = useSelector((store) => store.user)
	const [values, setValues] = useState(initialState)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const toggleMember = (e) => {
		e.preventDefault()
		setValues({ ...values, isMember: !values.isMember })
	}

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setValues({ ...values, [name]: value })
	}

	const submitHandler = (e) => {
		e.preventDefault()
		const { name, email, password, isMember } = values
		if (!email || !password || (!isMember && !name)) {
			toast.warning('Please Complete all Fields')
			return
		}

		if (isMember) {
			dispatch(loginUser({ email, password }))

			return
		}

		if (name.length <= 3) {
			toast.error('Name minimum of 3 characters')
			return
		}

		if (password.length < 6) {
			toast.error('Password minimum of 6 characters')
			return
		}

		dispatch(registerUser({ name, email, password }))
		setValues({ ...initialState, isMember: !values.isMember })
		console.log('wew')
	}

	useEffect(() => {
		if (user) {
			console.log('USER CREATED')
			setTimeout(() => {
				navigate('/')
			}, 3000)
		}
	}, [user])
	return (
		<Wrapper>
			<div className='container'>
				<form
					className='form'
					onSubmit={submitHandler}>
					<h2>{values.isMember ? 'LOGIN' : 'REGISTER'}</h2>
					{!values.isMember && (
						<div className='form-row'>
							<label
								htmlFor='name'
								className='form-label'>
								name
							</label>
							<input
								type='text'
								className='form-input'
								id='name'
								name='name'
								value={values.name}
								onChange={handleChange}
							/>
						</div>
					)}

					<div className='form-row'>
						<label
							htmlFor='email'
							className='form-label'>
							email
						</label>
						<input
							type='email'
							className='form-input'
							id='email'
							name='email'
							value={values.email}
							onChange={handleChange}
						/>
					</div>

					<div className='form-row'>
						<label
							htmlFor='password'
							className='form-label'>
							Password
						</label>
						<input
							type='password'
							className='form-input'
							id='password'
							name='password'
							value={values.password}
							onChange={handleChange}
						/>
					</div>

					<p>
						{values.isMember ? 'Not a member yet?' : 'Already a Member?'}
						<button
							className='member-btn'
							type='button'
							onClick={toggleMember}>
							{values.isMember ? 'Register' : 'Login'}
						</button>
					</p>

					<button
						className='btn btn-block'
						onClick={submitHandler}>
						SUBMIT
					</button>
				</form>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 8rem;
	.member-btn {
		border: none;
		background-color: transparent;
		display: inline;
		color: var(--primary-300);
		margin-left: 1rem;
		&:hover {
			color: var(--primary-500);
			cursor: pointer;
		}
	}
	p {
		text-align: center;
	}
	input {
		font-size: 1rem;
		padding: 0.5rem;
	}

	@media (max-width: 430px) {
		p {
			font-size: 1rem;
		}
		h2 {
			font-size: 2rem;
		}
	}
`
export default LoginPage
