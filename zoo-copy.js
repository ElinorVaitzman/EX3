window.onload = function () {
  generateDataset();
  renderNavbar();
  renderColorDropdown();
  renderAvailableAnimals();
};

// retrieving filter values from local storage

// predator filter
if (localStorage.getItem(predatorFilterKey)) {
  const currentValue = localStorage.getItem(predatorFilterKey);
  if (currentValue === "true") {
    predatorInput.checked = true;
  } else {
    predatorInput.checked = false;
  }
}

// event listeners
nameInput.addEventListener("input", (event) => {
  setFilterOnLocalStorage(nameFilterKey, event.target.value);
  renderAvailableAnimals();
});

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

function visitAnimal(animalName) {
  // ממשו את הלוגיקה של מעבר לעמוד חיה עבור החיה הספציפית שנבחרה
  // שמרו בלוקל סטורג' את החיה שנבחרה, כך שבעמוד החיה נוכל לשלוף אותה מהסטורג' ולהציגה בהתאם
}

if (predatorFilter === "true") {
  predatorInput.checked = predatorFilter === true;
}
