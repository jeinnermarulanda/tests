// tests/login_ddt.spec.js

const { test, expect } = require('@playwright/test');
const data = require('./login_data.json'); // Asegúrese de que la ruta sea correcta

// Si existe la variable en GitHub/Terminal, úsala; si no, usa la local del .env o una fija.
const LOGIN_URL = process.env.BASE_URL || 'https://the-internet.herokuapp.com/login';

// Iterar sobre cada objeto de datos en el archivo JSON
for (const testData of data) {
    
    //test(`[${testData.id}] Login con ${testData.username} - Resultado Esperado: ${testData.expected_type}`, async ({ page }) => {
    test(`[${testData.id}] Flujo Extendido - Resultado ${testData.expected_type}`, async ({ page, baseURL }) => {    
        
        console.log(`Ejecutando ID: ${testData.id}`);

        await page.goto(baseURL);
        
        // 1. Rellenar campos usando los datos del JSON
        await page.locator('#username').fill(testData.username);
        await page.locator('#password').fill(testData.password);
        
        await page.locator('.fa-sign-in').click(); // Clic en el botón Login

        // 2. Aserción basada en el tipo esperado
        if (testData.expected_type === 'success') {
            const successMessage = page.locator('.flash.success');
            
            // Verificación del mensaje de éxito
            await expect(successMessage).toContainText(testData.expected_text);
            
            // Verifica la redirección a /secure
            await expect(page).toHaveURL(/secure/); 
            
        } else if (testData.expected_type === 'error') {
            const errorMessageLocator = page.locator('.flash.error');
            
            // 1. ESPERAR a que el mensaje de error sea visible
            await expect(errorMessageLocator).toBeVisible(); 
            
            // 2. OBTENER EL TEXTO COMPLETO Y LIMPIARLO DE RUIDO
            const receivedText = await errorMessageLocator.innerText();
            // El .trim() elimina espacios/saltos de línea iniciales/finales.
            const cleanText = receivedText.trim(); 
            
            // 3. ASERCIÓN ROBUSTA: Verificación que el texto limpio contenga la palabra clave.
            const expectedLowerCase = testData.expected_text.toLowerCase();
            
            expect(cleanText.toLowerCase()).toContain(expectedLowerCase);
            
            // Verifica que se quede en la página de login
            await expect(page).toHaveURL(LOGIN_URL); 
        }
    });
} 