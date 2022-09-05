import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const getGCD = function (a, b) {
  return b == 0 ? a : getGCD(b, a % b);
};

export const getFraction = function (num) {
  if (typeof num !== 'number') {
    num = Number.parseFloat(num);
  }

  if (!Number.isFinite(num)) return NaN;

  let wholePart, numerator, denominator; // format: a b/c
  wholePart = Math.trunc(num);

  const decimalPart = num - wholePart;
  denominator = 100;
  numerator = Math.trunc(decimalPart * denominator);

  const gcd = getGCD(numerator, denominator);
  numerator = Math.trunc(numerator / gcd);
  denominator = Math.trunc(denominator / gcd);

  const result = [];
  if (wholePart != 0) result.push(wholePart);
  if (numerator != 0)
    result.push(
      (wholePart === 0 ? numerator : Math.abs(numerator)) + '/' + denominator
    );
  return result.length > 0 ? result.join(' ') : 0;
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const res = await Promise.race([
      uploadData
        ? fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
          })
        : fetch(url),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
*/
