# browser-helper

## naver-shopping-helper

### make bookmarklet
visit: https://mrcoles.com/bookmarklet/

* Enter your javascript code here:
```javascript
if (window.naverShoppingHelper) window.naverShoppingHelper.getCatalogProductLinks();
```

* Include custom script:
```text
https://cdn.jsdelivr.net/gh/brandholder/browser-helper@master/naver-shopping-helper.js
```

* Result:
```javascript
javascript:(function()%7Bfunction%20callback()%7Bif%20(window.naverShoppingHelper)%20window.naverShoppingHelper.getCatalogProductLinks()%7Dvar%20s%3Ddocument.createElement(%22script%22)%3Bs.src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fbrandholder%2Fbrowser-helper%40master%2Fnaver-shopping-helper.js%22%3Bif(s.addEventListener)%7Bs.addEventListener(%22load%22%2Ccallback%2Cfalse)%7Delse%20if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()
```
