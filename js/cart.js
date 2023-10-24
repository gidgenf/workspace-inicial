const URLidcart = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
let localCart = JSON.parse(localStorage.getItem('usercart'));
let articles = [];
let cart = document.getElementById('cart')
fetch(URLidcart)
    .then(response => {
        return response.json();
    })
    .then(cartdata => {

        cartdata.articles.push(...localCart)
        articles.push(cartdata.articles);

        console.log(articles);
        showarticles(articles);
    })
    .catch(error => console.error('Error:', error));

function showarticles(articles) {
    cart.innerHTML = ``
    articles[0].forEach(element => {
        cart.innerHTML += `
                <div class="card m-3 shadow">
  <div class="card-header">
 <h5 class="float-end card-text" onclick="reloco()">cantidad:<span class="badge bg-primary rounded-pill">${element.count}</span></h5>
 <h3 class="card-title">${element.name}</h3>
  </div>
  <div class="card-body">
    <img src="${element.image}" style="width: 10rem;" >
   <p class="btn btn-success position-absolute bottom-0 m-3 end-0" >Total ${element.currency}${element.unitCost * element.count}</p>
   <h5 class="float-end card-text">
    <button onclick="changeQuantity(${element.id}, false)" type="button" class="btn btn-danger btn-sm">Disminuir</button>
    <button onclick="changeQuantity(${element.id}, true)" type="button" class="btn btn-primary btn-sm">Aumentar</button>
    <button onclick="removeArticle(${element.id})" type="button" class="btn btn-danger">Eliminar</button>
</h5>
</div>
</div>`
    });

    const newarticles = articles

}

function changeQuantity(id, value) {
    let product = articles[0].find(item => item.id === id);
    if (value) {
        product.count++;
    } else {
        if (product.count > 1) {
            product.count--;
        }
    }
    showarticles(articles);
}

function removeArticle(id) {

    articles[0] = articles[0].filter((item) => item.id !== id);
    removeArticleInLocalStorage(id)
    showarticles(articles);
}


function removeArticleInLocalStorage(id) { //funcion para remover del carrito el

    let usercart = JSON.parse(localStorage.getItem('usercart')) || []; //se trae el carrito del local storage o una lista vacia
    const productexist = usercart.find(item => item.id === id); //se busca el producto en el carrito
    if (productexist) { //si el producto existe se lo elimina del carrito
        usercart.splice(productexist)
    } else {

    }

    localStorage.setItem('usercart', JSON.stringify(usercart));  //se envia el carrito con los nuevos productos al local storage
}















