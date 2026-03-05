import { render, screen, waitFor } from '@/test-utils'
import Home from '../page'
import userEvent from '@testing-library/user-event'

// Mock fetch globally
global.fetch = jest.fn()

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the hero section with search form', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { name: /movie cast search/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter movie name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search cast/i })).toBeInTheDocument()
  })

  it('should submit search and display results', async () => {
    const user = userEvent.setup()

    const mockResponse = {
      movies: [
        {
          id: '603',
          title: 'The Matrix',
          year: '1999',
          cast: [
            {
              id: 6384,
              name: 'Keanu Reeves',
              character: 'Neo',
              profile_path: 'https://image.tmdb.org/t/p/w185/path.jpg',
              order: 0
            }
          ]
        }
      ]
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    render(<Home />)

    const input = screen.getByPlaceholderText(/enter movie name/i)
    const button = screen.getByRole('button', { name: /search cast/i })

    await user.type(input, 'The Matrix')
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('The Matrix (1999)')).toBeInTheDocument()
      expect(screen.getByText('Keanu Reeves')).toBeInTheDocument()
      expect(screen.getByText('Neo')).toBeInTheDocument()
    })
  })

  it('should show loading state while fetching', async () => {
    const user = userEvent.setup()

    // Create a promise that we can control
    let resolvePromise: (value: any) => void
    const promise = new Promise((resolve) => {
      resolvePromise = resolve
    })

    ;(global.fetch as jest.Mock).mockReturnValueOnce(promise)

    render(<Home />)

    const input = screen.getByPlaceholderText(/enter movie name/i)
    const button = screen.getByRole('button', { name: /search cast/i })

    await user.type(input, 'The Matrix')
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText(/loading cast information/i)).toBeInTheDocument()
    })

    // Resolve the promise
    resolvePromise!({
      ok: true,
      json: async () => ({ movies: [] })
    })
  })

  it('should display error message when fetch fails', async () => {
    const user = userEvent.setup()

    // Mock fetch to throw an error
    ;(global.fetch as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error('Network error'))
    )

    render(<Home />)

    const input = screen.getByPlaceholderText(/enter movie name/i)
    const button = screen.getByRole('button', { name: /search cast/i })

    await user.type(input, 'InvalidMovie')
    await user.click(button)

    // Wait for error message with increased timeout since query may retry
    await waitFor(() => {
      expect(screen.getByText(/could not find cast information for this movie/i)).toBeInTheDocument()
    }, { timeout: 5000 })
  })

  it('should not fetch when submit with empty input', async () => {
    const user = userEvent.setup()

    render(<Home />)

    const button = screen.getByRole('button', { name: /search cast/i })
    await user.click(button)

    // Fetch should not be called
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('should show scroll indicator when results are loading', async () => {
    const user = userEvent.setup()

    // Create a promise that we can control
    let resolvePromise: (value: any) => void
    const promise = new Promise((resolve) => {
      resolvePromise = resolve
    })

    ;(global.fetch as jest.Mock).mockReturnValueOnce(promise)

    render(<Home />)

    const input = screen.getByPlaceholderText(/enter movie name/i)
    const button = screen.getByRole('button', { name: /search cast/i })

    await user.type(input, 'The Matrix')
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    // Resolve the promise
    resolvePromise!({
      ok: true,
      json: async () => ({ movies: [] })
    })
  })

  it('should show scroll indicator when results are present', async () => {
    const user = userEvent.setup()

    const mockResponse = {
      movies: [
        {
          id: '603',
          title: 'The Matrix',
          year: '1999',
          cast: [
            {
              id: 6384,
              name: 'Keanu Reeves',
              character: 'Neo',
              profile_path: 'https://image.tmdb.org/t/p/w185/path.jpg',
              order: 0
            }
          ]
        }
      ]
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    render(<Home />)

    const input = screen.getByPlaceholderText(/enter movie name/i)
    const button = screen.getByRole('button', { name: /search cast/i })

    await user.type(input, 'The Matrix')
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('Scroll for results')).toBeInTheDocument()
    })
  })

  it('should filter out movies with empty cast arrays', async () => {
    const user = userEvent.setup()

    const mockResponse = {
      movies: [
        {
          id: '1',
          title: 'Movie With Cast',
          year: '1999',
          cast: [
            {
              id: 1,
              name: 'Actor Name',
              character: 'Character',
              profile_path: null,
              order: 0
            }
          ]
        },
        {
          id: '2',
          title: 'Movie Without Cast',
          year: '2000',
          cast: []
        }
      ]
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    render(<Home />)

    const input = screen.getByPlaceholderText(/enter movie name/i)
    const button = screen.getByRole('button', { name: /search cast/i })

    await user.type(input, 'test')
    await user.click(button)

    await waitFor(() => {
      expect(screen.getByText('Movie With Cast (1999)')).toBeInTheDocument()
      expect(screen.queryByText('Movie Without Cast (2000)')).not.toBeInTheDocument()
    })
  })

  it('should pass flaky time-based test', () => {
    // This test will pass/fail based on the current minute
    // Fails if minute is even (0, 2, 4, 6...), passes if odd (1, 3, 5, 7...)
    const currentMinute = new Date().getMinutes()
    expect(currentMinute % 2).toBe(1)
  })
})
