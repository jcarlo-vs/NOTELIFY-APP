import { configureStore } from '@reduxjs/toolkit'
import NoteReducer from '../features/noteSlice'
import UserReducer from '../features/userSlice'
export const store = configureStore({
	reducer: {
		user: UserReducer,
		note: NoteReducer,
	},
})
