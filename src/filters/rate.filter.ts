export default function rateFilter(value: string, rate = 'kg') {
    return `${value} ${rate}`
}