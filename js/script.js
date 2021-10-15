{
	const calculateResult = (amount, eur, usd, gbp, currency) => {

		switch (currency) {
			case "eur":
				return amount * eur;

			case "usd":
				return amount * usd;

			case "gbp":
				return amount * gbp;
		}
	};

	const changeResultText = (amount, result, currency) => {
		const calculatorResult = document.querySelector(".js-calculator-result");
		calculatorResult.innerText = `${amount.toFixed(2)} pln = ${result.toFixed(2)} ${currency}`;
	};

	const changeInfoText = (eur, usd, gbp, currency) => {
		const calculatorChange = document.querySelector(".js-calculator-change");

		switch (currency) {
			case "eur":
				return calculatorChange.innerText = `${eur} ${currency.toUpperCase()}`;

			case "usd":
				return calculatorChange.innerText = `${usd} ${currency.toUpperCase()}`;

			case "gbp":
				return calculatorChange.innerText = `${gbp} ${currency.toUpperCase()}`;
		}
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		const eur = 0.22;
		const usd = 0.25;
		const gbp = 0.19;

		const formInput = document.querySelector(".js-form-input");
		const formSelect = document.querySelector(".js-form-select");

		const amount = +formInput.value;
		const currency = formSelect.value;

		const result = calculateResult(amount, eur, usd, gbp, currency);

		changeResultText(amount, result, currency);
		changeInfoText(eur, usd, gbp, currency);
	};

	const init = () => {
		const form = document.querySelector(".js-form");

		form.addEventListener("submit", onFormSubmit);
	};

	init();
}