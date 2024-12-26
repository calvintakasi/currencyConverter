const BASE_URL = "https://v6.exchangerate-api.com/v6/";
const API_KEY = "3075bb9e294e1e1d3f7b9ccd";

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const apiUrl = `${BASE_URL}${API_KEY}/latest/${fromCurrency}`;
    
    try {
        // Fetch the exchange rate data from the API
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Check if the API call is successful
        if (data.result === "success") {
            // Get the conversion rate for the selected "toCurrency"
            const conversionRate = data.conversion_rates[toCurrency];
            
            // If conversion rate is available, calculate the result
            if (conversionRate) {
                const convertedAmount = (amount * conversionRate).toFixed(2);
                document.getElementById('result').innerText = `${convertedAmount} ${toCurrency}`;
            } else {
                alert("Conversion rate for the selected currency is not available.");
            }
        } else {
            alert("Error fetching exchange rates. Please try again.");
        }
    } catch (error) {
        alert("Error fetching data: " + error.message);
    }
}

window.onload = () => {
    convertCurrency();
}


//for calculator
    const calcDisplay = document.getElementById('calc-display');
    const calcButtons = document.querySelectorAll('.calc-btn');
    let currentInput = ''; 

    function updateDisplay() {
        calcDisplay.value = currentInput;
    }

    function handleButtonClick(value) {
        if (value === '=') {
            try {
                currentInput = eval(currentInput).toString();
            } catch (e) {
                currentInput = 'Error'; 
            }
        } else if (value === 'C') {
            currentInput = '';  
        } else {
            currentInput += value;  
        }
        updateDisplay();  // Update the display
    }

    calcButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button.textContent);
        });
    });

    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

