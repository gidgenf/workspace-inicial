const URLidcart = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
let localCart = JSON.parse(localStorage.getItem('usercart'));
let articles = [];
let cardMoney = document.getElementById('cardMoney')
let cart = document.getElementById('cart')
let changespurch = document.getElementById('changespurch')
fetch(URLidcart)
    .then(response => {
        return response.json();
    })
    .then(cartdata => {

        cartdata.articles.push(...localCart)
        articles.push(cartdata.articles);

        console.log(articles);
        showarticles(articles);
        showMoney(articles)
    })
    .catch(error => console.error('Error:', error));

changespurch.addEventListener('click', () => {
    showMoney(articles);
})
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

}

function changeQuantity(id, value) {
    let product = articles[0].find(item => item.id === id);
    if (value) {
        product.count++;
    }else if(product.count > 0) {
            product.count--;
    }
    if(product.count === 0){
        removeArticleInLocalStorage(id);
    }else if(!value){
    resttocart(id)
    }else{
        addtocart(id); 
    }

    showarticles(articles);
    showMoney(articles)
}
function resttocart(id) {
    let usercart = JSON.parse(localStorage.getItem('usercart')) || []; 
    const productexist = usercart.find(item => item.id === id);
        productexist.count--;
        localStorage.setItem('usercart', JSON.stringify(usercart)); 
}
function showMoney(articles) {
    let valorActivo = document.querySelector('input[name="listGroupRadio"]:checked').value;
    let Cost = 0;
    cardMoney.innerHTML = ``
    articles[0].forEach(element => {
        Cost += element.unitCost * element.count;
    });
    let costoDeEnvio = Cost * (valorActivo * 0.01)
    totalCost = Cost + costoDeEnvio;
    cardMoney.innerHTML = `
<div class="row">
    <div class="col-sm-6">
        <div class="card" style="width: 18rem;">
            <h1 class="">Costos</h1>
        <div class="card-body">
        <h4 class="border p-3">costo de envio  ${costoDeEnvio}<h4>
        <h4 class="border p-3">valor de los objetos ${Cost}<h4>
        <h5 class="border p-3">total a pagar ${totalCost}</h5>
    </div>
</div>`
}

let creditCardForm = document.getElementById('creditCardForm');
let bankTransferForm = document.getElementById('bankTransferForm');
let creditCardOption = document.getElementById('creditCardOption');
let bankTransferOption = document.getElementById('bankTransferOption');

creditCardOption.addEventListener('change', function () {
    toggleRequireAttributes();
    creditCardForm.style.display = 'block';
    bankTransferForm.style.display = 'none';
});

bankTransferOption.addEventListener('change', function () {
    toggleRequireAttributes();
    creditCardForm.style.display = 'none';
    bankTransferForm.style.display = 'block';
});

function toggleRequireAttributes() {
    const numeroTarjeta = document.getElementById('numeroTarjeta');
    const codigoSeguridad = document.getElementById('codigoSeguridad');
    const vencimiento = document.getElementById('vencimiento');
    const numeroCuenta = document.getElementById('numeroCuenta');

    const isBankTransfer = bankTransferOption.checked;

    numeroTarjeta.required = !isBankTransfer;
    codigoSeguridad.required = !isBankTransfer;
    vencimiento.required = !isBankTransfer;
    numeroCuenta.required = isBankTransfer;
}





function removeArticle(id) {

    articles[0] = articles[0].filter((item) => item.id !== id);
    removeArticleInLocalStorage(id)
    showarticles(articles);
    showMoney(articles);
}


function removeArticleInLocalStorage(id) { //funcion para remover del carrito el

    let usercart = JSON.parse(localStorage.getItem('usercart')) || []; //se trae el carrito del local storage o una lista vacia
    const productexist = usercart.find(item => item.id === id); //se busca el producto en el carrito
    if (productexist) { //si el producto existe se lo elimina del carrito
        usercart.splice(productexist, 1)
    } 

    localStorage.setItem('usercart', JSON.stringify(usercart));  //se envia el carrito con los nuevos productos al local storage
}

function addtocart(id) {
        
    let usercart = JSON.parse(localStorage.getItem('usercart')) || [];  //se trae el carrito del local storage o una lista vacia

    const productexist = usercart.find(item => item.id === id);  //se busca el producto en el carrito
    if (productexist) {  //si el producto existe en el carrito, se eleva su contador en 1
        productexist.count++;
    } else {
        usercart.push({  //se pushea el producto al carrito en caso de no existir en el mismo
            id: productId.id,
            name: productId.name,
            count: 1,
            unitCost: productId.cost,
            currency: "USD",
            image: productId.images[0]
        });
    }

    localStorage.setItem('usercart', JSON.stringify(usercart));  //se envia el carrito con los nuevos productos al local storage

    console.log(localStorage.getItem('usercart'));
}


(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()