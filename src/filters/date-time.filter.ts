export default function dateTimeFilter(date: Date, options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false,
}): string {

  return new Intl.DateTimeFormat('ru-RU', options).format(date)
}

