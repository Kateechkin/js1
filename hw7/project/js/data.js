const items = ['Подушка', 'Светильник', 'Пуфик', 'Стул', 'Игрушка', 'Цветок']
const prices = [400, 1000, 3000, 2000, 250, 900]
const ids = [1, 2, 3, 4, 5, 6]
const img = ['img/podushka.jpg', 'img/lamp.jpg', 'img/pufic.jpg', 'img/slider1.jpg', 'img/toy.jpg', 'img/flo.jpg']
const product = createDTO()
let userCart = []//Хранилище товаров


function createProduct(index) {
    return {
        id: index,
        name: items[index],
        price: prices[index],
        img: img[index]
    }
}

function createDTO() {
    let arr = []
    for (let i = 0; i < ids.length; i++) {
        arr.push(createProduct(i))
    }
    return arr
}

function calk(cart) {
    let sum = 0

    cart.forEach(el => {
        sum += el.price
    })
    return sum
}

function addCatalog() {

    let htmlString = ''

    product.forEach (function(el) {
        htmlString += `    
           <div class="posts-news-wrap">
            <div class="post-main-wrap">
            <img src="${el.img}" class="posts-news-wrap-img" >
            <div class="posts-news-info">
                <h3 class="posts-news-info-title">${el.name} </h3>
                <p class="posts-news-info-paragraf">${el.price} рублей</p>
                <button class = "read-buttom" data-id="${el.id}">Buy</button>
        
            </div>
            </div>
            </div>
            `
    })
    document.querySelector('.blok1-shop-wrap').innerHTML = htmlString
}
addCatalog()


let btnCart = document.querySelector ('.basket')

btnCart.addEventListener ('click', function () {
    document.querySelector ('.cart-block').classList.toggle ('invisible') //смена класса(toggle)
})

function renderCart() {
    let htmlString = ''
    userCart.forEach (el => {
        htmlString += `    
        <div class="cart-item" data-id="${el.id}">
        <div class="product-bio">
                <img src="${el.img}" alt="" style=" width: 150px; height : 80px ">
                <div class="product-desc">
                    <p class="product-title">${el.name}</p>
                    <p class="product-quantity">${el.quantity}</p>
                    <p class="product-single-price">${el.price}</p>
                </div>
                <div class="right-block">
                    <button class="del-btn" data-id="${el.id}">&times</button>
                </div>
        </div>
    </div>
     `
    })
    document.querySelector('.cart-block').innerHTML = htmlString
}

//добавление товаров в корзину
function addproduct(index) {
     let prod = product [index]
     let find = userCart.find (el => el.id === index)

     if (!find) {
         userCart.push ({
             id: index,
             name: product [index].name,
             price: product [index].price,
             img: product [index].img,
             quantity: 1
         })
     } else {
         find.quantity++
     }
     renderCart ()

    // console.log ('Вы добавили в корзину: ' + product [index].name)
}

function removeproduct(index) {
    let prod = product [index]
    let find = userCart.find (el => el.id === index)

    if (find.quantity > 1) {
     find.quantity--
    } else {
        userCart.splice(userCart.indexOf (find), 1)
    }
    renderCart ()

   // console.log ('Вы добавили в корзину: ' + product [index].name)
}


document.querySelector('.blok1-shop-wrap').addEventListener('click', function(e){
    if (e.target.classList.contains ('read-buttom')) {
        addproduct (+e.target.dataset ['id'])
    } 

    if (e.target.classList.contains ('del-btn')) {
        removeproduct (+e.target.dataset ['id'])
    } 
})

document.querySelector('.cart-block').addEventListener('click', function(e){

    if (e.target.classList.contains ('del-btn')) {
        removeproduct (+e.target.dataset ['id'])
    } 
})




 