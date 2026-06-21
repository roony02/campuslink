import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('student')
  const [adminPassword, setAdminPassword] = useState('')
  const [countryCode, setCountryCode] = useState('+225')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const ADMIN_PASSWORD = 'uni-1234'

  const countryCodes = [
    { code: '+225', country: '🇨🇮 Côte d\'Ivoire' },
    { code: '+221', country: '🇸🇳 Sénégal' },
    { code: '+223', country: '🇲🇱 Mali' },
    { code: '+226', country: '🇧🇫 Burkina Faso' },
    { code: '+228', country: '🇹🇬 Togo' },
    { code: '+229', country: '🇧🇯 Bénin' },
    { code: '+227', country: '🇳🇪 Niger' },
    { code: '+224', country: '🇬🇳 Guinée' },
    { code: '+231', country: '🇱🇷 Libéria' },
    { code: '+232', country: '🇸🇱 Sierra Leone' },
    { code: '+233', country: '🇬🇭 Ghana' },
    { code: '+234', country: '🇳🇬 Nigeria' },
    { code: '+237', country: '🇨🇲 Cameroun' },
    { code: '+238', country: '🇨🇻 Cap-Vert' },
    { code: '+239', country: '🇸🇹 São Tomé' },
    { code: '+240', country: '🇬🇶 Guinée Équatoriale' },
    { code: '+241', country: '🇬🇦 Gabon' },
    { code: '+242', country: '🇨🇬 Congo' },
    { code: '+243', country: '🇨🇩 RDC' },
    { code: '+244', country: '🇦🇴 Angola' },
    { code: '+245', country: '🇬🇼 Guinée-Bissau' },
    { code: '+246', country: '🇮🇴 Diego Garcia' },
    { code: '+248', country: '🇸🇨 Seychelles' },
    { code: '+249', country: '🇸🇩 Soudan' },
    { code: '+250', country: '🇷🇼 Rwanda' },
    { code: '+251', country: '🇪🇹 Éthiopie' },
    { code: '+252', country: '🇸🇴 Somalie' },
    { code: '+253', country: '🇩🇯 Djibouti' },
    { code: '+254', country: '🇰🇪 Kenya' },
    { code: '+255', country: '🇹🇿 Tanzanie' },
    { code: '+256', country: '🇺🇬 Ouganda' },
    { code: '+257', country: '🇧🇮 Burundi' },
    { code: '+258', country: '🇲🇿 Mozambique' },
    { code: '+260', country: '🇿🇲 Zambie' },
    { code: '+261', country: '🇲🇬 Madagascar' },
    { code: '+262', country: '🇷🇪 Réunion' },
    { code: '+263', country: '🇿🇼 Zimbabwe' },
    { code: '+264', country: '🇳🇦 Namibie' },
    { code: '+265', country: '🇲🇼 Malawi' },
    { code: '+266', country: '🇱🇸 Lesotho' },
    { code: '+267', country: '🇧🇼 Botswana' },
    { code: '+268', country: '🇸🇿 Eswatini' },
    { code: '+269', country: '🇰🇲 Comores' },
    { code: '+290', country: '🇸🇭 Sainte-Hélène' },
    { code: '+291', country: '🇪🇷 Érythrée' },
    { code: '+297', country: '🇦🇼 Aruba' },
    { code: '+298', country: '🇫🇴 Îles Féroé' },
    { code: '+299', country: '🇬🇱 Groenland' },
    { code: '+33', country: '🇫🇷 France' },
    { code: '+34', country: '🇪🇸 Espagne' },
    { code: '+39', country: '🇮🇹 Italie' },
    { code: '+44', country: '🇬🇧 Royaume-Uni' },
    { code: '+49', country: '🇩🇪 Allemagne' },
    { code: '+1', country: '🇺🇸 États-Unis/Canada' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const fullPhone = countryCode + phone

    // Vérification des champs obligatoires
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs')
      return
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    if (phone.length < 8) {
      setError('Numéro de téléphone invalide (minimum 8 chiffres)')
      return
    }

    // ===== SÉCURITÉ : Vérification du mot de passe admin pour Professeur et Section =====
    if (role === 'teacher' || role === 'section') {
      if (!adminPassword) {
        setError('Veuillez entrer le mot de passe administrateur')
        return
      }
      if (adminPassword !== ADMIN_PASSWORD) {
        setError('❌ Mot de passe administrateur incorrect ! Contactez l\'administrateur.')
        return
      }
    }

    localStorage.setItem('user', JSON.stringify({ name, email, phone: fullPhone, role }))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl mx-auto shadow-lg">
            🎓
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-3">CampusLink</h2>
          <p className="text-gray-500 text-sm">Créez votre compte</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Votre nom"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="vous@universite.edu"
                required
              />
            </div>

            {/* ===== RÔLE AVEC SÉCURITÉ ===== */}
            <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">👤 Rôle</label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="student"
                    checked={role === 'student'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-sm font-medium">👨‍🎓 Étudiant</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="teacher"
                    checked={role === 'teacher'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-sm font-medium">👨‍🏫 Professeur</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="section"
                    checked={role === 'section'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm font-medium">📋 Section</span>
                </label>
              </div>
              <p className={`text-xs mt-2 ${
                role === 'teacher' ? 'text-purple-600 font-medium' : 
                role === 'section' ? 'text-purple-600 font-medium' : 
                'text-gray-500'
              }`}>
                {role === 'teacher' && '👑 Vous aurez accès à l\'administration des cours (créer, publier, modifier)'}
                {role === 'section' && '📋 Vous pourrez publier des informations, horaires et vidéos pour la section'}
                {role === 'student' && '📖 Vous pourrez consulter les cours et les publications'}
              </p>

              {/* ===== CHAMP MOT DE PASSE ADMIN (Professeur et Section) ===== */}
              {(role === 'teacher' || role === 'section') && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    🔐 Mot de passe administrateur <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Entrez le mot de passe administrateur"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    ⚠️ Contactez l'administrateur pour obtenir le mot de passe
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-40 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
                >
                  {countryCodes.map((c, i) => (
                    <option key={i} value={c.code}>
                      {c.country} ({c.code})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="06 12 34 56 78"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Saisissez votre numéro sans espaces</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Votre mot de passe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>

            <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition shadow-sm">
              S'inscrire
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}