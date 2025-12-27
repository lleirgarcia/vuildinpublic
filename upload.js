#!/usr/bin/env node

/**
 * Script para subir cambios a git de forma rápida
 * Uso: node upload.js [mensaje del commit]
 *      npm run upload [mensaje del commit]
 */

const { execSync } = require('child_process');
const readline = require('readline');

const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, { 
      encoding: 'utf8', 
      stdio: 'inherit',
      ...options 
    });
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

function checkChanges() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim().length > 0;
  } catch {
    return false;
  }
}

async function getCommitMessage() {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    return args.join(' ');
  }

  // Si no hay mensaje, usar timestamp
  const now = new Date();
  return `Update: ${now.toISOString().replace('T', ' ').slice(0, 19)}`;
}

async function main() {
  log('📦 Subiendo cambios a git...', 'yellow');

  // Verificar si hay cambios
  if (!checkChanges()) {
    log('⚠️  No hay cambios para subir', 'yellow');
    return;
  }

  // Obtener mensaje del commit
  const commitMsg = await getCommitMessage();

  // Agregar todos los cambios
  log('➕ Agregando cambios...', 'yellow');
  exec('git add -A');

  // Hacer commit
  log(`💾 Haciendo commit: ${commitMsg}`, 'yellow');
  exec(`git commit -m "${commitMsg}"`);

  // Hacer push
  log('🚀 Subiendo a origin/main...', 'yellow');
  exec('git push origin main');

  log('✅ Cambios subidos exitosamente!', 'green');
}

main().catch(error => {
  log(`❌ Error: ${error.message}`, 'red');
  process.exit(1);
});

