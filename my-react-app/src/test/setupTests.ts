import '@testing-library/jest-dom'

// Minimal ResizeObserver polyfill for jsdom/Vitest environment
class ResizeObserverPolyfill {
	callbacks: any[] = []
	observe() {}
	unobserve() {}
	disconnect() {}
}

// @ts-ignore
global.ResizeObserver = global.ResizeObserver || ResizeObserverPolyfill

