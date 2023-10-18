/**
 * This is an object with three properties, each representing a different filter for the todos:
 * "all", "pending", and "completed". These properties are defined using the const assertion,
 * which tells TypeScript to infer their types as string literals instead of string objects.
 */
export const TODO_FILTERS = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed'
} as const

/**
 * This is another object that maps each filter defined in TODO_FILTERS
 * to an object with two properties: literal and href.
 * literal is a string that represents the name of the filter, and
 * href is a string with a URL that includes the filter as a query parameter.
 */
export const FILTERS_BUTTONS = {
  [TODO_FILTERS.ALL]: {
    literal: 'Ver todas las tareas'
  },
  [TODO_FILTERS.PENDING]: {
    literal: 'Pendientes'
  },
  [TODO_FILTERS.COMPLETED]: {
    literal: 'Completadas'
  }
} as const

export const OTP_KEY = 'todos-info-to-verify-email'
export const APP_KEY = 'todos-info-to-use-app'
