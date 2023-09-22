export const mongooseValidationErrorHandler = (err: any): string => {
  const errors = Object.values(err.errors).map((val: any) => val.message)
  const erorsMsgs = errors.join('. ')
  const msg = `Datos inválidos: ${erorsMsgs}`
  return msg
}

export const duplicateKeyErrorHandler = (err: any): string => {
  const errors = Object.values(err.keyValue).map(
    (val: any) => `El nombre de la etiqueta/color '${val}', ya existe`
  )
  const erorsMsgs = errors.join('. ')
  const msg = `Datos repetidos: ${erorsMsgs}`
  return msg
}
