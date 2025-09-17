#!/bin/bash

# Script para configurar e testar código compartilhado
# entre React Web e React Native

echo "🚀 Iniciando configuração de código compartilhado..."

# 1. Build do código compartilhado
echo "📦 Construindo código compartilhado..."
cd shared
npm install
npm run build
cd ..

# 2. Instalar dependências do mobile (se necessário)
echo "📱 Verificando dependências mobile..."
cd MeetingMinutesApp
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

# 3. Testar build web
echo "🌐 Testando build web..."
npm run build

# 4. Testar bundle mobile
echo "📱 Testando bundle mobile..."
cd MeetingMinutesApp
npx react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android/app/src/main/assets/index.android.bundle \
    --reset-cache

echo "✅ Configuração concluída com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "  - Para desenvolvimento web: npm run dev"
echo "  - Para desenvolvimento mobile: cd MeetingMinutesApp && npm run start"
echo "  - Código compartilhado em: ./shared/src/"