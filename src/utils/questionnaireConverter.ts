import { FieldSkelet } from '@/types/index'
import FieldConverter from '@/utils/fieldConverter'

export default class OptionConverter implements FieldConverter {
  toFieldSkelet({ id, name, value, child, mark  }: any): FieldSkelet {
    return new FieldSkelet(mark || '', name, value, child)
  }
  toModel(value: any) {
    return {
      id: value.id,
      mark: value.id,
      value: value.value,
    }
  }
}
