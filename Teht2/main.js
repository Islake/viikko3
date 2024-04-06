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

const filterAndDisplayRestaurants = async (filter) => {
  try {
    const restaurants = await fetchData(baseUrl);
    const filteredRestaurants = restaurants.filter(
      (restaurant) => restaurant.company === filter
    );
    return filteredRestaurants;
  } catch (error) {
    console.error("Error fetching or filtering data:", error);
    return [];
  }
};

const buildWebsite = async () => {
  const tableNode = document.querySelector("table");
  const dialogNode = document.querySelector("dialog");

  const filter = "Sodexo"; //
  const filteredRestaurants = await filterAndDisplayRestaurants(filter);

  if (filteredRestaurants.length > 0) {
    createTable(filteredRestaurants, tableNode, dialogNode);
  } else {
    tableNode.innerHTML = "<tr><td colspan='2'>No restaurants found.</td></tr>";
  }
};

const closeDialog = () => {
  const dialogNode = document.querySelector("dialog");
  dialogNode.close();
};

buildWebsite();
