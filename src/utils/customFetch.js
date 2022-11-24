import axios from 'axios'

const customFetch = axios.create({
	baseURL: 'https://notelify-server-v1.vercel.app/api/v1',
})

export default customFetch
