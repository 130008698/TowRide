document.getElementById("bookNow").addEventListener("click", function () {
  window.location.href = "booking.html";
});

document.getElementById("menu").addEventListener("click", function () {
  fetch("/fetch_data")
    .then((response) => response.json())
    .then((data) => {
      const dataContainer = document.getElementById("dataContainer");
      dataContainer.innerHTML = JSON.stringify(data, null, 2); // Display data as formatted JSON for simplicity
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

document
  .getElementById("fetchTableData")
  .addEventListener("click", function () {
    const tableName = document.getElementById("tableNameInput").value;
    if (!tableName) {
      alert("Please enter a table name!");
      return;
    }

    fetch(`/get_table?name=${tableName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        document.getElementById("tableOutput").textContent = data;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
