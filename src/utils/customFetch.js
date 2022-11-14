import axios from 'axios'

const customFetch = axios.create({
	baseURL: 'https://notelify-api.herokuapp.com/api/v1',
})

export default customFetch
