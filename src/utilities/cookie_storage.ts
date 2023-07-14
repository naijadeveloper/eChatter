export const cookieStorage = {
  getFromString(str: string, key: string): string | undefined {
    if(typeof str == "undefined") return undefined;
    const cookies = str 
      .split(";")
      .map(cookie => cookie.split("="))
      .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value}), {});

     return cookies[key as keyof typeof cookies];
  },

  getItem(key: string): string | undefined {
    const cookies = document.cookie
      .split(";")
      .map(cookie => cookie.split("="))
      .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value.trim()}), {});

    return cookies[key as keyof typeof cookies];
  },

  setItem(key: string, value: string) {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
  }
}