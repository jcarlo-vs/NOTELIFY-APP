import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { clearValues, contentToggler, getAllNotes } from '../features/noteSlice'
import NavbarLogout from './NavbarLogout'
import Notes from './Notes'
import { BsPencilSquare } from 'react-icons/bs'
const Sidebar = () => {
	const { notes, created } = useSelector((store) => store.note)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllNotes())
	}, [created])

	const createNoteHandler = () => {
		dispatch(clearValues())
		dispatch(contentToggler())
	}
	return (
		<Wrapper>
			<div className='sidebar'>
				<header>
					<p className='title'>NOTE LIST</p>
					<div className='logout_container'>
						<NavbarLogout mobile />
					</div>
					<div
						className='create-note_container'
						onClick={createNoteHandler}>
						<BsPencilSquare className='icon' />
					</div>
				</header>
				<section className='notes_container'>
					{notes.length > 0 ? (
						notes.map((item, index) => {
							return (
								<Notes
									key={index}
									{...item}
								/>
							)
						})
					) : (
						<p className='empty'>EMPTY NOTES</p>
					)}
				</section>
			</div>
		</Wrapper>
	)
}
export default Sidebar

const Wrapper = styled.div`
	height: 100%;
	padding: 1rem;
	border-right: 1px solid #ddd;
	min-height: 100%;
	width: 100%;
	.sidebar {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	header {
		flex: 0.05;
		text-align: center;
		display: flex;
		justify-content: space-between;
	}
	header p {
		margin: 0;
	}

	.logout_container {
		display: none;
	}

	.create-note_container {
		display: flex;
		justify-content: center;
		align-items: center;
		display: none;
		cursor: pointer;
	}

	.icon {
		&:hover {
			scale: 1.1;
		}
	}

	.notes_container {
		flex: 1;

		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0.2rem;
		box-shadow: 0 0 0 1px #aaa;
		height: 100%;
		/* max-height: 35rem; */
	}

	.empty {
		text-align: center;
	}

	@media (max-width: 550px) {
		.logout_container {
			display: flex;
		}

		header .title {
			display: none;
		}

		.create-note_container {
			display: flex;
		}
	}
	header {
		margin-bottom: 1rem;
	}
`
