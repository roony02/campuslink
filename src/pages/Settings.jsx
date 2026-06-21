import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Settings() {
  const { darkMode } = useTheme()
  const user = JSON.parse(localStorage.getItem('user'))
  const [activeSection, setActiveSection] = useState('profil')
  const [profileImage, setProfileImage] = useState(null)
  const [profileImagePreview, setProfileImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100'
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white'
  const cardBorder = darkMode ? 'border-gray-700' : 'border-gray-100'
  const textColor = darkMode ? 'text-white' : 'text-gray-800'
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-500'
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-gray-50'
  const inputBorder = darkMode ? 'border-gray-600' : 'border-gray-300'
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
  const sidebarBg = darkMode ? 'bg-gray-800' : 'bg-white'

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: 'Passionné(e) par la tech et l\'innovation.',
    university: 'Université de Tech',
    department: 'Informatique',
    level: 'L3 Informatique',
    academicYear: '2024-2025',
    role: user?.role || 'student',
    courses: 4,
    average: '14/20',
    projects: 3,
    credits: 12,
    schedule: [
      { day: 'Lundi', time: '14h - 16h', subject: 'Structures données', color: 'indigo' },
      { day: 'Mercredi', time: '10h - 12h', subject: 'Base de données', color: 'blue' },
      { day: 'Vendredi', time: '08h - 10h', subject: 'Réseaux', color: 'green' }
    ],
    groups: ['L3 Informatique', 'Algorithmique', 'Web Dev', 'Projet PFE']
  })

  const [showUniversityModal, setShowUniversityModal] = useState(false)
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  const [showLevelModal, setShowLevelModal] = useState(false)
  const [showYearModal, setShowYearModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showGroupsModal, setShowGroupsModal] = useState(false)
  const [tempUniversity, setTempUniversity] = useState('')
  const [tempDepartment, setTempDepartment] = useState('')
  const [tempLevel, setTempLevel] = useState('')
  const [tempYear, setTempYear] = useState('')

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImagePreview(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    setProfileImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const saveProfile = () => {
    const updatedUser = { 
      ...user, 
      name: profileData.name, 
      email: profileData.email,
      phone: profileData.phone,
      profileImage: profileImagePreview
    }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    alert('✅ Profil mis à jour avec succès !')
  }

  const openUniversityModal = () => {
    setTempUniversity(profileData.university)
    setShowUniversityModal(true)
  }

  const saveUniversity = () => {
    if (tempUniversity.trim()) {
      setProfileData({...profileData, university: tempUniversity})
      setShowUniversityModal(false)
      alert('✅ Université mise à jour !')
    }
  }

  const openDepartmentModal = () => {
    setTempDepartment(profileData.department)
    setShowDepartmentModal(true)
  }

  const saveDepartment = () => {
    if (tempDepartment.trim()) {
      setProfileData({...profileData, department: tempDepartment})
      setShowDepartmentModal(false)
      alert('✅ Département mis à jour !')
    }
  }

  const openLevelModal = () => {
    setTempLevel(profileData.level)
    setShowLevelModal(true)
  }

  const saveLevel = () => {
    if (tempLevel.trim()) {
      setProfileData({...profileData, level: tempLevel})
      setShowLevelModal(false)
      alert('✅ Niveau mis à jour !')
    }
  }

  const openYearModal = () => {
    setTempYear(profileData.academicYear)
    setShowYearModal(true)
  }

  const saveYear = () => {
    if (tempYear.trim()) {
      setProfileData({...profileData, academicYear: tempYear})
      setShowYearModal(false)
      alert('✅ Année académique mise à jour !')
    }
  }

  // ===== FONCTIONS SÉCURITÉ =====
  const handleChangePassword = () => {
    const newPassword = prompt('🔑 Entrez votre nouveau mot de passe (min 6 caractères) :')
    if (newPassword && newPassword.length >= 6) {
      alert('✅ Mot de passe mis à jour avec succès !')
    } else if (newPassword) {
      alert('❌ Le mot de passe doit contenir au moins 6 caractères')
    }
  }

  const handleTwoFactor = () => {
    const choice = confirm('📱 Activer l\'authentification à deux facteurs ?\nOK = SMS\nAnnuler = Email')
    alert(choice ? '✅ SMS activé pour la 2FA' : '✅ Email activé pour la 2FA')
  }

  const handleBiometric = () => {
    alert('👆 Déverrouillage biométrique activé avec succès !')
  }

  const handleDevices = () => {
    alert('💻 Appareils connectés :\n\n🖥️ PC Portable - Windows (Actif)\n📱 iPhone 14 - iOS (Actif)\n💻 MacBook Pro - macOS (Inactif)')
  }

  const handleHistory = () => {
    alert('🕐 Historique des connexions :\n\n📅 19/06/2024 - 14:32 - Paris, France\n📅 18/06/2024 - 22:15 - Abidjan, CI\n📅 17/06/2024 - 08:00 - Paris, France')
  }

  const handleAlerts = () => {
    const current = confirm('⚠️ Activer les alertes de connexion suspecte ?')
    alert(current ? '✅ Alertes activées' : '❌ Alertes désactivées')
  }

  const handleLogoutAll = () => {
    if (confirm('⚠️ Voulez-vous vraiment vous déconnecter de TOUS les appareils ?')) {
      alert('✅ Vous avez été déconnecté de tous les appareils')
    }
  }

  const handleVerifyEmail = () => {
    alert(`✉️ Un email de vérification a été envoyé à ${user?.email || 'votre email'}`)
  }

  const handlePinCode = () => {
    const pin = prompt('🔢 Entrez votre code PIN à 4 chiffres :')
    if (pin && pin.length === 4 && /^\d+$/.test(pin)) {
      alert('✅ Code PIN enregistré avec succès !')
    } else if (pin) {
      alert('❌ Le code PIN doit être composé de 4 chiffres')
    }
  }

  const handleBackup = () => {
    if (confirm('💾 Voulez-vous sauvegarder toutes vos données ?')) {
      alert('✅ Sauvegarde effectuée avec succès !')
    }
  }

  const handleBlockUsers = () => {
    const blocked = ['Prof. Jonas Tanoh', 'Moussa Diop']
    const action = confirm('🚫 Utilisateurs bloqués :\n' + blocked.join('\n') + '\n\nOK = Débloquer tout\nAnnuler = Bloquer un nouvel utilisateur')
    if (action) {
      alert('✅ Tous les utilisateurs ont été débloqués')
    } else {
      const userToBlock = prompt('🚫 Entrez le nom de l\'utilisateur à bloquer :')
      if (userToBlock) alert(`✅ ${userToBlock} a été bloqué`)
    }
  }

  const handleSessions = () => {
    if (confirm('🔄 Sessions actives :\nChrome - Paris (Actif)\nSafari - Abidjan (Actif)\n\nOK = Fermer toutes les sessions')) {
      alert('✅ Toutes les sessions ont été fermées')
    }
  }

  const handlePrivacyCenter = () => {
    alert('🛡️ Centre de confidentialité\n\n📊 Données personnelles\n📱 Historique\n🌐 Préférences\n\n✅ Toutes vos données sont sécurisées')
  }

  const handleDownloadData = () => {
    if (confirm('📥 Voulez-vous télécharger toutes vos données ?')) {
      alert('✅ Téléchargement en cours...\n📁 Vos données sont prêtes')
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('⚠️ Voulez-vous vraiment supprimer votre compte ?')) {
      if (confirm('🗑️ Confirmer la suppression ?')) {
        alert('✅ Compte supprimé avec succès')
        localStorage.removeItem('user')
        window.location.href = '/'
      }
    }
  }

  const renderSection = () => {
    switch(activeSection) {
      case 'profil':
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textColor}`}>👤 Mon profil</h3>
            <p className={`text-sm ${textSecondary}`}>Gérer vos informations personnelles</p>
            <div className="flex flex-col items-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
                  {profileImagePreview ? (
                    <img src={profileImagePreview} alt="Profil" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-5xl text-white">
                      {user?.name?.charAt(0) || '👤'}
                    </div>
                  )}
                </div>
                <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 shadow-lg hover:bg-indigo-700 transition">📷</button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => fileInputRef.current?.click()} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">📷 Changer</button>
                {profileImagePreview && (
                  <button onClick={removeImage} className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">🗑️ Supprimer</button>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div className="flex-1"><p className={`font-medium ${textColor}`}>Nom</p><input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className={`w-full px-3 py-1 ${inputBg} border ${inputBorder} rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'text-white' : ''}`} /></div>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div className="flex-1"><p className={`font-medium ${textColor}`}>Email</p><input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} className={`w-full px-3 py-1 ${inputBg} border ${inputBorder} rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'text-white' : ''}`} /></div>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div className="flex-1"><p className={`font-medium ${textColor}`}>Téléphone</p><input type="text" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} className={`w-full px-3 py-1 ${inputBg} border ${inputBorder} rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'text-white' : ''}`} /></div>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div className="flex-1"><p className={`font-medium ${textColor}`}>Bio</p><textarea value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} className={`w-full px-3 py-1 ${inputBg} border ${inputBorder} rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 resize-none ${darkMode ? 'text-white' : ''}`} rows="2" /></div>
              </div>
            </div>
            <button onClick={saveProfile} className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        )

      case 'confidentialite':
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textColor}`}>🔒 Confidentialité</h3>
            <p className={`text-sm ${textSecondary}`}>Contrôlez qui peut voir vos informations</p>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Dernière connexion</p><p className={`text-sm ${textSecondary}`}>Tout le monde</p></div>
                <select className={`px-3 py-1 border ${inputBorder} rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
                  <option>Tout le monde</option><option>Mes contacts</option><option>Personne</option>
                </select>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Photo de profil</p><p className={`text-sm ${textSecondary}`}>Tout le monde</p></div>
                <select className={`px-3 py-1 border ${inputBorder} rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
                  <option>Tout le monde</option><option>Mes contacts</option><option>Personne</option>
                </select>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Statut</p><p className={`text-sm ${textSecondary}`}>Mes contacts</p></div>
                <select className={`px-3 py-1 border ${inputBorder} rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
                  <option>Tout le monde</option><option>Mes contacts</option><option>Personne</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textColor}`}>🔔 Notifications</h3>
            <p className={`text-sm ${textSecondary}`}>Personnalisez vos préférences de notifications</p>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Notifications push</p><p className={`text-sm ${textSecondary}`}>Recevoir des notifications</p></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-600 transition"></div>
                </label>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Sons</p><p className={`text-sm ${textSecondary}`}>Son des notifications</p></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-600 transition"></div>
                </label>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Messages</p><p className={`text-sm ${textSecondary}`}>Nouveaux messages</p></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-600 transition"></div>
                </label>
              </div>
            </div>
          </div>
        )

      case 'apparence':
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textColor}`}>🎨 Apparence</h3>
            <p className={`text-sm ${textSecondary}`}>Personnalisez l'apparence de l'application</p>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Mode sombre</p><p className={`text-sm ${textSecondary}`}>Activer le thème sombre</p></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={() => {}} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-600 transition"></div>
                </label>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Langue</p><p className={`text-sm ${textSecondary}`}>Langue de l'application</p></div>
                <select className={`px-3 py-1 border ${inputBorder} rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
                  <option>Français</option><option>English</option><option>Español</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 'discussions':
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textColor}`}>💬 Discussions</h3>
            <p className={`text-sm ${textSecondary}`}>Gérez vos conversations</p>
            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Confirmation de lecture</p><p className={`text-sm ${textSecondary}`}>Voir les ✓✓</p></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-600 transition"></div>
                </label>
              </div>
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl`}>
                <div><p className={`font-medium ${textColor}`}>Archiver les discussions</p><p className={`text-sm ${textSecondary}`}>Archiver automatiquement</p></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-600 transition"></div>
                </label>
              </div>
            </div>
          </div>
        )

      case 'campus':
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textColor}`}>🏛️ Campus</h3>
            <p className={`text-sm ${textSecondary}`}>Gérez votre université et vos informations académiques</p>
            <div className={`p-4 ${inputBg} rounded-xl space-y-3`}>
              <h4 className={`font-semibold ${textColor} text-sm`}>🏫 Informations de l'université</h4>
              <div className="flex items-center justify-between">
                <div><p className={`font-medium ${textColor}`}>Université</p><p className={`text-sm ${textSecondary}`}>{profileData.university}</p></div>
                <button onClick={openUniversityModal} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Changer</button>
              </div>
              <div className="flex items-center justify-between">
                <div><p className={`font-medium ${textColor}`}>Département</p><p className={`text-sm ${textSecondary}`}>{profileData.department}</p></div>
                <button onClick={openDepartmentModal} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Changer</button>
              </div>
              <div className="flex items-center justify-between">
                <div><p className={`font-medium ${textColor}`}>Niveau d'étude</p><p className={`text-sm ${textSecondary}`}>{profileData.level}</p></div>
                <button onClick={openLevelModal} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Changer</button>
              </div>
              <div className="flex items-center justify-between">
                <div><p className={`font-medium ${textColor}`}>Année académique</p><p className={`text-sm ${textSecondary}`}>{profileData.academicYear}</p></div>
                <button onClick={openYearModal} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Changer</button>
              </div>
            </div>
            <div className={`p-4 ${inputBg} rounded-xl space-y-3`}>
              <h4 className={`font-semibold ${textColor} text-sm`}>📊 Statistiques académiques</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl text-center`}>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{profileData.courses}</p>
                  <p className={`text-xs ${textSecondary}`}>Cours suivis</p>
                </div>
                <div className={`p-3 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl text-center`}>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{profileData.average}</p>
                  <p className={`text-xs ${textSecondary}`}>Moyenne générale</p>
                </div>
                <div className={`p-3 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl text-center`}>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{profileData.projects}</p>
                  <p className={`text-xs ${textSecondary}`}>Projets en cours</p>
                </div>
                <div className={`p-3 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl text-center`}>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{profileData.credits}</p>
                  <p className={`text-xs ${textSecondary}`}>Crédits obtenus</p>
                </div>
              </div>
            </div>
            <div className={`p-4 ${inputBg} rounded-xl space-y-3`}>
              <div className="flex items-center justify-between">
                <h4 className={`font-semibold ${textColor} text-sm`}>📅 Emploi du temps</h4>
                <button onClick={() => setShowScheduleModal(true)} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Modifier</button>
              </div>
              <div className="space-y-2">
                {profileData.schedule.map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-2 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg`}>
                    <div><p className={`text-sm font-medium ${textColor}`}>{item.day}</p><p className={`text-xs ${textSecondary}`}>{item.time}</p></div>
                    <span className={`text-xs ${darkMode ? 'text-' + item.color + '-400' : 'text-' + item.color + '-600'}`}>{item.subject}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`p-4 ${inputBg} rounded-xl space-y-3`}>
              <div className="flex items-center justify-between">
                <h4 className={`font-semibold ${textColor} text-sm`}>👥 Groupes rejoints</h4>
                <button onClick={() => setShowGroupsModal(true)} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Gérer</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.groups.map((group, idx) => {
                  const colors = ['indigo', 'blue', 'green', 'purple', 'pink', 'orange', 'red', 'teal']
                  const color = colors[idx % colors.length]
                  return (
                    <span key={idx} className={`px-3 py-1 ${darkMode ? 'bg-gray-700 text-' + color + '-400' : 'bg-' + color + '-100 text-' + color + '-700'} rounded-full text-xs`}>
                      {group}
                    </span>
                  )
                })}
              </div>
            </div>
            <button onClick={saveProfile} className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Sauvegarder</button>
          </div>
        )

      case 'securite':
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textColor}`}>🔐 Sécurité</h3>
            <p className={`text-sm ${textSecondary}`}>Protégez votre compte et vos données</p>

            <div className="space-y-3">
              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔑</span>
                  <div><p className={`font-medium ${textColor}`}>Modifier le mot de passe</p><p className={`text-xs ${textSecondary}`}>Mettre à jour votre mot de passe</p></div>
                </div>
                <button onClick={handleChangePassword} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Changer</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <div><p className={`font-medium ${textColor}`}>Authentification à deux facteurs</p><p className={`text-xs ${textSecondary}`}>Sécuriser avec SMS ou email</p></div>
                </div>
                <button onClick={handleTwoFactor} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Activer</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👆</span>
                  <div><p className={`font-medium ${textColor}`}>Empreinte digitale / Face ID</p><p className={`text-xs ${textSecondary}`}>Déverrouillage biométrique</p></div>
                </div>
                <button onClick={handleBiometric} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Activer</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💻</span>
                  <div><p className={`font-medium ${textColor}`}>Appareils connectés</p><p className={`text-xs ${textSecondary}`}>2 appareils actifs</p></div>
                </div>
                <button onClick={handleDevices} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Gérer</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🕐</span>
                  <div><p className={`font-medium ${textColor}`}>Historique des connexions</p><p className={`text-xs ${textSecondary}`}>Voir vos dernières connexions</p></div>
                </div>
                <button onClick={handleHistory} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Voir</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div><p className={`font-medium ${textColor}`}>Alertes de connexion suspecte</p><p className={`text-xs ${textSecondary}`}>Recevoir des alertes en temps réel</p></div>
                </div>
                <button onClick={handleAlerts} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Configurer</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚪</span>
                  <div><p className={`font-medium ${textColor}`}>Déconnexion de tous les appareils</p><p className={`text-xs ${textSecondary}`}>Se déconnecter partout</p></div>
                </div>
                <button onClick={handleLogoutAll} className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">Déconnecter</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✉️</span>
                  <div><p className={`font-medium ${textColor}`}>Vérification de l'adresse email</p><p className={`text-xs ${textSecondary}`}>{user?.email || 'Non vérifié'}</p></div>
                </div>
                <button onClick={handleVerifyEmail} className="px-4 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition">Vérifier</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔢</span>
                  <div><p className={`font-medium ${textColor}`}>Code PIN de l'application</p><p className={`text-xs ${textSecondary}`}>Code de sécurité à 4 chiffres</p></div>
                </div>
                <button onClick={handlePinCode} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Configurer</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💾</span>
                  <div><p className={`font-medium ${textColor}`}>Sauvegarde du compte</p><p className={`text-xs ${textSecondary}`}>Sauvegarder vos données</p></div>
                </div>
                <button onClick={handleBackup} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Sauvegarder</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚫</span>
                  <div><p className={`font-medium ${textColor}`}>Bloquer et signaler</p><p className={`text-xs ${textSecondary}`}>Gérer les utilisateurs bloqués</p></div>
                </div>
                <button onClick={handleBlockUsers} className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">Gérer</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔄</span>
                  <div><p className={`font-medium ${textColor}`}>Sessions actives</p><p className={`text-xs ${textSecondary}`}>2 sessions actives</p></div>
                </div>
                <button onClick={handleSessions} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Voir</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div><p className={`font-medium ${textColor}`}>Centre de confidentialité</p><p className={`text-xs ${textSecondary}`}>Gérer vos données personnelles</p></div>
                </div>
                <button onClick={handlePrivacyCenter} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Accéder</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📥</span>
                  <div><p className={`font-medium ${textColor}`}>Télécharger mes données</p><p className={`text-xs ${textSecondary}`}>Exporter toutes vos données</p></div>
                </div>
                <button onClick={handleDownloadData} className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">Télécharger</button>
              </div>

              <div className={`flex items-center justify-between p-3 ${inputBg} rounded-xl hover:shadow-md transition border-2 border-red-500/30`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🗑️</span>
                  <div><p className={`font-medium text-red-500`}>Supprimer mon compte</p><p className={`text-xs ${textSecondary}`}>Supprimer définitivement votre compte</p></div>
                </div>
                <button onClick={handleDeleteAccount} className="px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition">Supprimer</button>
              </div>
            </div>

            <button onClick={saveProfile} className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        )

      case 'apropos':
        return (
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textColor}`}>ℹ️ À propos</h3>
            <p className={`text-sm ${textSecondary}`}>Informations sur l'application</p>
            <div className={`p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl text-center ${darkMode ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30' : ''}`}>
              <div className="text-4xl mb-2">🎓</div>
              <h4 className={`font-bold text-lg ${textColor}`}>CampusLink</h4>
              <p className={`text-sm ${textSecondary}`}>Version 1.0.0</p>
              <p className={`text-xs ${textSecondary} mt-2`}>Le réseau social des universités</p>
            </div>
            <button className={`w-full p-3 ${inputBg} rounded-xl text-left ${hoverBg} transition`} onClick={() => alert('📖 Guide d\'utilisation')}>
              <p className={`font-medium ${textColor}`}>📖 Guide d'utilisation</p>
            </button>
            <button className={`w-full p-3 ${inputBg} rounded-xl text-left ${hoverBg} transition`} onClick={() => alert('❓ Centre d\'aide')}>
              <p className={`font-medium ${textColor}`}>❓ Centre d'aide</p>
            </button>
          </div>
        )

      case 'deconnexion':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-600">🚪 Déconnexion</h3>
            <p className={`text-sm ${textSecondary}`}>Se déconnecter de votre compte</p>
            <div className="bg-red-50 rounded-xl p-6 text-center">
              <p className={`${textColor} mb-4`}>Êtes-vous sûr de vouloir vous déconnecter ?</p>
              <button onClick={() => { localStorage.removeItem('user'); window.location.href = '/' }} className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">🚪 Se déconnecter</button>
            </div>
          </div>
        )

      default:
        return <div className={textColor}>Section non trouvée</div>
    }
  }

  const menuItems = [
    { id: 'profil', icon: '👤', label: 'Mon profil', desc: 'Gérer vos informations personnelles' },
    { id: 'confidentialite', icon: '🔒', label: 'Confidentialité', desc: 'Contrôlez qui peut voir vos informations' },
    { id: 'notifications', icon: '🔔', label: 'Notifications', desc: 'Personnalisez vos préférences de notifications' },
    { id: 'apparence', icon: '🎨', label: 'Apparence', desc: 'Personnalisez l\'apparence de l\'application' },
    { id: 'discussions', icon: '💬', label: 'Discussions', desc: 'Gérez vos conversations et paramètres de chat' },
    { id: 'campus', icon: '🏛️', label: 'Campus', desc: 'Gérez votre université et vos groupes' },
    { id: 'securite', icon: '🔐', label: 'Sécurité', desc: 'Protégez votre compte' },
    { id: 'apropos', icon: 'ℹ️', label: 'À propos', desc: 'Informations sur l\'application et aide' },
    { id: 'deconnexion', icon: '🚪', label: 'Déconnexion', desc: 'Se déconnecter de votre compte' },
  ]

  return (
    <div className={`min-h-screen ${bgColor} flex`}>
      <div className={`w-64 ${cardBg} shadow-lg min-h-screen p-6 ${darkMode ? 'border-r border-gray-700' : ''}`}>
        <div className="mb-8"><span className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>🏫 CampusLink</span></div>
        <nav className="space-y-1">
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>🏠</span> Accueil</Link>
          <Link to="/explorer" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>🔍</span> Explorer</Link>
          <Link to="/messages" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>💬</span> Messages <span className="ml-auto bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">3</span></Link>
          <Link to="/notifications" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>🔔</span> Notifications <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">12</span></Link>
          <Link to="/groups" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>👥</span> Groupes</Link>
          <Link to="/courses" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>📚</span> Cours & Ressources</Link>
          <Link to="/events" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>📅</span> Événements</Link>
          <Link to="/announcements" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>📢</span> Annonces</Link>
          <Link to="/saved" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>💾</span> Enregistrements</Link>
        </nav>
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-6 pt-6`}>
          <Link to="/profile" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>👤</span> Profil</Link>
          <Link to="/settings" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-50 text-indigo-600'} rounded-xl font-medium transition`}><span>⚙️</span> Paramètres</Link>
          <Link to="/" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'} rounded-xl transition`}><span>🚪</span> Déconnexion</Link>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className={`text-2xl font-bold ${textColor} mb-6`}>⚙️ Paramètres</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-72 shrink-0">
              <div className={`${cardBg} rounded-2xl shadow-sm border ${cardBorder} p-2 sticky top-20`}>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                      activeSection === item.id
                        ? darkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                        : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${activeSection === item.id ? (darkMode ? 'text-indigo-400' : 'text-indigo-600') : textColor}`}>{item.label}</p>
                      <p className={`text-xs ${textSecondary} truncate`}>{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className={`flex-1 ${cardBg} rounded-2xl shadow-sm border ${cardBorder} p-6`}>
              {renderSection()}
            </div>
          </div>
        </div>
      </div>

      {/* Modals Campus */}
      {showUniversityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${textColor}`}>🏫 Changer l'université</h2>
              <button onClick={() => setShowUniversityModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <input type="text" value={tempUniversity} onChange={(e) => setTempUniversity(e.target.value)} className={`w-full px-4 py-3 border ${inputBorder} rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : ''}`} placeholder="Nom de l'université" />
            <button onClick={saveUniversity} className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        </div>
      )}

      {showDepartmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${textColor}`}>📚 Changer le département</h2>
              <button onClick={() => setShowDepartmentModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <input type="text" value={tempDepartment} onChange={(e) => setTempDepartment(e.target.value)} className={`w-full px-4 py-3 border ${inputBorder} rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : ''}`} placeholder="Nom du département" />
            <button onClick={saveDepartment} className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        </div>
      )}

      {showLevelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${textColor}`}>🎓 Changer le niveau</h2>
              <button onClick={() => setShowLevelModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <input type="text" value={tempLevel} onChange={(e) => setTempLevel(e.target.value)} className={`w-full px-4 py-3 border ${inputBorder} rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : ''}`} placeholder="Ex: L3 Informatique" />
            <button onClick={saveLevel} className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        </div>
      )}

      {showYearModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${textColor}`}>📅 Changer l'année académique</h2>
              <button onClick={() => setShowYearModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <input type="text" value={tempYear} onChange={(e) => setTempYear(e.target.value)} className={`w-full px-4 py-3 border ${inputBorder} rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : ''}`} placeholder="Ex: 2024-2025" />
            <button onClick={saveYear} className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        </div>
      )}

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${textColor}`}>📅 Emploi du temps</h2>
              <button onClick={() => setShowScheduleModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <div className="space-y-3">
              {profileData.schedule.map((item, idx) => (
                <div key={idx} className={`p-3 ${inputBg} rounded-xl`}>
                  <div className="flex gap-2">
                    <input type="text" value={item.day} className={`flex-1 px-3 py-1 ${inputBg} border ${inputBorder} rounded-lg text-sm ${darkMode ? 'text-white' : ''}`} />
                    <input type="text" value={item.time} className={`flex-1 px-3 py-1 ${inputBg} border ${inputBorder} rounded-lg text-sm ${darkMode ? 'text-white' : ''}`} />
                    <input type="text" value={item.subject} className={`flex-1 px-3 py-1 ${inputBg} border ${inputBorder} rounded-lg text-sm ${darkMode ? 'text-white' : ''}`} />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => { alert('📅 Emploi du temps mis à jour !'); setShowScheduleModal(false) }} className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        </div>
      )}

      {showGroupsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${textColor}`}>👥 Gérer les groupes</h2>
              <button onClick={() => setShowGroupsModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <div className="space-y-2">
              {profileData.groups.map((group, idx) => (
                <div key={idx} className={`flex items-center justify-between p-2 ${inputBg} rounded-lg`}>
                  <span className={`text-sm ${textColor}`}>{group}</span>
                  <button className="text-red-500 hover:text-red-700 text-sm" onClick={() => alert(`🚪 Vous avez quitté le groupe "${group}"`)}>Quitter</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <input type="text" placeholder="Ajouter un groupe..." className={`flex-1 px-4 py-2 border ${inputBorder} rounded-xl focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : ''}`} />
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition" onClick={() => alert('✅ Groupe ajouté avec succès !')}>➕</button>
            </div>
            <button onClick={() => { alert('👥 Groupes mis à jour !'); setShowGroupsModal(false) }} className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">💾 Enregistrer</button>
          </div>
        </div>
      )}
    </div>
  )
}