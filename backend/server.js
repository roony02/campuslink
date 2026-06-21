const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

console.log('🚀 Démarrage du serveur...')

// Route racine
app.get('/', (req, res) => {
  res.json({ message: '🚀 API CampusLink est en ligne !' })
})

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur MongoDB:', err))

// ===== MODÈLES =====

// Modèle User
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  university: String,
  department: String,
  avatar: { type: String, default: '👤' },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', UserSchema)

// Modèle Post
const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  author: String,
  authorIcon: String,
  authorColor: String,
  group: String,
  content: { type: String, required: true },
  file: String,
  fileSize: String,
  likes: { type: Number, default: 0 },
  liked: { type: Boolean, default: false },
  comments: [{
    user: String,
    text: String,
    time: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', PostSchema)

// Modèle Message
const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
})

const Message = mongoose.model('Message', MessageSchema)

// Modèle Conversation
const ConversationSchema = new mongoose.Schema({
  participants: [String],
  lastMessage: String,
  lastMessageTime: { type: Date, default: Date.now },
  unread: { type: Number, default: 0 }
})

const Conversation = mongoose.model('Conversation', ConversationSchema)

// ===== ROUTES =====

// Route test
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ API CampusLink fonctionne !' })
})

// CRUD Posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/posts', async (req, res) => {
  try {
    const post = new Post(req.body)
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/posts/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post non trouvé' })
    post.likes = post.liked ? post.likes - 1 : post.likes + 1
    post.liked = !post.liked
    await post.save()
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/posts/:id/comment', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post non trouvé' })
    post.comments.push(req.body)
    await post.save()
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CRUD Users
app.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).json({ message: '✅ Utilisateur créé', user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
    }
    res.json({ message: '✅ Connexion réussie', user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ===== ROUTES MESSAGES =====

// Récupérer les conversations d'un utilisateur
app.get('/api/conversations/:user', async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.params.user
    }).sort({ lastMessageTime: -1 })
    res.json(conversations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Récupérer les messages d'une conversation
app.get('/api/messages/:user1/:user2', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.user1, receiver: req.params.user2 },
        { sender: req.params.user2, receiver: req.params.user1 }
      ]
    }).sort({ timestamp: 1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Envoyer un message
app.post('/api/messages', async (req, res) => {
  try {
    const { sender, receiver, text } = req.body
    const message = new Message({ sender, receiver, text })
    await message.save()

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    })

    if (conversation) {
      conversation.lastMessage = text
      conversation.lastMessageTime = Date.now()
      conversation.unread += 1
      await conversation.save()
    } else {
      conversation = new Conversation({
        participants: [sender, receiver],
        lastMessage: text,
        lastMessageTime: Date.now(),
        unread: 1
      })
      await conversation.save()
    }

    res.status(201).json(message)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Marquer les messages comme lus
app.put('/api/messages/read/:user1/:user2', async (req, res) => {
  try {
    await Message.updateMany(
      { sender: req.params.user2, receiver: req.params.user1, read: false },
      { read: true }
    )
    await Conversation.findOneAndUpdate(
      { participants: { $all: [req.params.user1, req.params.user2] } },
      { unread: 0 }
    )
    res.json({ message: 'Messages marqués comme lus' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend sur http://localhost:${PORT}`)
})