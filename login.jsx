export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">🏫 CampusLink</h2>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>

        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="vous@universite.edu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Votre mot de passe"
              />
            </div>

            <button className="w-full py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition shadow-sm">
              Se connecter
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Pas encore de compte ?{' '}
          <a href="#" className="text-indigo-600 font-medium hover:underline">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  )
}