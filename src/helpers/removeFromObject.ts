const removeFromObject = <T extends {}, K extends keyof T>(key: K, obj: T) => {
  let result = { ...obj }
  delete result[key]
  return result
}

export default removeFromObject
