import CryptoJS from "crypto-js";
import { enc } from "crypto-js";

const secretKey = "qkrgPdnjs";

// AES 알고리즘 사용 암호화
export const encrypt = value =>
  CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();

// AES 알고리즘 사용 복호화
export const decrypt = value =>
  JSON.parse(CryptoJS.AES.decrypt(value, secretKey).toString(enc.Utf8));
