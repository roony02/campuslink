import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Explorer() {
  const { darkMode } = useTheme()

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

  const users = [
    { name: 'Aminata Kone', role: 'Étudiante', icon: '👩‍🎓', dept: 'Informatique' },
    { name: 'Prof. Jonas Tanoh', role: 'Professeur', icon: '👨‍🏫', dept: 'Informatique' },
    { name: 'Marie Diallo', role: 'Étudiante', icon: '👩‍💻', dept: 'Mathématiques' },
    { name: 'Moussa Diop', role: 'Étudiant', icon: '👨‍💻', dept: 'Informatique' },
    { name: 'Dr. A. Traoré', role: 'Professeur', icon: '👨‍🏫', dept: 'Réseaux' },
    { name: 'Fatou Dieng', role: 'Étudiante', icon: '👩‍🎓', dept: 'Génie Civil' }
  ]

  return (
    <div className={`min-h-screen ${bgColor} flex`}>
      {/* Barre latérale */}
      <div className={`w-64 ${sidebarBg} shadow-lg min-h-screen p-6 ${darkMode ? 'border-r border-gray-700' : ''}`}>
        <div className="mb-8">
          <span className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>🏫 CampusLink</span>
        </div>
        <nav className="space-y-1">
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}>
            <span>🏠</span> Accueil
          </Link>
          <Link to="/explorer" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-50 text-indigo-600'} rounded-xl font-medium transition`}>
            <span>🔍</span> Explorer
          </Link>
          <Link to="/messages" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}>
            <span>💬</span> Messages
            <span className="ml-auto bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">3</span>
          </Link>
          <Link to="/notifications" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}>
            <span>🔔</span> Notifications
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">12</span>
          </Link>
          <Link to="/groups" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}>
            <span>👥</span> Groupes
          </Link>
          <Link to="/courses" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}>
            <span>📚</span> Cours & Ressources
          </Link>
          <Link to="/events" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}>
            <span>📅</span> Événements
          </Link>
          <Link to="/announcements" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}>
            <span>📢</span> Annonces
          </Link>
          <Link to="/saved" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}>
            <span>💾</span> Enregistrements
          </Link>
        </nav>
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-6 pt-6`}>
          <Link to="/profile" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}>
            <span>👤</span> Profil
          </Link>
          <Link to="/settings" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}>
            <span>⚙️</span> Paramètres
          </Link>
          <Link to="/" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'} rounded-xl transition`}>
            <span>🚪</span> Déconnexion
          </Link>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1">
        <nav className={`${cardBg} shadow-sm px-6 py-4 ${darkMode ? 'border-b border-gray-700' : ''}`}>
          <h2 className={`text-xl font-semibold ${textColor}`}>🔍 Explorer</h2>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Barre de recherche */}
          <div className={`${cardBg} rounded-2xl shadow-md p-6 mb-6 ${darkMode ? 'border border-gray-700' : ''}`}>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Rechercher..."
                className={`w-full pl-12 pr-4 py-3 ${inputBg} rounded-xl border ${inputBorder} focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${darkMode ? 'text-white placeholder-gray-400' : ''}`}
              />
            </div>
          </div>

          <h3 className={`font-semibold ${textColor} mb-4`}>👤 Utilisateurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user, idx) => (
              <div key={idx} className={`${cardBg} rounded-xl shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition ${darkMode ? 'border border-gray-700' : ''}`}>
                <div className={`w-12 h-12 ${darkMode ? 'bg-gray-700' : 'bg-green-100'} rounded-full flex items-center justify-center text-2xl`}>
                  {user.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${textColor}`}>{user.name}</h4>
                  <p className={`text-sm ${textSecondary}`}>{user.role} · {user.dept}</p>
                </div>
                <button className={`px-4 py-1.5 ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white text-sm rounded-lg transition`}>
                  Voir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}