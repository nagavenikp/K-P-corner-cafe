document.addEventListener("DOMContentLoaded", function () {

    // ---------------- CART SYSTEM ------------------

    let cart = [];

    function updateCartPage() {
        let cartList = document.getElementById("cart-list");
        let totalItems = document.getElementById("total-items");
        let totalAmount = document.getElementById("total-amount");
        let cartCount = document.getElementById("cart-count");

        if (!cartList) return;

        cartList.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            totalPrice += item.price;

            let li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - ₹${item.price}
                <button onclick="removeItem(${index})"
                style="margin-left:10px;background:red;color:white;border:none;padding:5px 10px;border-radius:5px;">
                Remove
                </button>
            `;
            cartList.appendChild(li);
        });

        totalItems.textContent = cart.length;
        totalAmount.textContent = totalPrice;
        cartCount.textContent = cart.length;
    }

    document.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            let name = btn.dataset.name;
            let price = parseInt(btn.dataset.price);
            cart.push({ name, price });
            updateCartPage();
        });
    });

    window.removeItem = function (index) {
        cart.splice(index, 1);
        updateCartPage();
    };

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

            let content =
                "Corner Café - Customer Feedback\n" +
                "------------------------------\n" +
                "Name: " + name + "\n" +
                "Feedback: " + feedback + "\n\n";

            let blob = new Blob([content], { type: "text/plain" });
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "corner-cafe-feedback.txt";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            feedbackForm.reset();
        });
    }

});
