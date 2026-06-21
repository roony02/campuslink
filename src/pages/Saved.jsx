import { Link } from 'react-router-dom'

export default function Saved() {
  const savedItems = [
    { id: 1, name: 'Structures_de_donnees_Java.pdf', author: 'Prof. Jonas Tanoh', size: '2.4 Mo', icon: '📎', color: 'bg-blue-100' },
    { id: 2, name: 'Notes_TD_Algo.pdf', author: 'Aminata Kone', size: '1.8 Mo', icon: '📎', color: 'bg-green-100' },
    { id: 3, name: 'Cours_Reseaux_2024.pdf', author: 'Prof. M. Diallo', size: '3.2 Mo', icon: '📎', color: 'bg-purple-100' }
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white shadow-lg min-h-screen p-6">
        <div className="mb-8"><span className="text-2xl font-bold text-indigo-600">🏫 CampusLink</span></div>
        <nav className="space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>🏠</span> Accueil</Link>
          <Link to="/explorer" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>🔍</span> Explorer</Link>
          <Link to="/messages" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>💬</span> Messages <span className="ml-auto bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">3</span></Link>
          <Link to="/notifications" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>🔔</span> Notifications <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">12</span></Link>
          <Link to="/groups" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>👥</span> Groupes</Link>
          <Link to="/courses" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>📚</span> Cours & Ressources</Link>
          <Link to="/events" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>📅</span> Événements</Link>
          <Link to="/announcements" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>📢</span> Annonces</Link>
          <Link to="/saved" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-medium"><span>💾</span> Enregistrements</Link>
        </nav>
        <div className="border-t mt-6 pt-6">
          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>👤</span> Profil</Link>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition"><span>🚪</span> Déconnexion</Link>
        </div>
      </div>

      <div className="flex-1">
        <nav className="bg-white shadow-sm px-6 py-4"><h2 className="text-xl font-semibold text-gray-800">💾 Enregistrements</h2></nav>
        <div className="max-w-4xl mx-auto px-6 py-8">
          {savedItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md p-4 mb-4 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-2xl`}>{item.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.author} · {item.size}</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-sm">Télécharger</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}