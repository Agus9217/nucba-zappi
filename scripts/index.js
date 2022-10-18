// Funcion para guardar carrito en local storage
let carrito = JSON.parse(localStorage.getItem("cart")) || [];
const saveToLocalStorage = (carrito) => {
	localStorage.setItem("carrito", JSON.stringify(carrito));
};
// Mostrar carrito de compras
const showCartMenu = () => {
	cartMenuContainer.style.display = "grid";
};
// Ocultar carrito de compras
const closeCartMenu = () => {
	cartMenuContainer.style.display = "none";
};

// Mostrar menu hamburguesa
const openCloseBurguerMenu = () => {
	if (navbarMenu.style.display === "flex") {
		navbarMenu.style.display = "none";
	} else {
		navbarMenu.style.display = "flex";
	}
};

const renderNoPopulars = (noPopularsArray, current) => {
	menuContainer.innerHTML += noPopularsArray[current].map(desestructuringPopulars).join("");
};

const showLessFunction = (array) => {
	showButtonMore();
	renderMostPopulars(array[0], 0);
};

const showButtonMore = () => {
	showMoreButton.classList.remove("disabled");
	showLessButton.classList.add("disabled");
};
const showButtonLess = () => {
	navigator.current = 0;
	showMoreButton.classList.add("disabled");
	showLessButton.classList.remove("disabled");
};

const showFourMore = (arrayOfObjects) => {
	const noPopularRest = arrayOfObjects.filter((e) => !e.popular);
	const result = [];
	const size = 4;
	for (let i = 0; i <= noPopularRest.length; i += size) {
		result.push(noPopularRest.slice(i, i + size));
	}
	renderNoPopulars(result, navigator.current);
	navigator.current < result.length - 2 ? (navigator.current = navigator.current + 1) : showButtonLess();
};

//funcion de renderizado de los más populares en HTML.
const renderMostPopulars = (mostPopularsArray) => {
	menuContainer.innerHTML = mostPopularsArray.map(desestructuringPopulars).join("");
};

// funcion solo para desestructurar los objs.
const desestructuringPopulars = (popularObj) => {
	const { id, name, img, price, subtitle, popular } = popularObj;
	return `
	<div class="itemContainer">
		<h2 class="popular-h2 ${popular ? "" : "disabled"}">Popular</h2>
		<img src="${img}" alt="imagen del item" srcset="" />
			<div class="itemDescription">
				<h3 class="itemTitle">${name}</h3>
				<p class="itemSubtitle">${subtitle}</p>
			<div class="itemBuy">
				<p class="price">$ ${price}</p>
				<button class="addToCart" data-id=${id}>Agregar</button>
			</div>
			</div>
	</div>
	`;
};

// Filtra los populares y llama al render
const filterMostPopulars = (arrayOfObjects) => {
	const mostPopularFiltered = arrayOfObjects.filter((e) => e.popular);
	renderMostPopulars(mostPopularFiltered);
	return mostPopularFiltered;
};

// Renderiza los elementos en el carrito
const renderCartList = (product) => {
	const { id, name, img, price, subtitle, quantity } = product;
	return `
		<div class="items-cart">
			<img class="image-simulate" src="${img}" alt="imagen de producto" />
			<h3 class="items-cart-title">${name}</h3>
			<span class="items-cart-second-title">${subtitle}</span>
			<span class="items-cart-precio">$${price}</span>
			<div class="buttons-pedido-container">
				<button class="pedido-button-less" data-id=${id}>-</button>
				<span class="pedido-value">${quantity}</span>
				<button class="pedido-button-plus" data-id=${id}>+</button>
			</div>
		</div>
	`;
};

// Vacia los precion en caso de no haber productos
const cleanPrices = () => {
	total.textContent = "--";
	subtotal.textContent = "--";
	envio.textContent = "--";
};

// Envia los productos a ser renderizados
const cartRender = () => {
	if (!cart.length) {
		itemsCartSelected.innerHTML = "<p>Tu carrito está vacío :(</p>";
		cleanPrices();
		return;
	}
	itemsCartSelected.innerHTML = cart.map(renderCartList).join("");
};

// Multiplica precio por cantidad y va acumulando para obtener el subtotal
const getPrices = () => {
	cart.reduce((acc, cur) => acc + Number(cur.price) * Number(cur.quantity), 0);
	/* 
	Me queda pendiente renderizar los precios 
	total.textContent = "--";
	subtotal.textContent = "--";
	envio.textContent = "--";
	*/
};

const closeMenuTargetDetect = () => {
	if (!cartMenuContainer.contains(e.target) && e.target !== cartNavIcon) {
		closeCartMenu();
	}
};

// Funcion que obtiene el elemento y lo añade al carro
const addToCart = (e) => {
	if (!e.target.classList.contains("addToCart")) return;
	const idProduct = e.target.dataset.id;
	console.log(idProduct);
};

// -->  Carrito  <-- //

// Selecciona categoria y lo renderiza
const renderMenu = (e) => {
	const clickData = e.target.dataset.type;
	menuContainer.innerHTML = "";
	if (clickData) {
		const obtainProduct = productsArray.filter((objeto) => objeto.category === clickData);
		console.log(obtainProduct);
		renderProduct = obtainProduct.map(
			(object) =>
				(menuContainer.innerHTML += `<div class="itemContainer">
		<img src="${object.img}" alt="imagen del item" srcset="" />
		<div class="itemDescription">
			<h3 class="itemTittle>${object.name}</h3>
			<p class="itemSubtittle">${object.subtitle}</p>
			<div class="itemBuy">
				<p class="price">$${object.price}</p>
				<button class="addToCart">Agregar</button>
			</div>
		</div>
	</div>
	`)
		);
	}
};

const init = () => {
	
	cartNavIcon.addEventListener("click", showCartMenu);
	closeButton.addEventListener("click", closeCartMenu);
	burguerIcon.addEventListener("click", openCloseBurguerMenu);
	document.addEventListener("click", (e) => closeMenuTargetDetect);
	menuContainer.addEventListener("click", addToCart);
	showMoreButton.addEventListener("click", ()=> showFourMore(productsArray));
	showLessButton.addEventListener("click",()=> showLessFunction(filterMostPopulars(productsArray)));
	filterMostPopulars(productsArray);
	cartRender();
};
init();
