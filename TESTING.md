# Testing Documentation

This project uses Jest and React Testing Library for testing.

## Test Structure

```
src/
├── app/
│   ├── __tests__/
│   │   └── page.test.tsx           # Main page component tests
│   ├── api/
│   │   └── movie/
│   │       └── __tests__/
│   │           └── route.test.ts   # API route handler tests
│   └── components/
│       └── __tests__/
│           └── GhTable.test.tsx    # GhTable component tests
├── test-utils.tsx                   # Custom render with providers
jest.config.js                       # Jest configuration
jest.setup.js                        # Test setup file
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Test Coverage

The test suite covers:

### API Route (`/api/movie/route.ts`)
- ✅ Returns 400 error when movieName is missing
- ✅ Fetches and returns movie cast data for valid movies
- ✅ Returns empty array when no movies found
- ✅ Handles TMDb search API failures
- ✅ Handles TMDb credits API failures
- ✅ Handles unexpected errors
- ✅ Limits cast members to 15
- ✅ Handles cast members without profile photos

### GhTable Component
- ✅ Renders movie titles and cast members
- ✅ Shows/hides filter dropdown based on number of movies
- ✅ Filters movies when selecting from dropdown
- ✅ Displays profile images when available
- ✅ Shows "No Photo" placeholder when image unavailable
- ✅ Handles empty movie list
- ✅ Resets filter when movieName changes
- ✅ Has proper accessibility labels

### Main Page Component
- ✅ Renders hero section with search form
- ✅ Submits search and displays results
- ✅ Shows loading state while fetching
- ✅ Displays error message when fetch fails
- ✅ Prevents fetching with empty input
- ✅ Shows scroll indicator appropriately
- ✅ Filters out movies with empty cast arrays

## Test Utilities

### Custom Render
Located in `src/test-utils.tsx`, this provides a custom render function that wraps components with necessary providers (QueryClientProvider).

Usage:
```typescript
import { render, screen } from '@/test-utils'

render(<YourComponent />)
```

### Mock Data
Each test file includes mock data specific to that component:
- API route tests mock fetch responses
- Component tests use predefined movie/cast data
- User interactions are simulated with `@testing-library/user-event`

## Writing New Tests

### Component Tests
```typescript
import { render, screen } from '@/test-utils'
import userEvent from '@testing-library/user-event'

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('should handle user interactions', async () => {
    const user = userEvent.setup()
    render(<YourComponent />)

    await user.click(screen.getByRole('button'))
    expect(/* assertion */).toBeTruthy()
  })
})
```

### API Route Tests
```typescript
import { GET } from '../route'

describe('API Route', () => {
  it('should handle requests', async () => {
    const request = new Request('http://localhost:3000/api/endpoint')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toMatchObject({ /* expected shape */ })
  })
})
```

## Best Practices

1. **Arrange, Act, Assert**: Structure tests with clear setup, action, and verification
2. **User-centric queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Async operations**: Always use `waitFor` for async state changes
4. **Mock external dependencies**: Mock fetch, APIs, and third-party libraries
5. **Test behavior, not implementation**: Focus on what users see and do
6. **Descriptive test names**: Use "should" statements that describe expected behavior

## Troubleshooting

### Tests fail with "Cannot find module"
Run: `npm install`

### Tests timeout
Increase timeout in jest.config.js or use `jest.setTimeout()` in individual tests

### React Query tests fail
Make sure you're using the custom render from `test-utils.tsx` that provides QueryClientProvider

### TypeScript errors
Ensure jest.config.js has proper module resolution and path mappings

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [User Event API](https://testing-library.com/docs/user-event/intro)
