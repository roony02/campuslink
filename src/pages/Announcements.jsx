import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Announcements() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [activeCategory, setActiveCategory] = useState('all')
  const [showCommentInput, setShowCommentInput] = useState(null)
  const [commentText, setCommentText] = useState({})
  const [reactions, setReactions] = useState({})
  const [pinnedAnnouncement, setPinnedAnnouncement] = useState(null)

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: '🔴 Fermeture de l\'université - Grève générale',
      category: 'officiel',
      type: 'important',
      content: 'L\'université sera fermée du 20 au 25 juin 2024 en raison d\'une grève générale. Tous les cours sont suspendus.',
      date: '19 JUIN 2024',
      author: 'Administration',
      authorRole: 'Admin',
      icon: '📢',
      color: 'border-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      reactions: { like: 24, heart: 12, fire: 5 },
      comments: [
        { id: 1, user: 'Aminata Kone', text: 'Merci pour l\'information', time: 'il y a 2h' }
      ],
      pinned: true,
      expires: '2024-06-25'
    },
    {
      id: 2,
      title: '📘 Devoir à rendre - Algorithmique Avancée',
      category: 'academique',
      type: 'normal',
      content: 'Le devoir sur les structures de données est à rendre pour le 30 juin 2024. Format : PDF à déposer sur la plateforme.',
      date: '18 JUIN 2024',
      author: 'Prof. Jonas Tanoh',
      authorRole: 'Professeur',
      icon: '📘',
      color: 'border-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      reactions: { like: 18, heart: 8, fire: 2 },
      comments: [],
      pinned: false,
      expires: null
    },
    {
      id: 3,
      title: '📚 Vente de livres - Semestre 2',
      category: 'etudiant',
      type: 'normal',
      content: 'Vente de livres de cours pour le semestre 2. Prix imbattables ! Contactez-moi pour plus d\'informations.',
      date: '17 JUIN 2024',
      author: 'Marie Diallo',
      authorRole: 'Étudiant',
      icon: '📚',
      color: 'border-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      reactions: { like: 10, heart: 5, fire: 1 },
      comments: [],
      pinned: false,
      expires: null
    },
    {
      id: 4,
      title: '💼 Offre de stage - Société Générale',
      category: 'opportunite',
      type: 'normal',
      content: 'Stage de 6 mois en développement web. Niveau : L3 ou M1. Envoyer CV à stage@sg.ci avant le 30 juin.',
      date: '16 JUIN 2024',
      author: 'Service Carrière',
      authorRole: 'Admin',
      icon: '💼',
      color: 'border-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      reactions: { like: 45, heart: 20, fire: 8 },
      comments: [],
      pinned: false,
      expires: '2024-06-30'
    },
    {
      id: 5,
      title: '🎉 Soirée étudiante - Welcome Party',
      category: 'campus',
      type: 'normal',
      content: 'Soirée de bienvenue pour les nouveaux étudiants. Samedi 22 juin à partir de 19h au Foyer des Étudiants.',
      date: '15 JUIN 2024',
      author: 'Club Étudiant',
      authorRole: 'Organisateur',
      icon: '🎉',
      color: 'border-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      reactions: { like: 67, heart: 34, fire: 12 },
      comments: [],
      pinned: false,
      expires: null
    },
    {
      id: 6,
      title: '📝 Rattrapage de cours - Réseaux Informatiques',
      category: 'academique',
      type: 'normal',
      content: 'Le cours de rattrapage aura lieu le 25 juin à 14h en salle C101. Merci de confirmer votre présence.',
      date: '14 JUIN 2024',
      author: 'Prof. M. Diallo',
      authorRole: 'Professeur',
      icon: '📝',
      color: 'border-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      reactions: { like: 15, heart: 6, fire: 1 },
      comments: [],
      pinned: false,
      expires: null
    }
  ])

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

  const handleReaction = (announcementId, reaction) => {
    setAnnouncements(announcements.map(a => {
      if (a.id === announcementId) {
        return {
          ...a,
          reactions: {
            ...a.reactions,
            [reaction]: (a.reactions[reaction] || 0) + 1
          }
        }
      }
      return a
    }))
  }

  const handleAddComment = (announcementId) => {
    const text = commentText[announcementId]?.trim()
    if (!text) return

    setAnnouncements(announcements.map(a => {
      if (a.id === announcementId) {
        return {
          ...a,
          comments: [...(a.comments || []), {
            id: Date.now(),
            user: user?.name || 'Utilisateur',
            text: text,
            time: 'À l\'instant'
          }]
        }
      }
      return a
    }))

    setCommentText({ ...commentText, [announcementId]: '' })
    setShowCommentInput(null)
  }

  const handlePin = (announcementId) => {
    setAnnouncements(announcements.map(a => {
      if (a.id === announcementId) {
        return { ...a, pinned: !a.pinned }
      }
      return { ...a, pinned: false }
    }))
    setPinnedAnnouncement(pinnedAnnouncement === announcementId ? null : announcementId)
  }

  const getCategoryColor = (category) => {
    const colors = {
      officiel: 'border-red-500',
      academique: 'border-blue-500',
      etudiant: 'border-green-500',
      opportunite: 'border-green-500',
      campus: 'border-purple-500'
    }
    return colors[category] || 'border-gray-500'
  }

  const getCategoryBg = (category) => {
    const colors = {
      officiel: 'bg-red-50 dark:bg-red-900/20',
      academique: 'bg-blue-50 dark:bg-blue-900/20',
      etudiant: 'bg-green-50 dark:bg-green-900/20',
      opportunite: 'bg-green-50 dark:bg-green-900/20',
      campus: 'bg-purple-50 dark:bg-purple-900/20'
    }
    return colors[category] || 'bg-gray-50 dark:bg-gray-700'
  }

  const getCategoryLabel = (category) => {
    const labels = {
      officiel: '📢 Officiel',
      academique: '🎓 Académique',
      etudiant: '🤝 Étudiant',
      opportunite: '💼 Opportunité',
      campus: '🏫 Campus'
    }
    return labels[category] || category
  }

  const filteredAnnouncements = announcements.filter(a => {
    if (activeCategory === 'all') return true
    return a.category === activeCategory
  })

  const categories = [
    { id: 'all', label: '📋 Tous', icon: '📋' },
    { id: 'officiel', label: '📢 Officiel', icon: '📢' },
    { id: 'academique', label: '🎓 Académique', icon: '🎓' },
    { id: 'etudiant', label: '🤝 Étudiant', icon: '🤝' },
    { id: 'opportunite', label: '💼 Opportunité', icon: '💼' },
    { id: 'campus', label: '🏫 Campus', icon: '🏫' }
  ]

  const reactionEmojis = [
    { key: 'like', emoji: '👍', label: 'J\'aime' },
    { key: 'heart', emoji: '❤️', label: 'J\'adore' },
    { key: 'fire', emoji: '🔥', label: 'Génial' }
  ]

  const bgCard = darkMode ? 'dark:bg-gray-800' : 'bg-white'
  const bgNav = darkMode ? 'dark:bg-gray-800/70 dark:border-gray-700' : 'bg-white/70 border-blue-100/50'
  const bgSidebar = darkMode ? 'dark:bg-gray-800/95' : 'bg-white/95'
  const textPrimary = darkMode ? 'dark:text-white' : 'text-gray-900'
  const textSecondary = darkMode ? 'dark:text-gray-300' : 'text-gray-600'

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
                {user?.profilePhoto ? <img src={user.profilePhoto} alt="Profil" className="w-full h-full object-cover" /> : (user?.name?.charAt(0) || 'U')}
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
                <Link to="/events" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>📅</span> Événements</Link>
                <Link to="/announcements" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-50 text-indigo-600'} font-medium`}><span>📢</span> Annonces</Link>
                <Link to="/saved" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>💾</span> Enregistrements</Link>
              </div>
              <div className={`border-t mt-4 pt-4 space-y-1 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <Link to="/profile" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>👤</span> Profil</Link>
                <Link to="/settings" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>⚙️</span> Paramètres</Link>
                <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"><span>🚪</span> Déconnexion</Link>
              </div>
            </div>
          </div>

          {/* Annonces */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>📢 Annonces</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Restez informé des dernières nouvelles</p>
              </div>
              {isAdmin() && (
                <button className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center gap-2">
                  <span>➕</span> Nouvelle annonce
                </button>
              )}
            </div>

            {/* Catégories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-sm transition ${
                    activeCategory === cat.id 
                      ? 'bg-indigo-600 text-white' 
                      : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Liste */}
            {filteredAnnouncements.length === 0 ? (
              <div className={`${bgCard} rounded-2xl shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-12 text-center`}>
                <div className="text-6xl mb-4">📢</div>
                <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Aucune annonce</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>Aucune annonce dans cette catégorie</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAnnouncements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className={`${bgCard} rounded-2xl shadow-md border ${announcement.pinned ? 'border-yellow-400 dark:border-yellow-600' : getCategoryColor(announcement.category)} p-5 hover:shadow-lg transition relative ${announcement.bgColor}`}
                  >
                    {/* Badge Épinglé */}
                    {announcement.pinned && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-3 py-1 rounded-full font-medium shadow-md">
                        📌 Épinglé
                      </div>
                    )}

                    {/* Badge Important */}
                    {announcement.type === 'important' && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">🔴 Important</div>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="text-4xl flex-shrink-0">{announcement.icon}</div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{announcement.title}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                            {getCategoryLabel(announcement.category)}
                          </span>
                          {announcement.authorRole === 'Admin' && (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full dark:bg-red-900/30 dark:text-red-400">👑 Admin</span>
                          )}
                        </div>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>{announcement.content}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                          <span>📅 {announcement.date}</span>
                          <span>👤 {announcement.author}</span>
                          {announcement.expires && (
                            <span className="text-yellow-500">⏰ Expire le {announcement.expires}</span>
                          )}
                        </div>

                        {/* Réactions */}
                        <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}">
                          <div className="flex gap-1">
                            {reactionEmojis.map(react => (
                              <button
                                key={react.key}
                                onClick={() => handleReaction(announcement.id, react.key)}
                                className={`px-2 py-1 rounded-lg text-sm transition flex items-center gap-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                              >
                                <span>{react.emoji}</span>
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                  {announcement.reactions?.[react.key] || 0}
                                </span>
                              </button>
                            ))}
                          </div>

                          <button 
                            onClick={() => setShowCommentInput(showCommentInput === announcement.id ? null : announcement.id)}
                            className={`px-2 py-1 rounded-lg text-sm transition flex items-center gap-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                          >
                            💬 {announcement.comments?.length || 0}
                          </button>

                          {isAdmin() && (
                            <button 
                              onClick={() => handlePin(announcement.id)}
                              className={`px-2 py-1 rounded-lg text-sm transition ${announcement.pinned ? 'text-yellow-500' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                            >
                              📌 {announcement.pinned ? 'Désépingler' : 'Épingler'}
                            </button>
                          )}

                          <button className={`px-2 py-1 rounded-lg text-sm transition ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                            🔗 Partager
                          </button>
                        </div>

                        {/* Commentaires */}
                        {showCommentInput === announcement.id && (
                          <div className="mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}">
                            {announcement.comments && announcement.comments.length > 0 && (
                              <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
                                {announcement.comments.map(comment => (
                                  <div key={comment.id} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <div className="flex items-center gap-2">
                                      <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{comment.user}</span>
                                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{comment.time}</span>
                                    </div>
                                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{comment.text}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Écrire un commentaire..."
                                value={commentText[announcement.id] || ''}
                                onChange={(e) => setCommentText({ ...commentText, [announcement.id]: e.target.value })}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddComment(announcement.id)}
                                className={`flex-1 px-4 py-2 rounded-xl border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                              />
                              <button 
                                onClick={() => handleAddComment(announcement.id)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-sm"
                              >
                                ➤
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}