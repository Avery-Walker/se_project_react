const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Error: ${res.status}`);
}

function getHeaders(withAuth = false) {
  const headers = { "Content-Type": "application/json" };
  if (withAuth) {
    const token = localStorage.getItem("jwt");
    if (token) headers.authorization = `Bearer ${token}`;
  }
  return headers;
}

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: getHeaders(false),
  }).then(checkResponse);
}

export function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getHeaders(true),
  }).then(checkResponse);
}

export function updateUserProfile({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}
