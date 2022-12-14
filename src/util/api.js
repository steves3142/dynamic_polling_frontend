import Axios from 'axios'

// export const BASE_URL = 'http://104.179.114.211:3001'

export const BASE_URL = 'https://dynasoarbackend.herokuapp.com'

const Client = Axios.create({ baseURL: BASE_URL })
Client.interceptors.request.use(
	(config) => {
		// Reads the token in localStorage
		const token = localStorage.getItem('token')
		// if the token exists, we set the authorization header
		if (token) {
			config.headers['authorization'] = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

export default Client
