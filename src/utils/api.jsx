const baseUrl = "http://localhost:3001";

// Helper to check API response
function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Error: ${res.status}`);
}

// Helper to get headers with optional authorization
function getHeaders(withAuth = false) {
  const headers = { "Content-Type": "application/json" };
  if (withAuth) {
    const token = localStorage.getItem("jwt");
    if (token) headers.authorization = `Bearer ${token}`;
  }
  return headers;
}

// Items
export function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: getHeaders(false),
  }).then(checkResponse);
}

export function addItem({ name, imageUrl, weather, owner }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify({ name, imageUrl, weather, owner }),
  }).then(checkResponse);
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getHeaders(true),
  }).then(checkResponse);
}

// User profile
export function updateUserProfile({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(true), // send token
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

// Likes (needed for handleCardLike in App.jsx)
export function addCardLike(cardId) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: getHeaders(true),
  }).then(checkResponse);
}

export function removeCardLike(cardId) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: getHeaders(true),
  }).then(checkResponse);
}

// Optional: Default export object (if you want to keep App.jsx using "api.addCardLike")
const api = {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
};

export default api;
