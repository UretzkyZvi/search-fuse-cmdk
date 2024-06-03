# search-fuse-cmdk

`search-fuse-cmdk` is a search component inspired by the [shadcn](https://ui.shadcn.com/docs) UI components, utilizing `fuse.js` for fuzzy search and `react-highlight-words` for highlighting search terms in results. This project aims to provide an efficient and customizable search experience for React applications.

## Installation

To install the necessary dependencies, run:

```bash
npm install fuse.js react-highlight-words
```

Next, copy the following files into your project:

- `search.tsx` into your `src/components/ui` directory
- `useSearch.ts` into your `src/hooks` directory
- `fuseOptions.ts` into your `src/lib` directory

Here is an example file structure for reference:

```
your-project
├── src
│   ├── components
│   │   └── ui
│   │       └── search.tsx
│   ├── hooks
│   │   └── useSearch.ts
│   ├── lib
│   │   └── fuseOptions.ts
│   ├── ...
```

## Usage

Import the `Search` component and use it in your application:

```tsx
import Search from './src/components/ui/search';

const App = () => {
  return (
    <div>
      <Search />
    </div>
  );
};

export default App;
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory and configure the necessary environment variables. Refer to the `.env.example` for an example configuration.

### Fuse.js Options

Customize the Fuse.js search options in `src/lib/fuseOptions.ts`. Here is a basic example configuration:

```typescript
const fuseOptions = {
  keys: ['title', 'author'], // Fields to index and search
  threshold: 0.3, // Adjust this value to control the fuzziness of the search
  includeScore: true, // Include the score of the results in the output
};

export default fuseOptions;
```

For more options and detailed configuration, refer to the [Fuse.js documentation](https://fusejs.io/).

### Indexing Explanation

Fuse.js creates an index of the data you provide based on the fields specified in the `keys` array. This index is used to perform quick and efficient searches. The `threshold` option controls how fuzzy the search should be; a lower value means stricter matching, while a higher value allows more lenient matches.

## Components

### `search.tsx`

This is the main search component that integrates `fuse.js` and `react-highlight-words`.

## Hooks

### `useSearch.ts`

A custom hook to manage search logic and state.

```typescript
import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import fuseOptions from '../lib/fuseOptions';

const useSearch = (data) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fuse = new Fuse(data, fuseOptions);
    const result = fuse.search(query);
    setResults(result);
  }, [data, query]);

  return { results, query, setQuery };
};

export default useSearch;
```

## Utilities

### `fuseOptions.ts`

Configuration file for `fuse.js` options.

```typescript
const fuseOptions = {
  keys: ['title', 'author'],
  threshold: 0.3,
  includeScore: true,
};

export default fuseOptions;
```


## License

This project is licensed under the MIT License.
