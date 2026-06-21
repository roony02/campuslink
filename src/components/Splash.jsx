import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const timer = setTimeout(() => {
      navigate('/home')
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-8xl mb-6 animate-bounce">🎓</div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">CampusLink</h1>
        <p className="text-indigo-200 text-lg md:text-xl mb-8">Le réseau social des universités</p>

        <div className="w-64 md:w-80 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-indigo-300 text-sm mt-4">Chargement en cours... {progress}%</p>
        <p className="text-indigo-400 text-xs mt-8">Version 1.0.0</p>
      </div>
    </div>
  )
}