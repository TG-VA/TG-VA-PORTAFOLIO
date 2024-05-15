const promtInput = document.getElementById('promtInput'); // Encuentra y guarda el elemento HTML que tiene el ID promtInput.
const terminal = document.getElementById('terminal'); //Encuentra y guarda el elemento donde se mostrarán los resultados o los mensajes del terminal.
const terminalWindow = document.getElementById('terminalWindow'); //Guarda el contenedor principal del terminal
const date = document.getElementById('date');  //Encuentra y guarda un elemento que se usa para mostrar la fecha

promtInput.focus(); //Coloca el cursor en el elemento promtInput para que puedas empezar a escribir directamente.
date.innerText = new Date().toDateString(); // Muestra la fecha actual en el elemento date.
terminalWindow.addEventListener('click', () => promtInput.focus()); //Si haces clic en cualquier parte del terminalWindow, el cursor se moverá al promtInput.

/*
Añade un evento que escucha cada vez que presionas una tecla dentro del promtInput.
 Si la tecla es "Enter", llama a la función enterCommand con el evento como argumento.
*/
promtInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    enterCommand(event);
  }
})

const enterCommand = (event) => {
  const promtElement = document.getElementById('promptClone').cloneNode(true); //Clona un elemento de plantilla
  promtElement.classList.remove('hidden'); //Hace visible el elemento clonado
  promtElement.getElementsByClassName('promtCloneInput')[0].innerHTML = event.target.value; //Inserta el comando ingresado
  promtElement.setAttribute('id', null); // Elimina el ID del clon
  promtElement.getElementsByClassName('promtCloneContent')[0].appendChild(selectCommandBlock(event.target.value));
  terminal.appendChild(promtElement); //Ejecuta y muestra el resultado del comando
  promtInput.value = ''; //Añade el clon al terminal
  promtInput.scrollIntoView({block: 'start'}); //Limpia el elemento de entrada y ajusta el enfoque
}

/* 
Dependiendo del comando escrito, devuelve diferentes elementos HTML. 
Puede devolver una plantilla predefinida para comandos conocidos, un mensaje de error para comandos no reconocidos, o limpiar la terminal.
*/
const selectCommandBlock = (command) => {
  const lowerCommand = command.toLowerCase()
  switch (lowerCommand) {
    case 'help':
    case 'sumfetch':
      return getCommandTemplate(lowerCommand);
    case 'clear':
      return clearCommand();
    default:
      return notFoundCommand(command);
  }
}

//Retorna un clon de un elemento predefinido para ciertos comandos
const getCommandTemplate = (command) => {
  const element = document.getElementById(command).cloneNode(true);
  element.classList.remove('hidden');
  element.setAttribute('id', null);
  return element;
}

//Limpia el terminal.
const clearCommand = () => {
  terminal.innerHTML = '';
  const element = document.createElement('span');
  return element;
}

// Retorna un mensaje de error indicando que el comando no se encontró.
const notFoundCommand = (command) => {
  const element = document.createElement('span');
  element.innerText = `-bash: ${command}: command not found`;
  element.classList.add('error');
  return element;
}