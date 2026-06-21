const API_URL = 'http://localhost:5000/api'

export const messageApi = {
  // Récupérer les conversations
  getConversations: async (user) => {
    const res = await fetch(`${API_URL}/conversations/${user}`)
    return res.json()
  },

  // Récupérer les messages entre deux utilisateurs
  getMessages: async (user1, user2) => {
    const res = await fetch(`${API_URL}/messages/${user1}/${user2}`)
    return res.json()
  },

  // Envoyer un message
  sendMessage: async (sender, receiver, text) => {
    const res = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender, receiver, text })
    })
    return res.json()
  },

  // Marquer les messages comme lus
  markAsRead: async (user1, user2) => {
    const res = await fetch(`${API_URL}/messages/read/${user1}/${user2}`, {
      method: 'PUT'
    })
    return res.json()
  }
}

