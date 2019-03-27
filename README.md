# search-json-stream

## Setup

1. Clone the repository
1. Install the dependencies with `yarn`
1. Build the source with Typescript compiler: `yarn build`

## Usage

Search works in two different modes.

### Interactive mode

Interactive mode will guide you with conducting a search step by step. It will only consider files in the repo's `data` directory.

To run:

```sh
yarn start -i
```

### Streaming mode

Streaming mode will consume a stream from standard input.

Example:

```sh
cat data/organizations.json | yarn start --streaming -f domain_names -t kage
```

### Searching with regular expressions

Regex is accepted as a search term in both streaming and interactive mode

Example:

```sh
→ yarn start -i
✔ Which of the following files do you want to search in? › tickets.json
✔ Which field do you want to search in? › status
✔ What's your search term? … (pending|hold) # <----------
> Searching tickets.json for status: (pending|hold)
---
_id:             436bf9b0
...
✔ Search completed with 82 results
```

## Tests

Tests are written with jest.

```sh
yarn test
```

## Architectural Notes

1. Using file streaming, I've tried to account for reading large JSON files that may exceed the device memory and returning results that exceed the device memory as well.
1. I've made extensive use of [Futures](https://github.com/fluture-js/Fluture) to conduct async tasks and control the execution flow.
1. State is managed via a single reducer.

## Limitations

1. Result parsing (pretty print and searching within the js object) is currently blocking. A large JSON object may slow down the search.
1. Data directory (`data`) is not configurable. This is a low-hanging point of improvement.
