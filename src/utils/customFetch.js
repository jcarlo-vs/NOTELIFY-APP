import axios from 'axios'

const customFetch = axios.create({
	baseURL: 'https://notelify-api-server.onrender.com/api/v1',
})

export default customFetch
