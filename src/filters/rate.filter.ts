import { CharacteristicDto } from '@/types/index'

const map = new Map<string, string>([
  ['meter', 'm'],
  ['kilogram', 'kg'],
  ['watt', 'W'],
  ['cross', 'Ø'],
])

export default function rateFilter(value: Array<CharacteristicDto>): string {
  const formatArray = value.map((detail) => `${detail.name} - ${detail.value}${map.get(detail.type) ?? ''}`)
  return formatArray.join(', ')
}
