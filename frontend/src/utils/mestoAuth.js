export const BASE_URL = 'http://api.mesto.dolganev.nomoredomains.xyz';

const checkResponse = (response) => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)

export function register(password, email) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then(checkResponse)
}

export function authorize(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse)
}
