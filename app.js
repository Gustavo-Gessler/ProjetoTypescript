var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    return Product;
}());
/// <reference path="product.ts" />
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.items = [];
    }
    ShoppingCart.prototype.addItem = function (product, quantity) {
        var existingItem = this.items.find(function (item) { return item.product.name === product.name; });
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            var newItem = { product: product, quantity: quantity };
            this.items.push(newItem);
        }
    };
    ShoppingCart.prototype.getItems = function () {
        return this.items;
    };
    ShoppingCart.prototype.getTotal = function () {
        return this.items.reduce(function (total, item) { return total + item.product.price * item.quantity; }, 0);
    };
    ShoppingCart.prototype.clearCart = function () {
        this.items = [];
    };
    return ShoppingCart;
}());
/// <reference path="product.ts" />
/// <reference path="shopping-cart.ts" />
var userBalance = 0; // Inicialize com o valor desejado
window.onload = function () {
    var productsContainer = document.getElementById('products-container');
    var cartContainer = document.getElementById('cart-container');
    var checkoutButton = document.getElementById('checkoutButton');
    var depositInput = document.getElementById('depositInput');
    var depositButton = document.getElementById('depositButton');
    var userBalanceDisplay = document.getElementById('userBalanceDisplay');
    var products = [
        new Product('Maçã', 2.5),
        new Product('Pão', 1.00),
        new Product('Leite', 3.00),
        new Product('Chocolate', 5.50),
        new Product('Arroz', 15.00)
    ];
    var cart = new ShoppingCart();
    var renderProduct = function (product) {
        var productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = "<p>".concat(product.name, " - R$").concat(product.price.toFixed(2), "</p>\n                           <button class=\"button\" onclick=\"addToCart('").concat(product.name, "', ").concat(product.price, ")\">Add to Cart</button>");
        productsContainer === null || productsContainer === void 0 ? void 0 : productsContainer.appendChild(productDiv);
    };
    var renderCart = function () {
        // Verificar se o elemento cartContainer existe
        if (!cartContainer) {
            console.error("Elemento cartContainer não encontrado.");
            return;
        }
        // Limpar o container do carrinho
        cartContainer.innerHTML = '';
        // Agrupar os itens do carrinho pelo nome do produto
        var groupedItems = {};
        // Agrupar os itens do carrinho
        cart.getItems().forEach(function (item) {
            if (!groupedItems[item.product.name]) {
                groupedItems[item.product.name] = item;
            }
            else {
                groupedItems[item.product.name].quantity += item.quantity;
            }
        });
        // Renderizar cada item do carrinho
        Object.values(groupedItems).forEach(function (item) {
            var cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item text-center';
            cartItemDiv.innerHTML = "<p>".concat(item.product.name, " - R$").concat(item.product.price.toFixed(2), " (").concat(item.quantity, "X)</p>");
            cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.appendChild(cartItemDiv);
        });
        // Adicionar o total do carrinho
        var totalDiv = document.createElement('div');
        totalDiv.className = 'cart-total text-center';
        totalDiv.innerHTML = "<p>Cart Total: R$".concat(cart.getTotal().toFixed(2), "</p>");
        cartContainer === null || cartContainer === void 0 ? void 0 : cartContainer.appendChild(totalDiv);
        // Exibir ou ocultar o botão de finalizar compra com base na quantidade de itens no carrinho
        checkoutButton.style.display = cart.getItems().length > 0 ? 'block' : 'none';
    };
    // Adicionar evento de clique para o botão de depósito
    if (depositButton) {
        depositButton.addEventListener('click', function () {
            var depositAmount = parseFloat(depositInput.value);
            if (!isNaN(depositAmount) && depositAmount > 0) {
                // Adicionar o valor do depósito ao saldo do usuário
                // (supondo que a variável userBalance seja inicializada em algum lugar do seu código)
                userBalance += depositAmount;
                // Atualiza o parágrafo de exibição do saldo
                if (userBalanceDisplay) {
                    userBalanceDisplay.innerText = "Saldo atual: R$".concat(userBalance.toFixed(2));
                }
                alert("Dep\u00F3sito de R$".concat(depositAmount.toFixed(2), " realizado com sucesso! Saldo atual: R$").concat(userBalance.toFixed(2)));
                depositInput.value = '';
            }
            else {
                alert('Por favor, insira um valor de depósito válido.');
            }
        });
    }
    // Adicionar evento de clique para o botão de finalizar compra
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            var confirmPurchase = confirm("Deseja finalizar a compra no valor de R$".concat(cart.getTotal().toFixed(2), "?"));
            if (confirmPurchase) {
                // Verificar se há saldo suficiente para a compra
                if (userBalance >= cart.getTotal()) {
                    // Subtrair o valor da compra do saldo
                    userBalance -= cart.getTotal();
                    userBalanceDisplay.innerText = "Saldo atual: R$".concat(userBalance.toFixed(2));
                    alert("Compra finalizada com sucesso! Saldo restante: R$".concat(userBalance.toFixed(2)));
                    // Limpar o carrinho após a compra
                    cart.clearCart();
                    renderCart();
                }
                else {
                    alert('Saldo insuficiente. Não foi possível finalizar a compra.');
                }
            }
        });
    }
    // Renderizar produtos iniciais
    products.forEach(function (product) {
        renderProduct(product);
    });
    window['addToCart'] = function (name, price) {
        var product = new Product(name, price);
        cart.addItem(product, 1); // Adicionando uma quantidade padrão de 1
        renderCart();
    };
};
