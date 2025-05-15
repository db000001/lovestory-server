import { config } from "dotenv";
config();
// utils/encryption.js
import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';

// Configuration
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Should be 256-bit (32 characters)
const SALT_ROUNDS = 12;

// AES Encryption/Decryption
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Password Hashing
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};