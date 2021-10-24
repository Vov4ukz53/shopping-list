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
		products = [
			...products.slice(0, index),
			{ ...products[index], done: !products[index].done },
			...products.slice(index + 1),
		];

		render();
	};

	const toggleDoneAllProducts = () => {
		products = products.map(product => ({ ...product, done: true }));
		render();
	};

	const renderProducts = () => {
		let htmlString = "";

		for (const product of products) {
			htmlString += `
            <li class="shoppingList__item${product.done ? " shoppingList__item--" : ""}">
            <button class="shoppingList__itemButton js-buttonMark${product.done
					? " shoppingList__itemButton--done" : ""}">
				</button>
				<span class="shoppingList__itemContent${product.done ? " shoppingList__itemContent--done" : ""}"">
				${product.content}
				</span>
            <button class="shoppingList__itemButton shoppingList__itemButton--delete js-remove"></button>
            </li>
			`;
		};

		document.querySelector(".js-products").innerHTML = htmlString;
	};

	const renderButtons = () => {
		const buttonsProducts = document.querySelector(".js-buttons");

		if (products.length === 0) {
			return
		}

		buttonsProducts.innerHTML = `
			<button class="section__button js-hideDoneProducts">
				Ukryj ukonczone
			</button>
			<button${products.every(({done}) => done) ? " disabled" : ""}
			 class="section__button js-doneAllProducts">
				Ukoncz wszystkie
			</button$>
		`;

	};

	const bindButtonsEvents = () => {
		const hideDoneProductsElement = document.querySelector(".js-hideDoneProducts");
		const doneAllProductsElement = document.querySelector(".js-doneAllProducts");

		if (doneAllProductsElement !== null && hideDoneProductsElement !== null) {
			doneAllProductsElement.addEventListener("click", () => {
				toggleDoneAllProducts();
			});

			hideDoneProductsElement.addEventListener("click", () => {
				//hideDoneProducts = !hideDoneProducts;
			});
		}
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

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newProduct = document.querySelector(".js-newProduct").value.trim();
		const inputField = document.querySelector(".js-newProduct");

		inputField.focus();

		if (newProduct === "") {
			return
		}

		addNewProduct(newProduct);
		inputField.value = "";
	};

	const init = () => {
		render();

		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};

	init();
}