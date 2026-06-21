import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState('Passionné(e) par la tech et l\'innovation.')
  const [university, setUniversity] = useState('Université de Tech')
  const [department, setDepartment] = useState('Informatique')
  const [avatar, setAvatar] = useState(user?.avatar || '👩‍🎓')
  const [coverPhoto, setCoverPhoto] = useState(null)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [profilePreview, setProfilePreview] = useState(null)
  
  const coverInputRef = useRef(null)
  const profileInputRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const avatars = ['👩‍🎓', '👨‍🎓', '👩‍💻', '👨‍💻', '👩‍🏫', '👨‍🏫', '👩‍🔬', '👨‍🔬', '👩‍⚕️', '👨‍⚕️', '👩‍🎨', '👨‍🎨', '🦊', '🐱', '🐶']

  const handleCoverUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverPreview(event.target.result)
        setCoverPhoto(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfilePreview(event.target.result)
        setProfilePhoto(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveProfile = () => {
    const updatedUser = { 
      ...user, 
      name, 
      avatar,
      coverPhoto: coverPreview || user?.coverPhoto,
      profilePhoto: profilePreview || user?.profilePhoto
    }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setIsEditing(false)
    alert('✅ Profil mis à jour avec succès !')
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Classes dynamiques
  const bgCard = darkMode ? 'dark:bg-gray-800' : 'bg-white'
  const bgCardHover = darkMode ? 'dark:border-gray-700' : 'border-gray-200'
  const textPrimary = darkMode ? 'dark:text-white' : 'text-gray-900'
  const textSecondary = darkMode ? 'dark:text-gray-300' : 'text-gray-600'
  const textMuted = darkMode ? 'dark:text-gray-400' : 'text-gray-500'
  const borderColor = darkMode ? 'dark:border-gray-700' : 'border-gray-200'
  const bgInput = darkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'bg-white border-gray-300'
  const bgNav = darkMode ? 'dark:bg-gray-800/70 dark:border-gray-700' : 'bg-white/70 border-blue-100/50'
  const bgSidebar = darkMode ? 'dark:bg-gray-800/95' : 'bg-white/95'
  const bgHover = darkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-gray-50'

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
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <span className={`text-sm font-medium hidden sm:block ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>👋 {user?.name || 'Invité'}</span>
              <Link to="/profile" className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all shadow-md ${darkMode ? 'bg-blue-600 text-white hover:ring-2 hover:ring-blue-400' : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:ring-2 hover:ring-indigo-300'}`}>
                {user?.name?.charAt(0) || 'U'}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== CONTENU PROFIL ===== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`${bgCard} rounded-2xl shadow-md overflow-hidden border ${bgCardHover}`}>
          
          {/* ===== PHOTO DE COUVERTURE ===== */}
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-indigo-500 to-purple-600">
            {coverPreview ? (
              <img src={coverPreview} alt="Couverture" className="w-full h-full object-cover" />
            ) : user?.coverPhoto ? (
              <img src={user.coverPhoto} alt="Couverture" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-6xl opacity-30">🖼️</span>
              </div>
            )}
            
            {isEditing && (
              <button 
                onClick={() => coverInputRef.current?.click()}
                className="absolute bottom-4 right-4 px-4 py-2 bg-black/50 text-white rounded-xl hover:bg-black/70 transition backdrop-blur-sm text-sm flex items-center gap-2"
              >
                📷 Changer couverture
              </button>
            )}
            <input type="file" ref={coverInputRef} accept="image/*" onChange={handleCoverUpload} className="hidden" />
          </div>

          {/* ===== AVATAR ET INFOS ===== */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 gap-4">
              
              {/* Avatar */}
              <div className="relative">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl border-4 shadow-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-indigo-100 border-white'}`}>
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profil" className="w-full h-full rounded-full object-cover" />
                  ) : user?.profilePhoto ? (
                    <img src={user.profilePhoto} alt="Profil" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    avatar
                  )}
                </div>
                
                {isEditing && (
                  <>
                    <button 
                      onClick={() => profileInputRef.current?.click()}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full hover:bg-indigo-700 transition"
                    >
                      📷
                    </button>
                    <input type="file" ref={profileInputRef} accept="image/*" onChange={handleProfileUpload} className="hidden" />
                  </>
                )}
              </div>

              {/* Infos */}
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`text-2xl font-bold border-b-2 border-indigo-500 px-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                  />
                ) : (
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{name}</h2>
                )}
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>🎓 {department}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>🏛️ {university}</p>
              </div>

              {/* Boutons */}
              <div>
                {isEditing ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button 
                      onClick={saveProfile}
                      className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                      💾 Sauvegarder
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                  >
                    ✏️ Modifier
                  </button>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mt-4">
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none ${bgInput}`}
                  rows="2"
                />
              ) : (
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} italic`}>"{bio}"</p>
              )}
            </div>

            {/* Sélection avatar (uniquement en mode édition) */}
            {isEditing && (
              <div className="mt-4 pt-4 border-t ${borderColor}">
                <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Choisir un avatar :</p>
                <div className="flex flex-wrap gap-2">
                  {avatars.map((av, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAvatar(av)}
                      className={`w-10 h-10 rounded-full text-xl flex items-center justify-center transition ${
                        avatar === av ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Statistiques */}
            <div className={`grid grid-cols-3 gap-4 mt-6 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="text-center">
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>45</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Posts</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>128</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Amis</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>8</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Cours</p>
              </div>
            </div>

            {/* Email et téléphone */}
            <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} space-y-2`}>
              <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>📧</span>
                <span>{user?.email || 'email@universite.edu'}</span>
              </div>
              <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>📱</span>
                <span>{user?.phone || '+225 01 23 45 67'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}