const tasks =
  localStorage.getItem("tasks") === null
    ? {}
    : JSON.parse(localStorage.getItem("tasks"));

function dtgString(date) {
  return {
    date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`,
    time: `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`,
  };
}

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function validate(key, value) {
  return true;
}

function formSubmit(event) {
  event.preventDefault();
  let valid = true;
  let form = event.target;
  let data = {};

  /** Validate input */
  for ([k, v] of new FormData(form)) {
    input = form.querySelector(`[id*="${capitalise(k)}"]`);
    if (validate(k, v)) {
      data[k] = v;
    } else {
      valid = false;
    }
  }

  if (valid) {
    if (data.action === "new") {
      task = {
        text: data.text,
        time: Date.parse(data.date + "T" + data.time),
        status: 'incomplete'
      };
      tasks[uuid()] = task;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      drawTasks();
    }
    if (data.action === "edit") {
      task = {
        text: data.text,
        time : Date.parse(data.date + "T" + data.time),
        status: 'incomplete'
      }
      tasks[data.id] = task;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      form.parentNode.replaceChild(drawTask(data.id,task), form);
    }
  } else {
  }
}

function uuid () {
  let uuid = ''
  for(let i = 0; i < 16; i++){
    let digit = Math.floor(Math.random()*256)
    if(i == 4 || i == 6 ||  i == 8){uuid += '-'}
    uuid += digit.toString(16).padStart(2,'0');
  }
  return uuid;
}

function newForm(task = {}) {
  let newTask = task.status === undefined;
  let idHelper = newTask ? "new" : "edit";

  let form = document.createElement("form");
  form.id = `${idHelper}TaskForm`;
  form.className = "h-7 flex";

  let text = document.createElement("input");
  text.type = "text";
  text.name = "text";
  text.id = `${idHelper}TaskText`;
  text.placeholder = "TODO Task";
  text.value = newTask ? "" : task.text;
  text.className = "bg-neutral-500 h-full pl-2 rounded-l-md w-96";
  form.appendChild(text);

  let time = document.createElement("input");
  time.type = "time";
  time.name = "time";
  time.id = `${idHelper}TaskTime`;
  time.value = dtgString(newTask ? new Date() : new Date(task.time)).time;
  time.className = "bg-neutral-500 w-20";
  form.appendChild(time);

  let date = document.createElement("input");
  date.type = "date";
  date.name = "date";
  date.id = `${idHelper}TaskDate`;
  date.value = dtgString(newTask ? new Date() : new Date(task.time)).date;
  date.className = "bg-neutral-500 w-36 pr-2";
  form.appendChild(date);

  let button = document.createElement("button");
  button.type = "submit";
  button.name = "submit";
  button.id = `${idHelper}TaskSubmit`;
  button.innerText = "Send It!";
  button.className = "bg-neutral-300 w-20 px-2 h-full rounded-r-md";
  form.appendChild(button);

  let hidden = document.createElement("input");
  hidden.type = "hidden";
  hidden.name = "action";
  hidden.value = idHelper;
  form.appendChild(hidden);

  if (!newTask){
    let taskID = document.createElement("input");
    taskID.type = "hidden";
    taskID.name = "id";
    taskID.value = task.id;
    form.appendChild(taskID)
  }

  form.addEventListener("submit", (e) => formSubmit(e));

  return form;
}

/**
 * Redraws the task container
 */
function drawTasks(order={col:'id', order:'asc'}, filter={col:'status',includes:'incomplete'}) {
  /** remove the task container if it exists*/
  document.querySelector("#task-container") && document.querySelector("#task-container").remove();

  /** create and describe new task container */
  let container = document.createElement("div");
  container.id = "task-container";

  /** filter or sort tasks */
  let filteredTasks = Object.fromEntries(Object.entries(tasks).filter(([key,value]) => value[filter.col] === filter.includes))
  /** fill task container with all tasks */
  for (let taskID in filteredTasks) {
    let task = tasks[taskID]
    container.appendChild(drawTask(taskID,task));
  }
  document.body.appendChild(container);
}

function drawTask(taskID, taskObject) {
  let taskDTG = new Date(taskObject.time);

  /** creates and defines the container for a individual task */
  let taskElement = document.createElement("div");
  taskElement.id = taskID
  taskElement.className = "flex h-7 bg-neutral-500 text-white";

  /** creates the container for the task text
   * and attaches it to the task container
   */
  let textElement = document.createElement("div");
  textElement.textContent = taskObject.text;
  textElement.className = "w-96";
  taskElement.appendChild(textElement);

  /** creates the container for the task time
   * and attaches it to the task container
   */
  let timeElement = document.createElement("div");
  timeElement.textContent = dtgString(taskDTG).time;
  timeElement.className = "w-20";
  taskElement.appendChild(timeElement);

  /** creates the container for the task date
   * and attaches it to the task container
   */
  let dateElement = document.createElement("div");
  dateElement.textContent = dtgString(taskDTG).date;
  dateElement.className = "w-36";
  taskElement.appendChild(dateElement);

  /** creates the container for the task buttons */
  let taskButtons = document.createElement("div");

  /** creates an edit button and attaches it
   * to the task button container
   */
  let editButton = document.createElement("button");
  editButton.textContent = "E";
  editButton.className = "bg-neutral-300 text-black w-10";
  editButton.addEventListener("click", (e)=>{
    let parent = e.path[3];
    let oldElement = e.path[2];
    let task = tasks[oldElement.id]
    task.id = oldElement.id;
    let form = newForm(task);
    
    parent.replaceChild(form,oldElement)
  });
  taskButtons.appendChild(editButton);

  /** creates a complete button and attaches it
   * to the task button container
   */
  let completeButton = document.createElement("button");
  completeButton.textContent = "C";
  completeButton.className = "bg-neutral-300 text-black w-10";
  completeButton.addEventListener('click',(e) => {
    let task = e.path[2];
    tasks[task.id].status = "complete";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    drawTasks();
  })
  taskButtons.appendChild(completeButton);

  /** attaches the button container to the task container */
  taskElement.appendChild(taskButtons);

  return taskElement;
}

body = document.querySelector("body");
body.appendChild(newForm());
drawTasks();
