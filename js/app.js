/*Variables*/

const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const tasksContainer = document.getElementById("tasks-container"); //div donde mostrara las tareas creadas

// console.log(confirmCloseDialog)
//Botones
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");

//label
const titleInput = document.getElementById("title-input");

//input
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input"); //Text Area

//Variables de almacenamiento
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

/*Eventos y funciones*/

//  Valida si hay una tarea dentro de taskData si hay llama a la funciona

//Guardar variables en el array taskData  y valida si el el id existe
const addOrUpdateTask = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  //El metodo.findeIndex recorre un array y return el indice del primer elemento que cumpla con
  //los creterios especificados en la funcion callback, si no encuentran un elemento return -1
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  const taskObj = {
    //se crea un objeto con los valores de los input.
    //el id es el valor del titleinput en minusculas separado por un "-" y le agregra el valor en milisegundos al final para que sea unico
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  if (dataArrIndex === -1) {
    //Valida en el array si existe un tarea con el id igual al selecionado
    //si no  agrega el objeto al comienzo del array
    taskData.unshift(taskObj); //unshift() es un método de matriz que se utiliza para agregar uno o más elementos al comienzo de una matriz.
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem("data", JSON.stringify(taskData)); //guarda los datos de forma local
  updateTaskContainer();
  reset();
};


//Recore el array con forEach
const updateTaskContainer = () => {
  tasksContainer.innerHTML = ""; //Limpia el html antes de recorer el array
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
            <div class="task" id="${id}">
                <p><strong>Title:</strong>${title}</p>
                <p><strong>Date:</strong>${date}</p>
                <p><strong>Description:</strong>${description}</p>
                <button type="button" class="btn" onclick="editTask(this)">Edit</button> 
                <button type="button" class="btn" onclick="deleteTask(this)">Delete</button> 
            </div>
            `;
  });
};

//Boton Borrar tarea
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  console.log(dataArrIndex);
  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1); //el metodo split modifica una matriz eliminando, remplazando o agregando un elmento en el indice especidicado, este retorna los elementos eliminados
  localStorage.setItem("data", JSON.stringify(taskData)); //guarda nuevamente en localStorage la matriz con los cambios realizados
};

//Boton Editar tarea
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex]; //pasa los valores de la tara al objeto
  //console.log("currentTask: "+ currentTask);
  //remplaza los valores a editar de la tarea selecionada
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  console.log(buttonEl.parentElement.id);
  addOrUpdateTaskBtn.innerText = "Update Task"; //Cambia el texto del boton
  taskForm.classList.toggle("hidden"); //muestra el cuadro de dialogo
};

//Limpiar campos de input
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

//Mostrar el formulario al darle clic en el boton agregar tarea
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden"); //El metodo classList.toggle (alternancia) agrega una clase
  //cuando esta no esta presente en el elemnto y elimina una clase cuando esta esta en el elemento
});

//Mostrar modal (dialog) al dar click en el boton x (salir)
closeTaskFormBtn.addEventListener("click", () => {
  //validar si en los input hay algun texto
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

//Cerrar cuadro de dialogo al dar click en el boton Cancelar
cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
});

//Cerrar cuadro de dialogo y esconder el formulario al dar click en el boton descartar
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

// Mostrar las tareas en el html
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // no actualizar la pagina cuando ese envie la informacion del formulario
  addOrUpdateTask();
  //  console.log(taskObj.id);
});

//colocarlo al final si no da error
if (taskData.length) {
  updateTaskContainer();
}

/**LOCALSTORAGE 
  const myTaskArr = [
    { task: "Walk the Dog", date: "22-04-2022" },
    { task: "Read some books", date: "02-11-2023" },
    { task: "Watch football", date: "10-08-2021" },
  ];


localStorage.setItem("data", JSON.stringify(myTaskArr));  /*todo lo que se guarda en localStorage debe estar en formato string
con JSON.stringify podemos pasar los datos y estos los convierte en un json 

const getTaskArr = localStorage.getItem("data");
console.log(getTaskArr);


const getTaskArrObj  = JSON.parse( localStorage.getItem("data")); //JSON.parse convierte un objeto de notacion json(string) a un object de js
console.log(getTaskArrObj);


// localStorage.removeItem("data"); //Elimina 1 elemento en especifico del localStorage
localStorage.clear();// Elimina todos los elementos del localStorage


  /**LocalStorage methods
   * Por ejemplo, el método setItem() se utiliza para guardar un elemento y 
   * el método getItem() recupera el elemento. 
   * Para eliminar un elemento específico, puede utilizar el método removeItem(), 
   * o si desea eliminar todos los elementos del almacenamiento, puede utilizar clear().
   */
