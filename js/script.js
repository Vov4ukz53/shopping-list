{
	let products = [];
	let hideDoneProducts = false;


	const renderProducts = () => {
		let htmlString = "";

		for (const product of products) {
			htmlString += `
            <li class="shoppingList__item${product.done ? " shoppingList__item--done" : ""}">
            <button class="shoppingList__itemButton js-buttonMark${product.done
					? " shoppingList__itemButton--done" : ""}">
				</button>
            ${product.content}
            <button class="shoppingList__itemButton shoppingList__itemButton--delete js-remove"></button>
            </li>
			`;
		};

		document.querySelector(".js-products").innerHTML = htmlString;
	};

	const renderButtons = () => { };

	const bindButtonsEvents = () => { };

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

	const toggleDoneProduct = (productIndex) => {
		products[productIndex].done = !products[productIndex].done;
		render();
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