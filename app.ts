/// <reference path="product.ts" />
/// <reference path="shopping-cart.ts" />

interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

let userBalance: number = 0; // Inicialize com o valor desejado

window.onload = () => {
  const productsContainer = document.getElementById('products-container');
  const cartContainer = document.getElementById('cart-container');
  const checkoutButton = document.getElementById('checkoutButton') as HTMLButtonElement;
  const depositInput = document.getElementById('depositInput') as HTMLInputElement;
  const depositButton = document.getElementById('depositButton') as HTMLButtonElement;
  const userBalanceDisplay = document.getElementById('userBalanceDisplay');



  const products: Product[] = [
    new Product('Maçã', 2.5),
    new Product('Pão', 1.00),
    new Product('Leite', 3.00),
    new Product('Chocolate', 5.50),
    new Product('Arroz', 15.00)
  ];

  const cart = new ShoppingCart();

  const renderProduct = (product: Product) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `<p>${product.name} - R$${product.price.toFixed(2)}</p>
                           <button class="button" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>`;
    productsContainer?.appendChild(productDiv);
  };

  const renderCart = () => {
    // Verificar se o elemento cartContainer existe
    if (!cartContainer) {
      console.error("Elemento cartContainer não encontrado.");
      return;
    }

    // Limpar o container do carrinho
    cartContainer.innerHTML = '';

    // Agrupar os itens do carrinho pelo nome do produto
    const groupedItems: Record<string, ShoppingCartItem> = {};

    // Agrupar os itens do carrinho
    cart.getItems().forEach((item) => {
      if (!groupedItems[item.product.name]) {
        groupedItems[item.product.name] = item;
      } else {
        groupedItems[item.product.name].quantity += item.quantity;
      }
    });

    // Renderizar cada item do carrinho
    Object.values(groupedItems).forEach((item) => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.className = 'cart-item text-center';
      cartItemDiv.innerHTML = `<p>${item.product.name} - R$${item.product.price.toFixed(2)} (${item.quantity}X)</p>`;
      cartContainer?.appendChild(cartItemDiv);
    });

    // Adicionar o total do carrinho
    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total text-center';
    totalDiv.innerHTML = `<p>Cart Total: R$${cart.getTotal().toFixed(2)}</p>`;
    cartContainer?.appendChild(totalDiv);

    // Exibir ou ocultar o botão de finalizar compra com base na quantidade de itens no carrinho
    checkoutButton.style.display = cart.getItems().length > 0 ? 'block' : 'none';
  };

  // Adicionar evento de clique para o botão de depósito
  if (depositButton) {
    depositButton.addEventListener('click', () => {
      const depositAmount = parseFloat(depositInput.value);
      if (!isNaN(depositAmount) && depositAmount > 0) {
        // Adicionar o valor do depósito ao saldo do usuário
        // (supondo que a variável userBalance seja inicializada em algum lugar do seu código)
        userBalance += depositAmount;

       // Atualiza o parágrafo de exibição do saldo
      if (userBalanceDisplay) {
        userBalanceDisplay.innerText = `Saldo atual: R$${userBalance.toFixed(2)}`;
      }

        alert(`Depósito de R$${depositAmount.toFixed(2)} realizado com sucesso! Saldo atual: R$${userBalance.toFixed(2)}`);
        depositInput.value = '';
      } else {
        alert('Por favor, insira um valor de depósito válido.');
      }
    });
  }

 // Adicionar evento de clique para o botão de finalizar compra
 if (checkoutButton) {
  checkoutButton.addEventListener('click', () => {
    const confirmPurchase = confirm(`Deseja finalizar a compra no valor de R$${cart.getTotal().toFixed(2)}?`);
    
    if (confirmPurchase) {
      // Verificar se há saldo suficiente para a compra
      if (userBalance >= cart.getTotal()) {
        // Subtrair o valor da compra do saldo
        userBalance -= cart.getTotal();
        userBalanceDisplay.innerText = `Saldo atual: R$${userBalance.toFixed(2)}`;
        alert(`Compra finalizada com sucesso! Saldo restante: R$${userBalance.toFixed(2)}`);
        // Limpar o carrinho após a compra
        cart.clearCart();
        renderCart();
      } else {
        alert('Saldo insuficiente. Não foi possível finalizar a compra.');
      }
    }
  });
}

  // Renderizar produtos iniciais
  products.forEach((product) => {
    renderProduct(product);
  });

  window['addToCart'] = (name: string, price: number) => {
    const product = new Product(name, price);
    cart.addItem(product, 1); // Adicionando uma quantidade padrão de 1
    renderCart();
  };
};
