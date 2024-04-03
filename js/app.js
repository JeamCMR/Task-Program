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

 