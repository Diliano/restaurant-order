import { menuArray } from "./data.js";

let order = [];
const paymentForm = document.getElementById("payment-form");

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-button")) {
        const itemId = Number(event.target.dataset.id);
        addToOrder(itemId);
    }
    
    if (event.target.classList.contains("remove-button")) {
        const itemId = Number(event.target.dataset.id);
        removeFromOrder(itemId);
    }
    
    if (event.target.classList.contains("order-button")) {
        showModal();
    }
    
    if (event.target.classList.contains("close-modal-button")) {
        closeModal();
    }
});

paymentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    completeOrder();
});

const addToOrder = itemId => {
    const existingItem = order.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        const dataItem = menuArray.find(item => item.id === itemId);
        const orderItem = { ...dataItem, quantity: 1};
        order.push(orderItem);
    }

    renderOrderDetails();
};

const removeFromOrder = itemId => {
    const existingItem = order.find(item => item.id === itemId);
    
    if (existingItem.quantity > 1) {
        existingItem.quantity--;
    } else {
        const itemIndex = order.findIndex(item => item.id === itemId);
        order.splice(itemIndex, 1);
    }
    
    renderOrderDetails();
}

const calculateTotalPrice = () => {
    return order.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const showModal = () => {
    document.getElementById("modal").style.display = "block";
    disableBackgroundInteraction(true);
};

const closeModal = () => {
    document.getElementById("modal").style.display = "none";
    paymentForm.reset();
    disableBackgroundInteraction(false);
};

const disableBackgroundInteraction = disable => {
    const main = document.getElementById("main");
    
    if (disable) {
        main.style.pointerEvents = "none";
        main.style.opacity = "0.5";
    } else {
        main.style.pointerEvents = "auto";
        main.style.opacity = "1";
    }
};

const completeOrder = () => {
    
    const paymentFormData = new FormData(paymentForm);
    const name = paymentFormData.get("name");
    
    closeModal();
    document.getElementById("order-title").style.display = "none";
    
    document.getElementById("order-summary").innerHTML = `
        <p class="order-success-message">Thanks, ${name}! Your order is on its way!</p>
    `;
    
    order = [];
};

const renderOrderDetails = () => {
    
    const totalPrice = calculateTotalPrice();
    
    let orderHTML = order.map(item => {
        const {name, price, id, quantity} = item;
         
        return `
            <div class="order-item">
                <div class="order-item-details">
                    <p class="order-item-name">${name} (x${quantity})</p>
                    <button class="remove-button" aria-label="Remove ${name} from your order" data-id="${id}">remove</button>
                </div>
                <p class="order-item-price">$${price * quantity}</p>
            </div>
        `
    }).join("");  
    
    orderHTML += `
        <section class="container order-total-container">
            <div class="order-total">
                <p>Total price:</p>
                <p>$${totalPrice}</p>
            </div>
            <button class="order-button" id="order-button" aria-label="Complete your order">Complete order</button>
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