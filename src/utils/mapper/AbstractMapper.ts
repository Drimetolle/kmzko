export default interface Mapper <T, E> {
  toDto(o1: T, o2: E): E
}
