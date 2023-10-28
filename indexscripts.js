document.getElementById("bookNow").addEventListener("click", function () {
  window.location.href = "booking.html";
});

document.getElementById("menu").addEventListener("click", function () {
  fetch("/fetch-data")
    .then((response) => response.json())
    .then((data) => {
      const dataContainer = document.getElementById("dataContainer");
      dataContainer.innerHTML = JSON.stringify(data, null, 2); // Display data as formatted JSON for simplicity
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
