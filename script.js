const todoForm = document.getElementById("todoForm");
const todoInputValue = document.getElementById("todoInputValue");
const todoList = document.getElementById("todoList");
const message = document.getElementById("message");
const addTaskButton = document.getElementById("addTaskButton");

// Outputs the Todo list
function renderTodoList() {
  const todoArray = JSON.parse(localStorage.getItem("todo"));
  if(todoArray === null) {
    document.getElementById("message").innerText = "No todo. Add a new one";
    document.getElementById("message").style.display = "block";
  } else {
    if(todoArray.length > 0) {
      todoArray.forEach(element => {
        const li = document.createElement("li");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const icon = document.createElement("i");
    
        span1.innerHTML = `<input type="checkbox" ${element["status"] === "true" ? "checked" : ""}>${element["value"]}`;

        if(element["status"] === "true") {
          span1.style.textDecoration = "line-through";
          span1.style.color = "green";
        } else {
          span1.style.textDecoration = "none";
          span1.style.color = "rgb(112, 112, 112)";
        }
    
        icon.setAttribute("class", "fas fa-trash");
        span2.appendChild(icon);
    
        li.appendChild(span1);
        li.appendChild(span2);
    
        todoList.appendChild(li);
      });
    } else {
      document.getElementById("message").innerText = "No todo. Add a new one";
      document.getElementById("message").style.display = "block";
    }
  }
}
// END - Outputs the Todo list

renderTodoList();

// Add task event handler
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
});
// END - Add task event handler

// Add task function
function addTodo() {
  const li = document.createElement("li");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const icon = document.createElement("i");

  span1.innerHTML = `<input type="checkbox">${todoInputValue.value}`;

  icon.setAttribute("class", "fas fa-trash");
  span2.appendChild(icon);

  li.appendChild(span1);
  li.appendChild(span2);

  todoList.appendChild(li);

  const todoArray = JSON.parse(localStorage.getItem("todo"));
  if(todoArray === null) {
    localStorage.setItem("todo", JSON.stringify([{value: todoInputValue.value, status: "false"}]));
  } else {
    todoArray.push({
      value: todoInputValue.value,
      status: "false"
    });
    localStorage.setItem("todo", JSON.stringify(todoArray));
  }

  todoInputValue.value = "";

  document.getElementById("message").style.display = "none";

  console.log("Add task");
}
// END - Add task function

// Search task event handler
// Search event is not allowing the submit event of form
todoInputValue.addEventListener("input", () => {
  const todoArray = JSON.parse(localStorage.getItem("todo")).map(element => element["value"]);
  if(todoArray !== null) {
    if(todoArray.includes(todoInputValue.value)) {
      message.innerText = "Task already exists";
      message.style.display = "block";
      addTaskButton.disabled = "true";
      addTaskButton.style.opacity = "0.7";
    } else if(todoInputValue.value === "") {
      message.style.display = "none";
      addTaskButton.disabled = "false";
      addTaskButton.style.opacity = "1";
    } else {
      message.innerText = "Task not found";
      message.style.display = "block";
      addTaskButton.disabled = "false";
      addTaskButton.style.opacity = "1";
    }
  } else {
    message.innerText = "No todo. Add a new one";
    message.style.display = "block";
  }
  console.log("Search");
});  
// END - Search task event handler

// Event handler for checkbox & delete
todoList.addEventListener("click", (e) => {
  if(e.target.type === "checkbox") {
    const todoArray = JSON.parse(localStorage.getItem("todo"));
    let index = [...todoList.childNodes].indexOf(e.target.parentNode.parentNode);

    if(e.target.checked) {
      e.target.parentNode.style.textDecoration = "line-through";
      e.target.parentNode.style.color = "green";
      todoArray[index]["status"] = "true";
    } else {
      e.target.parentNode.style.textDecoration = "none";
      e.target.parentNode.style.color = "rgb(112, 112, 112)";
      todoArray[index]["status"] = "false";
    }

    localStorage.setItem("todo", JSON.stringify(todoArray));
  }

  if(e.target.type !== "checkbox") {
    const todoArray = [];

    JSON.parse(localStorage.getItem("todo")).filter(element => {
      if(element["value"] != e.target.parentNode.parentNode.innerText) {
        todoArray.push(element);
      } else {
        e.target.parentNode.parentNode.remove();
      }
    });

    localStorage.setItem("todo", JSON.stringify(todoArray));
  }
});
// END - Event handler for checkbox & delete