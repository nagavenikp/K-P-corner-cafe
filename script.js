// ---------------- CART DATA ------------------
let cart = [];

document.addEventListener("DOMContentLoaded", function () {

    // ---------------- ADD TO CART ------------------
    document.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            cart.push({
                name: btn.dataset.name,
                price: Number(btn.dataset.price)
            });
            updateCart();
        });
    });

    // ---------------- FEEDBACK FORM ------------------
    const feedbackForm = document.getElementById("feedbackForm");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("username").value.trim();
            let feedback = document.getElementById("userFeedback").value.trim();
            let response = document.getElementById("responseMessage");

            if (name === "" || feedback === "") {
                response.style.color = "red";
                response.innerText = "Please fill in all fields.";
                return;
            }

            response.style.color = "green";
            response.innerText = `Thank you, ${name}! Your feedback has been received.`;

            feedbackForm.reset();
        });
    }
});

// ---------------- CART FUNCTIONS ------------------
function updateCart() {
    const list = document.getElementById("cart-list");
    const totalItems = document.getElementById("total-items");
    const totalAmount = document.getElementById("total-amount");
    const cartCount = document.getElementById("cart-count");
    const discountMsg = document.getElementById("discount-msg");

    list.innerHTML = "";
    let sum = 0;

    cart.forEach((item, i) => {
        sum += item.price;
        list.innerHTML += `
            <li>
                ${item.name} - ₹${item.price}
                <button onclick="removeItem(${i})">X</button>
            </li>`;
    });

    if (sum > 1000) {
        sum *= 0.9;
        discountMsg.innerText = "10% Discount Applied!";
    } else {
        discountMsg.innerText = "";
    }

    totalItems.innerText = cart.length;
    totalAmount.innerText = sum.toFixed(2);
    cartCount.innerText = cart.length;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
