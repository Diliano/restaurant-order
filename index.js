import { menuArray } from "./data.js";

let order = [];

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-button")) {
        const itemId = Number(event.target.dataset.id);
        addToOrder(itemId);
    }
    
    if (event.target.classList.contains("remove-button")) {
        const itemId = Number(event.target.dataset.id);
        removeFromOrder(itemId);
    }
});

const addToOrder = itemId => {
    const item = menuArray.find(item => item.id === itemId);
    order.push(item);
    renderOrderDetails();
};

const removeFromOrder = itemId => {
    const itemIndex = order.findIndex(item => item.id === itemId);
    order.splice(itemIndex, 1);
    renderOrderDetails();
}

const calculateTotalPrice = () => {
    return order.reduce((total, item) => total + item.price, 0);
};

const renderOrderDetails = () => {
    
    const totalPrice = calculateTotalPrice();
    
    let orderHTML = order.map(item => {
        const {name, price, id} = item;
         
        return `
            <div class="order-item">
                <div class="order-item-details">
                    <p class="order-item-name">${name}</p>
                    <button class="remove-button" data-id="${id}">remove</button>
                </div>
                <p class="order-item-price">$${price}</p>
            </div>
        `
    }).join("");  
    
    orderHTML += `
        <section class="container order-total-container">
            <div class="order-total">
                <p>Total price:</p>
                <p>$${totalPrice}</p>
            </div>
            <button class="order-button">Complete order</button>
        </section>
    `;
    
    if (order.length === 0) {
        document.getElementById("order-summary").innerHTML = "";
        document.getElementById("order-title").style.display = "none";
    } else {
        document.getElementById("order-title").style.display = "flex";
        document.getElementById("order-summary").innerHTML = orderHTML;
    }
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