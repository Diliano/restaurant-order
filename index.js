import { menuArray } from "./data.js";

let order = [];

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-button")) {
        const itemId = Number(event.target.dataset.id);
        addToOrder(itemId);
    }
});

const addToOrder = itemId => {
    const item = menuArray.find(item => item.id === itemId);
    order.push(item);
};

const getMenuHTML = () => {
    return menuArray.map(item => {
        const {name, ingredients, id, price, emoji} = item;
        
        return `                
            <div class="item-container">
                <p class="item-emoji">${emoji}</p>
                <div class="item-text-container">
                    <p class="item-name">${name}</p>
                    <p class="item-ingredients">${ingredients.join(",")}</p>
                    <p class="item-price">$${price}</p>
                </div>
                <button class="add-button" aria-label="Add ${name} to your order" data-id="${id}">+</button>
            </div>
        `;
    }).join("");
};

const renderMenu = () => document.getElementById("menu").innerHTML = getMenuHTML();

renderMenu();