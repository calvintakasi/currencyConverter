const BASE_URL = "https://v6.exchangerate-api.com/v6/";
const API_KEY = "3075bb9e294e1e1d3f7b9ccd";

// Function to fetch the conversion rates and calculate the converted amount
async function convertCurrency() {
    // Get the amount and selected currencies
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    // API URL to get the exchange rates for the "fromCurrency"
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
                // If the value is '=', evaluate the current expression
                currentInput = eval(currentInput).toString();
            } catch (e) {
                currentInput = 'Error';  // Show 'Error' if there was an invalid input
            }
        } else if (value === 'C') {
            currentInput = '';  // Clear the input if 'C' is pressed
        } else {
            currentInput += value;  // Add the clicked value to currentInput
        }
        updateDisplay();  // Update the display
    }

    // Add event listeners to all calculator buttons
    calcButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button.textContent);
        });
    });


    // Get the elements by their IDs
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    // Toggle the visibility of the navigation menu when the menu icon is clicked
    menuIcon.addEventListener('click', () => {
        // Toggle the 'active' class on the nav-links
        navLinks.classList.toggle('active');
    });

