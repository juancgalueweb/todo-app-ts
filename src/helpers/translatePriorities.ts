import { EngPriority, SpaPriority } from '../interfaces/todo.interface'

export const translateSpaToEngPriority = (spaPriority: string): string => {
  const priorityMapping: Record<SpaPriority, EngPriority> = {
    [SpaPriority.alta]: EngPriority.high,
    [SpaPriority.media]: EngPriority.medium,
    [SpaPriority.baja]: EngPriority.low
  }

  const translatedPriority = priorityMapping[spaPriority as SpaPriority]

  return translatedPriority
}

export const translateEngToSpaPriority = (engPriority: string): string => {
  const priorityMapping: Record<EngPriority, SpaPriority> = {
    [EngPriority.high]: SpaPriority.alta,
    [EngPriority.medium]: SpaPriority.media,
    [EngPriority.low]: SpaPriority.baja
  }

  const translatedPriority = priorityMapping[engPriority as EngPriority]

  return translatedPriority
}
