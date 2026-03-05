import { GET } from '../route'

// Mock fetch globally
global.fetch = jest.fn()

describe('Movie API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return 400 if movieName is not provided', async () => {
    const request = new Request('http://localhost:3000/api/movie')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toEqual({ error: 'Movie name is required' })
  })

  it('should return movie cast data for a valid movie', async () => {
    const mockSearchResponse = {
      results: [
        {
          id: 603,
          title: 'The Matrix',
          release_date: '1999-03-30'
        }
      ]
    }

    const mockCreditsResponse = {
      cast: [
        {
          id: 6384,
          name: 'Keanu Reeves',
          character: 'Neo',
          profile_path: '/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg',
          order: 0
        },
        {
          id: 2975,
          name: 'Laurence Fishburne',
          character: 'Morpheus',
          profile_path: '/8suONZdMKFZ0dKTIcjqYpWsE2eQ.jpg',
          order: 1
        }
      ]
    }

    // Mock fetch to return search results first, then credits
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCreditsResponse
      })

    const request = new Request('http://localhost:3000/api/movie?movieName=The%20Matrix')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.movies).toHaveLength(1)
    expect(data.movies[0]).toMatchObject({
      id: '603',
      title: 'The Matrix',
      year: '1999'
    })
    expect(data.movies[0].cast).toHaveLength(2)
    expect(data.movies[0].cast[0]).toMatchObject({
      id: 6384,
      name: 'Keanu Reeves',
      character: 'Neo'
    })
  })

  it('should return empty movies array if no results found', async () => {
    const mockSearchResponse = {
      results: []
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResponse
    })

    const request = new Request('http://localhost:3000/api/movie?movieName=NonexistentMovie123')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.movies).toEqual([])
  })

  it('should handle search API failure', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500
    })

    const request = new Request('http://localhost:3000/api/movie?movieName=The%20Matrix')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Failed to search for movie' })
  })

  it('should handle credits API failure', async () => {
    const mockSearchResponse = {
      results: [
        {
          id: 603,
          title: 'The Matrix',
          release_date: '1999-03-30'
        }
      ]
    }

    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500
      })

    const request = new Request('http://localhost:3000/api/movie?movieName=The%20Matrix')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Failed to fetch cast information' })
  })

  it('should handle unexpected errors', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    const request = new Request('http://localhost:3000/api/movie?movieName=The%20Matrix')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Internal Server Error' })
  })

  it('should limit cast members to 15', async () => {
    const mockSearchResponse = {
      results: [
        {
          id: 603,
          title: 'The Matrix',
          release_date: '1999-03-30'
        }
      ]
    }

    // Create 20 cast members
    const mockCast = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      name: `Actor ${i}`,
      character: `Character ${i}`,
      profile_path: `/path${i}.jpg`,
      order: i
    }))

    const mockCreditsResponse = {
      cast: mockCast
    }

    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCreditsResponse
      })

    const request = new Request('http://localhost:3000/api/movie?movieName=The%20Matrix')
    const response = await GET(request)
    const data = await response.json()

    expect(data.movies[0].cast).toHaveLength(15)
  })

  it('should handle cast members without profile_path', async () => {
    const mockSearchResponse = {
      results: [
        {
          id: 603,
          title: 'The Matrix',
          release_date: '1999-03-30'
        }
      ]
    }

    const mockCreditsResponse = {
      cast: [
        {
          id: 1,
          name: 'John Doe',
          character: 'Unknown',
          profile_path: null,
          order: 0
        }
      ]
    }

    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResponse
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCreditsResponse
      })

    const request = new Request('http://localhost:3000/api/movie?movieName=The%20Matrix')
    const response = await GET(request)
    const data = await response.json()

    expect(data.movies[0].cast[0].profile_path).toBeNull()
  })
})
