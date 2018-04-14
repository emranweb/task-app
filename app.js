//UI Select

//input field
let taskInput = document.querySelector(".add");
//input btn
let inputBtn = document.querySelector(".add-task");
//input form
let form = document.querySelector("form");
//list UL
let list = document.querySelector(".list");
//clear button
let clearBtn = document.querySelector(".clear");
//filter input
let filter = document.querySelector(".filter");


//Doucument load event for get item from local storage
document.addEventListener("DOMContentLoaded", getTasks);
//form submit event listener
form.addEventListener("submit", addTask);
//single task remove event
list.addEventListener("click", deleteTask);
//all task remove event
clearBtn.addEventListener("click", clearTask);
//filter task
filter.addEventListener("keyup", filterTask);



//get tasks from the local storage

function getTasks(){
  //chekc the local storage
  let tasks;
  //check the local store is black or not
  if(localStorage.getItem("tasks") === null){
    //if store is black create a array and store the data in arrray
  tasks = []
  }else{
    //if data are exist - get the data with Json parse
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  //set single task item in local storage
  tasks.forEach(function(item){
     //create task-item
     let li = document.createElement("li");

     //list -item class name
     li.className = "list-item";
  
     //add input data in li
     li.appendChild(document.createTextNode(item));
  
     //list inner item span item
     let span = document.createElement("span");
  
     //span class name
     span.className = "delete";
     //apend span into li
     li.appendChild(span);
     
     //append li into list
     list.appendChild(li);
  });

}


//task add function
function addTask(e){
   //first check input black or not
   if(taskInput.value === ""){
     alert("Add Any Task");
   }
   
   //create task-item
   let li = document.createElement("li");

   //list -item class name
   li.className = "list-item";

   //add input data in li
   li.appendChild(document.createTextNode(taskInput.value));

   //list inner item span item
   let span = document.createElement("span");

   //span class name
   span.className = "delete";
   //apend span into li
   li.appendChild(span);
   
   //append li into list
   list.appendChild(li);

  //store data is local sote
  localStore(taskInput.value);

   
  e.preventDefault();
}




// delete the single task item
function deleteTask(e){
  //check the target class
  if(e.target.classList.contains("delete")){
    //remove the task
    e.target.parentElement.remove();
  
    //remove from local storage
    removeLocal(e.target.parentElement);
  }
}


//delate from local storege
function removeLocal(inputData){
  let tasks;
  //check the local store is black or not
  if(localStorage.getItem("tasks") === null){
    //if store is black create a array and store the data in arrray
  tasks = [];
  }else{
    //if data are exist - get the data with Json parse
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // splice item from array
  tasks.forEach(function(item, index){
   if(inputData.textContent === item){
     tasks.splice(index, 1);
   }
  });
 // set new item into array
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



//remove all the task item
function clearTask(e){
 if(confirm("Are You Sure ?")){
  while(list.firstChild){
    list.removeChild(list.firstChild);
    localStorage.clear();
  }
 }
}


//filter task
function filterTask(e){
  // collect the seach input data
  let filterText = e.target.value.toLowerCase();
  //loop through the all list item 
  document.querySelectorAll(".list-item").forEach(function(item){
    // collect the every list item text content
  let data = item.firstChild.textContent.toLocaleLowerCase();
  //if search are match  
   if(data.indexOf(filterText) != -1){
      item.style.display="block";
   }else{
     item.style.display ="none";
    }
  });
 
 e.preventDefault();
}


//store data in local storage
function localStore(task){
  let tasks;
  //check the local store is black or not
  if(localStorage.getItem("tasks") === null){
    //if store is black create a array and store the data in arrray
  tasks = []
  }else{
    //if data are exist - get the data with Json parse
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  //push input data into array
 tasks.push(task);
//store data into local storate
localStorage.setItem("tasks", JSON.stringify(tasks));
}






