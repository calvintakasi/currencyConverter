
const dropdowns = document.querySelectorAll(".dropdown select");
const BASE_URL = "https://v6.exchangerate-api.com/v6/"; 
const API_KEY = "3075bb9e294e1e1d3f7b9ccd";

const msg = document.querySelector(".msg");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
    for (let currencyCode in countryList) { //adding more countries
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD"){ //by Default usd to inr
            newOption.selected = "selected";
        }

        if (select.name === "to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }

    select.addEventListener("change" , (evt)=>{
        flag(evt.target);
    })
}
 //flag change with country code
const flag = (element) => {
    let currencyCode = element.value;
    let currCode = countryList[currencyCode]; // Access countryList directly
    let newSrc = `https://flagsapi.com/${currCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const button = document.querySelector('.btn');

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("input[name='amount']");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
   ///fetching api-----------
   const URL = `${BASE_URL}${API_KEY}/latest/${fromCurr.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value]
    let finalAmount = amtVal * rate;

    //here display this final amount in msg section
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});




