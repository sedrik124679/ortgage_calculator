export const calculateValue = (amount, interestRate, numberOfMonth) => {
    amount = Number(amount)
    interestRate = Number(interestRate)
    numberOfMonth = Number(numberOfMonth)
    return amount * (interestRate / 12) * Math.pow(1 + interestRate / 12, numberOfMonth) / (Math.pow(1 + interestRate / 12, numberOfMonth) - 1)
}