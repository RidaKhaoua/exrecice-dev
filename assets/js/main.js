let users = [
  {
    id: "123456789",
    createdDate: "2021-01-06T00:00:00.000Z",
    status: "En validation",
    firstName: "Mohamed",
    lastName: "Taha",
    userName: "mtaha",
    registrationNumber: "2584",
  },
  {
    id: "987654321",
    createdDate: "2021-07-25T00:00:00.000Z",
    status: "Validé",
    firstName: "Hamid",
    lastName: "Orrich",
    userName: "horrich",
    registrationNumber: "1594",
  },
  {
    id: "852963741",
    createdDate: "2021-09-15T00:00:00.000Z",
    status: "Rejeté",
    firstName: "Rachid",
    lastName: "Mahidi",
    userName: "rmahidi",
    registrationNumber: "3576",
  },
];

// get tbody
const tbody = document.querySelector("table tbody");

// get form add user
const formAddUser = document.querySelector(".add-users");

// get inputs
const nomInput = document.querySelector(".add-users #nom");
const userNameInput = document.querySelector(".add-users #user-name");
const matriculeInput = document.querySelector(".add-users #matricule");
const prenomInput = document.querySelector(".add-users #prenom");
const dateCreationInput = document.querySelector(".add-users #date-creation");
const etatInput = document.querySelector(".add-users #etat");

// get input has class test
const testOnInput = [...document.querySelectorAll(".add-users .test")];

// get btn add users
const btnAddUsers = document.querySelector(".add-users .add");
const showForm = document.querySelector(".show-data .add-user button");

// events
btnAddUsers.addEventListener("click", function (params) {
  const checkAllValid = testOnInput.every((input) =>
    input.classList.contains("valid")
  );

  if (checkEmptyInput()) {
    alert("the field can't be empty");
  } else {
    if (checkAllValid) {
      let objUser = {};
      objUser.id = generateNumber();
      objUser.createdDate = dateCreationInput.value;
      objUser.status = etatInput.value.toLowerCase();
      objUser.firstName = prenomInput.value;
      objUser.lastName = nomInput.value;
      objUser.userName = userNameInput.value;
      objUser.registrationNumber = matriculeInput.value;
      showData(objUser);
      clearInput();
      formAddUser.classList.remove("active");
      setTimeout(() => {
        formAddUser.classList.add("hidden");
      }, 500);
    }
  }
});

// show Form
showForm.addEventListener("click", function (params) {
  formAddUser.classList.remove("hidden");
  setTimeout(() => {
    formAddUser.classList.add("active");
  }, 500);
});

// delete item from table
tbody.addEventListener("click", function name(e) {
  if (e.target.classList.contains("delete-icon")) {
    let msg = confirm("Are you sure to delete this item ?");
    if (msg) {
      e.target.parentElement.parentElement.classList.add("hidden");
      console.log(e.target.parentElement.parentElement);
      setTimeout(() => {
        e.target.parentElement.parentElement.remove();
      }, 500);
    }
  }
});

// generate random number for ID
function generateNumber(params) {
  let number = "";
  for (let i = 0; i < 9; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
}

// show data
users.forEach((user) => {
  showData(user);
});

testOnInput.forEach((input) => {
  input.addEventListener("keyup", function (e) {
    showMessage(e, e.target);
  });
});

// function check status of user
function checkStatus(status) {
  let nameClass = "";
  switch (status) {
    case "en validation":
      nameClass = "on-validation";
      break;
    case "validé":
      nameClass = "valide";
      break;
    case "rejeté":
      nameClass = "rejected";
      break;
  }
  return nameClass;
}

// function show data
function showData(data) {
  let date = new Date(data.createdDate);
  let statusName = checkStatus(data.status.toLowerCase());
  tbody.innerHTML += `<tr>
            <td>${data.id}</td>
            <td>
            ${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/
            ${
              date.getMonth() < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth()
            }/ 
            ${date.getFullYear()}
            </td>
            <td><span class="${statusName}">${data.status}</span></td>
            <td class="name">${data.lastName}</td>
            <td class="prenom">${data.firstName}</td>
            <td class="name">${data.userName}</td>
            <td>${data.registrationNumber}</td>
            <td class="delete"><i class="fa-regular fa-trash-can delete-icon"></i></td>
           
    </tr>`;
}

// clear input
function clearInput(params) {
  nomInput.value = "";
  userNameInput.value = "";
  matriculeInput.value = "";
  prenomInput.value = "";
  dateCreationInput.value = "";
  etatInput.value = "";
}

// verification input
function checkEmptyInput(params) {
  return (
    nomInput.value === "" ||
    userNameInput.value === "" ||
    matriculeInput.value === "" ||
    prenomInput.value === "" ||
    dateCreationInput.value === "" ||
    etatInput.value === ""
  );
}

// show message if value of input is incorrect
function showMessage(e, input) {
  if (e.key === "Backspace") {
    input.nextElementSibling.textContent = "";
    input.classList.remove("valid");
  }
  if (input.value !== "") {
    if (!input.classList.contains("date-creation")) {
      if (/^[^0-9]+$/gi.test(input.value)) {
        input.nextElementSibling.textContent = "";
        input.classList.add("valid");
      } else {
        input.classList.remove("valid");

        input.nextElementSibling.textContent = "can not contain number";
      }
    } else {
      if (
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g.test(e.target.value)
      ) {
        input.nextElementSibling.textContent = "";
        input.classList.add("valid");
      } else {
        input.classList.remove("valid");
        input.nextElementSibling.textContent = "invalid";
      }
    }
  }
}
