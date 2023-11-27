/// <reference path="product.ts" />

class ShoppingCart {
  private items: ShoppingCartItem[] = [];

  addItem(product: Product, quantity: number): void {
    const existingItem = this.items.find(item => item.product.name === product.name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: ShoppingCartItem = { product, quantity };
      this.items.push(newItem);
    }
  }

  getItems(): ShoppingCartItem[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  clearCart(): void {
    this.items = [];
  }
}

interface ShoppingCartItem {
  product: Product;
  quantity: number;
}
