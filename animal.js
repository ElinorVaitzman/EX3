// Function to track visitor interactions with animals
function trackVisitorInteraction(animal) {
  let visitor = JSON.parse(localStorage.getItem("selectedVisitor"));
  if (!visitor) {
    console.error("Visitor not found.");
    return;
  }

  // Update visitor's interactions with the current animal
  if (!visitor.interactions) {
    visitor.interactions = {};
  }
  if (!visitor.interactions[animal.name]) {
    visitor.interactions[animal.name] = 1;
  } else {
    visitor.interactions[animal.name]++;
  }

  // Save updated visitor data to local storage
  localStorage.setItem("selectedVisitor", JSON.stringify(visitor));
}

// for dashboard

//carture the elements
const animalImage = document.getElementById("image");
const animalName = document.getElementById("name");
const animalWeight = document.getElementById("weight");
const animalHeight = document.getElementById("height");
const animalColor = document.getElementById("color");
const animalHabitat = document.getElementById("habitat");
const isPredator = document.getElementById("isPredator");
const relatedAnimalsContainer = document.getElementById("related-animals");

// load the selected animal from local storage
const selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));

function renderAnimal(selectedAnimal) {
  //הציגו את החיה שאליה עברתם מעמוד גן החיות ששמורה בלוקל סטורג'
  // רנדרו את פרטי החיה לתוך האלמנטים המתאימים בהתאם לשדה הספציפי

  animalImage.innerHTML = `<img src="${selectedAnimal.image}>" alt=${selectedAnimal.name}" class ="animal-image">`;
  animalName.textContent = selectedAnimal.name;
  animalWeight.textContent = `Weight: ${selectedAnimal.weight} kg`;
  animalHeight.textContent = `Height: ${selectedAnimal.height} cm`;
  animalColor.textContent = `Color: ${selectedAnimal.color}`;
  animalHabitat.textContent = `Habitat: ${selectedAnimal.habitat}`;
  isPredator.textContent = `Is Predator: ${
    selectedAnimal.isPredator ? "Yes" : "No"
  }`;
}

function renderRelatedAnimals() {
  // ממשו את הלוגיקה שמרנדרת כרטיסיות של החיות ששדה ההאביטט שלהם זהה לחיה שמוצגת
  // רנדרו אותן לתוך הדיב שמיועד להן עם האיידי related-animals
  // ממשו את אותה לוגיקה של כרטיסיית חיה כמו בכרטיסיות בעמוד zoo.html
  const selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));

  relatedAnimalsContainer.innerHTML = "";
  const headlineContainer = document.createElement("div");
  headlineContainer.classList.add("headline");
  const headline = document.createElement("h2");
  headline.textContent = `Animals related to the ${selectedAnimal.name}:`;
  headlineContainer.appendChild(headline);
  const selectedDiv = document.querySelector(".selected-animal");
  selectedDiv.insertAdjacentElement("afterend", headlineContainer);

  const relatedAnimals = animals.filter(
    (animal) =>
      animal.habitat === selectedAnimal.habitat &&
      animal.name !== selectedAnimal.name
  );
  if (relatedAnimals) {
    relatedAnimals.forEach((animal) => {
      const card = document.createElement("div");
      card.classList.add("related-animal-card");
      card.innerHTML = `
  <img src="${animal.image}" alt="${animal.name}" class="related-animal-image">
      <h3>${animal.name}</h3>
  `;
      relatedAnimalsContainer.append(card);
      card.addEventListener("click", () => {
        let animalName = card.querySelector("h3").textContent;
        let animal = animals.find((a) => a.name === animalName);
        headlineContainer.innerHTML = "";
        handleRelatedAnimalClick(animal);
      });
    });
  } else {
  }
}

// handle clicking on related animal cards
function handleRelatedAnimalClick(animal) {
  // Set the clicked animal as the selected animal
  localStorage.setItem("selectedAnimal", JSON.stringify(animal));
  // Render the selected animal
  renderAnimal(animal);
  renderRelatedAnimals();
}

function feedAnimal() {
  // ממשו את הלוגיקה של האכלת חיה
  // במידה ואין מספיק מטבעות, טפלו בהתאם להנחיות במטלה
  //get current visitor data from local storage
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  console.log("Feed me button clicked!");

  if (currentVisitor) {
    // extract the coins info
    const visitorsCoins = currentVisitor.coins;
    if (visitorsCoins >= 2) {
      currentVisitor.coins -= 2;
      localStorage.setItem("currentVisitor", JSON.stringify(currentVisitor));
      const selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));
      updateModalContent(
        `<p>Thank you for feeding the ${selectedAnimal.name} !</p>`
      );
      openModal();
      renderNavbar();
    } else {
      //handle cases when the visitor dont have enought coins
      if (selectedAnimal.isPredator) {
        const selectedAnimal = JSON.parse(
          localStorage.getItem("selectedAnimal")
        );

        visitorGotEaten(selectedAnimal, currentVisitor);
      } else {
        const selectedAnimal = JSON.parse(
          localStorage.getItem("selectedAnimal")
        );

        animalEscaped(selectedAnimal);
      }
    }
  }
}

const feedAnimalButton = document.getElementById("feed-animal");
feedAnimalButton.addEventListener("click", feedAnimal);

// Function to handle when the visitor gets eaten
function visitorGotEaten(animal, visitor) {
  const updatedVisitors = visitors.filter(
    (visitor_) => visitor_.name !== visitor.name
  );
  localStorage.setItem("visitors", JSON.stringify(updatedVisitors));
  localStorage.setItem("selectedVisitor", "");
  localStorage.setItem("currentVisitor", "");

  const text = `
  <div name="${visitor.name}" style="width:100%; margin: 10px;">
  <h5 class="card-title">${visitor.name} was eaten by the ${animal.name}!</h5>
  <img class="card-img-top" src="${animal.angryImage}" alt="angry animal image" style="width: 100%;">`;
  updateModalContent(text);
  openModal();

  // delay before redirecting to login page
  setTimeout(function () {
    window.location.href = "login.html";
  }, 5000); // 5000 milliseconds = 5 seconds
}

// function to handle when an animal escapes
function animalEscaped(animal) {
  const index = animals.findIndex((a) => a.name === animal.name);
  if (index !== -1) {
    // remove the escaped animal from the array
    animals.splice(index, 1);

    // save the updated array back to local storage
    localStorage.setItem("animals", JSON.stringify(animals));
  }
  const text = `The ${animal.name} has escaped from the zoo!`;
  updateModalContent(text);
  openModal();
  setTimeout(function () {
    window.location.href = "zoo.html";
  }, 3000);
}

// MODAL
// get the modal
var modal = document.getElementById("myModal");

// get the span element that closes the modal
var span = document.getElementsByClassName("close")[0];

// function to open the modal
function openModal() {
  modal.style.display = "block";
}

// // when the user clicks on span (x) close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// when the user clicks anywhere outside of the modal close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// function to update modal content
function updateModalContent(content) {
  const modalContent = document.querySelector(".modal-content");
  if (modalContent) {
    modalContent.innerHTML = content;
  } else {
    console.error("Modal content element not found.");
  }
}

window.onload = function () {
  generateDataset();
  renderNavbar();
  renderAnimal(selectedAnimal);
  renderRelatedAnimals();
};
