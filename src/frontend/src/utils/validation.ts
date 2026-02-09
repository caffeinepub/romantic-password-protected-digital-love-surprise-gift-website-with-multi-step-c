export function validateDate(date: string): boolean {
  if (!/^\d{8}$/.test(date)) {
    return false;
  }

  const day = parseInt(date.slice(0, 2), 10);
  const month = parseInt(date.slice(2, 4), 10);
  const year = parseInt(date.slice(4, 8), 10);

  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
    return false;
  }

  return true;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
