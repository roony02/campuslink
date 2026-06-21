const API_URL = 'http://localhost:5000/api'

export const api = {
  // Posts
  getPosts: async () => {
    const res = await fetch(`${API_URL}/posts`)
    return res.json()
  },
  createPost: async (post) => {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
    return res.json()
  },
  likePost: async (id) => {
    const res = await fetch(`${API_URL}/posts/${id}/like`, {
      method: 'PUT'
    })
    return res.json()
  },
  commentPost: async (id, comment) => {
    const res = await fetch(`${API_URL}/posts/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    })
    return res.json()
  },
  // Users
  register: async (userData) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    return res.json()
  },
  login: async (credentials) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    return res.json()
  }
}
