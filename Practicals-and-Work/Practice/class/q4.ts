document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' }
  ];

  const productList: HTMLElement | null = document.getElementById('product-list');
  const messageArea: HTMLElement | null = document.getElementById('message-area');
  
  products.forEach(product => {
    if(!productList || !messageArea) return;
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productName = document.createElement('span');
    productName.textContent = product.name;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.addEventListener('click', () => {
      displayMessage(`Added to cart: ${product.name}`);
    });

    productDiv.appendChild(productName);
    productDiv.appendChild(addToCartButton);

    productList.appendChild(productDiv);
  });

  function displayMessage(message: string) {
    if(!messageArea) return;
    messageArea.textContent = message;
  }
});