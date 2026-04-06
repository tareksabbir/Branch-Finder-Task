/**
 * Set a cookie with a name, value, and expiration in days.
 * Includes localStorage fallback for higher reliability.
 */
export function setCookie(name: string, value: string, days: number) {
  if (typeof document !== "undefined") {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  }
  
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.setItem(name, value);
    } catch (e) {
      // Ignore quota errors
    }
  }
}

/**
 * Get a cookie value by name.
 * Falls back to localStorage if cookie is unavailable.
 */
export function getCookie(name: string): string | null {
  if (typeof document !== "undefined") {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  }

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      return localStorage.getItem(name);
    } catch (e) {
      return null;
    }
  }

  return null;
}
