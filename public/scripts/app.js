$(document).ready(() => {
  $.getJSON("/api/todos")
    .then(addTodos)
    .catch(handleErrors);

  $("#todoInput").keypress(event => {
    if(event.which === 13) {
      const userTodo = $("#todoInput").val();
      $.post("/api/todos", {name: userTodo})
        .then(newTodo => {
          $("#todoInput").val("");
          addTodo(newTodo);
        })
        .catch(handleErrors);
    }
  });

  $(".list").on("click", "li", function(){
    updateTodo($(this));
  });

  $(".list").on("click", "span", function(event){
    event.stopPropagation();
    deleteTodo($(this).parent());
  });
});

const addTodos = todos => {
  todos.forEach(todo => {
    addTodo(todo);
  });
}

const addTodo = todo => {
  const newTodo = $("<li class = 'task'>"+todo.name+"<span>X</span></li>");
  newTodo.data("id", todo._id);
  newTodo.data("completed", todo.completed);
  // const newTodo = $("<li></li>").text(todo.name);
  // newTodo.addClass("task");
  if(todo.completed) {
    newTodo.addClass("done");
  }
  $(".list").append(newTodo);
}

const deleteTodo = (parent) => {
    const todoId = parent.data("id");
    const deleteUrl = "/api/todos/"+todoId;
    $.ajax({
      method:"DELETE",
      url:deleteUrl
    })
    .then((message) => {
      parent.remove();
    })
    .catch(handleErrors);
}

const updateTodo = (list) => {
  const isDone = !list.data("completed");
  const todoId = list.data("id");
  let updateData = {completed:isDone};
  const updateUrl = "/api/todos/"+todoId;
  $.ajax({
    method:"PUT",
    url: updateUrl,
    data: updateData
  })
  .then((data) => {
    list.toggleClass("done");
    list.data("completed",isDone);
  })
  .catch(handleErrors);
}

const handleErrors = err => {
  console.log(err);
}
