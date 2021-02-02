const axios = require('axios')

const genToken = require('./generateToken')

// Set up schoology axios instance
schoologyClient = axios.create({
    baseURL: "https://api.schoology.com/v1",
})

// Add an interceptor to include auth header
schoologyClient.interceptors.request.use((config) => {
    const token = genToken()
    config.headers.Authorization = token

    return config
})

module.exports = schoologyClient