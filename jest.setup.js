// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock environment variable
process.env.NEXT_PUBLIC_BASE_PATH = '/castSearch'

// Polyfill Request and Response for API route tests
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init) {
      this.url = typeof input === 'string' ? input : input.url
      this.method = init?.method || 'GET'
      this.headers = init?.headers || {}
      this.body = init?.body
    }
  }
}

if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body
      this.status = init?.status || 200
      this.headers = init?.headers || {}
      this.ok = (init?.status || 200) >= 200 && (init?.status || 200) < 300
    }

    async json() {
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body
    }

    static json(data, init) {
      return new Response(JSON.stringify(data), {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...(init?.headers || {})
        }
      })
    }
  }
}
