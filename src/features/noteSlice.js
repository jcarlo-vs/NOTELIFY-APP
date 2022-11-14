import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

const initialState = {
	isLoading: false,
	isError: false,
	singleNote: null,
	notes: [],
	created: 1,
	title: '',
	content: '',
	id: '',
	isEdit: false,
	theme: 'light',

	isContentOpen: false,
}

export const getAllNotes = createAsyncThunk('note/getAllNotes', async (_, thunkAPI) => {
	try {
		const { data } = await customFetch.get('/notes', {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})

		return data.users
	} catch (error) {
		return thunkAPI.rejectWithValue(error.reponse.data.msg)
	}
})

export const createNote = createAsyncThunk('note/createNote', async (note, thunkAPI) => {
	try {
		const { data } = await customFetch.post('/notes', note, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})

		return data
	} catch (error) {
		console.log(error.respose.data.msg)
		return thunkAPI.rejectWithValue(error.respose.data.msg)
	}
})

export const deletNote = createAsyncThunk('note/deleteNote', async (note, thunkAPI) => {
	try {
		await customFetch.delete(`/notes/${note}`, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})
		thunkAPI.dispatch(clearValues())
	} catch (error) {
		console.log(error)
	}
})

export const getSingleNote = createAsyncThunk('note/getSingleNote', async (id, thunkAPI) => {
	try {
		const { data } = await customFetch.get(`/notes/${id}`, {
			headers: {
				authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
			},
		})
		return data.note
	} catch (error) {
		console.log(error)
	}
})

export const updateNote = createAsyncThunk('note/updateNote', async (note, thunkAPI) => {
	console.log(note)
	try {
		const { data } = await customFetch.patch(
			`/notes/${note.id}`,
			{ title: note.title, content: note.content },
			{
				headers: {
					authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
				},
			}
		)
		thunkAPI.dispatch(clearValues())
		return data.note
	} catch (error) {
		console.log(error)
	}
})

const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		changeText: (state, { payload }) => {
			const { name, value } = payload
			state[name] = value
		},
		clearValues: (state) => {
			state.title = ''
			state.content = ''
			state.isEdit = false
		},
		themeChanger: (state) => {
			if (state.theme === 'light') {
				state.theme = 'dark'
			} else {
				state.theme = 'light'
			}
		},

		contentToggler: (state) => {
			state.isContentOpen = !state.isContentOpen
		},
	},
	extraReducers: {
		[getAllNotes.pending]: (state) => {
			state.isLoading = true
		},
		[getAllNotes.fulfilled]: (state, { payload }) => {
			state.notes = payload.reverse()
			state.isLoading = false
		},
		[getAllNotes.rejected]: (state) => {
			state.isLoading = false
		},

		// CREATE NOTE
		[createNote.pending]: (state) => {
			state.isLoading = true
		},
		[createNote.fulfilled]: (state) => {
			state.created = state.created + 1
			state.isLoading = false
		},
		[createNote.rejected]: (state) => {
			state.isLoading = false
		},

		// DELETE NOTE
		[deletNote.pending]: (state) => {
			state.isLoading = true
		},
		[deletNote.fulfilled]: (state) => {
			state.created = state.created + 1
			toast.success('Deleted Successfully')
			state.isLoading = false
		},
		[deletNote.rejected]: (state) => {
			state.isLoading = false
		},

		// GET NOTE
		[getSingleNote.pending]: (state) => {
			state.isLoading = true
		},
		[getSingleNote.fulfilled]: (state, { payload }) => {
			const { _id: id, title, content } = payload
			state.title = title
			state.content = content
			state.id = id
			state.isEdit = true
			state.isLoading = false
		},
		[getSingleNote.rejected]: (state) => {
			state.isLoading = false
		},

		[updateNote.pending]: (state) => {
			state.isLoading = true
		},
		[updateNote.fulfilled]: (state, { payload }) => {
			state.created = state.created + 1
			state.isEdit = false
			state.isLoading = false
		},
		[updateNote.rejected]: (state) => {
			state.isLoading = false
		},
	},
})

export default noteSlice.reducer
export const { changeText, clearValues, themeChanger, contentToggler } = noteSlice.actions
