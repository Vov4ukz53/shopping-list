{
   const products = [];

   const render = () => {
      let htmlString = "";

      for (const product of products) {
         htmlString += `
            <li class="shoppingList__item">
            <button class="shoppingList__added js-buttonMark"></button>
            ${product.content}
            <button class="shoppingList__delete js-remove"></button>
            </li>
			`;
      }

      document.querySelector(".js-products").innerHTML = htmlString;

      const removeButtons = document.querySelectorAll(".js-remove");

      removeButtons.forEach((removeButton, index) => {
         removeButton.addEventListener("click", () => {
            removeProduct(index);
         });
      });

      const markButtons = document.querySelectorAll(".js-buttonMark");

      markButtons.forEach((markButton, index) => {
         markButton.addEventListener("click", () => {
            markButton.classList.toggle(".shoppingList__added--done");
            render();
         });
      });
   };

   const addNewProduct = (newProduct) => {
      products.push({
         content: newProduct,
      });

      render();
   };

   const removeProduct = (index) => {
      products.splice(index, 1);
      render();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const newProduct = document.querySelector(".js-newProduct").value.trim();

      if (newProduct === "") {
         return
      }

      addNewProduct(newProduct);
   };

   const init = () => {
      render();

      const form = document.querySelector(".js-form");

      form.addEventListener("submit", onFormSubmit);
   };

   init();
}