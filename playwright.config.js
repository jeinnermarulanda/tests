// playwright.config.js
require('dotenv').config(); 
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // 1. ORGANIZACIÓN: Definimos dónde están los tests para que el comando sea más limpio
  testDir: './tests',
  
  // 2. PARALELISMO: Aprovechamos los núcleos de la PC o del servidor de GitHub
  fullyParallel: true,
  
  use: {
    /* 3. OPTIMIZACIÓN DE URL: 
       Agregamos una opción por defecto para evitar que falle si el .env no existe.
       Usamos BASE_URL (estándar de la industria).
    */
    baseURL: process.env.BASE_URL || 'https://the-internet.herokuapp.com/login',
    
    screenshot: 'only-on-failure',
    video: 'on',
    
    launchOptions: {
      slowMo: 500, // Excelente para auditoría visual del video
    },
    
    // Cambiamos a 'retain-on-failure' para no saturar el almacenamiento en el futuro,
    // pero lo dejamos en 'on' si aún desea estudiar cada ejecución.
    trace: 'on', 
  },

  // 4. MULTI-NAVEGADOR: Aseguramos que funcione en Chrome y Firefox con un solo comando
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  reporter: [
    ['html', { open: 'never' }],
    ['list'] // Agregamos 'list' para ver el progreso en la consola mientras corre
  ],
});