export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return re.test(password)
}

export const validatePhone = (phone) => {
  // Basic international phone validation
  const re = /^\+?[1-9]\d{1,14}$/
  return re.test(phone.replace(/\D/g, ''))
}

export const validateAmount = (amount) => {
  return !isNaN(parseFloat(amount)) && isFinite(amount) && parseFloat(amount) > 0
}

export const validateIBAN = (iban) => {
  // Basic IBAN validation (country code + check digits + basic account number)
  const re = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/
  return re.test(iban.replace(/\s/g, ''))
}

export const validateAccountNumber = (accountNumber) => {
  // Basic account number validation (digits only, 8-20 characters)
  const re = /^\d{8,20}$/
  return re.test(accountNumber.replace(/\s/g, ''))
}