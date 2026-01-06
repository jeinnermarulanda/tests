// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    // 📸 Captura de pantalla: solo si la prueba falla
    screenshot: 'only-on-failure',
    
    // 🎥 Video: 'on' para grabar siempre, 'retain-on-failure' para guardarlo solo si falla
    // Lo pondremos en 'on' para que pueda ver su éxito en producción
    video: 'on', 
    
    // 🔍 Trace: Genera un archivo que permite debugear paso a paso
    trace: 'on-first-retry',
  },
  reporter: [
    ['html', { open: 'never' }] // Genera el reporte HTML que ya aprendió a descargar
  ],
});