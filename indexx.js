function firstLoad() {
  const tasks = getTasks();
  for (task of tasks) {
    const isFuture = isFutureNote(task.date_input, task.time_input);
    if (isFuture === false) {
      alert("the task: " + task.text_input + " date and time has expired");
      removeFromLocalStorage(task);
    } else {
      createTaskElement(task);
    }
  }
}
window.onload = firstLoad;

function isFutureNote(note_date, note_time) {
  const noteDate = new Date(note_date + " " + note_time);
  const now = new Date();
  if (noteDate > now) {
    return true;
  } else {
    return false;
  }
}

function save_button() {
  const text_input = document.getElementById("text_details").value;
  const date_input = document.getElementById("dueDate_details").value;
  const time_input = document.getElementById("dueTime_details").value;
  const created_Date = String(new Date());
  //added the current date and make it a string because it will be stigifyed from local storage anyway. so i need it in the right syntax so i can delete this element from the array also before it goes in and out of the local storage.
  const task = {
    text_input,
    date_input,
    time_input,
    created_Date,
  };

  const biggerDate = isFutureNote(task.date_input, task.time_input);

  if (biggerDate === false) {
    alert("the task's date and time is expired");
  } else {
    addTask(task);
    createTaskElement(task);
    resetFields();
  }
}

function resetFields() {
  document.getElementById("text_details").value = "";
  document.getElementById("dueDate_details").value = "";
  document.getElementById("dueTime_details").value = "";
}

function getTasks() {
  const json = localStorage.getItem("tasks");
  if (json) {
    return JSON.parse(json);
  } else {
    return [];
  }
}

function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  const json = JSON.stringify(tasks);
  localStorage.setItem("tasks", json);
}

function createTaskElement(object) {
  let taskNote = document.createElement("div");
  taskNote.classList.add("taskNoteStyle");
  let noteTidier = document.createElement("div");
  noteTidier.classList.add("noteTidier");
  let taskDetails = document.createElement("p");
  taskDetails.classList.add("taskDetails");
  let TimeAndDateContainer = document.createElement("div");
  TimeAndDateContainer.classList.add("TimeAndDateContainer");
  let taskDate = document.createElement("p");
  taskDate.style = "line-height: 0";
  let taskTime = document.createElement("p");
  let CancelButton = document.createElement("span");
  CancelButton.classList.add("close", "bi", "bi-x", "hidden");
  //insert values to the elements
  taskDetails.innerHTML = object.text_input;
  taskDate.innerHTML = object.date_input;
  taskTime.innerHTML = object.time_input;
  //insert elements to each other and to html
  TimeAndDateContainer.appendChild(taskDate);
  TimeAndDateContainer.appendChild(taskTime);
  noteTidier.appendChild(taskDetails);
  noteTidier.appendChild(TimeAndDateContainer);
  noteTidier.appendChild(CancelButton);
  taskNote.appendChild(noteTidier);
  document.getElementById("notes").appendChild(taskNote);
  // this class is defined here because you must first load the html and then add the css animation
  taskNote.classList.add("fadeIn");
  CancelButton.addEventListener(
    "click",
    function () {
      taskNote.remove();
      removeFromLocalStorage(object);
    },
    false
  );
}

function removeFromLocalStorage(task) {
  const tasks = getTasks();
  const newArray = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].created_Date !== task.created_Date) {
      newArray.push(tasks[i]);
    }
  }
  const json = JSON.stringify(newArray);
  localStorage.setItem("tasks", json);
}
