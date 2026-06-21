import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Messages() {
  const { darkMode } = useTheme()
  const [selectedContact, setSelectedContact] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showCallPopup, setShowCallPopup] = useState(false)
  const [callType, setCallType] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioURL, setAudioURL] = useState(null)
  const [isPlaying, setIsPlaying] = useState({})
  const [progress, setProgress] = useState({})
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showArchivedModal, setShowArchivedModal] = useState(false)
  const [profileName, setProfileName] = useState('')
  const [profileEmail, setProfileEmail] = useState('')
  const [profileBio, setProfileBio] = useState('')
  const [avatarEmoji, setAvatarEmoji] = useState('👩‍🎓')
  const [avatarColor, setAvatarColor] = useState('bg-purple-500')
  
  const messagesEndRef = useRef(null)
  const timerRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioRefs = useRef({})
  const settingsMenuRef = useRef(null)

  const user = JSON.parse(localStorage.getItem('user'))

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100'
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white'
  const cardBorder = darkMode ? 'border-gray-700' : 'border-gray-200'
  const textColor = darkMode ? 'text-white' : 'text-gray-800'
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600'
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-gray-100'
  const inputBorder = darkMode ? 'border-gray-600' : 'border-gray-200'
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
  const sidebarBg = darkMode ? 'bg-gray-800' : 'bg-white'
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200'
  const chatBg = darkMode ? 'bg-gray-900' : 'bg-[#e5ddd5]'

  const avatarOptions = ['👩‍🎓', '👨‍🎓', '👩‍💻', '👨‍💻', '👩‍🏫', '👨‍🏫', '👩‍🔬', '👨‍🔬', '👩‍⚕️', '👨‍⚕️', '👩‍🎨', '👨‍🎨', '👩‍🚀', '👨‍🚀', '🦊', '🐱', '🐶', '🐼', '🦄', '🌟']

  // Contacts par défaut
  const contacts = [
    { 
      name: 'Aminata Kone', 
      icon: '👩‍🎓', 
      status: 'En ligne', 
      color: 'bg-green-100',
      lastMessage: 'Merci beaucoup !',
      time: '12:30',
      online: true
    },
    { 
      name: 'Prof. Jonas Tanoh', 
      icon: '👨‍🏫', 
      status: 'En ligne', 
      color: 'bg-blue-100',
      lastMessage: 'Bonjour, avez-vous reçu ?',
      time: '10:15',
      online: true
    }
  ]

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target)) {
        setShowSettingsMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Sélectionner le premier contact par défaut
  useEffect(() => {
    if (contacts.length > 0) {
      setSelectedContact(contacts[0].name)
    }
  }, [])

  useEffect(() => {
    if (selectedContact) {
      const demoMessages = [
        { sender: selectedContact, text: 'Salut ! Comment ça va ?', time: '12:20', isMe: false },
        { sender: selectedContact, text: 'Tu as les notes du TD ?', time: '12:22', isMe: false },
        { sender: 'Moi', text: 'Oui, je vais te les envoyer.', time: '12:25', isMe: true },
        { sender: 'Moi', text: '📎 Notes_TD_Algo.pdf', time: '12:26', isMe: true },
        { sender: selectedContact, text: 'Merci beaucoup !', time: '12:28', isMe: false },
        { sender: selectedContact, text: 'Je te revaudrai ça 😊', time: '12:30', isMe: false }
      ]
      setMessages(demoMessages)
    }
  }, [selectedContact])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioURL) URL.revokeObjectURL(audioURL)
    }
  }, [audioURL])

  const openProfile = () => {
    setShowSettingsMenu(false)
    setShowProfileModal(true)
    if (user) {
      setProfileName(user.name || '')
      setProfileEmail(user.email || '')
    }
  }

  const saveProfile = () => {
    setShowProfileModal(false)
    if (user) {
      const updatedUser = { ...user, name: profileName, email: profileEmail }
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
    alert('✅ Profil mis à jour avec succès !')
  }

  const openNotifications = () => {
    setShowSettingsMenu(false)
    setShowNotificationModal(true)
  }

  const saveNotifications = () => {
    setShowNotificationModal(false)
    alert('✅ Paramètres de notifications sauvegardés !')
  }

  const openPrivacy = () => {
    setShowSettingsMenu(false)
    setShowPrivacyModal(true)
  }

  const savePrivacy = () => {
    setShowPrivacyModal(false)
    alert('✅ Paramètres de confidentialité sauvegardés !')
  }

  const openArchived = () => {
    setShowSettingsMenu(false)
    setShowArchivedModal(true)
  }

  const handleLogout = () => {
    setShowSettingsMenu(false)
    if (window.confirm('🚪 Voulez-vous vraiment vous déconnecter ?')) {
      localStorage.removeItem('user')
      window.location.href = '/'
    }
  }

  const settingsOptions = [
    { icon: '👤', label: 'Profil', action: openProfile },
    { icon: '🔔', label: 'Notifications', action: openNotifications },
    { icon: '🔒', label: 'Confidentialité', action: openPrivacy },
    { icon: '💬', label: 'Messages archivés', action: openArchived },
    { icon: '🚪', label: 'Déconnexion', action: handleLogout }
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return
    const now = new Date()
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0')
    const newMsg = { sender: 'Moi', text: newMessage, time: time, isMe: true }
    setMessages([...messages, newMsg])
    setNewMessage('')
  }

  const handleCall = (type) => {
    if (!selectedContact) { alert('Veuillez sélectionner un contact d\'abord'); return }
    setCallType(type)
    setShowCallPopup(true)
    setTimeout(() => setShowCallPopup(false), 3000)
  }

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    const now = new Date()
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0')
    
    if (type === 'photo' && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const msg = {
          sender: 'Moi',
          text: '📷 Photo: ' + file.name,
          time: time,
          isMe: true,
          isImage: true,
          imageUrl: e.target.result,
          id: Date.now()
        }
        setMessages(prev => [...prev, msg])
      }
      reader.readAsDataURL(file)
      return
    }
    
    if (type === 'video' && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file)
      const msg = {
        sender: 'Moi',
        text: '📹 Vidéo: ' + file.name,
        time: time,
        isMe: true,
        isVideo: true,
        videoUrl: url,
        id: Date.now()
      }
      setMessages(prev => [...prev, msg])
      return
    }

    const msg = {
      sender: 'Moi',
      text: '📄 Document: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)',
      time: time,
      isMe: true,
      isFile: true,
      id: Date.now()
    }
    setMessages(prev => [...prev, msg])
    setShowAttachMenu(false)
  }

  const triggerFileInput = (type) => {
    if (!selectedContact) { alert('Veuillez sélectionner un contact d\'abord'); return }
    setShowAttachMenu(false)
    const input = document.createElement('input')
    input.type = 'file'
    if (type === 'photo') input.accept = 'image/*'
    else if (type === 'video') input.accept = 'video/*'
    else if (type === 'document') input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.txt,.ppt,.pptx'
    else input.accept = '*/*'
    
    input.onchange = (e) => handleFileUpload(e, type)
    input.click()
  }

  const startRecording = async () => {
    if (!selectedContact) { alert('Veuillez sélectionner un contact d\'abord'); return }
    setShowAttachMenu(false)
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)
        
        const now = new Date()
        const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0')
        const audioMsg = {
          sender: 'Moi',
          text: '🎤 Message vocal',
          time: time,
          isMe: true,
          isAudio: true,
          audioUrl: url,
          duration: audioDuration,
          id: Date.now()
        }
        setMessages(prev => [...prev, audioMsg])
        setAudioDuration(0)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setAudioDuration(0)
      
      timerRef.current = setInterval(() => {
        setAudioDuration(prev => prev + 1)
      }, 1000)
      
    } catch (err) {
      alert('Impossible d\'accéder au microphone. Autorisez l\'accès.')
      console.error(err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const togglePlay = (msgId) => {
    if (isPlaying[msgId]) {
      audioRefs.current[msgId]?.pause()
      setIsPlaying(prev => ({ ...prev, [msgId]: false }))
      setProgress(prev => ({ ...prev, [msgId]: 0 }))
    } else {
      const audio = audioRefs.current[msgId]
      if (audio) {
        audio.play()
        setIsPlaying(prev => ({ ...prev, [msgId]: true }))
        audio.ontimeupdate = () => {
          const progress = (audio.currentTime / audio.duration) * 100
          setProgress(prev => ({ ...prev, [msgId]: progress }))
        }
        audio.onended = () => {
          setIsPlaying(prev => ({ ...prev, [msgId]: false }))
          setProgress(prev => ({ ...prev, [msgId]: 0 }))
        }
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins + ':' + secs.toString().padStart(2, '0')
  }

  const attachOptions = [
    { icon: '📷', label: 'Photo', action: () => triggerFileInput('photo') },
    { icon: '🎵', label: 'Audio', action: () => triggerFileInput('audio') },
    { icon: '📹', label: 'Vidéo', action: () => triggerFileInput('video') },
    { icon: '📄', label: 'Document', action: () => triggerFileInput('document') },
    { icon: '📍', label: 'Position', action: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const now = new Date()
          const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0')
          const msg = {
            sender: 'Moi',
            text: '📍 Position: ' + pos.coords.latitude.toFixed(6) + ', ' + pos.coords.longitude.toFixed(6),
            time: time,
            isMe: true,
            id: Date.now()
          }
          setMessages(prev => [...prev, msg])
        })
      } else {
        alert('Géolocalisation non disponible')
      }
      setShowAttachMenu(false)
    }},
    { icon: '📞', label: 'Contact', action: () => {
      const contact = prompt('Entrez le nom du contact:')
      if (contact) {
        const now = new Date()
        const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0')
        const msg = {
          sender: 'Moi',
          text: '📞 Contact: ' + contact,
          time: time,
          isMe: true,
          id: Date.now()
        }
        setMessages(prev => [...prev, msg])
        setShowAttachMenu(false)
      }
    }},
    { icon: '🎤', label: 'Message vocal', action: () => startRecording() }
  ]

  return (
    <div className={`min-h-screen ${bgColor} flex`}>
      {/* Barre latérale */}
      <div className={`w-64 ${sidebarBg} shadow-lg min-h-screen p-6 ${darkMode ? 'border-r border-gray-700' : ''}`}>
        <div className="mb-8">
          <span className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>🏫 CampusLink</span>
        </div>
        <nav className="space-y-1">
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>🏠</span> Accueil</Link>
          <Link to="/explorer" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>🔍</span> Explorer</Link>
          <Link to="/messages" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-50 text-indigo-600'} rounded-xl font-medium transition`}>
            <span>💬</span> Messages
            <span className="ml-auto bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">2</span>
          </Link>
          <Link to="/notifications" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>🔔</span> Notifications <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">0</span></Link>
          <Link to="/groups" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>👥</span> Groupes</Link>
          <Link to="/courses" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>📚</span> Cours & Ressources</Link>
          <Link to="/events" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>📅</span> Événements</Link>
          <Link to="/announcements" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>📢</span> Annonces</Link>
          <Link to="/saved" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>💾</span> Enregistrements</Link>
        </nav>
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-6 pt-6`}>
          <Link to="/profile" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>👤</span> Profil</Link>
          <Link to="/settings" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>⚙️</span> Paramètres</Link>
          <Link to="/" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'} rounded-xl transition`}><span>🚪</span> Déconnexion</Link>
        </div>
      </div>

      {/* Zone Messages */}
      <div className="flex-1 flex flex-col">
        <nav className={`${cardBg} shadow-sm px-6 py-4 flex justify-between items-center ${darkMode ? 'border-b border-gray-700' : ''}`}>
          <h2 className={`text-xl font-semibold ${textColor}`}>💬 Messages</h2>
          <div className="flex items-center gap-4">
            <span className={textSecondary}>👋 {user?.name || 'Invité'}</span>
            <div className="relative" ref={settingsMenuRef}>
              <button onClick={() => setShowSettingsMenu(!showSettingsMenu)} className={`p-2 rounded-full transition text-2xl font-bold ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:text-indigo-600'}`}>⋮</button>
              {showSettingsMenu && (
                <div className={`absolute right-0 mt-2 w-64 ${cardBg} rounded-2xl shadow-xl border ${cardBorder} overflow-hidden z-50`}>
                  {settingsOptions.map((opt, idx) => (
                    <button key={idx} onClick={opt.action} className={`flex items-center gap-3 w-full px-4 py-3 ${hoverBg} transition text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      <span className="text-xl">{opt.icon}</span>
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="flex-1 flex">
          {/* Liste des contacts */}
          <div className={`w-96 ${sidebarBg} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}>
            <div className={`p-3 ${sidebarBg} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input type="text" placeholder="Rechercher un contact..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full pl-10 pr-4 py-2 ${inputBg} border ${inputBorder} rounded-full text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${darkMode ? 'text-white placeholder-gray-400' : ''}`} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedContact(contact.name)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition ${selectedContact === contact.name ? (darkMode ? 'bg-gray-700' : 'bg-indigo-50') : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50')}`}
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center text-2xl`}>{contact.icon}</div>
                    {contact.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className={`font-semibold ${textColor} truncate`}>{contact.name}</h4>
                      <span className="text-xs text-gray-400 flex-shrink-0">{contact.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <p className={`text-sm ${textSecondary} truncate`}>{contact.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone de chat */}
          {selectedContact ? (
            <div className={`flex-1 flex flex-col ${chatBg}`}>
              {/* En-tête du chat */}
              <div className={`${cardBg} p-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">{contacts.find(c => c.name === selectedContact)?.icon || '👤'}</div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${textColor}`}>{selectedContact}</h4>
                    <p className="text-xs text-green-500">En ligne</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleCall('voice')} className={`p-2 rounded-full transition text-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>📞</button>
                  <button onClick={() => handleCall('video')} className={`p-2 rounded-full transition text-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>📹</button>
                </div>
              </div>

              {/* Messages */}
              <div className={`flex-1 p-6 overflow-y-auto ${chatBg}`}>
                <div className="space-y-1.5">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-4 py-2 rounded-lg ${msg.isMe ? 'bg-green-500 text-white rounded-br-none' : `${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} rounded-bl-none shadow-sm`}`}>
                        {msg.isImage && <img src={msg.imageUrl} alt="Photo" className="max-w-[200px] rounded-lg mb-1" />}
                        {msg.isVideo && <video src={msg.videoUrl} controls className="max-w-[200px] rounded-lg mb-1" />}
                        {msg.isAudio ? (
                          <div className="flex items-center gap-3 min-w-[150px]">
                            <button onClick={() => togglePlay(msg.id)} className="text-lg hover:scale-110 transition">{isPlaying[msg.id] ? '⏸️' : '▶️'}</button>
                            <div className="flex-1 h-1.5 bg-gray-300 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: progress[msg.id] || 0 + '%' }}></div>
                            </div>
                            <span className="text-xs">{formatTime(msg.duration || 3)}</span>
                            <audio ref={el => { if (el) audioRefs.current[msg.id] = el }} src={msg.audioUrl} />
                          </div>
                        ) : (
                          <p className="break-words text-sm">{msg.text}</p>
                        )}
                        <div className={`flex items-center justify-end gap-1 mt-1 ${msg.isMe ? 'text-green-200' : 'text-gray-400'}`}>
                          <span className="text-[10px]">{msg.time}</span>
                          {msg.isMe && <span className="text-[10px]">✓✓</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* ===== BARRE D'ÉCRITURE COMPLÈTE ===== */}
              <div className={`${cardBg} p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}>
                
                {/* Menu d'attachement */}
                {showAttachMenu && (
                  <div className={`flex flex-wrap gap-2 pb-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} mb-2`}>
                    {attachOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => { opt.action(); setShowAttachMenu(false) }}
                        className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-xl transition min-w-[60px]"
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className={`text-xs ${textSecondary} mt-1`}>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Barre d'écriture */}
                <div className="flex items-center gap-2">
                  {/* Bouton + */}
                  <button
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    className={`p-2 rounded-full transition text-lg ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                  >
                    {showAttachMenu ? '✕' : '➕'}
                  </button>

                  {/* 🎤 Message vocal */}
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-2 rounded-full transition text-lg ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                  >
                    🎤
                  </button>

                  {/* Indicateur d'enregistrement */}
                  {isRecording && (
                    <div className="flex items-center gap-2 bg-red-100 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-xs text-red-600 font-medium">{formatTime(audioDuration)}</span>
                      <button onClick={stopRecording} className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full hover:bg-red-600">Arrêter</button>
                    </div>
                  )}

                  {/* 📞 Appel vocal */}
                  <button onClick={() => handleCall('voice')} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition text-lg">📞</button>

                  {/* 📹 Appel vidéo */}
                  <button onClick={() => handleCall('video')} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition text-lg">📹</button>

                  {/* 😊 Emoji */}
                  <button className={`p-2 rounded-full transition text-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}>😊</button>

                  {/* Champ de texte */}
                  <input
                    type="text"
                    placeholder="Taper un message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className={`flex-1 px-4 py-2 ${inputBg} border ${inputBorder} rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm ${darkMode ? 'text-white placeholder-gray-400' : ''}`}
                  />

                  {/* ➤ Envoyer */}
                  <button
                    onClick={handleSendMessage}
                    className={`p-2 rounded-full transition ${newMessage.trim() && selectedContact ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    disabled={!newMessage.trim() || !selectedContact}
                  >
                    ➤
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={`flex-1 flex items-center justify-center ${chatBg}`}>
              <div className="text-center">
                <div className="text-7xl mb-4">💬</div>
                <h3 className={`text-2xl font-semibold ${textColor}`}>CampusLink</h3>
                <p className={`${textSecondary} mt-2`}>Sélectionnez une discussion</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== MODALS ===== */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${textColor}`}>👤 Mon Profil</h2>
              <button onClick={() => setShowProfileModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <div className="text-center mb-6">
              <div className={'w-24 h-24 ' + avatarColor + ' rounded-full flex items-center justify-center text-5xl mx-auto shadow-lg'}>{avatarEmoji}</div>
              <p className={`text-sm ${textSecondary} mt-2`}>Clique sur un avatar pour le changer</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {avatarOptions.map((av, idx) => (
                <button key={idx} onClick={() => setAvatarEmoji(av)} className={'w-12 h-12 rounded-full text-2xl flex items-center justify-center transition ' + (avatarEmoji === av ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50' : 'hover:bg-gray-100')}>{av}</button>
              ))}
            </div>
            <div className="space-y-4">
              <div><label className={`block text-sm font-medium ${textColor} mb-1`}>Nom</label><input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className={`w-full px-4 py-2 border ${inputBorder} rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 text-white' : ''}`} /></div>
              <div><label className={`block text-sm font-medium ${textColor} mb-1`}>Email</label><input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className={`w-full px-4 py-2 border ${inputBorder} rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 text-white' : ''}`} /></div>
              <div><label className={`block text-sm font-medium ${textColor} mb-1`}>Bio</label><textarea value={profileBio} onChange={(e) => setProfileBio(e.target.value)} className={`w-full px-4 py-2 border ${inputBorder} rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none ${darkMode ? 'bg-gray-700 text-white' : ''}`} rows="2" /></div>
            </div>
            <button onClick={saveProfile} className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        </div>
      )}

      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${textColor}`}>🔔 Notifications</h2>
              <button onClick={() => setShowNotificationModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Messages</p><p className={`text-sm ${textSecondary}`}>Nouveaux messages</p></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-600 transition"></div>
                </label>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Appels</p><p className={`text-sm ${textSecondary}`}>Notifications d'appels</p></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-600 transition"></div>
                </label>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Sons</p><p className={`text-sm ${textSecondary}`}>Son de notification</p></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-600 transition"></div>
                </label>
              </div>
            </div>
            <button onClick={saveNotifications} className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${textColor}`}>🔒 Confidentialité</h2>
              <button onClick={() => setShowPrivacyModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Dernière connexion</p><p className={`text-sm ${textSecondary}`}>Tout le monde</p></div>
                <select className={`px-3 py-1 border ${inputBorder} rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}><option>Tout le monde</option><option>Mes contacts</option><option>Personne</option></select>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Photo de profil</p><p className={`text-sm ${textSecondary}`}>Tout le monde</p></div>
                <select className={`px-3 py-1 border ${inputBorder} rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}><option>Tout le monde</option><option>Mes contacts</option><option>Personne</option></select>
              </div>
            </div>
            <button onClick={savePrivacy} className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        </div>
      )}

      {showArchivedModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${textColor}`}>💬 Messages archivés</h2>
              <button onClick={() => setShowArchivedModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📦</div>
              <p className={textSecondary}>Aucun message archivé</p>
            </div>
            <button onClick={() => setShowArchivedModal(false)} className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition">Fermer</button>
          </div>
        </div>
      )}

      {showCallPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full mx-4">
            <div className="text-7xl mb-4">{callType === 'video' ? '📹' : '📞'}</div>
            <h3 className="text-2xl font-bold text-gray-900">{callType === 'video' ? 'Appel vidéo' : 'Appel vocal'}</h3>
            <p className="text-gray-600 mt-2">{callType === 'video' ? '📹 Appel vidéo' : '📞 Appel vocal'} vers {selectedContact}</p>
            <button onClick={() => setShowCallPopup(false)} className="mt-6 px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition">Raccrocher</button>
          </div>
        </div>
      )}
    </div>
  )
}