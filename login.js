window.onload = function () {
  generateDataset();
  renderLoginNavbar();
  renderVisitors();
};

window.addEventListener("load", () => {
  const currentVisitorString = localStorage.getItem("currentVisitor");
  if (currentVisitorString) {
    const currentVisitor = JSON.parse(currentVisitorString);
    alert(`Welcome to the Zoo, ${currentVisitor.name}!`);
  } else {
    alert("In order to continue to the Zoo, please Sign Up or Log in");
  }
});

let visitorsForView = [...visitors];
const dialog = document.getElementById("visitor-dialog");

// When the dialog is opened
document.body.classList.add("dialog-opened");

// When the dialog is closed
document.body.classList.remove("dialog-opened");

//generating visitors cards
const getVisitorHTMLCard = (visitor) => {
  const visitorCardTemplate = `
  <div class="card" >
  <img class="card-img-top" src="./zoo-images/man.png" alt="${visitor.name}"/>
  <div class="card-body">
  <h5 class="card-title">${visitor.name}</h5>
  <img class="card-coins-img" src="./zoo-images/coin.png" alt="coin"/>
  <p class="card-text">${visitor.coins}</p>
  </div>
  </div>
  `;
  const cardsWrapper = document.createElement("div");
  cardsWrapper.className = "visitor-card";
  cardsWrapper.innerHTML = visitorCardTemplate;
  cardsWrapper.addEventListener("click", () => handleVisitorClick(visitor));
  return cardsWrapper;
};

// modal close button
const getCloseModalHTMLButton = () => {
  const closeButton = document.createElement("button");
  closeButton.className = "btn";
  closeButton.innerText = "X";
  closeButton.addEventListener("click", () => dialog.close());
  return closeButton;
};

// modal choose visitor button
const getChooseVisitorButton = (visitor) => {
  const chooseButton = document.createElement("button");
  chooseButton.className = "btn";
  chooseButton.classList.add = "choose-btn";
  chooseButton.innerText = "Choose visitor";
  chooseButton.addEventListener("click", () => {
    console.log(visitor);
    dialog.close();
    loginAsVisitor(visitor.name);
  });
  return chooseButton;
};

// handaling user selecion
const handleVisitorClick = (visitor) => {
  dialog.innerHTML = "";
  dialog.append(
    getCloseModalHTMLButton(),
    getChooseVisitorButton(visitor),
    getVisitorHTMLCard(visitor)
  );
  dialog.showModal();
};

// search box
const getSearchBox = () => {
  const searchInput = document.createElement("input");
  searchInput.id = "search-input";
  searchInput.placeholder = "Search visitor by username";
  searchInput.className = "form-control my-4";

  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.trim().toLowerCase(); // convert search term to lowercase
    visitorsForView = visitors.filter((visitor) =>
      visitor.name.toLowerCase().includes(searchTerm)
    ); // convert visitor names to lowercase

    renderVisitors();
  });
  return searchInput;
};

// clearing searchbox
const clearSearchBox = () => {
  const input = document.getElementById("search-input");
  input.value = "";
  visitorsForView = [...visitors];
  renderVisitors();
};

// rendering the list of visitors
const renderVisitors = () => {
  const visitorsPlaceholder = document.getElementById(
    "visitors-list-placeholder"
  );
  visitorsPlaceholder.innerHTML = "";
  visitorsForView.forEach((visitor) => {
    const visitorCard = getVisitorHTMLCard(visitor);
    visitorsPlaceholder.appendChild(visitorCard);
  });
  if (visitorsForView.length === 0) {
    visitorsPlaceholder.appendChild(getEmptyCardsHTMLTemplate());
  }
};

// empty cards template
const getEmptyCardsHTMLTemplate = () => {
  const emptyTemplateWrapper = document.createElement("div");
  emptyTemplateWrapper.className = "empty-result";
  emptyTemplateWrapper.innerHTML = `
  <h2>No Visitors Found</h2>
    <p>We're sorry, but no visitors match your search.</p>
    <button id="clear-filter-btn" class="btn btn-dark">Search Another Visitor</button>
  `;
  //adds an event listener to the button with the id "clear-filter-btn"
  emptyTemplateWrapper.children["clear-filter-btn"].addEventListener(
    "click",
    clearSearchBox
  );
  return emptyTemplateWrapper;
};

document.body.insertAdjacentElement("afterbegin", getSearchBox());
window.addEventListener("load", renderVisitors());

// login as visitor - with edge cases testing
function loginAsVisitor(visitorName) {
  const stingifiedCurrentVisitor = localStorage.getItem("currentVisitor");
  let connect = true;
  const selectedVisitor = visitors.find(
    (visitor) => visitor.name === visitorName
  );
  if (stingifiedCurrentVisitor) {
    const currentVisitor = JSON.parse(stingifiedCurrentVisitor);

    if (selectedVisitor) {
      // if there is current visitor, confirm the connection
      if (currentVisitor) {
        connect = confirm(
          `${currentVisitor.name} is currently logged in. Do you want to connect to ${selectedVisitor.name}?`
        );
      } else {
        // if there is no current visitor, proceed with the login directly
        connect = true;
        // selectedVisitor = currentVisitor;
        localStorage.setItem("currentVisitor", JSON.stringify(selectedVisitor));
      }
    }
  }

  if (connect && selectedVisitor) {
    // call the successful login function
    successfulLogin(selectedVisitor);
    return;
  } else {
    // if the selected visitor is not found, display an error message
    alert(`Visitor ${visitorName} not found.`);
  }
}

function successfulLogin(selectedVisitor) {
  localStorage.setItem("currentVisitor", JSON.stringify(selectedVisitor));
  // display successful login message
  alert(`Visitor ${selectedVisitor.name} logged in.`);
  // reload the page
  location.reload();
  // // redirect to the zoo page
  // window.location.href = "zoo.html";
}

// function to render the navbar based on the current visitor
const renderLoginNavbar = () => {
  const currentVisitorInfo = document.getElementById("current-visitor-info");
  // const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  const currentVisitorString = localStorage.getItem("currentVisitor");

  if (currentVisitorString) {
    const currentVisitor = JSON.parse(currentVisitorString);
    currentVisitorInfo.textContent = `Logged in as: ${currentVisitor.name}`;
    // allowing only logged in visitors to continue to the zoo
    document.getElementById("go-to-zoo-btn").disabled = false;
  } else {
    currentVisitorInfo.textContent = "No visitor logged in";
    document.getElementById("go-to-zoo-btn").disabled = true;
  }
};

// event listener for sign-up button
const signupButton = document.getElementById("sign-up-btn");
signupButton.addEventListener("click", () => {
  window.location.href = "signup.html";
});

// event listener for the zoo button
const zooButton = document.getElementById("go-to-zoo-btn");
const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
zooButton.addEventListener("click", () => {
  if (currentVisitor) {
    const stringifiedCurrentVisitor = localStorage.getItem("currentVisitor");
    const currentVisitor = JSON.parse(stringifiedCurrentVisitor);

    //redirect to the zoo page
    window.location.href = "zoo.html";
  } else {
    alert("You need to Sign Up or Log in first");
  }
});
