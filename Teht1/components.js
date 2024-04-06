export const restaurantRow = ({ name, address }) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${name}</td><td>${address}</td>`;
  return tr;
};

export const restaurantModal = (
  { name, address, postalCode, city, phone, company },
  { courses }
) => {
  const phoneLink = phone !== "-" ? createPhoneLink(phone) : "";

  let menuHtml = "<ul>";
  for (const menuItem of courses) {
    menuHtml += `<li>${menuItem.name}, ${menuItem.price || "?€"}. ${
      menuItem.diets
    }</li>`;
  }
  menuHtml += "</ul>";

  return `
    <h1>${name}</h1>
    <p>${address}</p>
    <p>${postalCode}, ${city}</p>
    <p>${phone}</p>
    <p>${company}</p>
    ${menuHtml}
    <form method="dialog">
      <button onclick="closeDialog()">Sulje</button>
    </form>
  `;
};
