# 📻 Traductor de Código Morse

**Proyecto Escolar de Programación Web**  
Una aplicación web sencilla, moderna y visualmente atractiva para convertir texto común a **Código Morse** y viceversa, con reproducción de sonido en tiempo real y visualizador LED.

---

## 🚀 Características del Proyecto

1. **Traducción bidireccional:**
   - **Texto ➔ Código Morse:** Convierte letras y números en secuencias de puntos (`.`) y rayas (`-`).
   - **Morse ➔ Texto:** Traduce código Morse de vuelta a palabras legibles.
   - Botón para intercambiar el sentido de traducción al instante.

2. **Sonido con Web Audio API:**
   - Pitidos cortos para los puntos y pitidos largos para las rayas.
   - Botón para reproducir el audio y botón para detenerlo en cualquier momento.

3. **Luz LED interactiva:**
   - Un foco indicador que se ilumina en amarillo brillante de manera sincronizada con cada sonido.

4. **Teclado rápido de Morse:**
   - Botones táctiles para insertar fácilmente: punto (`•`), raya (`—`), espacio y separador (`/`).

5. **Utilidades prácticas:**
   - Botón para copiar el resultado al portapapeles.
   - Botón para limpiar los campos de texto.
   - Botones con ejemplos rápidos (`SOS`, `Hola Mundo`, `Código Morse`, `Estudiante`).

6. **Alfabeto Morse de consulta:**
   - Tabla interactiva con el abecedario completo (A-Z) y los números (0-9). Al hacer clic en cualquier letra, se añade directamente a la caja de texto.

---

## 📁 Estructura del Código

El proyecto está organizado de manera clara y fácil de entender:

```text
Codigo Morse/
├── src/
│   ├── index.html           # Estructura de la página web
│   ├── index.js             # Archivo principal y eventos de los botones
│   ├── js/
│   │   ├── diccionario.js   # Objeto con las equivalencias de letras a Morse
│   │   ├── traductor.js     # Funciones que traducen texto a morse y viceversa
│   │   └── sonido.js        # Lógica para reproducir los pitidos y encender el LED
│   └── styles/
│       └── main.css         # Diseño moderno, colores oscuros y estilos responsivos
├── dist/                    # Archivos compilados listos para entrega o navegador
├── package.json             # Configuración del proyecto y scripts
└── webpack.config.js        # Configuración del empaquetador Webpack
```

---

## 💡 ¿Cómo funciona el código?

1. **Diccionario (`src/js/diccionario.js`):**  
   Contiene un objeto `diccionarioMorse` donde cada letra es una clave (ej: `'A': '.-'`). El diccionario inverso para Morse a texto se genera automáticamente con un bucle `for...of` usando `Object.entries()`.

2. **Traducción (`src/js/traductor.js`):**  
   - `textoAMorse()`: Pasa el texto a mayúsculas, separa las palabras y busca cada letra en el diccionario, uniendo las letras con espacios y las palabras con `' / '`.
   - `morseATexto()`: Divide por barras `'/'` y por espacios para reconstruir las palabras.

3. **Sonido (`src/js/sonido.js`):**  
   Utiliza el `AudioContext` nativo del navegador. Crea un oscilador senoidal en 650 Hz que emite un pitido de 100 ms para los puntos y de 300 ms para las rayas, sincronizándose con la clase CSS `.activa` de la luz LED.

4. **Interfaz (`src/index.js`):**  
   Usa `document.getElementById()` y `addEventListener()` para escuchar cuando el usuario escribe o hace clic en los botones.

---

## 🛠️ Cómo ejecutar el proyecto

### Opción 1: Con npm (Modo desarrollo)
Si tienes Node.js instalado:

```bash
# Iniciar servidor local de desarrollo
npm start
```

### Opción 2: Compilar el proyecto para entrega
```bash
# Genera los archivos finales en la carpeta dist/
npm run build
```

Los archivos finales quedarán en la carpeta `dist/` y pueden abrirse directamente en cualquier navegador web.
