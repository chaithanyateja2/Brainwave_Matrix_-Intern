
const items = {
  'best-sellers': [
    { name: 'DRINK 1', image: 'image1.webp', rating: '4.5' },
    { name: 'DRINK 2', image: 'image2.webp', rating: '4.2' },
    { name: 'DRINK 3', image: 'image3.jpg', rating: '4.8' },
    { name: 'DRINK 4', image: 'image4.jpg', rating: '4.0' },
    { name: 'SANDWITCH 1', image: 'food1.avif', rating: '4.6' },
    { name: 'SANDWITCH 2', image: 'food2.avif', rating: '4.3' },
    { name: 'SANDWITCH 3', image: 'food3.avif', rating: '4.7' },
    { name: 'CUP CAKE 1', image: 'rte1.jpg', rating: '4.4' },
    { name: 'CUP CAKE 2', image: 'rte2.jpeg', rating: '4.9' },
    { name: 'CUP CAKE 3', image: 'rte3.jpeg', rating: '5.0' },
  ],
  'drinks': [
    { name: 'DRINK 1', image: 'image1.webp', rating: '4.5' },
    { name: 'DRINK 2', image: 'image2.webp', rating: '4.2' },
    { name: 'DRINK 3', image: 'image3.jpg', rating: '4.8' },
    { name: 'DRINK 4', image: 'image4.jpg', rating: '4.0' },
    { name: 'DRINK 5', image: 'image5.jpeg', rating: '4.6' },
    { name: 'DRINK 6', image: 'image6.jpeg', rating: '4.3' },
    { name: 'DRINK 7', image: 'image7.jpeg', rating: '4.7' },
    { name: 'DRINK 8', image: 'image8.jpg', rating: '4.4' },
    { name: 'DRINK 9', image: 'image9.jpg', rating: '4.9' },
    { name: 'DRINK 10', image: 'image10.jpg', rating: '5.0' },
  ],
  'food': [
    { name: 'FOOD 1', image: 'food1.avif', rating: '4.0' },
    { name: 'FOOD 2', image: 'food2.avif', rating: '4.6' },
    { name: 'FOOD 3', image: 'food3.avif', rating: '4.3' },
    { name: 'FOOD 4', image: 'food4.webp', rating: '4.7' },
    { name: 'FOOD 5', image: 'food5.jpg', rating: '4.4' },
    { name: 'FOOD 6', image: 'food6.jpg', rating: '4.9' },
    { name: 'FOOD 7', image: 'food7.webp', rating: '5.0' },
  ],
  'ready-to-eat': [
    { name: 'EAT 1', image: 'rte1.jpg', rating: '4.6' },
    { name: 'EAT 2', image: 'rte2.jpeg', rating: '4.3' },
    { name: 'EAT 3', image: 'rte3.jpeg', rating: '4.7' },
    { name: 'EAT 4', image: 'rte4.png', rating: '4.4' },
    { name: 'EAT 5', image: 'rte5.avif', rating: '4.9' },
    { name: 'EAT 6', image: 'rte6.webp', rating: '5.0' },
  ]};


function toggleCategory(categoryId) {
  const itemList = document.getElementById('item-list');
  const currentCategory = itemList.getAttribute('data-category');

 
  if (currentCategory === categoryId) {
    itemList.innerHTML = '';
    itemList.removeAttribute('data-category'); 
    return;
  }

 
  const categoryItems = items[categoryId];
  if (categoryItems) {
    const html = categoryItems
      .map(
        (item) => `
      <div class="item-box">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>Rating: ${item.rating}</p>
        </div>
      </div>
    `
      )
      .join('');
    itemList.innerHTML = html;
    itemList.setAttribute('data-category', categoryId); 
  }
}
