window.onload = function () {
  generateDataset();
};

// Login page - Login:
// Choose which existing guest you would like to visit the zoo with.
// Introduce existing guests in one of the following formats:
// - A table used in the Table HTML Element table element
// - cards with a picture of the guest, his name and the amount of coins
// If the user enters the page when there is already a selected guest, show the user a message that there is already a selected guest - does he want to disconnect?

// You can filter the guest list using a text field that will be used to search for a guest by name
// Realize the search with every change in the search field value
// You can register for the input text change event using the 'input' event

let visitorsForView = [...visitors];
const dialog = document.getElementById("visitor-dialog");

// When the dialog is opened
document.body.classList.add("dialog-opened");

// When the dialog is closed
document.body.classList.remove("dialog-opened");

//generating visitors cards
const getVisitorHTMLCard = (visitor) => {
  const visitorCardTemplate = `
    <div class="card" style="width: 18rem;">
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
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", () => dialog.close());
  return closeButton;
};

// modal choose visitor button
const getChooseVisitorButton = (visitor) => {
  const chooseButton = document.createElement("button");
  chooseButton.className = "btn";
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
  searchInput.oninput = (event) => {
    visitorsForView = visitors.filter((visitor) =>
      visitor.name.includes(event.target.value)
    );

    renderVisitors();
  };
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
// const renderVisitors = () => {
//   // building HTML cards for each visitor
//   const visitorsCards = visitorsForView.map(getVisitorHTMLCard);
//   // getting the placeholder where the visitors cards will be displayed
//   const visitorsPlaceholder = document.getElementById(
//     "visitors-list-placeholder"
//   );
//   // clearing the content in the placeholder
//   visitorsPlaceholder.innerHTML = "";

//   // checking id there are visitors cards to render
//   if (!visitorsCards.length) {
//     // if no visitors found appending an empty card template
//     visitorsPlaceholder.appendChild(getEmptyCardsHTMLTemplate());
//   } else {
//     // if there are appending them to the placeholder
//     visitorsPlaceholder.appendChild(...visitorsCards);
//   }
// };

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
  const emptyTemplate = `
    <h2>No Visitors Found</h2>
      <p>We're sorry, but no visitors match your search.</p>
      <button id="clear-filter-btn" class="btn btn-dark">Search Another Visitor</button>
    `;
  emptyTemplateWrapper.innerHTML = emptyTemplate;
  //adds an event listener to the button with the id "clear-filter-btn"
  emptyTemplateWrapper.children["clear-filter-btn"].addEventListener(
    "click",
    clearSearchBox
  );
  return emptyTemplateWrapper;
};

document.body.insertAdjacentElement("afterbegin", getSearchBox());
window.addEventListener("load", renderVisitors());

// function loginAsVisitor(visitorName) {

//   const stingifiedCurrentVisitor = localStorage.getItem("currentVisitor");
//   const currentVisitor = JSON.parse(stingifiedCurrentVisitor);
//   let disconnect = false;
//   if (currentVisitor) {
//     disconnect = confirm(
//       `${currentVisitor.name} is already a selected visitor. Do you want to disconnect?`
//     );
//   }
//   if (disconnect) {
//     // If user confirms, remove the current visitor from local storage
//     localStorage.removeItem("currentVisitor");
//     // Display message indicating disconnection
//     alert(`Visitor ${currentVisitor.name} has been disconnected.`);
//   } else {
//     alert(`There is already a selected visitor (${currentVisitor.name}).`);
//     return;
//   }

//   // Find the selected visitor by name
//   const selectedVisitor = visitors.find(
//     (visitor) => visitor.name === visitorName
//   );

//   if (selectedVisitor) {
//     // If the selected visitor is found, store it in local storage
//     localStorage.setItem("currentVisitor", JSON.stringify(selectedVisitor));
//     // Display message indicating successful login
//     alert(`Visitor ${selectedVisitor.name} logged in.`);
//   } else {
//     // If the selected visitor is not found, display an error message
//     alert(`Visitor ${visitorName} not found.`);
//   }
// }

function loginAsVisitor(visitorName) {
  const stingifiedCurrentVisitor = localStorage.getItem("currentVisitor");
  const currentVisitor = JSON.parse(stingifiedCurrentVisitor);
  let disconnect = false;
  if (currentVisitor && currentVisitor.name === visitorName) {
    // If the selected visitor is already logged in, no need to proceed
    disconnect = confirm(
      `${currentVisitor.name} is currently logged in. Do you want to disconnect?`
    );
  }
  if (disconnect) {
    // If user confirms, remove the current visitor from local storage
    localStorage.removeItem("currentVisitor");
    // Display message indicating disconnection
    alert(`Visitor ${currentVisitor.name} has been disconnected.`);
  } else {
    // If user cancels, do nothing
    return;
  }

  // Find the selected visitor by name
  const selectedVisitor = visitors.find(
    (visitor) => visitor.name === visitorName
  );

  if (selectedVisitor) {
    // If the selected visitor is found, store it in local storage
    localStorage.setItem("currentVisitor", JSON.stringify(selectedVisitor));
    // Display message indicating successful login
    alert(`Visitor ${selectedVisitor.name} logged in.`);
    // Redirect to the zoo page
    window.location.href = "zoo.html";
  } else {
    // If the selected visitor is not found, display an error message
    alert(`Visitor ${visitorName} not found.`);
  }
}

window.addEventListener("load", () => {
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  if (currentVisitor) {
    alert(`Welcome to the zoo ${currentVisitor.name}`);
  }
});

const getVisitorToZooButton = () => {
  const zooButton = document.createElement("button");
  zooButton.innerText = "Go to the Zoo";
  zooButton.className = "zoo-btn";
  zooButton.addEventListener("click", () => {
    window.location.href = "./zoo/html";
  });
  document.body.appendChild(zooButton);
};
getVisitorToZooButton();
