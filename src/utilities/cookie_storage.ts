export const cookieStorage = {
  getItem(key: string) {
    const cookies = document.cookie
      .split(";")
      .map(cookie => cookie.split("="))
      .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value}), {});

    return cookies[key as keyof typeof cookies];
  },

  getFromString(cookieString: string, key: string) {
    const cookies = cookieString
      .split(";")
      .map(cookie => cookie.split("="))
      .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value}), {});

    return cookies[key as keyof typeof cookies];
  },

  setItem(key: string, value: string) {
    document.cookie = `${key}=${value}`
  }
}