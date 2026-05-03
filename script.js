const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const swapBtn = document.getElementById("swapBtn");

// Convert function
async function convert() {
    const amount = amountInput.value;

    if (!amount || amount <= 0) {
        result.innerText = "⚠️ Enter valid amount";
        return;
    }

    result.innerText = "⏳ Converting...";

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`);
        const data = await response.json();

        const rate = data.rates[toCurrency.value];
        const converted = (amount * rate).toFixed(2);

        result.innerText = `💰 ${amount} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
    } catch (error) {
        result.innerText = "❌ Error fetching data";
    }
}

// Swap
swapBtn.addEventListener("click", () => {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convert();
});

// Auto convert
amountInput.addEventListener("input", convert);
fromCurrency.addEventListener("change", convert);
toCurrency.addEventListener("change", convert);