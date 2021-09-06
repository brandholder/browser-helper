var naverShoppingHelper = {
  getCatalogProductLinks: function() {
    var a = document.querySelectorAll('ul[class*="products_seller_list__"] li a[class*="productContent_link_seller__"]');
    for(var b of a){
      console.log(b.getAttribute('data-i') + '\n' + b.querySelector('span[class*="productContent_seller__"]').textContent + '\n' + b.querySelector('div[class*="productContent_info_title__"]').textContent + '\n' + b.querySelector('span[class*="productContent_price__"]').textContent + '\n' + b.href);
    }
  },
}
console.log('naverShoppingHelper loaded.');
