{
   const products = [
      {
         content: "czekolada",
      },
   ];

   const render = () => {
      let htmlString = "";

      for (const product of products) {
            htmlString += `
            <li class="shoppingList__item">
            <button class="shoppingList__added"></button>
            ${products.content}
            <button class="shoppingList__delete"></button>
            </li>
			`;
      }

      document.querySelector(".js-products").innerHTML = htmlString;
   };

   const init = () => {

      render();

   };

   init();
}