// ==========================================
// DICCIONARIO DE CÓDIGO MORSE
// ==========================================

// Tabla de equivalencias de letras, números y símbolos a Código Morse
export const diccionarioMorse = {
  // Letras del alfabeto (A-Z)
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..',

  // Letra Ñ (español)
  'Ñ': '--.--',

  // Dígitos (0-9)
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',

  // Puntuación básica
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  '!': '-.-.--'
};

// Diccionario inverso: Código Morse -> Letra / Número
// Se genera automáticamente para no tener que escribirlo dos veces
export const diccionarioTexto = {};

for (const [letra, morse] of Object.entries(diccionarioMorse)) {
  diccionarioTexto[morse] = letra;
}
