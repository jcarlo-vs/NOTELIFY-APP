import styled from 'styled-components'
import moment from 'moment/moment'
import { useDispatch } from 'react-redux'
import { contentToggler, deletNote, getSingleNote } from '../features/noteSlice'
import { CgTrashEmpty } from 'react-icons/cg'

const Notes = ({ title, content, updatedAt, _id }) => {
	const dispatch = useDispatch()

	const getSingleNoteHandler = (id) => {
		dispatch(getSingleNote(id))
	}

	const deleteHandler = (id) => {
		dispatch(deletNote(id))
	}

	const contentTogglerHandler = () => {
		dispatch(contentToggler())
	}

	return (
		<Wrapper
			onClick={() => {
				getSingleNoteHandler(_id)
				contentTogglerHandler()
			}}>
			<div className='single-note_container'>
				<header>
					<p>{title.slice(0, 20)}</p>
					<button
						className='delete-btn'
						onClick={(e) => {
							e.stopPropagation()
							deleteHandler(_id)
						}}>
						<CgTrashEmpty />
					</button>
				</header>
				<section>
					<p>{content.slice(0, 70)}</p>
				</section>
				<footer>
					<p>{moment(updatedAt).format('lll')}</p>
				</footer>
			</div>
		</Wrapper>
	)
}
export default Notes

const Wrapper = styled.div`
	&:hover {
		cursor: pointer;
	}

	.delete-btn {
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #7e0101a9;
		flex: 0.15;
		border-radius: 5px;
		padding: 0.2rem;
		border: none;
		color: white;

		&:hover {
			scale: 1.1;
			background-color: var(--red-dark);
			cursor: pointer;
		}
	}
	.single-note_container {
		border: solid 1px #55555537;
		padding: 5px;
		min-height: 8rem;
		display: flex;
		flex-direction: column;
		overflow-wrap: anywhere;
	}
	p {
		margin: 0;
		font-size: 1rem;
	}

	header {
		flex: 0.1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	section {
		flex: 1;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}
	footer {
		flex: 0.1;
	}

	header p {
		font-size: 12px;
		font-weight: 700;
		font-family: var(--headingFont);
		text-align: left;
		margin: 0;
		flex: 1;
	}

	section p {
		font-size: 10px;
	}

	footer p {
		font-size: 0.6rem;
		text-align: right;
	}
`
