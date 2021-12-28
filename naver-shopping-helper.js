var naverShoppingHelper = {
  sleep: async function (ms = 1000) {
    return new Promise((_) => setTimeout(_, ms));
  },
  scrollPageToBottom: async function (step = 250, delay = 100) {
    console.log("page scroll down...");

    const getScrollHeight = (element) => {
      if (!element) return 0;
      const { scrollHeight, offsetHeight, clientHeight } = element;
      return Math.max(scrollHeight, offsetHeight, clientHeight);
    };

    return await new Promise((resolve) => {
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
  copy: function (copiedText) {
    navigator.clipboard
      .writeText(copiedText)
      .then(() => {
        console.log("Copied!");
      })
      .catch((e) => {
        console.log("Copy failed!", e);
      });
  },
  getCatalogProductLinks: async function () {
    // 전체 판매처 보러가기 버튼
    var btnSellerMore = document.querySelector(
      'div[class*="seller_more_area"] a[class*="main_link_more__"'
    );
    if (btnSellerMore) {
      alert('전체 판매처 보러가기 페이지가 새창으로 열립니다.\n\n해당 페이지에서 스크립트를 다시 실행해주세요.');
      btnSellerMore.click();
      return;
    }

    // 전체 판매자 상품 보기 페이지인지 확인
    var a = document.querySelectorAll(
      'ul[class*="products_seller_list__"] li a[class*="productContent_link_seller__"]'
    );
    if (a.length) {
      await this.getCatalogProductLinksBySellerAll(a);
      return;
    }

    // 판매처가 적은 경우
    var a = document.querySelectorAll(
      'ul[class*="productPerMalls_sell_list_area__"] li div[class*="productPerMall_item_inner__"]'
    );
    if (!a.length) {
      console.error("Not found seller links.");
      return;
    }

    var mids = [];
    for (var b of a) {
      var link = b.querySelector('a[class*="productPerMall_link_seller__"]');
      var mid = link.getAttribute("data-i");
      mids.push(mid);
      console.log(
        mid +
          "\n" +
          b.querySelector('span[class*="productPerMall_mall__"]').textContent +
          "\n" +
          b.querySelector('span[class*="productPerMall_info_price__"]')
            .textContent +
          "\n" +
          link.href
      );
      if (b.querySelector("#mid_" + mid)) continue;
      var span = document.createElement("span");
      span.id = "mid_" + mid;
      span.innerText = mid;
      span.style = "color:blue;font-weight:bold;";
      b.prepend(span);
    }

    var rootNode = document.querySelector('div[class*="seller_seller_area__"]');
    this._appendTextarea(rootNode, mids);
  },
  getCatalogProductLinksBySellerAll: async function (a) {
    // 전체 판매자 상품 보기
    // var a = document.querySelectorAll(
    //   'ul[class*="products_seller_list__"] li a[class*="productContent_link_seller__"]'
    // );
    if (!a.length) {
      console.error("Not found seller all links.");
      return;
    }

    await this.scrollPageToBottom();
    var btns = document.querySelectorAll(
      'button[class*="product_btn_similar_item__"]'
    );
    for (var b of btns) {
      b.click();
    }
    await this.sleep(3000);
    var a = document.querySelectorAll(
      'ul[class*="products_seller_list__"] li a[class*="productContent_link_seller__"]'
    );
    var mids = [];
    for (var b of a) {
      var mid = b.getAttribute("data-i");
      mids.push(mid);
      console.log(
        mid +
          "\n" +
          b.querySelector('span[class*="productContent_seller__"]')
            .textContent +
          "\n" +
          b.querySelector('div[class*="productContent_info_title__"]')
            .textContent +
          "\n" +
          b.querySelector('span[class*="productContent_price__"]').textContent +
          "\n" +
          b.href
      );
      var parentNode = b.closest("div");
      if (parentNode.querySelector("#mid_" + mid)) continue;
      var span = document.createElement("span");
      span.id = "mid_" + mid;
      span.innerText = mid;
      span.style = "color:blue;font-weight:bold;";
      parentNode.prepend(span);
      b.style = "padding-top:2px";
    }

    var rootNode = document.querySelector('div[class*="seller_content_seller__"]');
    this._appendTextarea(rootNode, mids);
  },
  _appendTextarea: function (rootNode, mids) {
    var textarea = document.getElementById("mids");
    if (!textarea) {
      divMids = document.createElement("div");
      divMids.id = "mids_container";
      divMids.style = "margin:10px;";
      textarea = document.createElement("textarea");
      textarea.id = "mids";
      textarea.readOnly = true;
      textarea.style = "width:300px;";
      rootNode.append(textarea);
      var btn = document.createElement("button");
      btn.innerText = "COPY";
      btn.style = "display:block;padding:10px;";
      btn.onclick = function () {
        naverShoppingHelper.copy(document.querySelector("#mids").value);
      };
      divMids.append(textarea, btn);
      rootNode.append(divMids);
    }
    textarea.rows = mids.length;
    textarea.value = mids.join("\n");
    textarea.scrollIntoView();
  },
};

console.log("naverShoppingHelper loaded.");
