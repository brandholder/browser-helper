var naverShoppingHelper = {
  sleep: async function(ms = 1000) {
    return new Promise((_) => setTimeout(_, ms));
  },
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
  copy: function(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("Copy");
    console.log('Copied!');
  },
  getCatalogProductLinks: async function() {
    await this.scrollPageToBottom();
    var btns = document.querySelectorAll('button[class*="product_btn_similar_item__"]');
    for(var b of btns){
      b.click();
    }
    await this.sleep(3000);
    var mids = [];
    var a = document.querySelectorAll('ul[class*="products_seller_list__"] li a[class*="productContent_link_seller__"]');
    for(var b of a){
      var mid = b.getAttribute('data-i');
      mids.push(mid);
      console.log(mid + '\n' + b.querySelector('span[class*="productContent_seller__"]').textContent + '\n' + b.querySelector('div[class*="productContent_info_title__"]').textContent + '\n' + b.querySelector('span[class*="productContent_price__"]').textContent + '\n' + b.href);
      var parentNode = b.closest('div');
      if (parentNode.querySelector('#mid_' + mid)) continue;
      var span = document.createElement('span');
      span.id = 'mid_' + mid;
      span.innerText = mid;
      span.style = 'color:blue;font-weight:bold;';
      parentNode.prepend(span);
      b.style = 'padding-top:2px';
    }
    
    var rootNode = document.querySelector('div[class*="seller_content_seller__"]');
    var textarea = document.getElementById('mids');
    if (!textarea) {
      divMids = document.createElement('div');
      divMids.id = 'mids_container';
      divMids.style = 'margin:10px;';
      textarea = document.createElement('textarea');
      textarea.id = 'mids';
      textarea.readOnly = true;
      textarea.style = 'width:300px;';
      rootNode.append(textarea);
      var btn = document.createElement('button');
      btn.innerText = 'COPY';
      btn.style = 'display:block;padding:10px;';
      btn.onclick = function() {
        document.getElementById("mids").select();
        document.execCommand("Copy");
      }
      divMids.append(textarea, btn);
      rootNode.append(divMids);
    }
    textarea.rows = mids.length;
    textarea.value = mids.join('\n');
  },
}

console.log('naverShoppingHelper loaded.');
