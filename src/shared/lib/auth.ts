// import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
// export async function getPinCode() {
//   const key = 'pin-code';
//   return SecureStoragePlugin.get({ key })
//     .then((value) => {
//       return value;
//     })
//     .catch(() => {
//       return null;
//     });
// }
//
// export async function setPinCode(value: string) {
//   const key = 'pin-code';
//   await SecureStoragePlugin.set({ key, value });
// }
//
// export async function deletePinCode() {
//   const key = 'pin-code';
//   await SecureStoragePlugin.remove({ key });
// }
//
// export async function setFingerPrint(stringValue: boolean) {
//   const key = 'finger-print';
//   const value = String(stringValue);
//   await SecureStoragePlugin.set({ key, value });
// }
//
// export async function canUseFingerPrint() {
//   const key = 'finger-print';
//   return SecureStoragePlugin.get({ key })
//     .then((value) => {
//       return value;
//     })
//     .catch(() => {
//       return null;
//     });
// }

// export async function deleteFingerPrint() {
//   const key = 'finger-print';
//   await SecureStoragePlugin.remove({ key });
// }

export interface SecureStorageResponse {
  value: string;
}

export async function getPinCode() {
  return localStorage.getItem('pin-code');
}

export async function setPinCode(value: string) {
  localStorage.setItem('pin-code', value);
}

export async function deletePinCode() {
  localStorage.removeItem('pin-code');
}

export async function setFingerPrint(value: boolean) {
  localStorage.setItem('finger-print', String(value));
}

export async function canUseFingerPrint() {
  return localStorage.getItem('finger-print');
}

export async function deleteFingerPrint() {
  localStorage.removeItem('finger-print');
}
