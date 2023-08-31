export const differenceInDaysFunc = (
  deadline: Date,
  currentDate: Date
): number => {
  const modifiedDeadline = new Date(deadline)
  const millisecondsPerDay = 24 * 60 * 60 * 1000 // Cantidad de milisegundos en un día
  const timeDifferenceInMilliseconds =
    modifiedDeadline.getTime() - currentDate.getTime()
  const differenceInDays = timeDifferenceInMilliseconds / millisecondsPerDay
  return differenceInDays
}

export const differenceInDaysFunc2 = (
  creation: Date,
  deadline: Date
): number => {
  const modifiedDeadline = new Date(deadline)
  const modifiedCreation = new Date(creation)
  const millisecondsPerDay = 24 * 60 * 60 * 1000 // Cantidad de milisegundos en un día
  const timeDifferenceInMilliseconds =
    modifiedDeadline.getTime() - modifiedCreation.getTime()
  const differenceInDays = timeDifferenceInMilliseconds / millisecondsPerDay
  const possitiveDifferenceInDays = Math.abs(differenceInDays)

  return roundToNearest(possitiveDifferenceInDays)
}

function roundToNearest(number: number): number {
  const integerPart = Math.floor(number)
  const decimalPart = number - integerPart

  if (decimalPart === 0.5) {
    // Si el decimal es exactamente 0.5
    if (integerPart % 2 === 0) {
      // Si el número entero es par, redondeamos hacia abajo
      return integerPart
    } else {
      // Si el número entero es impar, redondeamos hacia arriba
      return integerPart + 1
    }
  } else if (decimalPart > 0.5) {
    // Si el decimal es mayor que 0.5, redondeamos hacia arriba
    return integerPart + 1
  } else {
    // Si el decimal es menor que 0.5, redondeamos hacia abajo
    return integerPart
  }
}
