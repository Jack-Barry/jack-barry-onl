import dayjs from "dayjs"

export function allCookies() {
  return document.cookie.split('; ').reduce<Record<string, string>>((result, current) => {
    const [key, value] = current.split('=')
    result[key] = value
    return result
  }, {})
}

export function expireCookie(cookieId: string) {
  const expiration = dayjs().subtract(1, 'day').format('ddd, DD MMM YYYY hh:mm:ss UTC')
  document.cookie = `${cookieId}=; expires=${expiration}; path=/;`;
}