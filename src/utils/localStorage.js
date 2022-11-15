const addUserToLocalStorage = (user) => {
	localStorage.setItem('account', JSON.stringify(user))
}

const getUserFromLocalStorage = () => {
	const results = localStorage.getItem('account')
	const user = results ? JSON.parse(results) : null
	return user
}

const removeUserFromLocalStorage = () => {
	localStorage.removeItem('user')
}

export { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage }
