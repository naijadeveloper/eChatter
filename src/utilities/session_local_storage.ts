const sessionOrLocalStorage = {
  setItem(storage: "session" | "local", key: string, value: string) {
    if(storage == "session") {
      sessionStorage.setItem(key, JSON.stringify(value));
    }else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  getItem(storage: "session" | "local", key: string): string | null {
    if(storage == "session") {
      return sessionStorage.getItem(key);
    }else {
      return localStorage.getItem(key);
    }
  }
}

export default sessionOrLocalStorage;