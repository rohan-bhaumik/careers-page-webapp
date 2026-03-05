// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock environment variable
process.env.NEXT_PUBLIC_BASE_PATH = '/castSearch'

// Polyfill Headers for API route tests
if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers {
    constructor(init) {
      this._headers = {}
      if (init) {
        if (init instanceof Headers) {
          this._headers = { ...init._headers }
        } else if (typeof init === 'object') {
          Object.entries(init).forEach(([key, value]) => {
            this._headers[key.toLowerCase()] = String(value)
          })
        }
      }
    }

    get(name) {
      return this._headers[name.toLowerCase()] || null
    }

    set(name, value) {
      this._headers[name.toLowerCase()] = String(value)
    }

    has(name) {
      return name.toLowerCase() in this._headers
    }

    delete(name) {
      delete this._headers[name.toLowerCase()]
    }

    forEach(callback) {
      Object.entries(this._headers).forEach(([key, value]) => callback(value, key, this))
    }

    entries() {
      return Object.entries(this._headers)
    }

    keys() {
      return Object.keys(this._headers)
    }

    values() {
      return Object.values(this._headers)
    }
  }
}

// Polyfill Request and Response for API route tests
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init) {
      this.url = typeof input === 'string' ? input : input.url
      this.method = init?.method || 'GET'
      this.headers = new Headers(init?.headers || {})
      this.body = init?.body
    }
  }
}

if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body
      this.status = init?.status || 200
      this.headers = new Headers(init?.headers || {})
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
