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
const taskData = [];
let currentTask = {};

 //Eventos
//Mostrar el formulario al darle clic en el boton agregar tarea
openTaskFormBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden"); //El metodo classList.toggle (alternancia) agrega una clase
    //cuando esta no esta presente en el elemnto y elimina una clase cuando esta esta en el elemento
  });
  
  //Mostrar modal (dialog) al dar click en el boton x (salir)
  closeTaskFormBtn.addEventListener("click", () => {
    confirmCloseDialog.showModal();
  });
  
  //Cerrar cuadro de dialogo al dar click en el boton Cancelar
  cancelBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
  });
  
  //Cerrar cuadro de dialogo y esconder el formulario al dar click en el boton descartar
  discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    taskForm.classList.toggle("hidden");
  });
  
  //Guardar variables en el array taskData y mostrarlas en el html
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // no actualizar la pagina cuando ese envie la informacion del formulario
  
    //El metodo.findeIndex recorre un array y return el indice del primer elemento que cumpla con
    //los creterios especificados en la funcion callback, si no encuentran un elemento return -1
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
    console.log("INDICE: " + dataArrIndex);
  
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
    }
  
    taskData.forEach(({ id, title, date, description }) => {
      tasksContainer.innerHTML += `
          <div class="task" id="${id}">
              <p><strong>Title:</strong>${title}</p>
              <p><strong>Date:</strong>${date}</p>
              <p><strong>Description:</strong>${description}</p>
              <button type="button" class="btn">Edit</button>
              <button type="button" class="btn">Delete</button>
          </div>
          `;
    });
    taskForm.classList.toggle("hidden");
    //  console.log(taskObj.id);
    // console.log(taskData);
  });
  