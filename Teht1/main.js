import { fetchData } from "./utils.js";
import { baseUrl } from "./variables.js";
import { restaurantRow, restaurantModal } from "./components.js";

const handleTableRowClick = async (tr, restaurant, dialogNode) => {
  document.querySelectorAll("tr").forEach((tr) => {
    tr.classList.remove("highlight");
  });

  tr.classList.add("highlight");

  const menu = await fetchData(`${baseUrl}/daily/${restaurant._id}/fi`);
  console.log("menu", menu);

  dialogNode.innerHTML = restaurantModal(restaurant, menu);
  dialogNode.showModal();
};

const createTable = (restaurants, tableNode, dialogNode) => {
  restaurants.forEach((restaurant) => {
    const tr = restaurantRow(restaurant);
    tableNode.appendChild(tr);

    tr.addEventListener("click", () => {
      handleTableRowClick(tr, restaurant, dialogNode);
    });
  });
};


const buildWebsite = async () => {
  const restaurants = await fetchData(baseUrl);
  restaurants.sort((a, b) =>
    a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim())
  );

  const tableNode = document.querySelector("table");
  const dialogNode = document.querySelector("dialog");

  createTable(restaurants, tableNode, dialogNode);
};

const closeDialog = () => {
  const dialogNode = document.querySelector("dialog");
  dialogNode.close();
};

buildWebsite();
