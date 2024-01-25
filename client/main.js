function loadLocations() {
  fetch('http://127.0.0.1:5000/get_location_names')
    .then(response => response.json())
    .then(data => {
      const locationSelect = document.getElementById('location');
      data.locations.forEach(location => {
        let option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error:', error));
}

function estimatePrice() {
  const area = document.getElementById('area').value;
  const bhk = document.getElementById('bhk').value;
  const bath = document.getElementById('bath').value;
  const location = document.getElementById('location').value;

  // Chuyển đổi dữ liệu sang x-www-form-urlencoded
  const formData = new FormData();
  formData.append('location', location);
  formData.append('total_sqft', area);
  formData.append('bhk', bhk);
  formData.append('bath', bath);

  fetch('http://127.0.0.1:5000/predict_home_price', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('estimated-price').textContent = data.estimated_price + ' Lakh';
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('estimated-price').textContent = 'Error fetching estimated price';
    });
}


window.onload = loadLocations;