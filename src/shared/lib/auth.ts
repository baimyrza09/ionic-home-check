export async function getPinCode(key: string) {
  return localStorage.getItem(key);
}

export async function setPinCode(value: string) {
  localStorage.setItem('pin-code', value);
}
