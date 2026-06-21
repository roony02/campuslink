import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Notifications() {
  const { darkMode } = useTheme()
  const [activeTab, setActiveTab] = useState('all')

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100'
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white'
  const cardBorder = darkMode ? 'border-gray-700' : 'border-gray-200'
  const textColor = darkMode ? 'text-white' : 'text-gray-800'
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-600'
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
  const sidebarBg = darkMode ? 'bg-gray-800' : 'bg-white'
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-gray-50'

  const [notifications, setNotifications] = useState([
    { id: 1, icon: '👍', text: 'Quelqu\'un a aimé votre publication', time: 'Il y a 2 min', read: false, color: darkMode ? 'border-indigo-500 bg-gray-700' : 'border-red-500 bg-red-50' },
    { id: 2, icon: '💬', text: 'Quelqu\'un a commenté votre publication', time: 'Il y a 15 min', read: false, color: darkMode ? 'border-blue-500 bg-gray-700' : 'border-blue-500 bg-blue-50' },
    { id: 3, icon: '👥', text: 'Quelqu\'un a rejoint votre groupe', time: 'Il y a 1h', read: false, color: darkMode ? 'border-green-500 bg-gray-700' : 'border-green-500 bg-green-50' },
    { id: 4, icon: '📚', text: 'Un nouveau cours a été publié', time: 'Il y a 2h', read: true, color: darkMode ? 'border-purple-500 bg-gray-700' : 'border-purple-500 bg-purple-50' },
    { id: 5, icon: '📅', text: 'Nouvel événement à venir', time: 'Il y a 3h', read: true, color: darkMode ? 'border-yellow-500 bg-gray-700' : 'border-yellow-500 bg-yellow-50' },
  ])

  const unreadCount = notifications.filter(n => !n.read).length
  const filteredNotifications = activeTab === 'all' ? notifications : notifications.filter(n => !n.read)

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

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
          <Link to="/messages" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition`}><span>💬</span> Messages <span className="ml-auto bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">0</span></Link>
          <Link to="/notifications" className={`flex items-center gap-3 px-4 py-3 ${darkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-50 text-indigo-600'} rounded-xl font-medium transition`}><span>🔔</span> Notifications <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span></Link>
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

      {/* Contenu Notifications */}
      <div className="flex-1">
        <nav className={`${cardBg} shadow-sm px-6 py-4 flex justify-between items-center ${darkMode ? 'border-b border-gray-700' : ''}`}>
          <h2 className={`text-xl font-semibold ${textColor}`}>🔔 Notifications</h2>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className={`text-sm ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'} font-medium`}>Tout marquer comme lu</button>
            )}
            <span className={`text-sm ${textSecondary}`}>{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</span>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex gap-2 mb-6">
            <button onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-xl transition ${activeTab === 'all' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white') : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50')}`}>📋 Toutes</button>
            <button onClick={() => setActiveTab('unread')} className={`px-4 py-2 rounded-xl transition ${activeTab === 'unread' ? (darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white') : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50')}`}>🔴 Non lues {unreadCount > 0 && `(${unreadCount})`}</button>
          </div>

          {filteredNotifications.length === 0 ? (
            <div className={`${cardBg} rounded-2xl shadow-md p-12 text-center ${darkMode ? 'border border-gray-700' : ''}`}>
              <div className="text-6xl mb-4">🔔</div>
              <h3 className={`text-2xl font-semibold ${textColor}`}>Aucune notification</h3>
              <p className={textSecondary}>Vous êtes à jour !</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notif) => (
                <div key={notif.id} className={`${cardBg} rounded-xl shadow-sm p-4 border-l-4 transition hover:shadow-md cursor-pointer ${notif.read ? (darkMode ? 'border-gray-600 opacity-60' : 'border-gray-200 opacity-70') : notif.color}`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{notif.icon}</div>
                    <div className="flex-1">
                      <p className={`${textColor}`}>{notif.text}</p>
                      <p className={`text-xs ${textSecondary} mt-1`}>{notif.time}</p>
                    </div>
                    {!notif.read && <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-2"></div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}