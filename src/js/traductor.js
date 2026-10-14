// ==========================================
// FUNCIONES DE TRADUCCIÓN
// ==========================================

import { diccionarioMorse, diccionarioTexto } from './diccionario';

/**
 * Traduce una cadena de texto normal a código Morse.
 * - Cada letra se separa por un espacio.
 * - Cada palabra se separa por una barra ' / '.
 */
export function textoAMorse(texto) {
  if (!texto || typeof texto !== 'string') return '';

  // Pasamos todo a mayúsculas para coincidir con el diccionario
  const textoMayusculas = texto.toUpperCase().trim();
  
  // Separamos el texto en palabras según los espacios
  const palabras = textoMayusculas.split(/\s+/);

  const palabrasTraducidas = palabras.map(palabra => {
    const letrasTraducidas = [];

    // Recorremos cada letra de la palabra
    for (let i = 0; i < palabra.length; i++) {
      const caracter = palabra[i];

      if (diccionarioMorse[caracter]) {
        letrasTraducidas.push(diccionarioMorse[caracter]);
      } else {
        // Si no está en el diccionario, dejamos el carácter igual
        letrasTraducidas.push(caracter);
      }
    }

    // Unimos las letras con un espacio
    return letrasTraducidas.join(' ');
  });

  // Unimos las palabras con un separador de barra ' / '
  return palabrasTraducidas.join(' / ');
}

/**
 * Traduce una cadena de código Morse a texto legible.
 * - Espera que las letras estén separadas por espacios.
 * - Espera que las palabras estén separadas por barras '/'.
 */
export function morseATexto(morse) {
  if (!morse || typeof morse !== 'string') return '';

  // Limpiamos y normalizamos símbolos similares (como guiones largos o viñetas)
  const morseLimpio = morse
    .replace(/[•●·]/g, '.')
    .replace(/[—–_]/g, '-')
    .trim();

  // Separamos por palabras (usando la barra '/')
  const palabrasMorse = morseLimpio.split('/');

  const palabrasTraducidas = palabrasMorse.map(palabraMorse => {
    // Separamos por espacios para obtener cada letra
    const letrasMorse = palabraMorse.trim().split(/\s+/);
    let palabraResultante = '';

    for (const codigo of letrasMorse) {
      if (codigo === '') continue;

      if (diccionarioTexto[codigo]) {
        palabraResultante += diccionarioTexto[codigo];
      } else {
        palabraResultante += '?'; // Indicador de carácter desconocido
      }
    }

    return palabraResultante;
  });

  // Unimos las palabras con un espacio normal
  return palabrasTraducidas.join(' ');
}
