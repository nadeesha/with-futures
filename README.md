# with-futures

This is an accompanying exercise to [From Promises to Futures in Javascript](https://medium.com/@nadeesha/from-promises-to-futures-in-javascript-bb46f3ed5d89). As a CLI application running on Node.js, this will attempt to parse large amounts of data by constructing a stateless pipeline - with Futures.

- Written with Typescript and runs on Node.js
- [DEMO](https://asciinema.org/a/53d2So02TimLw4lxhFErnRnas)
- Tested on node v8.11.1

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
_id:             436bf9b0...
...
✔ Search completed with 42 results
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
1. Typescript is used as a type system and for general goodnes™.

## Limitations

1. Result parsing (pretty print and searching within the js object) is currently blocking. A collection of large JSON objects (~ several hundered complex fields per object) will slow down the search.
1. Data directory (`data`) is not configurable. This is a low-hanging point of improvement.
1. Currently, searchable fields are only the top level fields. This can be extended to include sub fields.
