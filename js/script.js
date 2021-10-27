{
	let products = [];
	let hideDoneProducts = false;

	const addNewProduct = (newProduct) => {
		products = [
			...products,
			{ content: newProduct },
		];

		render();
	};

	const removeProduct = (index) => {
		products = [
			...products.slice(0, index),
			...products.slice(index + 1),
		];

		render();
	};

	const toggleDoneProduct = (index) => {
		products = products.map((product, productIndex) => {
			if (productIndex !== index) {
				return product;
			}
			return {
				...product,
				done: !product.done,
			};
		});
		render();
	};

	const doneAllProducts = () => {
		products = products.map(product => ({ ...product, done: true }));
		render();
	};

	const toggleHideDoneProducts = () => {
		hideDoneProducts = !hideDoneProducts;
		render();
	};

	const renderProducts = () => {

		const productToHTML = product => `
			<li class="shoppingList__item${product.done && hideDoneProducts
				? " shoppingList__item--hidden"
				: ""}">
			<button class="shoppingList__itemButton js-buttonMark${product.done
				? " shoppingList__itemButton--done"
				: ""}">
			</button>
			<span class="shoppingList__itemContent${product.done
				? " shoppingList__itemContent--done"
				: ""}"">
			${product.content}
			</span>
			<button class="shoppingList__itemButton shoppingList__itemButton--delete js-remove"></button>
			</li>
		`;

		const productsElement = document.querySelector(".js-products");
		productsElement.innerHTML = products.map(productToHTML).join("");
	};

	const renderButtons = () => {
		const buttonsProducts = document.querySelector(".js-buttons");

		if (!products.length) {
			return
		}

		buttonsProducts.innerHTML = `
			<button class="section__button js-hideDoneProducts">
				${products.some(({ done }) => done) && hideDoneProducts
				? "Pokaż zaznaczone"
				: "Ukryj zaznaczone"}
			</button>
			<button${products.every(({ done }) => done) ? " disabled" : ""}
			class="section__button js-doneAllProducts">
				Zaznacz wszystkie
			</button$>
		`;
	};

	const render = () => {
		renderProducts();
		renderButtons();

		bindRemoveEvents();
		bindToggleDoneEvents();
		bindButtonsEvents();
	};

	const bindRemoveEvents = () => {
		const removeButtons = document.querySelectorAll(".js-remove");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", () => {
				removeProduct(index);
			});
		});
	};

	const bindToggleDoneEvents = () => {
		const markButtons = document.querySelectorAll(".js-buttonMark");

		markButtons.forEach((markButton, index) => {
			markButton.addEventListener("click", () => {
				toggleDoneProduct(index);
			});
		});
	};

	const bindButtonsEvents = () => {
		const hideDoneProductsElement = document.querySelector(".js-hideDoneProducts");
		const doneAllProductsElement = document.querySelector(".js-doneAllProducts");

		if (doneAllProductsElement && hideDoneProductsElement) {
			doneAllProductsElement.addEventListener("click", () => {
				doneAllProducts();
			});

			hideDoneProductsElement.addEventListener("click", () => {
				toggleHideDoneProducts();
			});
		}
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newProduct = document.querySelector(".js-newProduct").value.trim();
		const inputField = document.querySelector(".js-newProduct");

		if (newProduct !== "") {
			addNewProduct(newProduct);
			inputField.value = "";
		}

		inputField.focus();
	};

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};

	init();
}