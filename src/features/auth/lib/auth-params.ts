export function validateEmail(email: string) {
  if (email.length < 5) return false;
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return false;
  return true;
}

export function validatePassword(password: string) {
  if (password.length < 5) return false;
  return true;
}

export function validatePasswordRepeat(password: string, passwordRepeat: string) {
  if (password !== passwordRepeat) return false;
  return true;
}
