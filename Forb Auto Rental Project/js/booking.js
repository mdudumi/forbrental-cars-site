document.addEventListener("DOMContentLoaded", () => {
  const bookingContainer = document.querySelector(".booking-form-container");
  const carPricePerDay = parseInt(document.querySelector(".car-details").dataset.price);

  bookingContainer.innerHTML = `
    <form id="booking-form">
      <label for="start-date">Start Date:</label>
      <input type="date" id="start-date" name="start_date" required />

      <label for="start-time">Pick-up Time:</label>
      <input type="time" id="start-time" name="start_time" required />

      <label for="end-date">Return Date:</label>
      <input type="date" id="end-date" name="end_date" required />

      <label for="end-time">Drop-off Time:</label>
      <input type="time" id="end-time" name="end_time" required />

      <label for="pickup-location">Pick-up Location:</label>
      <select id="pickup-location" name="pickup_location" required>
        <option value="">Select location</option>
        <option>Tirana, Airport</option>
        <option>Tirana, Don-Bosko</option>
        <option>Tirana, Center</option>
        <option>Other</option>
      </select>

      <label for="dropoff-location">Drop-off Location:</label>
      <select id="dropoff-location" name="dropoff_location" required>
        <option value="">Select location</option>
        <option>Tirana, Airport</option>
        <option>Tirana, Don-Bosko</option>
        <option>Tirana, Center</option>
        <option>Other</option>
      </select>

      <div class="booking-options">
        <label><input type="checkbox" id="snow-tires" name="snow_tires" value="15" /> Snow Tires ($15/day)</label>
        <label><input type="checkbox" id="child-seat" name="child_seat" value="10" /> Child Seat ($10/day)</label>
        <label><input type="checkbox" id="gps" name="gps" value="12" /> GPS Navigation ($12/day)</label>
        <label><input type="checkbox" id="insurance" name="insurance" value="15" /> Insurance ($15/day)</label>
      </div>

      <label for="full-name">Full Name:</label>
      <input type="text" id="full-name" name="full_name" required />

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label for="phone">Phone Number:</label>
      <input type="tel" id="phone" name="phone" required />

      <input type="hidden" name="total_price" id="hidden-total" />
      <input type="hidden" name="car_model" value="Ford Fiesta 2019" />

      <div id="total-price">Total Price: $0</div>

      <button type="submit">Book Now</button>
    </form>
  `;

  const form = document.getElementById('booking-form');
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const startTimeInput = document.getElementById('start-time');
  const endTimeInput = document.getElementById('end-time');
  const snowTires = document.getElementById('snow-tires');
  const childSeat = document.getElementById('child-seat');
  const gps = document.getElementById('gps');
  const totalPriceEl = document.getElementById('total-price');
  const hiddenTotal = document.getElementById('hidden-total');

  function calculatePrice() {
    if (!startDateInput.value || !endDateInput.value || !startTimeInput.value || !endTimeInput.value) {
      totalPriceEl.textContent = "Total Price: $0";
      return 0;
    }

    const startDateTime = new Date(`${startDateInput.value}T${startTimeInput.value}`);
    const endDateTime = new Date(`${endDateInput.value}T${endTimeInput.value}`);

    if (endDateTime <= startDateTime) {
      totalPriceEl.textContent = "Total Price: $0";
      return 0;
    }

    const days = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60 * 24));
    let total = days * carPricePerDay;
    if (snowTires.checked) total += days * parseInt(snowTires.value);
    if (childSeat.checked) total += days * parseInt(childSeat.value);
    if (gps.checked) total += days * parseInt(gps.value);

    totalPriceEl.textContent = `Total Price: $${total}`;
    hiddenTotal.value = `$${total}`;
    return total;
  }

  [startDateInput, endDateInput, startTimeInput, endTimeInput, snowTires, childSeat, gps].forEach(el => {
    el.addEventListener('input', calculatePrice);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const total = calculatePrice();
    if (total === 0) {
      alert("Please enter valid dates and times.");
      return;
    }

    emailjs.sendForm('service_7rwv8g8', 'template_x6zboeo', form)
      .then(() => {
        alert("Booking sent successfully!");
        form.reset();
        calculatePrice();
      })
      .catch(error => {
        alert("Failed to send booking: " + error.text);
      });
  });

  calculatePrice();
});

