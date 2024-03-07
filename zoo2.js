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
  "Grey",
  "Black",
  "white",
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

const nameFilter = localStorage.getItem(nameFilterKey);
const habitatFilter = localStorage.getItem(habitatFilterKey);
const predatorFilter = localStorage.getItem(predatorFilterKey);
const colorFilter = localStorage.getItem(colorFilterKey);
const minHeightFilter = localStorage.getItem(minHeightFilterKey);
const minWeightFilter = localStorage.getItem(minWeightFilterKey);

// function to load filter values from local storage
function loadFiltersFromLocalStorage() {
  console.log("loading filters from local storge");
  // name filter
  if (nameFilter) {
    nameInput.value = nameFilter;
  }

  //   habitat filter
  if (habitatFilter) {
    habitatInputs.forEach((input) => {
      if (input.value === habitatFilter) {
        input.checked = true;
      }
    });
  }

  // predator filter
  if (predatorFilter === "true") {
    predatorInput.checked = true;
  }

  //color filter
  if (colorFilter) {
    colorDropdown.value = colorFilter;
  }

  // min height filter
  if (minHeightFilter) {
    minHeightInput.value = minHeightFilter;
  }

  // min weight filter
  if (minWeightFilter) {
    minWeightInput.value = minWeightFilter;
  }
}

// function to render available animals based on filter criteria
function renderAvailableAnimals() {
  console.log("rendering available animals");
  const animalCardsContainer = document.getElementById("animal-cards");
  animalCardsContainer.innerHTML = "";

  const animalsForView = filteredAnimals();

  animalsForView.forEach((animal) => {
    const animalCardHTML = getAnimalHTMLCard(animal);
    animalCardsContainer.insertAdjacentHTML("beforeend", animalCardHTML);
  });

  if (animalsForView.length === 0) {
    animalCardsContainer.appendChild(getEmptyCardsHTMLTemplate());
  }

  //event listener to the animals cards
  const animalCards = document.querySelectorAll(".animal-card");
  animalCards.forEach((card) => {
    card.addEventListener("click", () => {
      const animalName = card.querySelector("h3").textContent; //get the name of the animal from the card
      const animal = animals.find((a) => a.name === animalName);
      visitAnimal(animal);
    });
  });
}

//
function visitAnimal(animal) {
  // ממשו את הלוגיקה של מעבר לעמוד חיה עבור החיה הספציפית שנבחרה
  // שמרו בלוקל סטורג' את החיה שנבחרה, כך שבעמוד החיה נוכל לשלוף אותה מהסטורג' ולהציגה בהתאם
  localStorage.setItem("selectedAnimal", JSON.stringify(animal)); //save the selected animal in local storage
  trackVisitorInteraction(animal);
  window.location.href = "animal.html";
}

// function to filter animals based on filter criteria
function filteredAnimals() {
  const nameFilter = localStorage.getItem(nameFilterKey);
  const habitatFilter = localStorage.getItem(habitatFilterKey);
  const predatorFilter = localStorage.getItem(predatorFilterKey);
  const colorFilter = localStorage.getItem(colorFilterKey);
  const minHeightFilter = localStorage.getItem(minHeightFilterKey);
  const minWeightFilter = localStorage.getItem(minWeightFilterKey);
  return animals.filter((animal) => {
    //checking name filter

    if (
      nameFilter &&
      !animal.name.toLowerCase().includes(nameFilter.toLowerCase())
    ) {
      return false;
    }

    //checking habitat filter
    if (
      habitatFilter &&
      animal.habitat.toLowerCase() !== habitatFilter.toLowerCase()
    ) {
      return false;
    }

    // checking predator filter
    // if the filter exists and the stringified boolean value of the animal's predator isnt equal to the filter value
    //filter the animal out
    if (
      predatorFilter !== null &&
      animal.isPredator.toString() !== predatorFilter
    ) {
      return false;
    }

    // checking color filter
    if (
      colorFilter &&
      animal.color.toLowerCase() !== colorFilter.toLowerCase()
    ) {
      return false;
    }

    // checking min height filter
    // if the filter exists and the animal's height smaller than the filter valur
    if (minHeightFilter && animal.height < parseInt(minHeightFilter)) {
      return false;
    }

    // checking min weight filter
    // if the filter exists and the animal's height smaller than the filter valur
    if (minWeightFilter && animal.weight < parseInt(minWeightFilter)) {
      return false;
    }
    // if passed all filters, return true to include the animal into the filtedred animals array
    return true;
  });
}

// function to set up event listeners for all filters
function setupFilterListeners() {
  console.log("Setting up filter listeners");
  // name input listener
  nameInput.addEventListener("input", () => {
    console.log("Name input changed");
    setFilterOnLocalStorage(nameFilterKey, nameInput.value);
    renderAvailableAnimals();
  });

  // habitat inputs listener
  habitatInputs.forEach((input) => {
    console.log("habitat input changed");
    input.addEventListener("change", () => {
      setFilterOnLocalStorage(habitatFilterKey, input.value);
    });
  });

  // predator input listener
  predatorInput.addEventListener("change", () => {
    console.log("predator input changed");
    setFilterOnLocalStorage(predatorFilterKey, predatorInput.checked);
    renderAvailableAnimals();
  });

  // color input listener
  colorDropdown.addEventListener("change", () => {
    console.log("color input changed");
    setFilterOnLocalStorage(colorFilterKey, colorDropdown.value);
    renderAvailableAnimals();
  });

  // min height input listener
  minHeightInput.addEventListener("input", () => {
    console.log("height input changed");
    setFilterOnLocalStorage(minHeightFilterKey, minHeightInput.value);
    renderAvailableAnimals();
  });

  // min weight input listener
  minWeightInput.addEventListener("input", () => {
    console.log("weight input changed");
    setFilterOnLocalStorage(minWeightFilterKey, minWeightInput.value);
    renderAvailableAnimals();
  });

  // clear filters Button
  const clearFiltersBtn = document.getElementById("clear-filters-btn");
  clearFiltersBtn.addEventListener("click", () => {
    clearAllFilters();
    renderAvailableAnimals();
  });
}

// function to set filter value in local storage
function setFilterOnLocalStorage(filterKey, filterValue) {
  localStorage.setItem(filterKey, filterValue);
  console.log(localStorage.getItem(filterKey));
}

// empty cards template
const getEmptyCardsHTMLTemplate = () => {
  const emptyTemplateWrapper = document.createElement("div");
  emptyTemplateWrapper.className = "empty-result";
  emptyTemplateWrapper.innerHTML = `
      <h2>No Animals Found</h2>
        <p>We're sorry, but no animals match your search.</p>
        <button id="clear-filter-btn" class="btn btn-dark">Search Another Animal</button>
      `;
  //adds an event listener to the button with the id "clear-filter-btn"
  emptyTemplateWrapper.children["clear-filter-btn"].addEventListener(
    "click",
    clearAllFilters
  );
  return emptyTemplateWrapper;
};

// animal card template
function getAnimalHTMLCard(animal) {
  return `
    <div class="animal-card">
        <img src="${animal.image}" alt="${animal.name}" class="animal-image">
        <div class="animal-details">
          <h3>${animal.name}</h3>
        </div>
      </div>
    
    `;
}

//       <button type="button" class="visit-btn btn btn-outline-success">Visit</button>

{
  /* <p>isPredator: ${animal.isPredator}</p>
          <p>Weight: ${animal.weight} kg</p>
          <p>Height: ${animal.height} cm</p>
          <p>Color: ${animal.color}</p>
          <p>Habitat: ${animal.habitat}</p> */
}

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

  renderAvailableAnimals();
}

// Call necessary functions when the window loads
window.onload = function () {
  generateDataset();
  renderNavbar();
  renderColorDropdown();
  loadFiltersFromLocalStorage(); // load filter values from local storage

  renderAvailableAnimals();
  setupFilterListeners(); // set up event listeners for other filters
};
