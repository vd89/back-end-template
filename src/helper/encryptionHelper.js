import crypto from 'crypto';

export const generateRandomString = (length) => {
  return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
};
