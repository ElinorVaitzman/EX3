window.onload = function () {
  generateDataset();
  renderVisitors();
  checkIfVisitorConnected();
};

// Declare visitorsForView array to hold filtered visitors
let visitorsForView = [...visitors];

const dialog = document.getElementById("visitor-dialog");
const navbar = document.getElementById("navbar");

// Function to render visitor cards
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

// Function to handle user click on a visitor card
const handleVisitorClick = (visitor) => {
  dialog.innerHTML = "";
  dialog.append(
    getCloseModalHTMLButton(),
    getChooseVisitorButton(visitor),
    getVisitorHTMLCard(visitor)
  );
  dialog.showModal();
};

// Function to create visitor card HTML
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
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "visitor-card";
  cardWrapper.innerHTML = visitorCardTemplate;
  cardWrapper.addEventListener("click", () => handleVisitorClick(visitor));
  return cardWrapper;
};

// Function to create close modal button HTML
const getCloseModalHTMLButton = () => {
  const closeButton = document.createElement("button");
  closeButton.className = "btn";
  closeButton.innerText = "X";
  closeButton.addEventListener("click", () => dialog.close());
  return closeButton;
};

// Function to create choose visitor button HTML
const getChooseVisitorButton = (visitor) => {
  const chooseButton = document.createElement("button");
  chooseButton.className = "btn";
  chooseButton.innerText = "Choose visitor";
  chooseButton.addEventListener("click", () => {
    dialog.close();
    loginAsVisitor(visitor.name);
  });
  return chooseButton;
};

// Function to create search box HTML
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

// Function to clear search box
const clearSearchBox = () => {
  const input = document.getElementById("search-input");
  input.value = "";
  visitorsForView = [...visitors];
  renderVisitors();
};

// Function to create HTML template for empty cards
const getEmptyCardsHTMLTemplate = () => {
  const emptyTemplateWrapper = document.createElement("div");
  emptyTemplateWrapper.className = "empty-result";
  emptyTemplateWrapper.innerHTML = `
      <h2>No Visitors Found</h2>
      <p>We're sorry, but no visitors match your search.</p>
      <button id="clear-filter-btn" class="btn btn-dark">Search Another Visitor</button>
    `;
  emptyTemplateWrapper
    .querySelector("#clear-filter-btn")
    .addEventListener("click", clearSearchBox);
  return emptyTemplateWrapper;
};

// Event listener for page load to render visitors
window.addEventListener("load", renderVisitors);

// Function to handle visitor login
function loginAsVisitor(visitorName) {
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  if (currentVisitor && currentVisitor.name === visitorName) {
    const disconnect = confirm(
      `${currentVisitor.name} is currently logged in. Do you want to disconnect?`
    );
    if (disconnect) {
      localStorage.removeItem("currentVisitor");
      alert(`Visitor ${currentVisitor.name} has been disconnected.`);
    } else {
      return;
    }
  }

  const selectedVisitor = visitors.find(
    (visitor) => visitor.name === visitorName
  );
  if (selectedVisitor) {
    localStorage.setItem("currentVisitor", JSON.stringify(selectedVisitor));
    alert(`Visitor ${selectedVisitor.name} logged in.`);
    window.location.href = "zoo.html"; // Redirect to the zoo page
  } else {
    alert(`Visitor ${visitorName} not found.`);
  }
}

// Function to create button for navigating to the zoo page
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
