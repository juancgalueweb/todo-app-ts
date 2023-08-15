export const differenceInDaysFunc = (
  deadline: Date,
  currentDate: Date
): number => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000 // Cantidad de milisegundos en un día
  const timeDifferenceInMilliseconds =
    deadline.getTime() - currentDate.getTime()
  const differenceInDays = timeDifferenceInMilliseconds / millisecondsPerDay
  return differenceInDays
}
