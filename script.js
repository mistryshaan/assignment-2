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

        span1.innerHTML = `<input type="checkbox" ${element["status"] === "true" ? "checked" : ""}><img src='${element["status"] === "true" ? "complete.svg" : "pending.svg"}'>${element["value"]}`;

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

  if(todoInputValue.value === "") {
    addTaskButton.style.opacity = 0.7;
  } else {
    addTaskButton.style.opacity = 1;
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

  span1.innerHTML = `<input type="checkbox"><img src='pending.svg'>${todoInputValue.value.toString().trim().replace(/\s\s+/g, " ")}`;

  icon.setAttribute("class", "fas fa-trash");
  span2.appendChild(icon);

  li.appendChild(span1);
  li.appendChild(span2);

  li.style.animation = "fadeIn 0.5s 1 linear";

  todoList.appendChild(li);

  const todoArray = JSON.parse(localStorage.getItem("todo"));
  if(todoArray === null) {
    localStorage.setItem("todo", JSON.stringify([{value: todoInputValue.value.toString().trim().replace(/\s\s+/g, " "), status: "false"}]));
  } else {
    todoArray.push({
      value: todoInputValue.value.toString().trim().replace(/\s\s+/g, " "),
      status: "false"
    });
    localStorage.setItem("todo", JSON.stringify(todoArray));
  }
  todoInputValue.value = "";

  message.style.display = "none";
  addTaskButton.style.opacity = "0.7"

}
// END - Add task function

// Search task event handler
let delay = setTimeout(() => {
  todoInputValue.addEventListener("input", () => {
    clearTimeout(delay)
    const tempTodoArray = JSON.parse(localStorage.getItem("todo")).map(element => element["value"]);
    if(todoInputValue.value.toString().trim().replace(/\s\s+/g, " ") === "") {
      addTaskButton.disabled = true;
      addTaskButton.style.opacity = "0.7";
    } else {
      if(tempTodoArray !== null) {
        if(tempTodoArray.includes(todoInputValue.value.toString().trim().replace(/\s\s+/g, " "))) {
          message.innerText = "Task already exists";
          message.style.display = "block";
          addTaskButton.disabled = true;
          addTaskButton.style.opacity = "0.7";
        } else if(todoInputValue.value === "") {
          message.style.display = "none";
          addTaskButton.style.opacity = "1";
          addTaskButton.disabled = false;
        } else {
          message.innerText = "Task not found";
          message.style.display = "block";
          addTaskButton.style.opacity = "1";
          addTaskButton.disabled = false;
        }
      } else {
        message.innerText = "No todo. Add a new one";
        message.style.display = "block";
        addTaskButton.disabled = false;
        addTaskButton.style.opacity = "1";
      }
    }
  });  
}, 500);
// END - Search task event handler

// Event handler for checkbox & delete
todoList.addEventListener("click", (e) => {
  if(e.target.type === "checkbox") {
    const todoArray = JSON.parse(localStorage.getItem("todo"));
    let index = [...todoList.childNodes].indexOf(e.target.parentNode.parentNode);

    if(e.target.checked) {
      e.target.parentNode.style.textDecoration = "line-through";
      e.target.parentNode.style.color = "green";
      e.target.nextSibling.src = "complete.svg";
      todoArray[index]["status"] = "true";
    } else {
      e.target.parentNode.style.textDecoration = "none";
      e.target.parentNode.style.color = "rgb(112, 112, 112)";
      e.target.nextSibling.src = "pending.svg";
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
        e.target.parentNode.parentNode.style.animation = "removeItem 0.5s 1 linear";
        setTimeout(() => e.target.parentNode.parentNode.remove(), 400);
        addTaskButton.disabled = false;
      }
    });

    localStorage.setItem("todo", JSON.stringify(todoArray));
  }
});
// END - Event handler for checkbox & delete