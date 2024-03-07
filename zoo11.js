window.onload = function () {
  generateDataset();
  renderNavbar();
  renderColorDropdown();
};

//colors for filter
const availableColors = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
];

// rendering color dropdown
function renderColorDropdown() {
  const colorDropdown = document.getElementById("color-filter");
  colorDropdown.innerHTML = "";
  // all-colors option
  const allColorsOption = document.createElement("option");
  allColorsOption.value = "all";
  allColorsOption.textContent = "All Colors";
  colorDropdown.appendChild(allColorsOption);
  // each color option
  availableColors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color.toLowerCase();
    option.textContent = color;
    colorDropdown.appendChild(option);
  });
}

let filteredAnimals = [...animals];

// animal card template
function geAnimalHTMLCard(animal) {
  return `
    <div class="animal-card">
        <img src="${animal.image}" alt="${animal.name}" class="animal-image">
        <div class="animal-details">
          <h3>${animal.name}</h3>
          <p>isPredator: ${animal.isPredator}</p>
          <p>Weight: ${animal.weight} kg</p>
          <p>Height: ${animal.height} cm</p>
          <p>Color: ${animal.color}</p>
          <p>Habitat: ${animal.habitat}</p>
        </div>
      </div>
    
    `;
}

const animalsForView = filteredAnimals();
function renderAvailableAnimals() {
  const animalCardsContainer = document.getElementById("animal-cards");
  animalCardsContainer.innerHTML = "";
  animalsForView.forEach((animal) => {
    const animalCard = geAnimalHTMLCard(animal);
    animalCardsContainer.appendChild(animalCard);
  });
  if (filteredAnimals.length === 0) {
    animalCardsContainer.appendChild(getEmptyCardsHTMLTemplate());
  }
}

function filteredAnimals() {
  filteredAnimals = animals.fillter((animal) => {
    //logic
  });
}

const getNameInput = () => {
  //logic
  //nameInput.addeventlistener{
  //logic
  //     renderAvailableAnimals()
  // }
  return nameInput;
};
