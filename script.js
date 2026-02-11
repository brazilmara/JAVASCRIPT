const convertButton = document.querySelector(".convert-button")
const updateRatesButton = document.querySelector(".update-rates-button")
const currencySelectFrom = document.querySelector(".currency-select-from")
const currencySelect = document.querySelector(".currency-select")
const inputCurrency = document.querySelector(".input-currency")
const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
const currencyValueConverted = document.querySelector(".currency-value")
const currencyNameFrom = document.getElementById("currency-name-from")
const currencyImgFrom = document.getElementById("currency-img-from")
const currencyName = document.getElementById("currency-name")
const currencyImg = document.querySelector(".currency-img")

let rates = {
    real: 1,
    bitcoin: 474767
}

async function fetchRates() {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/BRL');
        const data = await response.json();
        rates.dolar = 1 / data.rates.USD;
        rates.euro = 1 / data.rates.EUR;
        rates.libra = 1 / data.rates.GBP;
    } catch (error) {
        console.error('Erro ao buscar taxas de câmbio:', error);
        // Fallback para valores hardcoded se a API falhar
        rates.dolar = 5.6;
        rates.euro = 6.0;
        rates.libra = 7.0;
    }
}

function convertValues() {
    const inputValue = inputCurrency.value.replace(',', '.')
    const fromCurrency = currencySelectFrom.value
    const toCurrency = currencySelect.value

    if (!inputValue || isNaN(inputValue)) return

    const numericValue = parseFloat(inputValue)

    // Convert to BRL first, then to target
    const valueInBRL = numericValue * rates[fromCurrency]
    const convertedValue = valueInBRL / rates[toCurrency]

    // Format and display from value
    currencyValueToConvert.innerHTML = formatCurrency(numericValue, fromCurrency)

    // Format and display converted value
    currencyValueConverted.innerHTML = formatCurrency(convertedValue, toCurrency)
}

function formatCurrency(value, currency) {
    switch (currency) {
        case 'real':
            return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
        case 'dolar':
            return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
        case 'euro':
            return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value)
        case 'libra':
            return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value)
        case 'bitcoin':
            return `₿ ${value.toFixed(8)}`
        default:
            return value.toString()
    }
}

function changeCurrency() {
    const fromCurrency = currencySelectFrom.value
    const toCurrency = currencySelect.value

    // Update from currency display
    switch (fromCurrency) {
        case 'real':
            currencyNameFrom.innerHTML = "Real Brasileiro"
            currencyImgFrom.src = "./assets/brasil.png"
            break
        case 'dolar':
            currencyNameFrom.innerHTML = "Dólar Americano"
            currencyImgFrom.src = "./assets/eua.png"
            break
        case 'euro':
            currencyNameFrom.innerHTML = "Euro"
            currencyImgFrom.src = "./assets/euro.png"
            break
        case 'libra':
            currencyNameFrom.innerHTML = "Libra Esterlina"
            currencyImgFrom.src = "./assets/libra.png"
            break
        case 'bitcoin':
            currencyNameFrom.innerHTML = "Bitcoin"
            currencyImgFrom.src = "./assets/bitcoin.png"
            break
    }

    // Update to currency display
    switch (toCurrency) {
        case 'dolar':
            currencyName.innerHTML = "Dólar Americano"
            currencyImg.src = "./assets/eua.png"
            break
        case 'euro':
            currencyName.innerHTML = "Euro"
            currencyImg.src = "./assets/euro.png"
            break
        case 'libra':
            currencyName.innerHTML = "Libra Esterlina"
            currencyImg.src = "./assets/libra.png"
            break
        case 'bitcoin':
            currencyName.innerHTML = "Bitcoin"
            currencyImg.src = "./assets/bitcoin.png"
            break
    }
}

// Initial setup
async function init() {
    await fetchRates();
    changeCurrency();
    convertValues();
}

init();

// Update rates every 60 seconds
setInterval(fetchRates, 60000);

// Event listeners
currencySelectFrom.addEventListener("change", changeCurrency)
currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)
updateRatesButton.addEventListener("click", async () => {
    await fetchRates();
    convertValues(); // Recalculate with new rates
})

