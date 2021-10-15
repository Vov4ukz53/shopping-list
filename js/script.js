{
   const products = [];

   const render = () => {
      let htmlString = "";

      for (const product of products) {
         htmlString += `
            <li class="shoppingList__item">
            <button class="shoppingList__added"></button>
            ${product.content}
            <button class="shoppingList__delete"></button>
            </li>
			`;
      }

      document.querySelector(".js-products").innerHTML = htmlString;
   };

   const addNewProduct = (newProduct) => {

      products.push({
         content: newProduct,
      });

      render();
   };



   const init = () => {
      render();

      const form = document.querySelector(".js-form");

      form.addEventListener("submit", (event) => {
         event.preventDefault();

         const newProduct = document.querySelector(".js-newProduct").value.trim();

         if (newProduct === "") {
            return
         }

         addNewProduct(newProduct);
      });
   };

   init();
}