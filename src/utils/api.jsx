const baseUrl = "http://localhost:3001";

import { checkResponse } from "./request";

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

export function updateUserProfile({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(true),
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

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

const api = {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
};

export default api;
