// ==========================================
// REPRODUCTOR DE SONIDO (WEB AUDIO API)
// ==========================================

let contextoAudio = null;
let reproduciendo = false;
let idTemporizador = null;

// Obtiene o inicializa el AudioContext del navegador
function obtenerContextoAudio() {
  if (!contextoAudio) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    contextoAudio = new AudioContextClass();
  }
  if (contextoAudio.state === 'suspended') {
    contextoAudio.resume();
  }
  return contextoAudio;
}

// Función auxiliar para emitir un pitido simple con una duración en milisegundos
function emitirPitido(duracionMs, callbackLuz) {
  return new Promise((resolve) => {
    if (!reproduciendo) {
      resolve();
      return;
    }

    const ctx = obtenerContextoAudio();
    const oscilador = ctx.createOscillator();
    const ganancia = ctx.createGain();

    // Sonido tipo tono senoidal clásico de telegrafía
    oscilador.type = 'sine';
    oscilador.frequency.value = 650; // 650 Hz (tono estándar agradable)

    oscilador.connect(ganancia);
    ganancia.connect(ctx.destination);

    // Encender la luz LED visual
    if (callbackLuz) callbackLuz(true);

    oscilador.start();

    idTemporizador = setTimeout(() => {
      oscilador.stop();
      oscilador.disconnect();

      // Apagar la luz LED visual
      if (callbackLuz) callbackLuz(false);
      resolve();
    }, duracionMs);
  });
}

// Función auxiliar para esperar un tiempo en silencio (pausa)
function esperarPausa(duracionMs) {
  return new Promise((resolve) => {
    if (!reproduciendo) {
      resolve();
      return;
    }
    idTemporizador = setTimeout(resolve, duracionMs);
  });
}

/**
 * Reproduce el código Morse carácter por carácter:
 * - Punto (.)  -> Pitido corto (100 ms)
 * - Raya (-)   -> Pitido largo (300 ms)
 * - Espacio    -> Pausa entre letras (250 ms)
 * - Barra (/)  -> Pausa entre palabras (500 ms)
 */
export async function reproducirMorse(codigoMorse, callbackLuz, callbackFin) {
  detenerAudio(callbackLuz);

  if (!codigoMorse || typeof codigoMorse !== 'string') return;

  reproduciendo = true;

  const TIEMPO_PUNTO = 100;
  const TIEMPO_RAYA = 300;
  const PAUSA_ENTRE_SIMBOLOS = 100;
  const PAUSA_ENTRE_LETRAS = 250;
  const PAUSA_ENTRE_PALABRAS = 500;

  for (let i = 0; i < codigoMorse.length; i++) {
    if (!reproduciendo) break;

    const simbolo = codigoMorse[i];

    if (simbolo === '.') {
      await emitirPitido(TIEMPO_PUNTO, callbackLuz);
      await esperarPausa(PAUSA_ENTRE_SIMBOLOS);
    } else if (simbolo === '-') {
      await emitirPitido(TIEMPO_RAYA, callbackLuz);
      await esperarPausa(PAUSA_ENTRE_SIMBOLOS);
    } else if (simbolo === ' ') {
      await esperarPausa(PAUSA_ENTRE_LETRAS);
    } else if (simbolo === '/') {
      await esperarPausa(PAUSA_ENTRE_PALABRAS);
    }
  }

  reproduciendo = false;
  if (callbackLuz) callbackLuz(false);
  if (callbackFin) callbackFin();
}

/**
 * Detiene la reproducción de sonido inmediatamente
 */
export function detenerAudio(callbackLuz) {
  reproduciendo = false;
  if (idTemporizador) {
    clearTimeout(idTemporizador);
    idTemporizador = null;
  }
  if (callbackLuz) callbackLuz(false);
}

/**
 * Indica si el audio se está reproduciendo en este momento
 */
export function estaReproduciendoAudio() {
  return reproduciendo;
}
