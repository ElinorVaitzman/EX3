// מערכים גלובלים שישמשו אותנו בכל העמודים
let visitors = [
  {
    name: "John Smith",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Emily Johnson",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Michael Williams",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Jessica Brown",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Christopher Jones",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Ashley Davis",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Matthew Miller",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Amanda Wilson",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "David Moore",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Sarah Taylor",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "James Anderson",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Robert Jackson",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Elizabeth White",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Daniel Harris",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Melissa Martin",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "William Thompson",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Linda Garcia",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Joseph Martinez",
    coins: 50,
    visits: {},
    feedings: {},
  },
  {
    name: "Karen Robinson",
    coins: 50,
    visits: {},
    feedings: {},
  },
];

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "https://i.ibb.co/XtsS940/lion.jpg",
    angryImage: "https://i.ibb.co/C5pCYBr/angry-lion.png",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
    image: "https://i.ibb.co/f1k9Xk2/elephant3.jpg",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "https://i.ibb.co/GxKZ81s/giraffe.jpg",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "https://i.ibb.co/XZKXphD/final-tiger.png",
    angryImage: "https://i.ibb.co/PgpV2zX/angry-tiger2.png",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "https://i.ibb.co/Lgr6HKc/monkey.jpg",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "https://i.ibb.co/rwvfK2K/kangaroo.jpg",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "black",
    habitat: "sea",
    image: "https://i.ibb.co/XWwwr4s/penguin.jpg",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "white",
    habitat: "land",
    image: "https://i.ibb.co/M85C03J/zebra.jpg",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "https://i.ibb.co/Csf8RCq/cheetah.jpg",
    angryImage: "https://i.ibb.co/55TGrzX/angry-cheetah2.png",
  },
];

// פונקציה זו טוענת עבורכם את המידע ההתחלתי של האפליקציה, במידה וקיים מידע בלוקל סטורג׳, היא תקח אותו משם
// אל תשנו את הקוד בפונקציה הזו כדי לשמור על תקינות הטמפלייט
function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }

  console.log(visitors);
}
generateDataset();

// navbar rendering
function renderNavbar() {
  // page check
  const currentPage = window.location.pathname.split("/").pop(); //extracting the current page filename from the url
  if (
    currentPage !== "zoo.html" &&
    currentPage !== "animal.html" &&
    currentPage !== "dashboard.html"
  )
    return; //not rendering the navbar on other pages
  const navbarDiv = document.getElementById("navbar");
  navbarDiv.innerHTML = `
  <nav id="navbar">
  <div class="navbar-container">
    <div class="visitor-info">
      <span id="current-visitor"></span>
      <span id="visitor-coins"></span>
    </div>
    <div class="navbar-right">
    <h5>Choose Visitor:</h5>
      <select id="visitors-dropdown"></select>
      <div class="nav-buttons">
      <button id="zoo-button" class="nav-btn">Zoo</button>
      <button id="animal-button" class="nav-btn">Animal</button>
      <button id="dashboard-button" class="nav-btn">Dashboard</button>
      <button id="logout-button" class="nav-btn">Logout</button>
      <button id="reset-button">Reset</button>
      </div>
    </div>
  </div>
</nav>
  `;

  // render the current visitor info
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  const currenVisitorInfo = document.getElementById("current-visitor");
  const visitorCoins = document.getElementById("visitor-coins");
  if (currentVisitor) {
    currenVisitorInfo.textContent = `Logged in as: ${currentVisitor.name} ,`;
    visitorCoins.textContent = `Coins: ${currentVisitor.coins}`;
  } else {
    currenVisitorInfo.textContent = `No visitor logged in`;
    visitorCoins.textContent = "";
    alert("Warning! you can't be here if you are not logged in!");
    window.location.href = "login.html";
  }

  // visitors dropdown
  const visitorsDropdown = document.getElementById("visitors-dropdown");
  visitors.forEach((visitor) => {
    const option = document.createElement("option");
    option.text = visitor.name;
    visitorsDropdown.add(option);
  });
  // event listener to visitors dropdown
  visitorsDropdown.addEventListener("change", (e) => {
    const selectedVisitorName = e.target.value;
    const updatedVisitors = JSON.parse(localStorage.getItem("visitors"));
    const selectedVisitor = updatedVisitors.find(
      (visitor) => visitor.name === selectedVisitorName
    );
    localStorage.setItem("currentVisitor", JSON.stringify(selectedVisitor));
    renderNavbar();
  });
  if (currentVisitor) {
    visitorsDropdown.value = currentVisitor.name;
  }

  // event listener to reset button
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", () => {
    localStorage.clear(); //clearing the local storage
    location.reload();
  });
  //event listener to log out button
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", logout);

  // event listener to dashboard button
  const dashboardButton = document.getElementById("dashboard-button");
  dashboardButton.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
  // event listener to animal button
  const animalButton = document.getElementById("animal-button");
  animalButton.addEventListener("click", () => {
    window.location.href = "animal.html";
  });

  //event listener to zoo button
  const zooButton = document.getElementById("zoo-button");
  zooButton.addEventListener("click", () => {
    window.location.href = "zoo.html";
  });
}

function logout() {
  // ממשו את הלוגיקה שמתנתקת מאורח מחובר
  // שימו לב לנקות את השדה המתאים בלוקל סטורג'
  localStorage.removeItem("currentVisitor"); // remove current visitor from local storage
  window.location.href = "signup.html";
}

// function to track visitor interactions with animals
function trackVisitorInteraction(animal) {
  let visitor = JSON.parse(localStorage.getItem("currentVisitor"));
  if (!visitor) {
    console.error("Visitor not found.");
    return;
  }
  // update visitor's interactions with the current animal
  if (!visitor.visits) {
    visitor.visits = {};
  }
  if (!visitor.visits[animal.name]) {
    visitor.visits[animal.name] = 1;
  } else {
    visitor.visits[animal.name]++;
  }
  // save updated visitor data to local storage
  localStorage.setItem("currentVisitor", JSON.stringify(visitor));
}

function trackFeeding(animal) {
  let visitor = JSON.parse(localStorage.getItem("currentVisitor"));
  if (!visitor) {
    console.error("Visitor not found.");
    return;
  }

  // update visitor's feedings with the current animal
  if (!visitor.feedings) {
    visitor.feedings = {};
  }
  if (!visitor.feedings[animal.name]) {
    visitor.feedings[animal.name] = 1;
  } else {
    visitor.feedings[animal.name]++;
  }

  // save updated visitor data to local storage
  localStorage.setItem("currentVisitor", JSON.stringify(visitor));
}
