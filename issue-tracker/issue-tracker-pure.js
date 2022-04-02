// Format Data Todo:

// [
//   {
// 	author: "Tony Nguyen"
// createdAt: 1617807944606
// description: "nihil aut laudantium"
// id: "77555a95-4712-4d21-b640-d31e8648771e"
// severity: "low"
// status: "all"
// title: "Learn React"
// updatedAt: 1617807944606

//   }

//

// Tasks
// Add todo when click “Add” ok
// Filter todox ok
// Search todo (by description) ok
// Sort todo (by title or description or author)

const form = document.getElementById("issueInputForm");
const issuesList = document.getElementById("issuesList");
const severity = document.getElementById("severity");
const status = document.getElementsByClassName("status");
const filterBtn = document.getElementsByClassName("js-filter-btn");
const toggleBtn = document.getElementsByClassName("toggleBtn");
const filteredResult = [];
let initialState = {
  1648541238053: {
    id: 1648541238053,
    description: "Hoang Tu",
    author: "Hoang",
    status: "open",
    severity: "low",
  },
  1648541250694: {
    id: 1648541250694,
    description: "Tu",
    author: "Pham",
    status: "close",
    severity: "medium",
  },
};

function renderIssue(data) {
  issuesList.innerHTML = "";
  Object.keys(data).forEach((key) => {
    const todoId = data[key].id;
    const todoSeverity = data[key].severity;
    const descriptionId = data[key].description;
    const todoAuthor = data[key].author;
    const todoStatus = data[key].status;

    const issuesTemplate = `
    <div class="card" id="card">
              <div class="card-header d-flex align-items-center">
              ${todoId}
                <span
                  class="badge badge-secondary status"
                  style="display: inline-block; margin-left: 5px"
                  >${todoStatus}</span>
              </div>
              <div class="card-body">
                <h5 class="card-title">Description: ${descriptionId}</h5>
                <h5 class="card-title">Author: ${todoAuthor}</h5>
                <p class="card-text">
                  <span class="badge badge-primary">${todoSeverity}</span>
                </p>
                <div class="d-flex justify-content-end">
                  <button
                    type="submit"
                    class="btn btn-primary toggleBtn"
                    style="margin-right: 10px"
                    onclick="toggleStatus('${todoId}')"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    class="btn btn-danger"
                    onclick="deleteTodo('${todoId}')"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
    `;

    issuesList.innerHTML += issuesTemplate;
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const description = document.getElementById("description").value;
  const author = document.getElementById("author").value;
  const severity = document.getElementById("severity").value;

  const todo = {
    id: Date.now(),
    description,
    author,
    status: "open",
    severity,
  };
  initialState = {
    ...initialState,
    [todo.id]: todo,
  };
  renderIssue(initialState);
  // console.log(initialState);
});

function deleteTodo(todoId) {
  delete initialState[todoId];
  renderIssue(initialState);
}

function toggleStatus(todoId) {
  const changeStatus = document.getElementsByClassName("status");
  if (changeStatus[todoId].innerHTML === "open") {
    changeStatus[todoId].innerHTML = "close";
  } else {
    changeStatus[todoId].innerHTML = "open";
  }
}

// toggleBtn.addEventListener("click", function (e) {});

function search_desc() {
  let input = document.getElementById("inputSearch").value;
  input = input.toLowerCase();
  let card = document.getElementsByClassName("card");
  for (let i = 0; i < card.length; i++) {
    console.log(card.length);
    if (!card[i].innerHTML.toLocaleLowerCase().includes(input)) {
      card[i].style.display = "none";
    } else {
      card[i].style.display = "block";
    }
  }
}

function filterSelection(status) {
  const todoFilter = Object.values(initialState).filter(
    (item) => item.status === status
  );
  if (status === "all") {
    return renderIssue(initialState);
  }
  renderIssue(todoFilter);
}

// filterSelection("all");
// function filterSelection(c) {
//   let card = document.getElementsByClassName("card");
//   if (c === "all") c === "";
//   for (let i = 0; i < card.length; i++) {
//     removeSelection(card[i], "show");
//     if (card[i].className.indexOf(c) > -1) addSelection(card[i], "show");
//   }
// }

// function addSelection(element, name) {
//   const arr1 = element.className.split(" ");
//   const arr2 = name.split(" ");
//   for (let i = 0; i < arr2.length; i++) {
//     if (arr1.indexOf(arr2[i] === -1)) {
//       element.className += " " + arr2[i];
//     }
//   }
// }

// function removeSelection(element, name) {
//   const arr1 = element.className.split(" ");
//   const arr2 = name.split(" ");
//   for (let i = 0; i < arr2.length; i++) {
//     while (arr1.indexOf(arr2[i]) > -1) {
//       arr1.splice(arr1.indexOf(arr2[i]), 1);
//     }
//   }
//   element.className = arr1.join(" ");
// }

// issuesList.addEventListener("click", function (e) {
//   if (e.target.classList.contains("toggleBtn")) {
//     const itemKey = e.target.parentElement.dataset.key;
//     toggleStatus(itemKey);
//   }
// });

// function toggleStatus(key) {
//   const index = filteredResult.findIndex((task) => task.status === Number(key));
//   filteredResult[index].checked = !filteredResult[index].checked;
//   renderIssue(filteredResult[index]);
//   console.log(filteredResult[index]);
// }

// inputSearch.addEventListener("keyup", function (e) {
//   const searchString = e.target.value.toLowerCase();
//   const filteredCharacters = hpCharacters.filter((character) => {
//     return character.description.includes(searchString);
//   });
//   console.log(filteredCharacters);
//   // renderIssue(filteredCharacters);
// });
