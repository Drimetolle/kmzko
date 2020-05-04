export default function currencyFilter(value: number, currency = 'RUB'): string {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
    }).format(value)
}
