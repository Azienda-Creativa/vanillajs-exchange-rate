const currencyEl_one = document.getElementById("currency-1")
const amountEl_one = document.getElementById("amount-one")
const currencyEl_two = document.getElementById("currency-2")
const amountEl_two = document.getElementById("amount-two")

const rateEl = document.getElementById("rate")
const swap = document.getElementById("swap")

// fetch exchange rate and aupdate DOM
const calculate = async () => {
  let currencyOne = currencyEl_one.value
  let currencyTwo = currencyEl_two.value

  await fetch(`https://open.exchangerate-api.com/v6/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo]
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo} `

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2)
    })
}

currencyEl_one.addEventListener("change", calculate)
amountEl_one.addEventListener("input", calculate)
currencyEl_two.addEventListener("change", calculate)
amountEl_two.addEventListener("change", calculate)
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value
  currencyEl_one.value = currencyEl_two.value
  currencyEl_two.value = temp
  calculate()
})

calculate()
