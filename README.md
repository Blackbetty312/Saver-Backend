# Saver
## Aplikacja serwerowa

Saver jest aplikacją przeznaczoną dla szerokiego grona osób chcących zapisywać, zarządzać i planować swoje wpływy i wydatki. Jest to serwer aplikacji saver.

## Wymagania

### 1. Node.js

Do działania aplikacji wymagane jest środowisko Node.js.
Instalator dostępny jest na oficjalnej stronie Node.js - [nodejs.org](https://nodejs.org). 

## Instalacja

```bash
$ npm install
```

## Uruchamianie aplikacji

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testy

```bash
# unit testy
$ npm run test

# e2e testy
$ npm run test:e2e

# testy coverage
$ npm run test:cov
```

## Konfiguracja
Do poprawnego działania aplikacji wymagane jest połączenie z bazą danych, która będzie obsługiwać naszą aplikację

Aby ustawić poprawne dane do logowania do bazy danych w pliku [ormconfig.json](ormconfig.json) zmień wartości odpowiadające twojej bazie danych.