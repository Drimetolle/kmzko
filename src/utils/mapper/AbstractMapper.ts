export default interface Mapper <T, E> {
  toDto(o1: T): E
}
