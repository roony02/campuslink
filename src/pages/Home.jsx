import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">🏫 CampusLink</span>
          <div className="flex gap-4">
            <Link to="/login">
              <button className="px-6 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-xl transition">
                Se connecter
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition shadow-sm">
                S'inscrire
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Le réseau social des
            <span className="text-indigo-600"> universités</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Connectez-vous avec vos camarades, partagez vos cours et restez informé des événements universitaires.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <button className="px-8 py-4 bg-indigo-600 text-white text-lg font-medium rounded-2xl hover:bg-indigo-700 transition shadow-lg">
                🚀 Commencer maintenant
              </button>
            </Link>
            <Link to="/login">
              <button className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 text-lg font-medium rounded-2xl hover:bg-indigo-50 transition">
                J'ai déjà un compte
              </button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Partage de cours</h3>
            <p className="text-gray-600">Téléchargez et partagez vos notes, PDF et ressources pédagogiques.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Messagerie instantanée</h3>
            <p className="text-gray-600">Discutez en temps réel avec vos camarades et professeurs.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Groupes d'étude</h3>
            <p className="text-gray-600">Créez ou rejoignez des groupes par matière, promotion ou projet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}