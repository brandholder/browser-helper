var naverShoppingHelper = {
  scrollPageToBottom: async function(step = 250, delay = 100) {
    console.log('page scroll down...');
    
    const getScrollHeight = element => {
      if (!element) return 0;
      const { scrollHeight, offsetHeight, clientHeight } = element;
      return Math.max(scrollHeight, offsetHeight, clientHeight);
    };

    return await new Promise(resolve => {
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
  },
  getCatalogProductLinks: async function() {
    await this.scrollPageToBottom();
    var a = document.querySelectorAll('ul[class*="products_seller_list__"] li a[class*="productContent_link_seller__"]');
    for(var b of a){
      console.log(b.getAttribute('data-i') + '\n' + b.querySelector('span[class*="productContent_seller__"]').textContent + '\n' + b.querySelector('div[class*="productContent_info_title__"]').textContent + '\n' + b.querySelector('span[class*="productContent_price__"]').textContent + '\n' + b.href);
      var span = document.createElement('span');
      span.innerText = b.getAttribute('data-i');
      span.style = 'color:blue;font-weight:bold;';
      b.closest('div').prepend(span);
      b.style = 'padding-top:2px';
    }
  },
}

console.log('naverShoppingHelper loaded.');
