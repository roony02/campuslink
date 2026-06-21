import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Events() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [activeTab, setActiveTab] = useState('all')
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [commentInputs, setCommentInputs] = useState({})
  const [favorites, setFavorites] = useState([])
  
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Conférence IA & Avenir',
      category: 'Conférences universitaires',
      date: '24 MAI 2024',
      time: '10h00 - 12h00',
      location: 'Amphi A - Campus principal',
      color: 'border-indigo-500',
      icon: '🤖',
      description: 'Conférence sur l\'intelligence artificielle et son avenir dans l\'éducation. Intervenants : Dr. Kone, Prof. Diallo.',
      organizer: 'Département Informatique',
      registered: 45,
      maxParticipants: 100,
      image: null,
      favorites: 12,
      comments: [
        { id: 1, user: 'Aminata Kone', text: 'Super intéressant !', time: 'il y a 2h' },
        { id: 2, user: 'Moussa Diop', text: 'Je serai présent !', time: 'il y a 1h' }
      ],
      attachments: ['programme_ia.pdf', 'affiche_ia.png'],
      popular: true,
      trending: true
    },
    {
      id: 2,
      title: 'Hackathon 2024 - Innovation Challenge',
      category: 'Hackathons',
      date: '22 JUIN 2024',
      time: '09h00 - 20h00',
      location: 'Labo informatique - Bâtiment C',
      color: 'border-orange-500',
      icon: '💻',
      description: 'Compétition de développement sur 48h. Thème : Solutions innovantes pour l\'éducation.',
      organizer: 'Web Development Club',
      registered: 56,
      maxParticipants: 60,
      image: null,
      favorites: 8,
      comments: [
        { id: 1, user: 'Marie Diallo', text: 'J\'ai hâte !', time: 'il y a 3h' }
      ],
      attachments: ['reglement_hackathon.pdf'],
      popular: true,
      trending: false
    },
    {
      id: 3,
      title: 'Forum Stage & Emploi 2024',
      category: 'Forums stage & emploi',
      date: '15 JUIN 2024',
      time: '09h00 - 17h00',
      location: 'Salle des fêtes - Campus',
      color: 'border-blue-500',
      icon: '💼',
      description: 'Rencontrez les entreprises et déposez vos CV. 50+ entreprises présentes.',
      organizer: 'Service Carrière',
      registered: 120,
      maxParticipants: 200,
      image: null,
      favorites: 15,
      comments: [],
      attachments: ['liste_entreprises.pdf'],
      popular: true,
      trending: true
    },
    {
      id: 4,
      title: 'Tournoi de Basketball Inter-Universités',
      category: 'Tournois sportifs',
      date: '30 MAI 2024',
      time: '08h00 - 18h00',
      location: 'Complexe sportif',
      color: 'border-green-500',
      icon: '🏀',
      description: 'Tournoi annuel de basketball entre universités. Inscriptions ouvertes.',
      organizer: 'Club Sportif',
      registered: 32,
      maxParticipants: 80,
      image: null,
      favorites: 6,
      comments: [],
      attachments: [],
      popular: false,
      trending: false
    }
  ])

  // Nouvel événement
  const [newEventTitle, setNewEventTitle] = useState('')
  const [newEventCategory, setNewEventCategory] = useState('Conférences universitaires')
  const [newEventDate, setNewEventDate] = useState('')
  const [newEventTime, setNewEventTime] = useState('')
  const [newEventLocation, setNewEventLocation] = useState('')
  const [newEventDesc, setNewEventDesc] = useState('')
  const [newEventIcon, setNewEventIcon] = useState('📅')
  const [newEventImage, setNewEventImage] = useState(null)
  const [newEventMax, setNewEventMax] = useState(50)

  const categories = [
    '🎤 Conférences universitaires',
    '💻 Hackathons',
    '🎓 Séminaires académiques',
    '🏆 Compétitions étudiantes',
    '📚 Sessions d\'étude en groupe',
    '🎉 Soirées campus',
    '⚽ Tournois sportifs',
    '💼 Forums stage & emploi',
    '🚀 Présentation de projets étudiants',
    '🎨 Expositions artistiques',
    '🎵 Concerts campus',
    '🧠 Ateliers (IA, programmation, design...)',
    '🤝 Rencontres clubs étudiants',
    '📢 Annonces importantes université',
    '🌍 Événements internationaux',
    '💰 Concours avec récompenses'
  ]

  const iconOptions = ['📅', '🎓', '💡', '🤖', '💻', '🎨', '🎵', '🏀', '⚽', '🎯', '🌟', '🔥', '🌈', '🦄', '💼', '🏆', '📚', '🎉', '🚀', '🧠', '🤝', '📢', '🌍', '💰']

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const isAdmin = () => {
    return user?.role === 'teacher' || user?.role === 'section' || user?.name === 'Admin'
  }

  const handleRegister = (eventId) => {
    setEvents(events.map(e => {
      if (e.id === eventId && e.registered < e.maxParticipants) {
        return { ...e, registered: e.registered + 1 }
      }
      return e
    }))
    alert('✅ Vous êtes inscrit à cet événement !')
  }

  const handleFavorite = (eventId) => {
    if (favorites.includes(eventId)) {
      setFavorites(favorites.filter(id => id !== eventId))
      setEvents(events.map(e => {
        if (e.id === eventId) {
          return { ...e, favorites: e.favorites - 1 }
        }
        return e
      }))
    } else {
      setFavorites([...favorites, eventId])
      setEvents(events.map(e => {
        if (e.id === eventId) {
          return { ...e, favorites: e.favorites + 1 }
        }
        return e
      }))
    }
  }

  const handleAddComment = (eventId) => {
    const commentText = commentInputs[eventId]?.trim()
    if (!commentText) return

    setEvents(events.map(e => {
      if (e.id === eventId) {
        return {
          ...e,
          comments: [...(e.comments || []), {
            id: Date.now(),
            user: user?.name || 'Utilisateur',
            text: commentText,
            time: 'À l\'instant'
          }]
        }
      }
      return e
    }))

    setCommentInputs({ ...commentInputs, [eventId]: '' })
  }

  const handleCreateEvent = () => {
    if (!newEventTitle.trim() || !newEventDate || !newEventTime) {
      alert('Veuillez remplir tous les champs')
      return
    }

    const newEvent = {
      id: Date.now(),
      title: newEventTitle,
      category: newEventCategory,
      date: newEventDate,
      time: newEventTime,
      location: newEventLocation || 'Non spécifié',
      color: 'border-indigo-500',
      icon: newEventIcon,
      description: newEventDesc || 'Nouvel événement',
      organizer: user?.name || 'Administrateur',
      registered: 0,
      maxParticipants: newEventMax,
      image: null,
      favorites: 0,
      comments: [],
      attachments: [],
      popular: false,
      trending: false
    }

    setEvents([newEvent, ...events])
    setNewEventTitle('')
    setNewEventCategory('Conférences universitaires')
    setNewEventDate('')
    setNewEventTime('')
    setNewEventLocation('')
    setNewEventDesc('')
    setNewEventIcon('📅')
    setNewEventImage(null)
    setNewEventMax(50)
    setShowCreateModal(false)
    alert('✅ Événement créé avec succès !')
  }

  const getFilteredEvents = () => {
    let filtered = events
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(e => new Date(e.date) >= new Date())
    } else if (activeTab === 'past') {
      filtered = filtered.filter(e => new Date(e.date) < new Date())
    } else if (activeTab === 'popular') {
      filtered = [...filtered].sort((a, b) => b.favorites - a.favorites)
    } else if (activeTab === 'trending') {
      filtered = filtered.filter(e => e.trending)
    } else if (activeTab === 'favorites') {
      filtered = filtered.filter(e => favorites.includes(e.id))
    } else if (activeTab === 'near') {
      // Simuler des événements proches
      filtered = filtered.slice(0, 3)
    }
    return filtered
  }

  const filteredEvents = getFilteredEvents()

  const bgCard = darkMode ? 'dark:bg-gray-800' : 'bg-white'
  const bgCardHover = darkMode ? 'dark:border-gray-700' : 'border-gray-200'
  const bgNav = darkMode ? 'dark:bg-gray-800/70 dark:border-gray-700' : 'bg-white/70 border-blue-100/50'
  const bgSidebar = darkMode ? 'dark:bg-gray-800/95' : 'bg-white/95'

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {/* Barre de navigation */}
      <nav className={`${bgNav} backdrop-blur-xl border-b sticky top-0 z-50 shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-indigo-600'}`}>🏫 CampusLink</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}>{darkMode ? '☀️' : '🌙'}</button>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>👋 {user?.name || 'Invité'}</span>
              <Link to="/profile" className={`w-9 h-9 rounded-full flex items-center justify-center text-base overflow-hidden ${darkMode ? 'bg-blue-600' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
                {user?.profilePhoto ? (
                  <img src={user.profilePhoto} alt="Profil" className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0) || 'U'
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Barre latérale */}
          <div className="w-64 shrink-0 hidden lg:block">
            <div className={`${bgSidebar} backdrop-blur-sm rounded-2xl shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 sticky top-20`}>
              <div className={`flex items-center gap-3 pb-4 mb-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-md overflow-hidden ${darkMode ? 'bg-blue-600' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
                  {user?.profilePhoto ? <img src={user.profilePhoto} alt="Profil" className="w-full h-full object-cover" /> : (user?.name?.charAt(0) || 'U')}
                </div>
                <div>
                  <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user?.name || 'Utilisateur'}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{user?.email || 'utilisateur@campuslink.edu'}</p>
                </div>
              </div>
              <div className="space-y-1">
                <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>🏠</span> Accueil</Link>
                <Link to="/explorer" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>🔍</span> Explorer</Link>
                <Link to="/messages" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>💬</span> Messages<span className="ml-auto bg-blue-500 text-white text-xs w-5 h-5 rounded-full">3</span></Link>
                <Link to="/notifications" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>🔔</span> Notifications<span className="ml-auto bg-blue-500 text-white text-xs w-5 h-5 rounded-full">12</span></Link>
                <Link to="/groups" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>👥</span> Groupes</Link>
                <Link to="/courses" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>📚</span> Cours & Ressources</Link>
                <Link to="/events" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-50 text-indigo-600'} font-medium`}><span>📅</span> Événements</Link>
                <Link to="/announcements" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>📢</span> Annonces</Link>
                <Link to="/saved" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>💾</span> Enregistrements</Link>
              </div>
              <div className={`border-t mt-4 pt-4 space-y-1 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <Link to="/profile" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>👤</span> Profil</Link>
                <Link to="/settings" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>⚙️</span> Paramètres</Link>
                <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"><span>🚪</span> Déconnexion</Link>
              </div>
            </div>
          </div>

          {/* Événements */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>📅 Événements</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Découvrez et inscrivez-vous aux événements</p>
              </div>
              {isAdmin() && (
                <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex items-center gap-2">
                  <span>➕</span> Créer un événement
                </button>
              )}
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button onClick={() => setActiveTab('all')} className={`px-3 py-1.5 rounded-xl text-sm transition ${activeTab === 'all' ? 'bg-indigo-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>📋 Tous</button>
              <button onClick={() => setActiveTab('upcoming')} className={`px-3 py-1.5 rounded-xl text-sm transition ${activeTab === 'upcoming' ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>⏳ À venir</button>
              <button onClick={() => setActiveTab('past')} className={`px-3 py-1.5 rounded-xl text-sm transition ${activeTab === 'past' ? 'bg-gray-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>📆 Passés</button>
              <button onClick={() => setActiveTab('popular')} className={`px-3 py-1.5 rounded-xl text-sm transition ${activeTab === 'popular' ? 'bg-yellow-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>⭐ Populaires</button>
              <button onClick={() => setActiveTab('trending')} className={`px-3 py-1.5 rounded-xl text-sm transition ${activeTab === 'trending' ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>🔥 Tendances</button>
              <button onClick={() => setActiveTab('favorites')} className={`px-3 py-1.5 rounded-xl text-sm transition ${activeTab === 'favorites' ? 'bg-pink-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>❤️ Favoris</button>
            </div>

            {/* Liste */}
            {filteredEvents.length === 0 ? (
              <div className={`${bgCard} rounded-2xl shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-12 text-center`}>
                <div className="text-6xl mb-4">📅</div>
                <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Aucun événement</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>Aucun événement disponible</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <div key={event.id} className={`${bgCard} rounded-2xl shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-5 hover:shadow-lg transition cursor-pointer relative`}>
                    
                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                      {event.trending && <span className="text-xs px-2 py-0.5 bg-purple-500 text-white rounded-full">🔥 Tendance</span>}
                      {event.popular && <span className="text-xs px-2 py-0.5 bg-yellow-500 text-white rounded-full">⭐ Populaire</span>}
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{event.icon}</div>
                        <div>
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{event.title}</h3>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{event.category}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{event.organizer}</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleFavorite(event.id) }}
                        className={`text-2xl transition ${favorites.includes(event.id) ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-300'}`}
                      >
                        {favorites.includes(event.id) ? '❤️' : '🤍'}
                      </button>
                    </div>

                    <div className={`mt-3 p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>📅 {event.date}</span>
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>⏰ {event.time}</span>
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>📍 {event.location}</span>
                      </div>
                    </div>

                    <p className={`text-sm mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>{event.description}</p>

                    <div className="mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>👥 {event.registered} inscrits</span>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>❤️ {event.favorites}</span>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>💬 {event.comments?.length || 0}</span>
                        </div>
                        {event.registered < event.maxParticipants ? (
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleRegister(event.id) }}
                            className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition"
                          >
                            ✅ S'inscrire
                          </button>
                        ) : (
                          <span className="text-xs text-red-500 font-medium">Complet</span>
                        )}
                      </div>
                    </div>

                    {/* Bouton détails */}
                    <button 
                      onClick={() => { setSelectedEvent(event); setShowEventModal(true) }}
                      className={`w-full mt-2 py-2 rounded-lg text-sm transition ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      📖 Voir détails
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== MODAL DÉTAILS ÉVÉNEMENT ===== */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${bgCard} rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="text-5xl">{selectedEvent.icon}</div>
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedEvent.title}</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedEvent.category} · {selectedEvent.organizer}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleFavorite(selectedEvent.id)}
                  className={`text-3xl transition ${favorites.includes(selectedEvent.id) ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-300'}`}
                >
                  {favorites.includes(selectedEvent.id) ? '❤️' : '🤍'}
                </button>
                <button onClick={() => setShowEventModal(false)} className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✕</button>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>📅 Date</span><br /><span className={darkMode ? 'text-white' : 'text-gray-900'}>{selectedEvent.date}</span></div>
                <div><span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>⏰ Heure</span><br /><span className={darkMode ? 'text-white' : 'text-gray-900'}>{selectedEvent.time}</span></div>
                <div><span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>📍 Lieu</span><br /><span className={darkMode ? 'text-white' : 'text-gray-900'}>{selectedEvent.location}</span></div>
                <div><span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>👥 Participants</span><br /><span className={darkMode ? 'text-white' : 'text-gray-900'}>{selectedEvent.registered} / {selectedEvent.maxParticipants}</span></div>
              </div>
            </div>

            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{selectedEvent.description}</p>

            {/* Pièces jointes */}
            {selectedEvent.attachments && selectedEvent.attachments.length > 0 && (
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-4`}>
                <p className={`font-medium text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>📎 Pièces jointes</p>
                {selectedEvent.attachments.map((file, idx) => (
                  <div key={idx} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>📄 {file}</div>
                ))}
              </div>
            )}

            {/* Commentaires */}
            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 mb-4`}>
              <p className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>💬 Commentaires</p>
              {selectedEvent.comments && selectedEvent.comments.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedEvent.comments.map((comment) => (
                    <div key={comment.id} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{comment.user}</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{comment.time}</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Aucun commentaire</p>
              )}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Écrire un commentaire..."
                  value={commentInputs[selectedEvent.id] || ''}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [selectedEvent.id]: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment(selectedEvent.id)}
                  className={`flex-1 px-4 py-2 rounded-xl border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
                <button 
                  onClick={() => handleAddComment(selectedEvent.id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-sm"
                >
                  ➤
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              {selectedEvent.registered < selectedEvent.maxParticipants ? (
                <button 
                  onClick={() => { handleRegister(selectedEvent.id); setShowEventModal(false) }}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                >
                  ✅ S'inscrire
                </button>
              ) : (
                <button className="flex-1 py-3 bg-gray-400 text-white rounded-xl cursor-not-allowed">Complet</button>
              )}
              <button 
                onClick={() => setShowEventModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Fermer
              </button>
            </div>

            <button className="w-full mt-2 py-2 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition text-sm dark:bg-yellow-900/30 dark:text-yellow-400">
              🔔 Définir un rappel
            </button>
          </div>
        </div>
      )}

      {/* ===== MODAL CRÉER ===== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${bgCard} rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>📅 Créer un événement</h2>
              <button onClick={() => setShowCreateModal(false)} className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✕</button>
            </div>

            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{newEventIcon}</div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Choisis un icône</p>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {iconOptions.slice(0, 10).map((icon, idx) => (
                  <button key={idx} onClick={() => setNewEventIcon(icon)} className={`w-10 h-10 rounded-full text-2xl flex items-center justify-center transition ${newEventIcon === icon ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{icon}</button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Titre</label>
                <input type="text" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} placeholder="Titre" className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Catégorie</label>
                <select value={newEventCategory} onChange={(e) => setNewEventCategory(e.target.value)} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                <input type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Heure</label>
                <input type="time" value={newEventTime} onChange={(e) => setNewEventTime(e.target.value)} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Lieu</label>
                <input type="text" value={newEventLocation} onChange={(e) => setNewEventLocation(e.target.value)} placeholder="Lieu" className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Capacité max</label>
                <input type="number" value={newEventMax} onChange={(e) => setNewEventMax(Number(e.target.value))} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                <textarea value={newEventDesc} onChange={(e) => setNewEventDesc(e.target.value)} placeholder="Description..." className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} rows="3" />
              </div>
              <button onClick={handleCreateEvent} className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">📅 Créer l'événement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}