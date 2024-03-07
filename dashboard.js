function showVisitedAnimals() {
  //ממשו את הלוגיקה שמציגה את החיות שהאורח הנוכחי ביקר בהן
}
function showFedAnimals() {
  //ממשו את הלוגיקה שמציגה את החיות שהאורח הנוכחי האכיל אותן
}
function showFavoriteAnimal() {
  //ממשו את הלוגיקה שמציגה את החיה שהאורח ביקר הכי הרבה פעמים אצלה
}

// Function to display animals visited by the current visitor
function showVisitedAnimals() {
  // Retrieve visitor data from local storage
  const currentVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));
  if (!currentVisitor || !currentVisitor.visits) {
    console.log("No visitor data found.");
    return;
  }

  // Extract visited animals from visitor data and display them
  const visitedAnimals = Object.keys(currentVisitor.visits);
  console.log("Visited Animals:", visitedAnimals);
}

// Function to display animals fed by the current visitor
function showFedAnimals() {
  // Logic to display animals fed by the current visitor
}

// Function to display the favorite animal of the current visitor
function showFavoriteAnimal() {
  // Logic to determine and display the favorite animal of the current visitor
}
