#!/bin/bash

echo "🚀 Démarrage de CampusLink..."

# Lancer le backend
cd ~/campuslink/backend
node server.js &

# Attendre un peu
sleep 2

# Lancer le frontend
cd ~/campuslink
npm run dev &

echo "✅ CampusLink démarré sur http://localhost:5173"
echo "📱 Appuyez sur Ctrl+C pour arrêter"
