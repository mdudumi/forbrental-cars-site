
document.addEventListener("DOMContentLoaded", () => {
  // Slider functionality
  const images = document.querySelectorAll("#slider img");
  let current = 0;

  function showNextImage() {
    images[current].classList.remove("active");
    current = (current + 1) % images.length;
    images[current].classList.add("active");
  }

  setInterval(showNextImage, 3000);

  // Booking price calculation
  const carPrices = {
    "Car 1": 40,
    "Car 2": 45,
    "Car 3": 70,
    "Car 4": 75
  };

  const carSelect = document.getElementById("car");
  const daysInput = document.getElementById("days");
  const priceDisplay = document.getElementById("price");

  if (carSelect && daysInput && priceDisplay) {
    function updatePrice() {
      const car = carSelect.value;
      const days = parseInt(daysInput.value) || 0;
      const pricePerDay = carPrices[car] || 0;
      priceDisplay.textContent = pricePerDay * days;
    }

    carSelect.addEventListener("change", updatePrice);
    daysInput.addEventListener("input", updatePrice);
  }
});
