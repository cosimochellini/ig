const create = (json = [], Proto: { prototype: object | null }) => {
  return json.map((j) => Object.setPrototypeOf(j, Proto.prototype))
}

export default create
