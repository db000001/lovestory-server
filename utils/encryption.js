// utils/encryption.js
import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';

// Fixed key and IV (deterministic output)
const ENCRYPTION_KEY = CryptoJS.enc.Utf8.parse(process.env.ENCRYPTION_KEY || '12345678901234567890123456789012');
const FIXED_IV = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 chars = 128 bits

const SALT_ROUNDS = 12;

// AES Encryption
export const encryptData = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY, {
    iv: FIXED_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

// AES Decryption
export const decryptData = (encryptedData) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY, {
    iv: FIXED_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// Password hashing
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
