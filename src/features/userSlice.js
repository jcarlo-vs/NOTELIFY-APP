import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../utils/localStorage'

const initialState = {
	isLoading: false,
	user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) => {
	console.log(user)
	try {
		const { data } = await customFetch.post('/auth/register', user)

		toast.success('Registration Completed')
		console.log(data)
		return data
	} catch (error) {
		console.log(error.response.data.msg)
		toast.error(error.response.data.msg)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) => {
	try {
		const { data } = await customFetch.post('/auth/login', user)
		console.log(data)
		return data
	} catch (error) {
		console.log(error.response.data.msg)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: (state) => {
			state.user = null
			removeUserFromLocalStorage()
		},
	},
	extraReducers: {
		[loginUser.pending]: (state) => {
			state.isLoading = true
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			console.log(payload.user)
			state.user = payload
			addUserToLocalStorage(payload)
			state.isLoading = false
			toast.success(`Welcome back , ${payload.user.name}`)
		},
		[loginUser.rejected]: (state, { payload }) => {
			toast.error(payload)
			state.isLoading = false
		},
	},
})

export default userSlice.reducer

export const { logoutUser } = userSlice.actions
