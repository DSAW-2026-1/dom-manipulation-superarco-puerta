const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  taskCounter.textContent = `Tareas pendientes: ${pendingTasks}`;
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<li class="empty-message">No hay tareas todavía.</li>`;
    updateCounter();
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");

    if (task.completed) {
      span.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(span);

    li.appendChild(taskLeft);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });

  updateCounter();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTaskText = taskInput.value.trim();

  if (newTaskText === "") {
    alert("Por favor escribe una tarea.");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: newTaskText,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
});

renderTasks();