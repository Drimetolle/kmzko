import { CharacteristicDto } from '@/types/index'

export default function rateFilter(value: Array<CharacteristicDto>) {
  const formatArray = value.map(detail => `${detail.name} - ${detail.value}${map.get(detail.type) ?? ''}`)
  return formatArray.join(', ')
}

const map = new Map<string, string>([
  ['meter', 'm'],
  ['kilogram', 'kg'],
  ['watt', 'W'],
  ['cross', 'Ø'],
])
