window.onload = function () {
  generateDataset();
  renderNavbar();
  renderColorDropdown();
  renderAvailableAnimals();
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

// event listeners
nameInput.addEventListener("input", (event) => {
  setFilterOnLocalStorage(nameFilterKey, event.target.value);
  renderAvailableAnimals();
});

habitatInputs.forEach((input) => {
  input.addEventListener("change", () => {
    setFilterOnLocalStorage(habitatFilterKey, input.value);
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
  setFilterOnLocalStorage(minHeightFilterKey, minHeightInput.value);
  renderAvailableAnimals();
});

minWeightInput.addEventListener("input", () => {
  setFilterOnLocalStorage(minWeightFilterKey, minWeightInput.value);
  renderAvailableAnimals();
});

function setFilterOnLocalStorage(filterKey, filterValue) {
  localStorage.setItem(filterKey, filterValue);
  // console.log(localStorage.getItem(filterKey));
  // ודאו כי אתם שומרים את הפילטרים שהיוזר בחר בלוקל סטורג׳ וטוענים אותם בהתאם
  // רנדרו רק את החיות שעומדות בתנאים של הפילטרים
}

// retrieving filter values from local storage
//name filter
if (localStorage.getItem(nameFilterKey)) {
  nameInput.value = localStorage.getItem(nameFilterKey);
}
// habitat filter
const savedHabitatFilterValue = localStorage.getItem(habitatFilterKey);
if (savedHabitatFilterValue) {
  habitatInputs.forEach((input) => {
    if (input.value === savedHabitatFilterValue) {
      input.checked = true;
    }
  });
}
// predator filter
if (localStorage.getItem(predatorFilterKey)) {
  const currentValue = localStorage.getItem(predatorFilterKey);
  if (currentValue === "true") {
    predatorInput.checked = true;
  } else {
    predatorInput.checked = false;
  }
}
//color filter
if (localStorage.getItem(colorFilterKey)) {
  colorDropdown.value = localStorage.getItem(colorFilterKey);
}
// min height filter
if (localStorage.getItem(minHeightFilterKey)) {
  minHeightInput.value = localStorage.getItem(minHeightFilterKey);
}
// min weight filter
if (localStorage.getItem(minWeightFilterKey)) {
  minWeightInput.value = localStorage.getItem(minWeightFilterKey);
}

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

const nameFilter = localStorage.getItem(nameFilterKey);
const habitatFilter = localStorage.getItem(habitatFilterKey);
const predatorFilter = localStorage.getItem(predatorFilterKey);
const colorFilter = localStorage.getItem(colorFilterKey);
const minHeightFilter = localStorage.getItem(minHeightFilterKey);
const minWeightFilter = localStorage.getItem(minWeightFilterKey);

// const filteredAnimals = [...animals];
// rendering filtered animals

console.log("Before renderAvailableAnimals()");
function renderAvailableAnimals() {
  // ממשו את הלוגיקה שמרנדרת את החיות לתוך הדיב עם האיידי animal-cards
  // וודאו שאתם מציגים אך ורק את החיות שעומדות בפילטורים הנוכחיים
  // במידה ואין פילטרים מסומנים, הציגו את כל החיות

  const animalCardsContainer = document.getElementById("animal-cards");
  animalCardsContainer.innerHTML = "";

  console.log("Inside renderAvailableAnimals()");
  const filteredAnimals = animals.filter((animal) => {
    // checking name filter
    //  logic: if the filter exists and the filter value is not found in the the animal's name (-1),
    // the animals name doesn't match the filter value, so the animal is filtered out.
    console.log("nameFilter:", nameFilter);
    if (
      nameFilter &&
      animal.name.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1
    ) {
      return false;
    }

    //checking habitat filter
    if (
      habitatFilter &&
      animal.habitat.toLowerCase() != habitatFilter.toLowerCase()
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
    if (minHeightFilter && animal.height < parseInt(minWeightFilter)) {
      return false;
    }
    // if passed all filters, return true to include the animal into the filtedred animals array
    return true;
  });

  if (
    !nameFilter &&
    !habitatFilter &&
    !predatorFilter &&
    !colorFilter &&
    !minHeightFilter &&
    !minWeightFilter
  ) {
    animals.forEach((animal) => {
      const animalCardHTML = geAnimalHTMLCard(animal);
      animalCardsContainer.insertAdjacentHTML("beforeend", animalCardHTML);
    });
  } else {
    animalCardsContainer.innerHTML = "";
    //loop over filtered animals and insert HTML for each animal card
    filteredAnimals.forEach((animal) => {
      const animalCardHTML = geAnimalHTMLCard(animal);
      animalCardsContainer.insertAdjacentHTML("beforeend", animalCardHTML);
    });
  }
}

console.log("After renderAvailableAnimals()");

window.addEventListener("load", renderAvailableAnimals());
