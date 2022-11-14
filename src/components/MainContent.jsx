import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { changeText, clearValues, contentToggler, createNote, updateNote } from '../features/noteSlice'

const MainContent = () => {
	const { title, content, isEdit, id } = useSelector((store) => store.note)
	const dispatch = useDispatch()

	const changeTextHandler = (e) => {
		const name = e.target.name
		const value = e.target.value
		dispatch(changeText({ name, value }))
	}

	const submitHandler = (e) => {
		if (isEdit) {
			dispatch(updateNote({ title: title, content: content, id: id }))
			dispatch(clearValues())
			dispatch(contentToggler())
			return
		}

		e.preventDefault()
		dispatch(createNote({ title: title, content: content }))
		dispatch(clearValues())
		dispatch(contentToggler())
	}

	return (
		<Wrapper>
			<form>
				<input
					type='text'
					className='form-input'
					placeholder='Title...'
					value={title}
					name='title'
					onChange={changeTextHandler}
				/>
				<textarea
					className='form-textarea'
					placeholder='Write your notes here...'
					value={content}
					name='content'
					onChange={changeTextHandler}></textarea>
				<button
					className='btn btn-block'
					type='submit'
					onClick={submitHandler}>
					{isEdit ? 'EDIT' : 'SAVE'}
				</button>
			</form>
		</Wrapper>
	)
}
export default MainContent

const Wrapper = styled.div`
	height: 100%;
	flex: 1;
	form {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		background-color: #fff;
		border-bottom-right-radius: 1rem;
		gap: 5px;
	}
	input {
		flex: 0.12;
		font-size: 2.5rem;
		&::placeholder {
			font-size: 2rem;
		}
	}

	textarea {
		flex: 1;
		padding: 1rem;
		font-size: 1rem;
	}
`
