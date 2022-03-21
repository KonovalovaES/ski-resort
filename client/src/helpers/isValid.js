export const isValidEmail = (email) => {
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
}

export const isValidName = (name) => {
  return /^[а-яА-Яa-zA-Z-_]{1,20}$/.test(name);
}

export const isValidPassword = (password) => {
  return /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Zа-яА-Я\d]{3,20}$/.test(password);
}

export const isValidPhone = (name) => {
  return /^\+7\d{10}$/.test(name);
}

export const isValidAboutMe = (name) => {
  return /^.{0,140}$/.test(name);
}

export const isValidSkiPass = (name) => {
  return /(^$)|(^[\d]{5}$)/.test(name);
}

