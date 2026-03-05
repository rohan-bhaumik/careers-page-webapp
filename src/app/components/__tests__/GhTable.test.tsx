import { render, screen } from '@/test-utils'
import { GhTable, Movie } from '../GhTable'
import userEvent from '@testing-library/user-event'

const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'The Matrix',
    year: '1999',
    cast: [
      {
        id: 1,
        name: 'Keanu Reeves',
        character: 'Neo',
        profile_path: 'https://image.tmdb.org/t/p/w185/path1.jpg',
        order: 0
      },
      {
        id: 2,
        name: 'Laurence Fishburne',
        character: 'Morpheus',
        profile_path: null,
        order: 1
      }
    ]
  },
  {
    id: '2',
    title: 'Inception',
    year: '2010',
    cast: [
      {
        id: 3,
        name: 'Leonardo DiCaprio',
        character: 'Cobb',
        profile_path: 'https://image.tmdb.org/t/p/w185/path2.jpg',
        order: 0
      }
    ]
  }
]

describe('GhTable Component', () => {
  it('should render movie titles and cast members', () => {
    render(<GhTable movieName="The Matrix" movies={mockMovies} />)

    // Use getByRole to get the heading specifically, not the dropdown option
    expect(screen.getByRole('heading', { name: 'The Matrix (1999)' })).toBeInTheDocument()
    expect(screen.getByText('Keanu Reeves')).toBeInTheDocument()
    expect(screen.getByText('Neo')).toBeInTheDocument()
    expect(screen.getByText('Laurence Fishburne')).toBeInTheDocument()
    expect(screen.getByText('Morpheus')).toBeInTheDocument()
  })

  it('should show filter dropdown when multiple movies are provided', () => {
    render(<GhTable movieName="action" movies={mockMovies} />)

    expect(screen.getByLabelText('Filter by movie:')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'All Movies' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'The Matrix (1999)' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Inception (2010)' })).toBeInTheDocument()
  })

  it('should not show filter dropdown when only one movie is provided', () => {
    render(<GhTable movieName="The Matrix" movies={[mockMovies[0]]} />)

    expect(screen.queryByLabelText('Filter by movie:')).not.toBeInTheDocument()
  })

  it('should filter movies when selecting from dropdown', async () => {
    const user = userEvent.setup()
    render(<GhTable movieName="action" movies={mockMovies} />)

    // Initially, all cast members should be visible
    expect(screen.getByText('Keanu Reeves')).toBeInTheDocument()
    expect(screen.getByText('Leonardo DiCaprio')).toBeInTheDocument()

    // Filter to only show The Matrix
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, '1')

    // Only The Matrix cast should be visible
    expect(screen.getByText('Keanu Reeves')).toBeInTheDocument()
    expect(screen.queryByText('Leonardo DiCaprio')).not.toBeInTheDocument()
  })

  it('should display profile images when profile_path is provided', () => {
    render(<GhTable movieName="The Matrix" movies={[mockMovies[0]]} />)

    const img = screen.getByAltText('Keanu Reeves')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w185/path1.jpg')
  })

  it('should display "No Photo" placeholder when profile_path is null', () => {
    render(<GhTable movieName="The Matrix" movies={[mockMovies[0]]} />)

    expect(screen.getByText('No Photo')).toBeInTheDocument()
  })

  it('should render empty when no movies are provided', () => {
    const { container } = render(<GhTable movieName="test" movies={[]} />)

    expect(container.querySelector('[data-movie="section-wrapper"]')).not.toBeInTheDocument()
  })

  it('should reset filter to "all" when movieName changes', () => {
    const { rerender } = render(<GhTable movieName="action" movies={mockMovies} />)

    // Select a specific movie
    const select = screen.getByRole('combobox') as HTMLSelectElement
    userEvent.selectOptions(select, '1')

    // Re-render with new movieName
    rerender(<GhTable movieName="thriller" movies={mockMovies} />)

    // Filter should reset to "all"
    expect(select.value).toBe('all')
  })

  it('should have proper accessibility labels', () => {
    render(<GhTable movieName="The Matrix" movies={[mockMovies[0]]} />)

    expect(screen.getByLabelText('The Matrix cast members')).toBeInTheDocument()
  })

  it('should render all movies when "All Movies" filter is selected', async () => {
    const user = userEvent.setup()
    render(<GhTable movieName="action" movies={mockMovies} />)

    const select = screen.getByRole('combobox')

    // Select a specific movie first
    await user.selectOptions(select, '1')
    expect(screen.queryByText('Leonardo DiCaprio')).not.toBeInTheDocument()

    // Select "All Movies"
    await user.selectOptions(select, 'all')

    // All cast members should be visible again
    expect(screen.getByText('Keanu Reeves')).toBeInTheDocument()
    expect(screen.getByText('Leonardo DiCaprio')).toBeInTheDocument()
  })
})
