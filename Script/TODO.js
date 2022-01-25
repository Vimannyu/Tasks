//function to generate the mathematical expression.
function gen_cap() {
  randN1 = Math.round(10 * Math.random());
  randN2 = Math.round(10 * Math.random());

  str = `Solve this Mathematical expression to complete your task. <br> <strong> ${randN1} + ${randN2} </strong> `;
  document.getElementById("mdl-cap").innerHTML = str;

  sum = randN1 + randN2;
}

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("task-btn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  //   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}" onclick="gen_cap()" class="btn btn-primary" data-bs-toggle ="modal" data-bs-target ="#myModal">Complete</button>
                        <button id="${index}" onclick="deleteNote()" class="btn btn-danger">Delete task</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add task" section above to add.`;
  }
}

// Function to delete a task
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
// function to check the value on the captcha is correct or not.
function check_cap() {
  recVal = document.getElementById("cap-val").value;
  if (recVal == sum) {
    document.getElementById(
      "mdl-cap"
    ).innerHTML = `Verified , now your task is completed`;

    deleteNote();
  } else {
    alert("Invalid value please try again");
  }
}
