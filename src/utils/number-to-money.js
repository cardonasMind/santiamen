export default function numberToMoney(number) {
    return new Intl.NumberFormat("en-US", {
        style: "decimal", currency: "COP", minimumFractionDigits: 0
    }).format(number)
}