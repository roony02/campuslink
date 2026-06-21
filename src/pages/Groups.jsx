import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export default function Groups() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  // ===== ÉTATS =====
  const [groups, setGroups] = useState([]) // AUCUN GROUPE PRÉDÉFINI
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showGroupModal, setShowGroupModal] = useState(null)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showAddAdminModal, setShowAddAdminModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [showGroupMenu, setShowGroupMenu] = useState(null)

  // Nouveau groupe
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupDesc, setNewGroupDesc] = useState('')
  const [newGroupIcon, setNewGroupIcon] = useState('👥')
  const [newGroupPrivate, setNewGroupPrivate] = useState(false)
  const [newGroupCover, setNewGroupCover] = useState(null)
  const [newGroupCoverPreview, setNewGroupCoverPreview] = useState(null)

  // Ajout membre / admin
  const [newMemberName, setNewMemberName] = useState('')
  const [newAdminName, setNewAdminName] = useState('')

  // Filtres
  const [activeTab, setActiveTab] = useState('all')

  const coverInputRef = useRef(null)

  // ===== EFFETS =====
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // ===== VÉRIFICATION DES RÔLES =====
  const isSection = () => {
    return user?.role === 'section' || user?.role === 'teacher' || user?.name === 'Admin'
  }

  const isAdmin = (group) => {
    return group.creator === user?.name || group.admins?.includes(user?.name)
  }

  const isMember = (group) => {
    return group.members.includes(user?.name)
  }

  // ===== FONCTIONS =====
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Gérer l'upload de photo de couverture
  const handleCoverUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setNewGroupCoverPreview(event.target.result)
        setNewGroupCover(file)
      }
      reader.readAsDataURL(file)
    }
  }

  // Créer un groupe (section uniquement)
  const handleCreateGroup = () => {
    if (!isSection()) {
      alert('❌ Seuls les professeurs et la section peuvent créer des groupes.')
      return
    }
    if (!newGroupName.trim()) return

    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      description: newGroupDesc || 'Nouveau groupe',
      icon: newGroupIcon,
      coverPhoto: newGroupCoverPreview || null,
      color: 'bg-gray-100 dark:bg-gray-700',
      creator: user?.name || 'Utilisateur',
      admins: [user?.name || 'Utilisateur'],
      members: [user?.name || 'Utilisateur'],
      isPrivate: newGroupPrivate,
      messages: [{ user: user?.name || 'Utilisateur', text: '👋 Bienvenue dans le groupe !', time: 'À l\'instant' }],
      createdAt: new Date().toLocaleDateString()
    }

    setGroups([newGroup, ...groups])
    setNewGroupName('')
    setNewGroupDesc('')
    setNewGroupIcon('👥')
    setNewGroupPrivate(false)
    setNewGroupCover(null)
    setNewGroupCoverPreview(null)
    setShowCreateModal(false)
    alert('✅ Groupe créé avec succès !')
  }

  // Ajouter un membre (admin uniquement)
  const handleAddMember = () => {
    if (!isAdmin(selectedGroup)) {
      alert('❌ Vous devez être administrateur pour ajouter un membre.')
      return
    }
    if (!newMemberName.trim()) return
    if (selectedGroup.members.includes(newMemberName)) {
      alert('Ce membre est déjà dans le groupe')
      return
    }

    const updatedGroups = groups.map(g => {
      if (g.id === selectedGroup.id) {
        return { ...g, members: [...g.members, newMemberName] }
      }
      return g
    })

    setGroups(updatedGroups)
    setNewMemberName('')
    setShowAddMemberModal(false)
    setSelectedGroup(updatedGroups.find(g => g.id === selectedGroup.id))
    alert('✅ Membre ajouté !')
  }

  // Ajouter un admin (section uniquement)
  const handleAddAdmin = () => {
    if (!isSection()) {
      alert('❌ Seule la section peut ajouter des administrateurs.')
      return
    }
    if (!newAdminName.trim()) return
    if (!selectedGroup.members.includes(newAdminName)) {
      alert('Ce membre n\'est pas dans le groupe')
      return
    }
    if (selectedGroup.admins.includes(newAdminName)) {
      alert('Ce membre est déjà administrateur')
      return
    }

    const updatedGroups = groups.map(g => {
      if (g.id === selectedGroup.id) {
        return { ...g, admins: [...g.admins, newAdminName] }
      }
      return g
    })

    setGroups(updatedGroups)
    setNewAdminName('')
    setShowAddAdminModal(false)
    setSelectedGroup(updatedGroups.find(g => g.id === selectedGroup.id))
    alert('✅ Administrateur ajouté !')
  }

  // Quitter le groupe
  const leaveGroup = (groupId) => {
    if (window.confirm('Voulez-vous vraiment quitter ce groupe ?')) {
      setGroups(groups.map(g => {
        if (g.id === groupId) {
          return {
            ...g,
            members: g.members.filter(m => m !== user?.name),
            admins: g.admins.filter(a => a !== user?.name)
          }
        }
        return g
      }))
      setShowGroupMenu(null)
      setShowGroupModal(null)
    }
  }

  // Supprimer le groupe (section ou admin)
  const deleteGroup = (groupId) => {
    if (!isAdmin(groups.find(g => g.id === groupId)) && !isSection()) {
      alert('❌ Vous n\'avez pas les droits pour supprimer ce groupe.')
      return
    }
    if (window.confirm('Voulez-vous vraiment supprimer ce groupe ?')) {
      setGroups(groups.filter(g => g.id !== groupId))
      setShowGroupMenu(null)
      setShowGroupModal(null)
    }
  }

  // Ouvrir le groupe (uniquement si membre)
  const openGroup = (group) => {
    if (!isMember(group)) {
      alert('🔒 Ce groupe est privé. Rejoignez-le d\'abord.')
      return
    }
    setSelectedGroup(group)
    setShowGroupModal(group)
    setShowGroupMenu(null)
  }

  // ===== MENU ADMIN (3 POINTS) =====
  const groupMenuOptions = (group) => {
    const admin = isAdmin(group)
    const section = isSection()

    if (!admin && !section) return null

    return (
      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
        <div className="py-1">
          {admin && (
            <button
              onClick={() => {
                setSelectedGroup(group)
                setShowAddMemberModal(true)
                setShowGroupMenu(null)
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left text-gray-700 dark:text-gray-300"
            >
              <span>👤</span> Ajouter un membre
            </button>
          )}
          {section && (
            <button
              onClick={() => {
                setSelectedGroup(group)
                setShowAddAdminModal(true)
                setShowGroupMenu(null)
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left text-gray-700 dark:text-gray-300"
            >
              <span>👑</span> Ajouter un admin
            </button>
          )}
          <button
            onClick={() => {
              alert(`👥 Membres : ${group.members.join(', ')}`)
              setShowGroupMenu(null)
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left text-gray-700 dark:text-gray-300"
          >
            <span>📋</span> Voir les membres
          </button>
          <button
            onClick={() => {
              alert(`📋 Infos :\nNom : ${group.name}\nDescription : ${group.description}\nCréé par : ${group.creator}\nAdmins : ${group.admins?.join(', ')}\nMembres : ${group.members.length}`)
              setShowGroupMenu(null)
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left text-gray-700 dark:text-gray-300"
          >
            <span>ℹ️</span> Infos du groupe
          </button>
          {isMember(group) && (
            <button
              onClick={() => leaveGroup(group.id)}
              className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 transition text-left text-red-600"
            >
              <span>🚪</span> Quitter le groupe
            </button>
          )}
          {isAdmin(group) && (
            <button
              onClick={() => deleteGroup(group.id)}
              className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 transition text-left text-red-600"
            >
              <span>🗑️</span> Supprimer le groupe
            </button>
          )}
        </div>
      </div>
    )
  }

  // ===== FILTRES =====
  const filteredGroups = groups.filter(g => {
    if (activeTab === 'all') return true
    if (activeTab === 'member') return g.members.includes(user?.name)
    if (activeTab === 'admin') return g.admins?.includes(user?.name) || g.creator === user?.name
    return true
  })

  // ===== CLASSES =====
  const bgCard = darkMode ? 'dark:bg-gray-800' : 'bg-white'
  const bgCardHover = darkMode ? 'dark:border-gray-700' : 'border-gray-200'
  const bgNav = darkMode ? 'dark:bg-gray-800/70 dark:border-gray-700' : 'bg-white/70 border-blue-100/50'
  const bgSidebar = darkMode ? 'dark:bg-gray-800/95' : 'bg-white/95'
  const textPrimary = darkMode ? 'dark:text-white' : 'text-gray-900'
  const textMuted = darkMode ? 'dark:text-gray-400' : 'text-gray-500'

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {/* ===== BARRE DE NAVIGATION ===== */}
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

      {/* ===== CONTENU ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ===== BARRE LATÉRALE GAUCHE ===== */}
          <div className="w-64 shrink-0 hidden lg:block">
            <div className={`${bgSidebar} rounded-2xl shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 sticky top-20`}>
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
                <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>🏠</span> Accueil</Link>
                <Link to="/explorer" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>🔍</span> Explorer</Link>
                <Link to="/messages" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>💬</span> Messages</Link>
                <Link to="/notifications" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>🔔</span> Notifications</Link>
                <Link to="/groups" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-50 text-indigo-600'} font-medium`}><span>👥</span> Groupes</Link>
                <Link to="/courses" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>📚</span> Cours & Ressources</Link>
                <Link to="/events" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>📅</span> Événements</Link>
                <Link to="/announcements" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>📢</span> Annonces</Link>
                <Link to="/saved" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>💾</span> Enregistrements</Link>
              </div>
              <div className={`border-t mt-4 pt-4 space-y-1 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <Link to="/profile" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>👤</span> Profil</Link>
                <Link to="/settings" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}><span>⚙️</span> Paramètres</Link>
                <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"><span>🚪</span> Déconnexion</Link>
              </div>
            </div>
          </div>

          {/* ===== CONTENU GROUPES ===== */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>👥 Groupes</h1>
                <p className={`text-sm ${textMuted}`}>
                  {groups.length} groupes · {groups.reduce((acc, g) => acc + g.members.length, 0)} membres
                </p>
              </div>
              {isSection() && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex items-center gap-2"
                >
                  <span>➕</span> Nouveau groupe
                </button>
              )}
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-xl text-sm transition ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white'
                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                📋 Tous ({groups.length})
              </button>
              <button
                onClick={() => setActiveTab('member')}
                className={`px-3 py-1.5 rounded-xl text-sm transition ${
                  activeTab === 'member'
                    ? 'bg-green-600 text-white'
                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                ✅ Mes groupes ({groups.filter(g => g.members.includes(user?.name)).length})
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1.5 rounded-xl text-sm transition ${
                  activeTab === 'admin'
                    ? 'bg-purple-600 text-white'
                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                👑 Admin ({groups.filter(g => g.admins?.includes(user?.name) || g.creator === user?.name).length})
              </button>
            </div>

            {/* Liste des groupes */}
            {filteredGroups.length === 0 ? (
              <div className={`${bgCard} rounded-2xl shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-12 text-center`}>
                <div className="text-6xl mb-4">👥</div>
                <h3 className={`text-2xl font-semibold ${textPrimary}`}>Aucun groupe</h3>
                <p className={`${textMuted} mt-2`}>
                  {isSection() ? 'Créez votre premier groupe' : 'Aucun groupe disponible pour le moment'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGroups.map((group) => {
                  const admin = isAdmin(group)
                  const member = isMember(group)

                  return (
                    <div key={group.id} className={`${bgCard} rounded-2xl shadow-md border ${bgCardHover} p-5 hover:shadow-lg transition relative`}>
                      {/* Menu 3 points */}
                      {(admin || isSection()) && (
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => setShowGroupMenu(showGroupMenu === group.id ? null : group.id)}
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition text-lg text-gray-500"
                          >
                            ⋮
                          </button>
                          {showGroupMenu === group.id && groupMenuOptions(group)}
                        </div>
                      )}

                      {/* Photo de couverture */}
                      {group.coverPhoto && (
                        <div className="w-full h-24 rounded-xl overflow-hidden mb-3">
                          <img src={group.coverPhoto} alt="Couverture" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex items-start justify-between">
                        <div>
                          <div className={`w-14 h-14 ${group.color} rounded-2xl flex items-center justify-center text-3xl mb-3`}>
                            {group.icon}
                          </div>
                          <h3 className={`text-xl font-semibold ${textPrimary}`}>{group.name}</h3>
                          <p className={`text-sm ${textMuted}`}>👥 {group.members.length} membres</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>{group.description}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                            <span>👤 {group.creator}</span>
                            <span>·</span>
                            <span>📅 {group.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {group.isPrivate ? (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full">🔒 Privé</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full">🌐 Public</span>
                          )}
                          {admin && (
                            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">👑 Admin</span>
                          )}
                          {!member && group.isPrivate && (
                            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">🔒 Rejoindre</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => openGroup(group)}
                        className={`w-full mt-4 px-4 py-2 rounded-xl transition ${
                          member
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : group.isPrivate
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                        disabled={!member && group.isPrivate}
                      >
                        {member ? '📂 Ouvrir' : group.isPrivate ? '🔒 Privé' : '📂 Ouvrir'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== MODAL CRÉER UN GROUPE ===== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${bgCard} rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${textPrimary}`}>➕ Nouveau groupe</h2>
              <button onClick={() => setShowCreateModal(false)} className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✕</button>
            </div>

            {/* Photo de couverture */}
            <div className="mb-4">
              <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl overflow-hidden">
                {newGroupCoverPreview ? (
                  <img src={newGroupCoverPreview} alt="Couverture" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/50 text-4xl">🖼️</div>
                )}
                <button
                  onClick={() => coverInputRef.current?.click()}
                  className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/50 text-white text-xs rounded-lg hover:bg-black/70 transition backdrop-blur-sm flex items-center gap-1"
                >
                  📷 Couverture
                </button>
                <input type="file" ref={coverInputRef} accept="image/*" onChange={handleCoverUpload} className="hidden" />
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{newGroupIcon}</div>
              <p className={`text-sm ${textMuted}`}>Choisis un icône</p>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {['👥', '📚', '💻', '🎮', '🎨', '🎵', '🏀', '⚽', '🎯', '💡', '🌟', '🔥', '🌈', '🦄', '🐱', '🐶', '🦊', '🐼'].map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setNewGroupIcon(icon)}
                    className={`w-10 h-10 rounded-full text-2xl flex items-center justify-center transition ${
                      newGroupIcon === icon ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nom du groupe</label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Ex: Groupe d'étude"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                <textarea
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                  placeholder="Description du groupe..."
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  rows="3"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>🔒 Privé</label>
                <input
                  type="checkbox"
                  checked={newGroupPrivate}
                  onChange={(e) => setNewGroupPrivate(e.target.checked)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className={`text-xs ${textMuted}`}>
                  {newGroupPrivate ? 'Seuls les membres peuvent voir' : 'Visible par tous'}
                </span>
              </div>

              <button
                onClick={handleCreateGroup}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                🚀 Créer le groupe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL VOIR LE GROUPE ===== */}
      {showGroupModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${bgCard} rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                {selectedGroup.coverPhoto && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img src={selectedGroup.coverPhoto} alt="Couverture" className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h2 className={`text-2xl font-bold ${textPrimary}`}>{selectedGroup.icon} {selectedGroup.name}</h2>
                  <p className={`text-sm ${textMuted}`}>👥 {selectedGroup.members.length} membres</p>
                </div>
              </div>
              <button onClick={() => setShowGroupModal(null)} className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✕</button>
            </div>

            <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${textPrimary}`}>💬 Messages</h3>
                {(isAdmin(selectedGroup) || isSection()) && (
                  <button
                    onClick={() => {
                      setSelectedGroup(selectedGroup)
                      setShowAddMemberModal(true)
                      setShowGroupModal(null)
                    }}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-sm"
                  >
                    + Ajouter membre
                  </button>
                )}
              </div>

              {selectedGroup.messages && selectedGroup.messages.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedGroup.messages.map((msg, idx) => (
                    <div key={idx} className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${textPrimary}`}>{msg.user}</span>
                        <span className={`text-xs ${textMuted}`}>{msg.time}</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{msg.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucun message</p>
                </div>
              )}

              <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-4 pt-4`}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Écrire un message..."
                    className={`flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">Envoyer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL AJOUTER MEMBRE ===== */}
      {showAddMemberModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${bgCard} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${textPrimary}`}>👤 Ajouter un membre</h2>
              <button onClick={() => setShowAddMemberModal(false)} className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nom du membre</label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Ex: Aminata Kone"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddMember}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Annuler
                </button>
              </div>

              <div className={`mt-2 p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm font-medium ${textPrimary}`}>Membres actuels :</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedGroup.members.map((m, idx) => (
                    <span key={idx} className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL AJOUTER ADMIN (section uniquement) ===== */}
      {showAddAdminModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${bgCard} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${textPrimary}`}>👑 Ajouter un administrateur</h2>
              <button onClick={() => setShowAddAdminModal(false)} className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nom du membre à promouvoir</label>
                <input
                  type="text"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="Ex: Aminata Kone"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddAdmin}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                >
                  Promouvoir
                </button>
                <button
                  onClick={() => setShowAddAdminModal(false)}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Annuler
                </button>
              </div>

              <div className={`mt-2 p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm font-medium ${textPrimary}`}>Admins actuels :</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedGroup.admins.map((a, idx) => (
                    <span key={idx} className={`text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400`}>
                      👑 {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}