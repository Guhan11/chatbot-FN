import CryptoJS from 'crypto-js'
import React from 'react'

export const encryptPassword = (password) => {
  // Log the password and CryptoJS instance for debugging
  console.log('Password:', password)
  console.log('CryptoJS:', CryptoJS)

  // Get the encryption key and IV from environment variables
  const encKey = process.env.REACT_APP_ENC_KEY
  const encIv = process.env.REACT_APP_ENC_IV

  // Check if the key or IV is undefined
  if (!encKey || !encIv) {
    throw new Error(
      'Encryption key or IV is not defined in the environment variables.'
    )
  }

  // Parse the key and IV as Base64
  let rkEncryptionKey = CryptoJS.enc.Base64.parse(encKey)
  let rkEncryptionIv = CryptoJS.enc.Base64.parse(encIv)

  // Convert the password to a UTF-8 format
  let utf8Stringified = CryptoJS.enc.Utf8.parse(password)

  // Encrypt the password
  let encrypted = CryptoJS.AES.encrypt(utf8Stringified, rkEncryptionKey, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: rkEncryptionIv,
  })

  // Convert the ciphertext to Base64
  let encryptedPassword = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  console.log('Encrypted Password:', encryptedPassword) // Log the encrypted password for debugging
  return encryptedPassword
}

export const decryptPassword = (encryptedPassword) => {
  const rkEncryptionKey = CryptoJS.enc.Base64.parse(
    process.env.REACT_APP_ENC_KEY
  )
  const rkEncryptionIv = CryptoJS.enc.Base64.parse(process.env.REACT_APP_ENC_IV)
  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, rkEncryptionKey, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: rkEncryptionIv,
  })
  const decryptedPassword = CryptoJS.enc.Utf8.stringify(decrypted)
  return decryptedPassword
}

export const renderHTML = (rawHTML) =>
  React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } })
// export const checkIsAdmin = (userName, password) =>Admin.username === userName && Admin.password === password?true:false;
