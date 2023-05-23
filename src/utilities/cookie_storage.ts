export const cookieStorage = {
  getItem(key: string) {
    const cookies = document.cookie
      .split(";")
      .map(cookie => cookie.split("="))
      .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value}), {});

    return cookies[key as keyof typeof cookies];
  },

  setItem(key: string, value: string) {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
  }
}