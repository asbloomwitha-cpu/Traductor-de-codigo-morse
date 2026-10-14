// ===================================================
// PROYECTO: TRADUCTOR DE CÓDIGO MORSE
// ARCHIVO PRINCIPAL (index.js)
// ===================================================

import './styles/main.css';
import { textoAMorse, morseATexto } from './js/traductor';
import { reproducirMorse, detenerAudio } from './js/sonido';
import { diccionarioMorse } from './js/diccionario';

// Modo inicial: Texto a Morse
let modoActual = 'textoAMorse';

// Referencias a los elementos del documento HTML
const entradaTexto = document.getElementById('entradaTexto');
const salidaTexto = document.getElementById('salidaTexto');
const etiquetaEntrada = document.getElementById('etiquetaEntrada');
const etiquetaSalida = document.getElementById('etiquetaSalida');
const btnCambiarModo = document.getElementById('btnCambiarModo');
const modoTextoBadge = document.getElementById('modoTextoBadge');

const btnLimpiar = document.getElementById('btnLimpiar');
const btnCopiar = document.getElementById('btnCopiar');
const btnReproducir = document.getElementById('btnReproducir');
const btnDetener = document.getElementById('btnDetener');

const luzLed = document.getElementById('luzLed');
const estadoLuzTexto = document.getElementById('estadoLuzTexto');
const tablaAlfabeto = document.getElementById('tablaAlfabeto');

// Función que actualiza la traducción en tiempo real
function actualizarTraduccion() {
  const valor = entradaTexto.value;

  if (!valor.trim()) {
    salidaTexto.value = '';
    return;
  }

  if (modoActual === 'textoAMorse') {
    salidaTexto.value = textoAMorse(valor);
  } else {
    salidaTexto.value = morseATexto(valor);
  }
}

// Función para cambiar de 'Texto a Morse' a 'Morse a Texto' y viceversa
function alternarModo() {
  detenerSonido();

  if (modoActual === 'textoAMorse') {
    modoActual = 'morseATexto';
    etiquetaEntrada.textContent = 'Código Morse:';
    etiquetaSalida.textContent = 'Texto traducido:';
    entradaTexto.placeholder = 'Escribe código Morse usando puntos y rayas (ej: .... --- .-.. .-)...';
    modoTextoBadge.textContent = 'Modo: Morse ➔ Texto';
  } else {
    modoActual = 'textoAMorse';
    etiquetaEntrada.textContent = 'Texto a traducir:';
    etiquetaSalida.textContent = 'Código Morse resultante:';
    entradaTexto.placeholder = 'Escribe aquí tu mensaje en texto normal...';
    modoTextoBadge.textContent = 'Modo: Texto ➔ Morse';
  }

  // Si ya había un resultado traducido, lo pasamos al cuadro de entrada
  const textoPrevio = salidaTexto.value;
  entradaTexto.value = textoPrevio;
  actualizarTraduccion();
}

// Función para encender o apagar el foco / LED indicador
function controlarLuzLed(encendida) {
  if (encendida) {
    luzLed.classList.add('activa');
    estadoLuzTexto.textContent = 'SEÑAL TRANSMITIENDO';
  } else {
    luzLed.classList.remove('activa');
    estadoLuzTexto.textContent = 'EN ESPERA';
  }
}

// Función para reproducir el audio de los puntos y rayas
function reproducirSonido() {
  let codigoMorseParaSonar = '';

  // Determinamos cuál caja tiene el código morse
  if (modoActual === 'textoAMorse') {
    codigoMorseParaSonar = salidaTexto.value;
  } else {
    codigoMorseParaSonar = entradaTexto.value;
  }

  if (!codigoMorseParaSonar.trim()) {
    alert('Por favor escribe algo primero para poder reproducir el sonido.');
    return;
  }

  // Mostramos el botón de detener y ocultamos el de reproducir
  btnReproducir.classList.add('oculto');
  btnDetener.classList.remove('oculto');

  reproducirMorse(
    codigoMorseParaSonar,
    controlarLuzLed,
    () => {
      // Al finalizar la reproducción
      btnReproducir.classList.remove('oculto');
      btnDetener.classList.add('oculto');
    }
  );
}

// Función para detener la reproducción de audio
function detenerSonido() {
  detenerAudio(controlarLuzLed);
  btnReproducir.classList.remove('oculto');
  btnDetener.classList.add('oculto');
}

// Función para copiar el resultado al portapapeles
function copiarResultado() {
  if (!salidaTexto.value) return;

  navigator.clipboard.writeText(salidaTexto.value).then(() => {
    const textoOriginal = btnCopiar.innerHTML;
    btnCopiar.innerHTML = '<span>¡Copiado! ✓</span>';
    btnCopiar.classList.add('btn-exito');

    setTimeout(() => {
      btnCopiar.innerHTML = textoOriginal;
      btnCopiar.classList.remove('btn-exito');
    }, 1500);
  });
}

// Función para borrar el contenido de los dos campos
function limpiarCampos() {
  detenerSonido();
  entradaTexto.value = '';
  salidaTexto.value = '';
  entradaTexto.focus();
}

// Carga las letras del abecedario en la sección inferior
function generarTablaAlfabeto() {
  if (!tablaAlfabeto) return;
  tablaAlfabeto.innerHTML = '';

  for (const [letra, morse] of Object.entries(diccionarioMorse)) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-morse';
    tarjeta.title = `Hacer clic para agregar la letra "${letra}"`;
    tarjeta.innerHTML = `
      <span class="letra">${letra}</span>
      <span class="codigo">${morse}</span>
    `;

    // Al hacer clic sobre cualquier tarjeta del alfabeto, se añade a la entrada
    tarjeta.addEventListener('click', () => {
      if (modoActual === 'textoAMorse') {
        entradaTexto.value += letra;
      } else {
        entradaTexto.value += (entradaTexto.value ? ' ' : '') + morse;
      }
      actualizarTraduccion();
    });

    tablaAlfabeto.appendChild(tarjeta);
  }
}

// Configuración de eventos al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  // Escuchar lo que escribe el usuario
  entradaTexto.addEventListener('input', actualizarTraduccion);

  // Botón para cambiar el modo
  btnCambiarModo.addEventListener('click', alternarModo);

  // Botones principales
  btnLimpiar.addEventListener('click', limpiarCampos);
  btnCopiar.addEventListener('click', copiarResultado);
  btnReproducir.addEventListener('click', reproducirSonido);
  btnDetener.addEventListener('click', detenerSonido);

  // Botones para escribir morse con un clic
  const btnPunto = document.getElementById('btnPunto');
  const btnRaya = document.getElementById('btnRaya');
  const btnEspacio = document.getElementById('btnEspacio');
  const btnBarra = document.getElementById('btnBarra');
  const btnBorrar = document.getElementById('btnBorrar');

  if (btnPunto) {
    btnPunto.addEventListener('click', () => {
      entradaTexto.value += '.';
      actualizarTraduccion();
    });
  }
  if (btnRaya) {
    btnRaya.addEventListener('click', () => {
      entradaTexto.value += '-';
      actualizarTraduccion();
    });
  }
  if (btnEspacio) {
    btnEspacio.addEventListener('click', () => {
      entradaTexto.value += ' ';
      actualizarTraduccion();
    });
  }
  if (btnBarra) {
    btnBarra.addEventListener('click', () => {
      entradaTexto.value += ' / ';
      actualizarTraduccion();
    });
  }
  if (btnBorrar) {
    btnBorrar.addEventListener('click', () => {
      entradaTexto.value = entradaTexto.value.slice(0, -1);
      actualizarTraduccion();
    });
  }

  // Botones de ejemplos rápidos
  const chips = document.querySelectorAll('.chip-ejemplo');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const textoEjemplo = chip.getAttribute('data-texto');
      if (modoActual !== 'textoAMorse') {
        alternarModo();
      }
      entradaTexto.value = textoEjemplo;
      actualizarTraduccion();
    });
  });

  // Generar la tabla de referencia
  generarTablaAlfabeto();
});
