export function boolFromString(str: string | null = '') {
  if (!str) {
    return false
  }

  return /^true$/i.test(str)
}