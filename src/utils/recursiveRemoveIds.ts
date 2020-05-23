export default function recursiveDeleteIds(obj: any) {
  obj.id = undefined

  if (Object.keys(obj).length > 1) {
    // tslint:disable-next-line:forin
    for(const key in obj) {
      recursiveDeleteIds(key)
    }
  }

  return
}
