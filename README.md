# Pokédex

This repository is a template for a Pokédex application. It contains a server-side
REST API built using [NestJS](https://nestjs.com) and a client-side single-page
application built in [Angular](https://angular.dev).

## Prerequisites

- [Node.js v20](https://nodejs.org/en)

## Setup

1. Clone the repository.
2. Install dependencies:
   ```shell
   cd api/
   npm install
   cd ../app/
   npm install
   ```

## Testing

Unfortunately, I've only written tests for the backend:

```shell
cd api
npm run test:cov
```

## Run

Start both app and api at the same time:

```bash
npm run start
```

# Thoughts

## Backend

### Pokedex REST API does not have filter by name

The first thing I noticed is that given API does not have a `filter` parameter, it's a requested feature as we can see on [#474](https://github.com/PokeAPI/pokeapi/issues/474).
Beta GraphQL endpoints have this capability, but the challenge docs points the REST API and mentions creativity, so I didn't take this path.

We have to be careful with the following items:

- Make few calls to Pokedex API
- Not block the Event Loop
- Not serve stale data

I considered three alternatives to allow filtering:

1. Call the API every search and filter received array - not good considering API usage and performance
2. Cache API response for some time and filter cached value - solves API usage but still might have performance problems filtering 1k items every time
3. Store in a Database and execute query over it - solves performance problem because we are leaving the processing to the database and allow us to perform other type of queries if we want. Stale data can be a problem, but Pokemon does not change often, so we can use a NestJS built-in cron to refresh our data every day for example.

I choose to store in Database

### Pokedex API only list name

It's interesting to have Pokemon name, image and type on listing but the API just returns name.
We don't want to hit on details endpoint for every pokemon we are listing, so the ideal would be retuning all those properties on our listing one.

I noticed that images follow the same pattern just changing its id, so I was able to solve this problem.

For types, we might have to follow the same idea of storing data in our Database but it requires data from details endpoint, which would make us call 1k times PokedexAPI every resync. One alternative to minimize the impact would be rarely resync and sparse requests.

## Frontend

Angular differs a lot from React by using two-way-binding and RxJS with Observables, one particular thing that I had difficult was splitting code from `Component` to `Service` while using `RxJS`, I've rewritten the Pokemon listing many times in order to support debounce, deduplication, request state and appending data.

Some subjects that I need to understand more about and how it applies on real code:

- `RxJS` capabilities
- `AsyncPipes`
- `BehaviorSubject` and `Subject`
- How to split code from `Component` and `Service`
- `Signals`
