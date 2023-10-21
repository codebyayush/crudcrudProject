//add todo on screen
function addTodoOnScreen(todoinfo) {
  const todoList = document.getElementById("remTodo");
  const remTodoDiv = document.createElement("div");

  remTodoDiv.innerHTML = `
        <strong>Todo Name: </strong>${todoinfo.name}<br>
        <strong>Todo Description: </strong>${todoinfo.desc}<br>
        <strong>Completed: </strong>${todoinfo.completed}<br><br>

        <button onclick="tickR('${todoinfo.name}','${todoinfo.desc}','${todoinfo._id}', '${todoinfo.completed}' ,this)">DONE</button>
        <button onclick="tickW('${todoinfo._id}',this)">REMOVE</button>
    `;
  todoList.appendChild(remTodoDiv);
}

//on done click
function tickR(name, desc, todoid, completed, button) {
  const btn = document.getElementById("doneTodo");
  const completedTodo = document.createElement("div");
  completed = true;

  completedTodo.innerHTML = `
    <strong>Todo Name: </strong>${name}<br>
    <strong>Todo Description: </strong>${desc}<br>
    <strong>Completed: </strong>${completed}<br>

    <button onclick="tickW('${todoid}', this)">REMOVE</button>
    `;
  btn.appendChild(completedTodo);

  const todoList = document.getElementById("remTodo");
  todoList.removeChild(button.parentElement);
}


//on remove click
function tickW(todoId, button) {
  axios
    .delete(
      `https://crudcrud.com/api/d02338605acd40bcbcd8b7ee1bcb021c/todoinfo/${todoId}`
    )
    .then((response) => {
      let removeDiv = button.parentElement;
      removeDiv.remove();
      console.log(response);
    })
    .catch((err) => console.log(err));
}

//post todo
function postTodo(name, desc, completed) {
  axios
    .post(
      `https://crudcrud.com/api/d02338605acd40bcbcd8b7ee1bcb021c/todoinfo`,
      { name, desc, completed }
    )
    .then((response) => addTodoOnScreen(response.data))
    .catch((err) => console.error(err));
}

//submit event
const formDetails = document.getElementById("formDetails");
formDetails.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const desc = document.getElementById("description").value;
  const completed = false;

  postTodo(name, desc, completed);

  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
});

//onload function
window.onload = function () {
  axios
    .get(`https://crudcrud.com/api/d02338605acd40bcbcd8b7ee1bcb021c/todoinfo`)
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        addTodoOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err));
};
