import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Courses() {
  const user = JSON.parse(localStorage.getItem('user'))
  
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [showCourseMenu, setShowCourseMenu] = useState(null)
  const [showPublicationModal, setShowPublicationModal] = useState(null)
  const [showVideoModal, setShowVideoModal] = useState(null)
  const [showFileViewer, setShowFileViewer] = useState(null)
  
  // Modal création cours
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newCourseName, setNewCourseName] = useState('')
  const [newCourseProf, setNewCourseProf] = useState('')
  const [newCourseDesc, setNewCourseDesc] = useState('')
  const [newCourseIcon, setNewCourseIcon] = useState('📚')
  const [newCourseLevel, setNewCourseLevel] = useState('L1')

  // Modal publication
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [publishTitle, setPublishTitle] = useState('')
  const [publishContent, setPublishContent] = useState('')
  const [publishType, setPublishType] = useState('cours')
  const [publishSchedule, setPublishSchedule] = useState('')
  const [publishVideo, setPublishVideo] = useState('')
  const [publishSalle, setPublishSalle] = useState('')
  const [publishDate, setPublishDate] = useState('')
  const [publishFile, setPublishFile] = useState(null)
  const [publishGallery, setPublishGallery] = useState([])

  const iconOptions = ['📚', '📘', '📗', '📕', '📙', '💻', '🖥️', '📊', '📈', '🔬', '🧪', '📐', '📏', '🎨', '🎵', '📖', '✏️', '📝']
  const levels = ['L1', 'L2', 'L3', 'M1', 'M2', 'Doctorat']

  const isAdmin = () => {
    return user?.role === 'teacher' || user?.role === 'section' || user?.name === 'Admin'
  }

  const handleCreateCourse = () => {
    if (!newCourseName.trim() || !newCourseProf.trim()) {
      alert('Veuillez remplir tous les champs')
      return
    }
    
    const newCourse = {
      id: Date.now(),
      name: newCourseName,
      professor: newCourseProf,
      description: newCourseDesc || 'Cours universitaire',
      icon: newCourseIcon,
      color: 'bg-blue-100',
      documents: 0,
      students: 0,
      level: newCourseLevel,
      status: 'Disponible',
      createdAt: new Date().toLocaleDateString(),
      creator: user?.name || 'Utilisateur',
      publications: [],
      videos: [],
      horaires: [],
      infos: [],
      deliberations: [],
      notes: [],
      gallery: [],
      pdfs: [],
      info: { horaires: '', salle: '', date: '' }
    }
    
    setCourses([newCourse, ...courses])
    setNewCourseName('')
    setNewCourseProf('')
    setNewCourseDesc('')
    setNewCourseIcon('📚')
    setNewCourseLevel('L1')
    setShowCreateModal(false)
    alert('✅ Cours "' + newCourseName + '" créé avec succès !')
  }

  const handlePublish = () => {
    if (!publishTitle.trim() || !publishContent.trim()) {
      alert('Veuillez remplir tous les champs')
      return
    }

    const publication = {
      id: Date.now(),
      title: publishTitle,
      content: publishContent,
      type: publishType,
      schedule: publishSchedule,
      video: publishVideo,
      salle: publishSalle,
      date: publishDate || new Date().toLocaleDateString(),
      author: user?.name || 'Administrateur',
      time: new Date().toLocaleTimeString(),
      file: publishFile ? { name: publishFile.name, size: publishFile.size, type: publishFile.type } : null,
      gallery: publishGallery
    }

    const updatedCourses = courses.map(c => {
      if (c.id === selectedCourse.id) {
        let updated = { ...c, publications: [...(c.publications || []), publication] }
        
        if (publishType === 'video' && publishVideo) {
          updated.videos = [...(c.videos || []), { id: Date.now(), url: publishVideo, title: publishTitle, date: publishDate || new Date().toLocaleDateString(), author: user?.name }]
        }
        if (publishType === 'horaire' && publishSchedule) {
          updated.horaires = [...(c.horaires || []), { id: Date.now(), horaire: publishSchedule, salle: publishSalle, date: publishDate || new Date().toLocaleDateString(), title: publishTitle }]
        }
        if (publishType === 'info') {
          updated.infos = [...(c.infos || []), { id: Date.now(), title: publishTitle, content: publishContent, date: publishDate || new Date().toLocaleDateString(), author: user?.name }]
        }
        if (publishType === 'deliberation') {
          updated.deliberations = [...(c.deliberations || []), { id: Date.now(), title: publishTitle, content: publishContent, date: publishDate || new Date().toLocaleDateString(), file: publishFile ? publishFile.name : null, author: user?.name }]
        }
        if (publishType === 'note') {
          updated.notes = [...(c.notes || []), { id: Date.now(), title: publishTitle, content: publishContent, date: publishDate || new Date().toLocaleDateString(), file: publishFile ? publishFile.name : null, author: user?.name }]
        }
        if (publishType === 'pdf') {
          updated.pdfs = [...(c.pdfs || []), { id: Date.now(), title: publishTitle, content: publishContent, date: publishDate || new Date().toLocaleDateString(), file: publishFile ? { name: publishFile.name, size: publishFile.size, type: publishFile.type } : null, author: user?.name }]
        }
        if (publishFile) {
          updated.documents = (updated.documents || 0) + 1
        }
        if (publishGallery.length > 0) {
          updated.gallery = [...(c.gallery || []), ...publishGallery]
        }
        return updated
      }
      return c
    })

    setCourses(updatedCourses)
    setSelectedCourse(updatedCourses.find(c => c.id === selectedCourse.id))
    setPublishTitle('')
    setPublishContent('')
    setPublishType('cours')
    setPublishSchedule('')
    setPublishVideo('')
    setPublishSalle('')
    setPublishDate('')
    setPublishFile(null)
    setPublishGallery([])
    setShowPublishModal(false)
    alert('✅ Publication ajoutée avec succès !')
  }

  const deleteCourse = (courseId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce cours ?')) {
      setCourses(courses.filter(c => c.id !== courseId))
      setShowCourseMenu(null)
    }
  }

  const openFileViewer = (fileData) => {
    setShowFileViewer(fileData)
  }

  const filteredCourses = courses.filter(c => {
    if (activeTab === 'all') return true
    if (activeTab === 'available') return c.status === 'Disponible'
    if (activeTab === 'upcoming') return c.status === 'À venir'
    return true
  })

  const availableCount = courses.filter(c => c.status === 'Disponible').length
  const upcomingCount = courses.filter(c => c.status === 'À venir').length

  const courseMenuOptions = [
    { icon: '📋', label: 'Voir les documents', action: () => alert('📋 Liste des documents') },
    { icon: '👥', label: 'Étudiants inscrits', action: () => alert('👥 Liste des étudiants') },
    { icon: '📝', label: 'Modifier', action: () => alert('✏️ Modifier le cours') },
    { icon: '📢', label: 'Publier', action: (course) => { setSelectedCourse(course); setShowPublishModal(true); setShowCourseMenu(null) } },
    { icon: '🗑️', label: 'Supprimer', action: (course) => deleteCourse(course.id), danger: true }
  ]

  const publishTypes = [
    { value: 'cours', label: '📚 Cours', icon: '📚' },
    { value: 'horaire', label: '📅 Horaire', icon: '📅' },
    { value: 'info', label: 'ℹ️ Information', icon: 'ℹ️' },
    { value: 'video', label: '📹 Vidéo', icon: '📹' },
    { value: 'deliberation', label: '📋 Délibération', icon: '📋' },
    { value: 'note', label: '📝 Note', icon: '📝' },
    { value: 'pdf', label: '📄 PDF / Document', icon: '📄' },
    { value: 'gallery', label: '🖼️ Galerie', icon: '🖼️' }
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Barre latérale */}
      <div className="w-64 bg-white shadow-lg min-h-screen p-6">
        <div className="mb-8">
          <span className="text-2xl font-bold text-indigo-600">🏫 CampusLink</span>
        </div>
        <nav className="space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>🏠</span> Accueil</Link>
          <Link to="/explorer" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>🔍</span> Explorer</Link>
          <Link to="/messages" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>💬</span> Messages</Link>
          <Link to="/notifications" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>🔔</span> Notifications</Link>
          <Link to="/groups" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>👥</span> Groupes</Link>
          <Link to="/courses" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-medium"><span>📚</span> Cours & Ressources</Link>
          <Link to="/events" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>📅</span> Événements</Link>
          <Link to="/announcements" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>📢</span> Annonces</Link>
          <Link to="/saved" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>💾</span> Enregistrements</Link>
        </nav>
        <div className="border-t mt-6 pt-6">
          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition"><span>👤</span> Profil</Link>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition"><span>🚪</span> Déconnexion</Link>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1">
        <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">📚 Cours & Ressources</h2>
            <p className="text-sm text-gray-500">
              {courses.length} cours disponibles
              {isAdmin() && <span className="ml-2 text-purple-600 font-medium">👑 Mode Administration</span>}
            </p>
          </div>
          {isAdmin() && (
            <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex items-center gap-2">
              <span>➕</span> Ajouter un cours
            </button>
          )}
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-6">
          {courses.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <button onClick={() => setActiveTab('all')} className={`px-3 py-1.5 rounded-xl text-sm transition ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>📋 Tous ({courses.length})</button>
              <button onClick={() => setActiveTab('available')} className={`px-3 py-1.5 rounded-xl text-sm transition ${activeTab === 'available' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>✅ Disponibles ({availableCount})</button>
              <button onClick={() => setActiveTab('upcoming')} className={`px-3 py-1.5 rounded-xl text-sm transition ${activeTab === 'upcoming' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>⏳ À venir ({upcomingCount})</button>
            </div>
          )}

          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-semibold text-gray-800">Aucun cours</h3>
              <p className="text-gray-500 mt-2">
                {isAdmin() ? 'Cliquez sur "Ajouter un cours" pour commencer' : 'Aucun cours disponible pour le moment.'}
              </p>
              {isAdmin() && (
                <button onClick={() => setShowCreateModal(true)} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">➕ Ajouter un cours</button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map(course => {
                const admin = isAdmin()
                const hasVideo = course.videos && course.videos.length > 0
                const hasHoraires = course.horaires && course.horaires.length > 0
                const hasInfos = course.infos && course.infos.length > 0
                const hasDeliberations = course.deliberations && course.deliberations.length > 0
                const hasNotes = course.notes && course.notes.length > 0
                const hasGallery = course.gallery && course.gallery.length > 0
                const hasPdfs = course.pdfs && course.pdfs.length > 0
                
                return (
                  <div key={course.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition hover:scale-[1.02] duration-200 relative">
                    
                    {admin && (
                      <div className="absolute top-4 right-4">
                        <button onClick={() => setShowCourseMenu(showCourseMenu === course.id ? null : course.id)} className="p-2 hover:bg-gray-100 rounded-full transition text-lg text-gray-500">⋮</button>
                        {showCourseMenu === course.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                            {courseMenuOptions.map((opt, idx) => (
                              <button key={idx} onClick={() => { if (opt.danger) { opt.action(course) } else if (opt.label === 'Publier') { setSelectedCourse(course); setShowPublishModal(true); setShowCourseMenu(null) } else { opt.action(); setShowCourseMenu(null) } }} className={`flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 transition text-left ${opt.danger ? 'text-red-600' : 'text-gray-700'}`}>
                                <span>{opt.icon}</span><span className="text-sm">{opt.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-start justify-between">
                      <div>
                        <div className={`w-14 h-14 ${course.color} rounded-2xl flex items-center justify-center text-3xl mb-3`}>{course.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">👨‍🏫 {course.professor}</p>
                        <p className="text-xs text-gray-400 mt-0.5">🎓 {course.level}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs px-3 py-1 rounded-full ${course.status === 'Disponible' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{course.status}</span>
                        {admin && <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">👑 Admin</span>}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">{course.description}</p>
                    
                    <div className="flex gap-4 mt-4 text-sm text-gray-500">
                      <span>📁 {course.documents || 0} documents</span>
                      <span>👥 {course.students || 0} étudiants</span>
                    </div>

                    {/* Indicateurs des sections */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {hasVideo && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full">📹 Vidéo</span>}
                      {hasHoraires && <span className="text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded-full">📅 Horaire</span>}
                      {hasInfos && <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">ℹ️ Info</span>}
                      {hasDeliberations && <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">📋 Délibération</span>}
                      {hasNotes && <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full">📝 Note</span>}
                      {hasGallery && <span className="text-xs px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full">🖼️ Galerie</span>}
                      {hasPdfs && <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full">📄 PDF</span>}
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <span>👤 {course.creator}</span>
                      <span>·</span>
                      <span>📅 {course.createdAt}</span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button onClick={() => { setSelectedCourse(course); setShowPublicationModal(course.id) }} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">📂 Accéder</button>
                      {hasVideo && (
                        <button onClick={() => setShowVideoModal({ course, video: course.videos[0] })} className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">▶️</button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ===== MODAL CRÉER UN COURS ===== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">📚 Ajouter un cours</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{newCourseIcon}</div>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {iconOptions.slice(0,8).map((icon, idx) => (
                  <button key={idx} onClick={() => setNewCourseIcon(icon)} className={`w-10 h-10 rounded-full text-2xl flex items-center justify-center transition ${newCourseIcon === icon ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50' : 'hover:bg-gray-100'}`}>{icon}</button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nom du cours</label><input type="text" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} placeholder="Ex: Structures de données" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Professeur</label><input type="text" value={newCourseProf} onChange={(e) => setNewCourseProf(e.target.value)} placeholder="Nom du professeur" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label><select value={newCourseLevel} onChange={(e) => setNewCourseLevel(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">{levels.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={newCourseDesc} onChange={(e) => setNewCourseDesc(e.target.value)} placeholder="Description..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" rows="3" /></div>
              <button onClick={handleCreateCourse} className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">🚀 Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL PUBLIER ===== */}
      {showPublishModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">📢 Publier dans {selectedCourse.name}</h2>
                <p className="text-sm text-gray-500">Choisissez le type de publication</p>
              </div>
              <button onClick={() => setShowPublishModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>

            {/* Tabs de publication */}
            <div className="flex flex-wrap gap-2 mb-4 pb-3 border-b border-gray-200">
              {publishTypes.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => { setPublishType(tab.value); setPublishTitle(''); setPublishContent(''); setPublishSchedule(''); setPublishVideo(''); setPublishSalle(''); setPublishFile(null) }}
                  className={`px-3 py-1.5 rounded-xl text-sm transition ${
                    publishType === tab.value 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Titre</label><input type="text" value={publishTitle} onChange={(e) => setPublishTitle(e.target.value)} placeholder="Titre de la publication" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /></div>

              {(publishType === 'horaire') && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Horaire</label><input type="time" value={publishSchedule} onChange={(e) => setPublishSchedule(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Salle</label><input type="text" value={publishSalle} onChange={(e) => setPublishSalle(e.target.value)} placeholder="Ex: Amphi A" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /></div>
                </>
              )}

              {(publishType === 'video') && (
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Lien vidéo</label><input type="url" value={publishVideo} onChange={(e) => setPublishVideo(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /></div>
              )}

              {(publishType === 'deliberation' || publishType === 'note' || publishType === 'cours' || publishType === 'pdf') && (
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Fichier (PDF, DOC, etc.)</label>
                  <input type="file" onChange={(e) => setPublishFile(e.target.files[0])} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                  {publishFile && <p className="text-xs text-green-600 mt-1">📎 {publishFile.name} ({(publishFile.size / 1024).toFixed(1)} KB)</p>}
                </div>
              )}

              {(publishType === 'gallery') && (
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                  <input type="file" multiple accept="image/*" onChange={(e) => {
                    const files = Array.from(e.target.files)
                    const newGallery = files.map(file => ({
                      id: Date.now() + Math.random(),
                      name: file.name,
                      url: URL.createObjectURL(file)
                    }))
                    setPublishGallery(newGallery)
                  }} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                  {publishGallery.length > 0 && <p className="text-xs text-green-600 mt-1">🖼️ {publishGallery.length} images ajoutées</p>}
                </div>
              )}

              <div><label className="block text-sm font-medium text-gray-700 mb-1">Contenu</label><textarea value={publishContent} onChange={(e) => setPublishContent(e.target.value)} placeholder="Description..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" rows="4" /></div>

              <button onClick={handlePublish} className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">📢 Publier</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL VOIR LE COURS AVEC SECTIONS SÉPARÉES ===== */}
      {showPublicationModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.icon} {selectedCourse.name}</h2>
                <p className="text-sm text-gray-500">👨‍🏫 {selectedCourse.professor} · {selectedCourse.level}</p>
              </div>
              <button onClick={() => setShowPublicationModal(null)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 text-sm mb-4">{selectedCourse.description}</p>

              {/* SECTION 1 : GALERIE */}
              {selectedCourse.gallery && selectedCourse.gallery.length > 0 && (
                <div className="mb-4 p-3 bg-pink-50 rounded-xl">
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">🖼️ Galerie</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedCourse.gallery.map((img, idx) => (
                      <img key={idx} src={img.url} alt={img.name} className="w-full h-20 object-cover rounded-xl" />
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 2 : HORAIRES */}
              {selectedCourse.horaires && selectedCourse.horaires.length > 0 && (
                <div className="mb-4 p-3 bg-green-50 rounded-xl">
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">📅 Horaires</h4>
                  {selectedCourse.horaires.map((h, idx) => (
                    <div key={idx} className="text-sm text-gray-600 border-b border-green-100 py-1">
                      <span className="font-medium">{h.title || 'Cours'}</span> - 🕐 {h.horaire} · 📍 {h.salle} · 📆 {h.date}
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION 3 : INFORMATIONS */}
              {selectedCourse.infos && selectedCourse.infos.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">ℹ️ Informations</h4>
                  {selectedCourse.infos.map((info, idx) => (
                    <div key={idx} className="text-sm text-gray-600 border-b border-blue-100 py-1">
                      <span className="font-medium">{info.title}</span> - {info.content} <span className="text-xs text-gray-400">· {info.author}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION 4 : DÉLIBÉRATIONS */}
              {selectedCourse.deliberations && selectedCourse.deliberations.length > 0 && (
                <div className="mb-4 p-3 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">📋 Délibérations</h4>
                  {selectedCourse.deliberations.map((d, idx) => (
                    <div key={idx} className="text-sm text-gray-600 border-b border-purple-100 py-1">
                      <span className="font-medium">{d.title}</span> - {d.content}
                      {d.file && <span className="ml-2 text-xs text-purple-600">📎 {d.file}</span>}
                      <span className="text-xs text-gray-400 ml-2">· {d.author}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION 5 : NOTES */}
              {selectedCourse.notes && selectedCourse.notes.length > 0 && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-xl">
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">📝 Notes</h4>
                  {selectedCourse.notes.map((n, idx) => (
                    <div key={idx} className="text-sm text-gray-600 border-b border-yellow-100 py-1">
                      <span className="font-medium">{n.title}</span> - {n.content}
                      {n.file && <span className="ml-2 text-xs text-yellow-600">📎 {n.file}</span>}
                      <span className="text-xs text-gray-400 ml-2">· {n.author}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION 6 : PDF / DOCUMENTS */}
              {selectedCourse.pdfs && selectedCourse.pdfs.length > 0 && (
                <div className="mb-4 p-3 bg-orange-50 rounded-xl">
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">📄 PDF / Documents</h4>
                  {selectedCourse.pdfs.map((pdf, idx) => (
                    <div key={idx} className="text-sm text-gray-600 border-b border-orange-100 py-1">
                      <span className="font-medium">{pdf.title}</span> - {pdf.content}
                      {pdf.file && (
                        <button 
                          onClick={() => openFileViewer(pdf.file)}
                          className="ml-2 text-xs text-orange-600 hover:underline"
                        >
                          📎 {pdf.file.name} ({(pdf.file.size / 1024).toFixed(1)} KB)
                        </button>
                      )}
                      <span className="text-xs text-gray-400 ml-2">· {pdf.author}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* SECTION 7 : VIDÉOS */}
              {selectedCourse.videos && selectedCourse.videos.length > 0 && (
                <div className="mb-4 p-3 bg-red-50 rounded-xl">
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">📹 Cours vidéo</h4>
                  {selectedCourse.videos.map((video, idx) => (
                    <div key={idx} className="p-2 bg-white rounded-lg mb-1">
                      <p className="font-medium text-gray-900 text-sm">{video.title || 'Vidéo'}</p>
                      <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-sm text-red-600 hover:underline">▶️ Regarder</a>
                      <span className="text-xs text-gray-400 ml-2">· {video.author}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Bouton PUBLIER pour ADMIN */}
              {isAdmin() && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button onClick={() => { setShowPublicationModal(null); setSelectedCourse(selectedCourse); setShowPublishModal(true) }} className="w-full px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">📢 Publier dans ce cours</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL VIDÉO ===== */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">▶️ {showVideoModal.video.title || 'Cours en direct'}</h3>
              <button onClick={() => setShowVideoModal(null)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <div className="bg-black rounded-xl p-8 text-center">
              <p className="text-white text-lg mb-4">📹 Lecteur vidéo</p>
              <div className="bg-gray-800 rounded-lg p-4">
                <a href={showVideoModal.video.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">🔗 Ouvrir la vidéo</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL FILE VIEWER (PDF, DOC, ETC.) ===== */}
      {showFileViewer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">📄 {showFileViewer.name}</h3>
              <button onClick={() => setShowFileViewer(null)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
            </div>
            <div className="bg-gray-100 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-gray-700 mb-4">{showFileViewer.name}</p>
              <p className="text-sm text-gray-500 mb-4">Taille: {(showFileViewer.size / 1024).toFixed(1)} KB</p>
              <p className="text-xs text-gray-400">Type: {showFileViewer.type || 'Document'}</p>
              <button 
                onClick={() => {
                  alert('📥 Téléchargement du fichier: ' + showFileViewer.name)
                  setShowFileViewer(null)
                }}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                📥 Télécharger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}