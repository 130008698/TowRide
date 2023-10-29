document.getElementById("get_table").addEventListener("click", function () {
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
      console.error("There was a problem with get table operation:", error);
    });
});

document.getElementById("check_menu").addEventListener("click", function () {
  const itemName = document.getElementById("menuNameInput").value;
  if (!itemName) {
    alert("Please enter a item name!");
    return;
  }

  fetch(`/check_menu?name=${itemName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const resultContainer = document.getElementById("checkMenuOutput");
      if (data.exists) {
        resultContainer.textContent = `${itemName} exists in the menu.`;
      } else {
        resultContainer.textContent = `${itemName} does not exist in the menu.`;
      }
    })
    .catch((error) => {
      console.error("There was a problem with checkMenu operation:", error);
    });
});
