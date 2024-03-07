// האזנה לאירוע שליחת טופס
// createForm
const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}

function createNewVisitor(event) {
  //prevent default form behavior
  event.preventDefault();

  const usernameInput = document.getElementById("user-name");

  // validation of form inputs
  if (!validateFormInputs(usernameInput)) {
    return;
  }

  // checking if visitor already exists
  if (visitorExists(usernameInput.value)) {
    usernameInput.value = "";
    return;
  }

  // making new visitor
  const newVisitor = makeVisitor(usernameInput.value);

  //adding the new visitor to the array
  visitors.push(newVisitor);
  stringifiedVisitors = JSON.stringify(visitors);
  localStorage.setItem("visitors", stringifiedVisitors);

  // updating the current visitor in the local storage for successful login
  localStorage.setItem("currentVisitor", JSON.stringify(newVisitor));

  // success message
  alert(
    `Hello, ${usernameInput.value}! You have successfully signed up with 50 coins.`
  );

  //console log for debugging
  console.log("Updated visitors array:", visitors);

  // remove inputs current value
  usernameInput.value = "";

  // redirection to login page
  window.location.href = "./login.html";
}

//  בודק האם האינפוטים קיימים ויש בהם ערך validateFormInputs
// מחזיר האם תקין או לא (בוליאני)
const validateFormInputs = (usernameInput) => {
  // input validation - checks if username input exists
  if (!usernameInput) {
    alert("Something went wrong");
    return false;
  }

  // value validation - checks if username is provided
  if (!usernameInput.value) {
    alert("You must provide username");
    return false;
  }
  return true;
};

//מקבל שם ומחזיר תשובה האם השם האורח קיים
const visitorExists = () => {
  let usernameInput = document.getElementById("user-name").value;
  const userExists = visitors.some((visitor) => visitor.name === usernameInput);
  if (userExists) {
    alert("Username already exists. Please choose a different username.");
  }
  return userExists; //some method already returns a boolean value
};

//מקבל שם, בודק שאין אותו כבר במערך האורחים ומחזיר אובייקט אורח
const makeVisitor = (username) => {
  const visitor = {
    name: username,
    coins: 50,
  };
  return visitor;
};
