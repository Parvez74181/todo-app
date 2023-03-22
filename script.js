const input = document.querySelector("#input");
const listsDiv = document.querySelector(".lists");
const submit = document.querySelector("button");

let listsArray = [];

// list delete
const deleteList = (data) => {
  let deleteButton = document.querySelectorAll(".fa-trash");

  deleteButton.forEach((button, i) => {
    button.addEventListener("click", () => {
      let index = data.indexOf(data[i]); // getting the index of the clicked delete button item value
      data.splice(index, 1); // deleting the item

      localStorage.setItem("lists", JSON.stringify(data)); // save updated data into the localStorage

      createList(); // calling the function to show the data to the screen
    });
  });
};

// list create
const createList = () => {
  listsDiv.innerHTML = null; // first clear the listsDiv

  let data = JSON.parse(localStorage.getItem("lists")); // getting data from localStorage

  if (data) {
    data.forEach((item, i) => {
      let html = `<span class="list flex">${
        i + 1
      }. ${item} <i class="fa-solid fa-trash"></i>`;
      listsDiv.innerHTML += html;
    });

    deleteList(data);
  }
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let value = input.value;

  listsArray.unshift(value); // push input value to the listsArray

  localStorage.setItem("lists", JSON.stringify(listsArray)); // save data into the localStorage

  input.value = null; // set input value = null

  createList(); // calling the function to show the data to the screen
});

window.addEventListener("DOMContentLoaded", () => {
  let lists = JSON.parse(localStorage.getItem("lists"));
  if (lists) listsArray = lists;
  createList();
});
