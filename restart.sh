#!/bin/bash

echo "🔄 Reiniciando servidor de autenticación..."

# Matar el proceso actual
pkill -f "next dev"

# Esperar un momento
sleep 2

# Iniciar el servidor nuevamente
npm run dev
