/**
 * Validates email format.
 * 
 * @param email Email to validate
 * @returns Whether email is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates username format.
 * Usernames must be 3-30 characters long and contain only letters, numbers, and underscores.
 * 
 * @param username Username to validate
 * @returns Whether username is valid
 */
export function validateUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
}

/**
 * Validates password format.
 * Passwords must be at least 8 characters long and contain at least:
 * - One uppercase letter
 * - One lowercase letter
 * - One number
 * 
 * @param password Password to validate
 * @returns Whether password is valid
 */
export function validatePassword(password: string): boolean {
  if (password.length < 8) return false;
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumber;
} 