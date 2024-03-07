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

// capturing user input
const nameInput = document.querySelector("#name-input");
const habitatInputs = document.querySelectorAll("[name='habitat']");
const predatorInput = document.querySelector("#predator");
const colorDropdown = document.querySelector("#color-filter");
const minHeightInput = document.querySelector("#min-height");
const minWeightInput = document.querySelector("#min-weight");

// filter key declaration
const nameFilterKey = "name-filter";
const habitatFilterKey = "habitat-filter";
const predatorFilterKey = "predator-filter";
const colorFilterKey = "color-filter";
const minHeightFilterKey = "min-height-filter";
const minWeightFilterKey = "min-weight-filter";

// Get the animal cards container
const animalCardsContainer = document.getElementById("animal-cards");

// Load filters from local storage on page load
window.onload = function () {
  loadFiltersFromLocalStorage();
  renderAvailableAnimals();
};

// function to load filter values from local storage
function loadFiltersFromLocalStorage() {
  nameInput.value = localStorage.getItem(nameFilterKey) || "";
  habitatInputs.forEach((input) => {
    input.checked = localStorage.getItem(habitatFilterKey) === input.value;
  });
  predatorInput.checked = localStorage.getItem(predatorFilterKey) === "true";
  colorDropdown.value = localStorage.getItem(colorFilterKey) || "all";
  minHeightInput.value = localStorage.getItem(minHeightFilterKey) || "";
  minWeightInput.value = localStorage.getItem(minWeightFilterKey) || "";
}

// function to render available animals based on filter criteria
function renderAvailableAnimals() {
  const animalsForView = filteredAnimals();
  animalCardsContainer.innerHTML = "";

  if (animalsForView.length === 0) {
    animalCardsContainer.appendChild(getEmptyCardsHTMLTemplate());
  } else {
    animalsForView.forEach((animal) => {
      const animalCardHTML = getAnimalHTMLCard(animal);
      animalCardsContainer.insertAdjacentHTML("beforeend", animalCardHTML);
    });
  }
}

// function to filter animals based on filter criteria
function filteredAnimals() {
  return animals.filter((animal) => {
    const nameMatch = nameInput.value.trim().toLowerCase()
      ? animal.name.toLowerCase().includes(nameInput.value.trim().toLowerCase())
      : true;

    const habitatMatch = Array.from(habitatInputs).some(
      (input) => input.checked && input.value === animal.habitat
    );

    const predatorMatch =
      predatorInput.checked === "" ||
      predatorInput.checked === animal.isPredator;

    const colorMatch =
      colorDropdown.value === "all" ||
      colorDropdown.value === animal.color.toLowerCase();

    const minHeightMatch =
      minHeightInput.value === "" ||
      parseInt(minHeightInput.value) <= animal.height;

    const minWeightMatch =
      minWeightInput.value === "" ||
      parseInt(minWeightInput.value) <= animal.weight;

    return (
      nameMatch &&
      habitatMatch &&
      predatorMatch &&
      colorMatch &&
      minHeightMatch &&
      minWeightMatch
    );
  });
}

// function to set filter value in local storage
function setFilterOnLocalStorage(filterKey, filterValue) {
  localStorage.setItem(filterKey, filterValue);
}

// function to clear all filters
function clearAllFilters() {
  nameInput.value = "";
  habitatInputs.forEach((input) => (input.checked = false));
  predatorInput.checked = false;
  colorDropdown.value = "all";
  minHeightInput.value = "";
  minWeightInput.value = "";

  // Clear filter values from local storage
  localStorage.removeItem(nameFilterKey);
  localStorage.removeItem(habitatFilterKey);
  localStorage.removeItem(predatorFilterKey);
  localStorage.removeItem(colorFilterKey);
  localStorage.removeItem(minHeightFilterKey);
  localStorage.removeItem(minWeightFilterKey);

  // Render available animals
  renderAvailableAnimals();
}

// Setup filter event listeners
nameInput.addEventListener("input", () => {
  setFilterOnLocalStorage(nameFilterKey, nameInput.value.trim());
  renderAvailableAnimals();
});

habitatInputs.forEach((input) => {
  input.addEventListener("change", () => {
    setFilterOnLocalStorage(habitatFilterKey, input.checked ? input.value : "");
    renderAvailableAnimals();
  });
});

predatorInput.addEventListener("change", () => {
  setFilterOnLocalStorage(predatorFilterKey, predatorInput.checked);
  renderAvailableAnimals();
});

colorDropdown.addEventListener("change", () => {
  setFilterOnLocalStorage(colorFilterKey, colorDropdown.value);
  renderAvailableAnimals();
});

minHeightInput.addEventListener("input", () => {
  setFilterOnLocalStorage(minHeightFilterKey, minHeightInput.value.trim());
  renderAvailableAnimals();
});

minWeightInput.addEventListener("input", () => {
  setFilterOnLocalStorage(minWeightFilterKey, minWeightInput.value.trim());
  renderAvailableAnimals();
});

// empty cards template
const getEmptyCardsHTMLTemplate = () => {
  const emptyTemplateWrapper = document.createElement("div");
  emptyTemplateWrapper.className = "empty-result";
  emptyTemplateWrapper.innerHTML = `
        <h2>No Animals Found</h2>
        <p>We're sorry, but no animals match your search.</p>
        <button id="clear-filter-btn" class="btn btn-dark">Clear Filters</button>
      `;
  //adds an event listener to the button with the id "clear-filter-btn"
  emptyTemplateWrapper
    .querySelector("#clear-filter-btn")
    .addEventListener("click", clearAllFilters);
  return emptyTemplateWrapper;
};

// animal card template
function getAnimalHTMLCard(animal) {
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
