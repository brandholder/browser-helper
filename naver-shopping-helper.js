async function scrollPageToBottom(step = 250, delay = 100) {
  const getScrollHeight = element => {
    if (!element) return 0;
    const { scrollHeight, offsetHeight, clientHeight } = element;
    return Math.max(scrollHeight, offsetHeight, clientHeight);
  };

  const position = await new Promise(resolve => {
    let count = 0;
    const intervalId = setInterval(() => {
      const { body } = document;
      const availableScrollHeight = getScrollHeight(body);

      window.scrollBy(0, step);
      count += step;

      if (count >= availableScrollHeight) {
        clearInterval(intervalId);
        resolve(count);
      }
    }, delay);
  });

  return position;
}

var naverShoppingHelper = {
  getCatalogProductLinks: function() {
    var a = document.querySelectorAll('ul[class*="products_seller_list__"] li a[class*="productContent_link_seller__"]');
    for(var b of a){
      console.log(b.getAttribute('data-i') + '\n' + b.querySelector('span[class*="productContent_seller__"]').textContent + '\n' + b.querySelector('div[class*="productContent_info_title__"]').textContent + '\n' + b.querySelector('span[class*="productContent_price__"]').textContent + '\n' + b.href);
    }
  },
}
console.log('naverShoppingHelper loaded.');
