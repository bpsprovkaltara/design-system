import '@testing-library/jest-dom'

// cmdk uses ResizeObserver and scrollIntoView; jsdom does not implement them
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = function () {}
}
