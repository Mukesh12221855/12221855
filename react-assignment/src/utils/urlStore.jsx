// src/utils/urlStore.js

const STORAGE_KEY = 'shortLinks';

function loadLinks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveLinks(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let shortLinks = loadLinks();

export function saveShortLink(code, fullUrl, expiryTime) {
  shortLinks[code] = {
    url: fullUrl,
    createdAt: Date.now(),
    expiresAt: Date.now() + expiryTime * 60 * 1000,
    clicks: [],
  };
  saveLinks(shortLinks);
}

export function getOriginalUrl(code) {
  shortLinks = loadLinks(); // refresh data
  const item = shortLinks[code];
  if (!item) return null;
  if (Date.now() > item.expiresAt) return 'expired';
  return item.url;
}

export function logClick(code, source = 'direct', location = 'unknown') {
  shortLinks = loadLinks();
  if (shortLinks[code]) {
    shortLinks[code].clicks.push({
      time: new Date().toLocaleString(),
      source,
      location,
    });
    saveLinks(shortLinks);
  }
}

export function getAllLinks() {
  return loadLinks();
}
