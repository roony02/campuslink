import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  // ===== STORIES =====
  const [stories, setStories] = useState([])
  const [storyText, setStoryText] = useState('')
  const [storyMedia, setStoryMedia] = useState(null)
  const [storyType, setStoryType] = useState('')
  const storyInputRef = useRef(null)

  // ===== POSTS =====
  const [posts, setPosts] = useState([])

  // ===== ÉTATS =====
  const [newPostContent, setNewPostContent] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedVideo, setUploadedVideo] = useState(null)
  const [showPollModal, setShowPollModal] = useState(false)
  const [pollQuestion, setPollQuestion] = useState('')
  const [pollOptions, setPollOptions] = useState(['', ''])
  const [showEventModal, setShowEventModal] = useState(false)
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [commentInputs, setCommentInputs] = useState({})
  const [showComments, setShowComments] = useState({})
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [selectedStory, setSelectedStory] = useState(null)
  const [storyComment, setStoryComment] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  // ===== RÉFÉRENCES =====
  const fileInputRef = useRef(null)
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)

  // ===== EMOJIS =====
  const emojis = ['😊', '😂', '❤️', '🔥', '👍', '👏', '😍', '🤩', '💪', '🙏', '🎉', '✨', '🌟', '💯', '🤗', '😎', '🥳', '💜', '💙', '💚', '🧡', '💛', '🤍', '🖤', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️‍🔥', '❤️‍🩹', '💌', '💋', '👨‍❤️‍👨', '👩‍❤️‍👩', '👨‍❤️‍💋‍👨', '👩‍❤️‍💋‍👩', '💏', '💑', '👪', '💐', '🌸', '🌺', '🌻', '🌹', '🥀', '🌷', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🍄', '🌾', '💐']

  // ===== EFFETS =====
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // ===== GESTION DES LIKES ET COMMENTAIRES =====
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        }
      }
      return post
    }))
  }

  const handleAddComment = (postId) => {
    const commentText = commentInputs[postId]?.trim()
    if (!commentText) return

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            user: user?.name || 'Utilisateur',
            text: commentText,
            time: 'À l\'instant'
          }]
        }
      }
      return post
    }))

    setCommentInputs({ ...commentInputs, [postId]: '' })
  }

  const toggleComments = (postId) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] })
  }

  // ===== UPLOADS =====
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setUploadedVideo({ name: file.name, url: url })
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile({ name: file.name, size: (file.size / 1024).toFixed(1) + ' KB' })
    }
  }

  // ===== STORY =====
  const handleStoryFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setStoryMedia(file)
    setStoryType(file.type.startsWith('video') ? 'video' : 'image')
    e.target.value = ''
  }

  const publishStory = () => {
    if (!storyMedia && !storyText.trim()) {
      alert('Ajoutez une photo/vidéo ou un texte pour la story')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const newStory = {
        id: Date.now(),
        user: user?.name || 'Utilisateur',
        avatar: user?.avatar || '👤',
        color: 'bg-purple-500',
        media: storyMedia ? event.target.result : null,
        type: storyType,
        text: storyText.trim() || '',
        views: [],
        comments: [],
        createdAt: new Date().toLocaleDateString()
      }
      setStories([newStory, ...stories])
      setStoryMedia(null)
      setStoryText('')
      setStoryType('')
      alert('📸 Story publiée avec succès !')
    }
    if (storyMedia) {
      reader.readAsDataURL(storyMedia)
    } else {
      // Si pas de média, on publie juste le texte
      const newStory = {
        id: Date.now(),
        user: user?.name || 'Utilisateur',
        avatar: user?.avatar || '👤',
        color: 'bg-purple-500',
        media: null,
        type: 'text',
        text: storyText.trim() || '',
        views: [],
        comments: [],
        createdAt: new Date().toLocaleDateString()
      }
      setStories([newStory, ...stories])
      setStoryText('')
      alert('📝 Story publiée avec succès !')
    }
  }

  const openStory = (story) => {
    if (user?.name && !story.views.includes(user.name)) {
      const updatedStory = {
        ...story,
        views: [...(story.views || []), user.name]
      }
      setStories(stories.map(s => s.id === story.id ? updatedStory : s))
      setSelectedStory(updatedStory)
    } else {
      setSelectedStory(story)
    }
    setStoryComment('')
    setShowStoryModal(true)
  }

  const deleteStory = (storyId) => {
    if (window.confirm('Supprimer cette story ?')) {
      setStories(stories.filter(s => s.id !== storyId))
      setShowStoryModal(false)
    }
  }

  const handleStoryComment = () => {
    if (!storyComment.trim()) return
    const updatedStory = {
      ...selectedStory,
      comments: [...(selectedStory.comments || []), {
        id: Date.now(),
        user: user?.name || 'Utilisateur',
        text: storyComment,
        time: 'À l\'instant'
      }]
    }
    setStories(stories.map(s => s.id === selectedStory.id ? updatedStory : s))
    setSelectedStory(updatedStory)
    setStoryComment('')
  }

  const addEmojiToStory = (emoji) => {
    setStoryComment(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  // ===== PUBLICATION =====
  const handlePublish = () => {
    if (!newPostContent.trim() && !uploadedFile && !uploadedImage && !uploadedVideo) {
      alert('Veuillez écrire quelque chose ou ajouter un fichier')
      return
    }

    const newPost = {
      id: Date.now(),
      author: user?.name || 'Utilisateur',
      authorIcon: '👤',
      authorColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      group: '📝 Publication',
      time: 'À l\'instant',
      content: newPostContent || 'Nouvelle publication',
      file: uploadedFile || null,
      image: uploadedImage || null,
      video: uploadedVideo || null,
      likes: 0,
      liked: false,
      comments: [],
      shares: 0
    }

    setPosts([newPost, ...posts])
    setNewPostContent('')
    setUploadedFile(null)
    setUploadedImage(null)
    setUploadedVideo(null)
    alert('✅ Publication publiée avec succès !')
  }

  // ===== SONDAGE =====
  const handlePollSubmit = () => {
    if (!pollQuestion.trim() || pollOptions.some(opt => !opt.trim())) {
      alert('Veuillez remplir la question et toutes les options')
      return
    }

    const pollPost = {
      id: Date.now(),
      author: user?.name || 'Utilisateur',
      authorIcon: '👤',
      authorColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      group: '📊 Sondage',
      time: 'À l\'instant',
      content: '📊 Sondage : ' + pollQuestion,
      poll: { question: pollQuestion, options: pollOptions },
      likes: 0,
      liked: false,
      comments: [],
      shares: 0
    }

    setPosts([pollPost, ...posts])
    setPollQuestion('')
    setPollOptions(['', ''])
    setShowPollModal(false)
    alert('✅ Sondage publié avec succès !')
  }

  const addPollOption = () => {
    setPollOptions([...pollOptions, ''])
  }

  const updatePollOption = (index, value) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
  }

  // ===== ÉVÉNEMENT =====
  const handleEventSubmit = () => {
    if (!eventTitle.trim() || !eventDate || !eventTime) {
      alert('Veuillez remplir tous les champs')
      return
    }

    const eventPost = {
      id: Date.now(),
      author: user?.name || 'Utilisateur',
      authorIcon: '👤',
      authorColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      group: '📅 Événement',
      time: 'À l\'instant',
      content: '📅 Événement : ' + eventTitle,
      event: { title: eventTitle, date: eventDate, time: eventTime, location: eventLocation || 'Non spécifié' },
      likes: 0,
      liked: false,
      comments: [],
      shares: 0
    }

    setPosts([eventPost, ...posts])
    setEventTitle('')
    setEventDate('')
    setEventTime('')
    setEventLocation('')
    setShowEventModal(false)
    alert('✅ Événement publié avec succès !')
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // ===== CLASSES =====
  const bgCard = darkMode ? 'dark:bg-gray-800' : 'bg-white'
  const bgCardHover = darkMode ? 'dark:border-gray-700' : 'border-blue-100/50'
  const bgInput = darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-blue-50/50 border-blue-200/50'
  const bgNav = darkMode ? 'dark:bg-gray-800/70 dark:border-gray-700' : 'bg-white/70 border-blue-100/50'
  const bgSidebar = darkMode ? 'dark:bg-gray-800/95' : 'bg-white/95'
  const textPrimary = darkMode ? 'dark:text-white' : 'text-gray-900'
  const textMuted = darkMode ? 'dark:text-gray-400' : 'text-gray-500'

  const now = new Date()
  const formattedDate = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/30'}`}>
      {/* ===== BARRE DE NAVIGATION ===== */}
      <nav className={`${bgNav} backdrop-blur-xl border-b sticky top-0 z-50 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2.5 rounded-xl text-xl ${darkMode ? 'text-white hover:bg-gray-700' : 'text-blue-600 hover:bg-blue-50'}`}>☰</button>
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>🏫 CampusLink</span>
            </div>
            <div className="hidden md:flex items-center gap-1 bg-blue-50/50 dark:bg-gray-800 rounded-2xl p-1 border border-blue-100/50 dark:border-gray-700">
              <Link to="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm">🏠 Accueil</Link>
              <Link to="/explorer" className="px-4 py-2 text-blue-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-xl text-sm">🔍 Explorer</Link>
              <Link to="/messages" className="px-4 py-2 text-blue-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-xl text-sm relative">💬 Messages<span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">3</span></Link>
              <Link to="/notifications" className="px-4 py-2 text-blue-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-xl text-sm relative">🔔 Notifications<span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">12</span></Link>
              <Link to="/groups" className="px-4 py-2 text-blue-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-xl text-sm">👥 Groupes</Link>
              <Link to="/courses" className="px-4 py-2 text-blue-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-xl text-sm">📚 Cours</Link>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}>{darkMode ? '☀️' : '🌙'}</button>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}>👋 {user?.name || 'Invité'}</span>
              <Link to="/profile" className={`w-9 h-9 rounded-full flex items-center justify-center text-base overflow-hidden ${darkMode ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>
                {user?.profilePhoto ? <img src={user.profilePhoto} alt="Profil" className="w-full h-full object-cover" /> : (user?.name?.charAt(0) || 'U')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== CONTENU PRINCIPAL ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Menu latéral */}
        <div className={`fixed lg:absolute top-16 left-0 h-[calc(100vh-64px)] ${bgSidebar} backdrop-blur-sm shadow-2xl z-40 transition-all duration-300 ease-out overflow-y-auto ${sidebarOpen ? 'w-72 translate-x-0 opacity-100' : 'w-0 -translate-x-full opacity-0 overflow-hidden'}`}>
          <div className="p-5 min-w-[280px]">
            <div className={`flex items-center gap-3 pb-4 mb-3 border-b ${darkMode ? 'border-gray-700' : 'border-blue-100'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-md overflow-hidden ${darkMode ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>
                {user?.profilePhoto ? <img src={user.profilePhoto} alt="Profil" className="w-full h-full object-cover" /> : (user?.name?.charAt(0) || 'U')}
              </div>
              <div><p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user?.name || 'Utilisateur'}</p><p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{user?.email || 'utilisateur@campuslink.edu'}</p></div>
            </div>
            <div className="space-y-1">
              <Link to="/dashboard" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>🏠</span> Accueil</Link>
              <Link to="/explorer" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>🔍</span> Explorer</Link>
              <Link to="/messages" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>💬</span> Messages<span className="ml-auto bg-blue-500 text-white text-xs w-5 h-5 rounded-full">3</span></Link>
              <Link to="/notifications" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>🔔</span> Notifications<span className="ml-auto bg-blue-500 text-white text-xs w-5 h-5 rounded-full">12</span></Link>
              <Link to="/groups" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>👥</span> Groupes</Link>
              <Link to="/courses" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>📚</span> Cours & Ressources</Link>
              <Link to="/events" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>📅</span> Événements</Link>
              <Link to="/announcements" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>📢</span> Annonces</Link>
              <Link to="/saved" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>💾</span> Enregistrements</Link>
            </div>
            <div className={`border-t mt-4 pt-4 space-y-1 ${darkMode ? 'border-gray-700' : 'border-blue-100'}`}>
              <Link to="/profile" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>👤</span> Profil</Link>
              <Link to="/settings" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}><span>⚙️</span> Paramètres</Link>
              <Link to="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"><span>🚪</span> Déconnexion</Link>
            </div>
          </div>
        </div>
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"></div>}

        {/* ===== FEED (SANS BARRE LATÉRALE DROITE) ===== */}
        <div className="flex flex-col items-center">
          <div className="flex-1 max-w-3xl mx-auto w-full">

            {/* EN-TÊTE */}
            <div className="mb-4">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Bonjour {user?.name || 'Invité'} ! 👋
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {formattedDate} · Kinshasa
              </p>
            </div>

            {/* ===== STORIES (AVEC TEXTE) ===== */}
            <div className={`${bgCard} rounded-2xl shadow-md border ${bgCardHover} p-4 mb-5`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>📸 Stories</span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>Voir toutes</span>
              </div>

              {/* Zone de création de story */}
              <div className={`p-3 mb-3 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Écrire un texte pour ta story..."
                    value={storyText}
                    onChange={(e) => setStoryText(e.target.value)}
                    className={`flex-1 px-3 py-1.5 rounded-lg border text-sm ${bgInput} ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  />
                  <button
                    onClick={() => storyInputRef.current?.click()}
                    className={`px-3 py-1.5 rounded-lg text-sm ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center gap-1`}
                  >
                    📷
                  </button>
                  <input type="file" ref={storyInputRef} accept="image/*,video/*" onChange={handleStoryFileSelect} className="hidden" />
                  <button
                    onClick={publishStory}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    Publier
                  </button>
                </div>
                {storyMedia && (
                  <p className="text-xs text-green-500 mt-1">
                    📎 {storyMedia.name} sélectionné
                    <button onClick={() => { setStoryMedia(null); setStoryType('') }} className="ml-2 text-red-500">✕</button>
                  </p>
                )}
              </div>

              {/* Liste des stories */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {stories.length === 0 ? (
                  <div className="flex items-center justify-center w-full text-sm text-gray-400 py-4">Aucune story</div>
                ) : (
                  stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer" onClick={() => openStory(story)}>
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-pink-500 ring-offset-2 hover:scale-105 transition relative">
                        {story.media ? (
                          story.type === 'video' ? (
                            <video src={story.media} className="w-full h-full object-cover" />
                          ) : (
                            <img src={story.media} alt="Story" className="w-full h-full object-cover" />
                          )
                        ) : (
                          <div className={`w-full h-full ${story.color} flex items-center justify-center text-2xl text-white`}>
                            {story.avatar}
                          </div>
                        )}
                        {story.text && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] text-center py-0.5 truncate px-1">
                            {story.text}
                          </div>
                        )}
                        {(story.views?.length > 0) && (
                          <div className="absolute top-0 right-0 bg-black/50 text-white text-[8px] px-1 py-0.5 rounded-bl-lg">
                            👁️ {story.views.length}
                          </div>
                        )}
                      </div>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate max-w-[60px]`}>{story.user}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ===== BARRE DE PUBLICATION ===== */}
            <div className={`${bgCard} rounded-2xl shadow-md border ${bgCardHover} p-4 mb-5`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                  {user?.profilePhoto ? <img src={user.profilePhoto} alt="Profil" className="w-full h-full object-cover" /> : (user?.name?.charAt(0) || 'U')}
                </div>
                <input type="text" placeholder="Quoi de neuf ?" value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} className={`flex-1 px-4 py-2.5 rounded-xl border ${bgInput} ${darkMode ? 'text-white' : 'text-gray-800'}`} />
              </div>

              {uploadedImage && (
                <div className="mt-3 relative">
                  <img src={uploadedImage} alt="Upload" className="max-h-48 rounded-xl" />
                  <button onClick={() => setUploadedImage(null)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">✕</button>
                </div>
              )}
              {uploadedVideo && (
                <div className="mt-3 relative">
                  <video src={uploadedVideo.url} controls className="max-h-48 rounded-xl" />
                  <button onClick={() => setUploadedVideo(null)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">✕</button>
                </div>
              )}
              {uploadedFile && (
                <div className={`mt-3 flex items-center gap-2 rounded-xl p-2 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <span className="text-2xl">📎</span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{uploadedFile.name}</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>({uploadedFile.size})</span>
                  <button onClick={() => setUploadedFile(null)} className="ml-auto text-red-500 hover:text-red-700">✕</button>
                </div>
              )}

              <div className={`flex flex-wrap gap-2 mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-blue-100/50'}`}>
                <button onClick={() => imageInputRef.current?.click()} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-500 hover:bg-blue-50'}`}>📸 Photo</button>
                <input type="file" ref={imageInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />

                <button onClick={() => videoInputRef.current?.click()} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-500 hover:bg-blue-50'}`}>📹 Vidéo</button>
                <input type="file" ref={videoInputRef} accept="video/*" onChange={handleVideoUpload} className="hidden" />

                <button onClick={() => fileInputRef.current?.click()} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-500 hover:bg-blue-50'}`}>📎 Fichier</button>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />

                <button onClick={() => setShowPollModal(true)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-500 hover:bg-blue-50'}`}>📊 Sondage</button>
                <button onClick={() => setShowEventModal(true)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-500 hover:bg-blue-50'}`}>📅 Événement</button>
                <button onClick={handlePublish} className="ml-auto px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">Publier</button>
              </div>
            </div>

            {/* ===== POSTS ===== */}
            {posts.length === 0 ? (
              <div className={`${bgCard} rounded-2xl shadow-md p-10 text-center`}>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Aucune publication</p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Soyez le premier à publier !</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className={`${bgCard} rounded-2xl shadow-md border ${bgCardHover} p-5 mb-4`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${post.authorColor} rounded-full flex items-center justify-center text-lg overflow-hidden`}>
                      {post.author === user?.name && user?.profilePhoto ? (
                        <img src={user.profilePhoto} alt={post.author} className="w-full h-full object-cover" />
                      ) : (
                        post.authorIcon || '👤'
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{post.author}</h3>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-blue-400'}`}>{post.group} · {post.time}</p>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.content}</p>
                  {post.image && <img src={post.image} alt="Post" className="mb-3 rounded-xl max-h-96 w-full object-cover" />}
                  {post.video && <video src={post.video.url} controls className="mb-3 rounded-xl max-h-96 w-full" />}
                  {post.file && (
                    <div className={`rounded-xl p-3 mb-3 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50/50 border-blue-100/50'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>📎 {post.file.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{post.file.size}</p>
                    </div>
                  )}
                  {post.poll && (
                    <div className={`rounded-xl p-4 mb-3 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50/50 border-blue-100/50'}`}>
                      <p className={`font-medium text-sm mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{post.poll.question}</p>
                      {post.poll.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <input type="radio" name={'poll-' + post.id} className="w-4 h-4 text-blue-600" />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {post.event && (
                    <div className={`rounded-xl p-4 mb-3 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50/50 border-blue-100/50'}`}>
                      <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{post.event.title}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>📅 {post.event.date} à {post.event.time}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>📍 {post.event.location}</p>
                    </div>
                  )}
                  <div className={`flex gap-5 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-blue-100/50'}`}>
                    <button onClick={() => handleLike(post.id)} className={`text-sm flex items-center gap-1.5 ${post.liked ? 'text-red-500' : darkMode ? 'text-gray-400 hover:text-red-400' : 'text-blue-400 hover:text-red-500'}`}>
                      {post.liked ? '❤️' : '🤍'} {post.likes}
                    </button>
                    <button onClick={() => toggleComments(post.id)} className={`text-sm flex items-center gap-1.5 ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-blue-400 hover:text-blue-600'}`}>
                      💬 {post.comments.length}
                    </button>
                  </div>
                  {showComments[post.id] && (
                    <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>👤</div>
                          <div className="flex-1">
                            <div className={`rounded-xl px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                              <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{comment.user}</p>
                              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{comment.text}</p>
                            </div>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{comment.time}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>👤</div>
                        <div className="flex-1 flex gap-2">
                          <input type="text" placeholder="Écrire un commentaire..." value={commentInputs[post.id] || ''} onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })} onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)} className={`flex-1 px-4 py-2 rounded-xl border ${bgInput} ${darkMode ? 'text-white' : 'text-gray-800'}`} />
                          <button onClick={() => handleAddComment(post.id)} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">➤</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ===== MODAL STORY (AVEC SUPPRESSION) ===== */}
      {showStoryModal && selectedStory && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-md">
            {/* Bouton fermer */}
            <button onClick={() => setShowStoryModal(false)} className="absolute top-2 right-3 text-white text-2xl z-10 hover:scale-110 transition">
              ✕
            </button>

            {/* Bouton suppression (si c'est la story de l'utilisateur) */}
            {selectedStory.user === user?.name && (
              <button
                onClick={() => deleteStory(selectedStory.id)}
                className="absolute top-2 right-10 text-red-400 text-xl z-10 hover:scale-110 transition"
                title="Supprimer"
              >
                🗑️
              </button>
            )}

            {/* Bouton options (3 points) */}
            <button className="absolute top-2 right-20 text-white text-xl z-10 hover:scale-110 transition" title="Options">
              ⋮
            </button>

            {/* Contenu de la story */}
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-3 min-h-[400px] max-h-[60vh] flex flex-col items-center justify-center text-white relative">
              {selectedStory.media ? (
                selectedStory.type === 'video' ? (
                  <video src={selectedStory.media} controls className="max-h-[350px] rounded-xl w-full" />
                ) : (
                  <img src={selectedStory.media} alt="Story" className="max-h-[350px] rounded-xl w-full object-contain" />
                )
              ) : (
                <div className="text-7xl mb-4">{selectedStory.avatar}</div>
              )}

              {/* Texte de la story */}
              {selectedStory.text && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                  <p className="text-2xl font-bold text-white drop-shadow-lg">{selectedStory.text}</p>
                </div>
              )}

              {/* Infos en bas */}
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <p className="text-lg font-bold">{selectedStory.user}</p>
                <p className="text-white/70 text-xs">{selectedStory.createdAt || 'Aujourd\'hui'}</p>
                <div className="mt-1 flex flex-wrap justify-center gap-1 text-xs">
                  {selectedStory.views && selectedStory.views.length > 0 ? (
                    selectedStory.views.map((viewer, idx) => (
                      <span key={idx} className="bg-white/20 px-2 py-0.5 rounded-full text-white/90 text-[10px]">
                        {viewer}
                      </span>
                    ))
                  ) : (
                    <span className="text-white/50 text-[10px]">Aucune vue</span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION COMMENTAIRES AVEC EMOJIS */}
            <div className={`mt-2 ${bgCard} rounded-2xl p-3 max-h-[180px] overflow-y-auto`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>💬 Commentaires</span>
                <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  {selectedStory.comments?.length || 0}
                </span>
              </div>

              {selectedStory.comments && selectedStory.comments.length > 0 ? (
                <div className="space-y-1 max-h-[100px] overflow-y-auto">
                  {selectedStory.comments.map((comment) => (
                    <div key={comment.id} className={`flex items-start gap-1.5 ${darkMode ? 'border-gray-700' : 'border-gray-100'} border-b pb-1`}>
                      <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-[10px]">👤</div>
                      <div>
                        <p className={`text-[10px] font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{comment.user}</p>
                        <p className={`text-[10px] ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Aucun commentaire</p>
              )}

              {/* Barre de commentaire avec EMOJI */}
              <div className="flex gap-1.5 mt-1.5">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`px-2 py-1 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                >
                  😊
                </button>

                <input
                  type="text"
                  placeholder="Écrire un commentaire..."
                  value={storyComment}
                  onChange={(e) => setStoryComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStoryComment()}
                  className={`flex-1 px-2 py-1 rounded-lg border text-sm ${bgInput} ${darkMode ? 'text-white' : 'text-gray-800'}`}
                />
                <button onClick={handleStoryComment} className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  ➤
                </button>
              </div>

              {/* Sélecteur d'emojis */}
              {showEmojiPicker && (
                <div className={`mt-1 p-1 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} grid grid-cols-8 gap-0.5 max-h-[80px] overflow-y-auto`}>
                  {emojis.map((emoji, idx) => (
                    <button
                      key={idx}
                      onClick={() => addEmojiToStory(emoji)}
                      className="w-7 h-7 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-base flex items-center justify-center"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL SONDAGE ===== */}
      {showPollModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${bgCard} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>📊 Créer un sondage</h2>
              <button onClick={() => setShowPollModal(false)} className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✕</button>
            </div>
            <div className="space-y-4">
              <div><label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Question</label><input type="text" value={pollQuestion} onChange={(e) => setPollQuestion(e.target.value)} placeholder="Votre question..." className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} /></div>
              <div><label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Options</label>
                {pollOptions.map((opt, idx) => (
                  <input key={idx} type="text" value={opt} onChange={(e) => updatePollOption(idx, e.target.value)} placeholder={`Option ${idx + 1}`} className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 mb-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                ))}
                <button onClick={addPollOption} className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">+ Ajouter une option</button>
              </div>
              <button onClick={handlePollSubmit} className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">📊 Publier</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL ÉVÉNEMENT ===== */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${bgCard} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>📅 Créer un événement</h2>
              <button onClick={() => setShowEventModal(false)} className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✕</button>
            </div>
            <div className="space-y-4">
              <div><label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Titre</label><input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Titre..." className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} /></div>
              <div><label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label><input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} /></div>
              <div><label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Heure</label><input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} /></div>
              <div><label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Lieu</label><input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="Lieu..." className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} /></div>
              <button onClick={handleEventSubmit} className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">📅 Publier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}