// function to display animals visited by the current visitor
function showVisitedAnimals() {
  // retrieve visitor data from local storage
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  if (!currentVisitor || !currentVisitor.visits) {
    console.log("No visitor data found.");
    return;
  }
  // extract visited animals from visitor data and display them
  const visitedAnimals = Object.keys(currentVisitor.visits);
  const visitedAnimalsContainer = document.getElementById("visited-animals");
  visitedAnimalsContainer.innerHTML = `<h2>Visited Animals</h2>`;
  visitedAnimals.forEach((animalName) => {
    visitedAnimalsContainer.innerHTML += `<p>${animalName}</p>`;
  });
}

// function to display animals fed by the current visitor
function showFedAnimals() {
  // retrieve visitor data from local storage
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  if (!currentVisitor || !currentVisitor.feedings) {
    console.log("No visitor data found.");
    return;
  }
  // extract fed animals from visitor data and display them
  const fedAnimals = Object.keys(currentVisitor.feedings);
  const fedAnimalsContainer = document.getElementById("fed-animals");
  fedAnimalsContainer.innerHTML = `<h2>Fed Animals</h2>`;
  fedAnimals.forEach((animalName) => {
    fedAnimalsContainer.innerHTML += `<p>${animalName}</p>`;
  });
}

// function to display the favorite animal of the current visitor
function showFavoriteAnimal() {
  // retrieve visitor data from local storage
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  if (!currentVisitor || !currentVisitor.visits) {
    console.log("No visitor data found.");
    return;
  }
  // find the most visited animal
  let maxVisits = 0;
  let favoriteAnimal = null;
  Object.entries(currentVisitor.visits).forEach(([animalName, visits]) => {
    if (visits > maxVisits) {
      maxVisits = visits;
      favoriteAnimal = animalName;
    }
  });

  const favoriteAnimalContainer = document.getElementById("favorite-animal");
  favoriteAnimalContainer.innerHTML = `<h2>Favorite Animal</h2>`;
  favoriteAnimalContainer.innerHTML += `<p>${favoriteAnimal}</p>`;
}

window.onload = function () {
  generateDataset();
  renderNavbar();
  showVisitedAnimals();
  showFedAnimals();
  showFavoriteAnimal();
};
