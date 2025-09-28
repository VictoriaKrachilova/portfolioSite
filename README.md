# Portfolio Backend (NestJS + Sequelize)

## Setup

1. Install dependencies:  
```bash
npm install
````

2. Create `.development.env` with DB settings:

```env
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=portfolio
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
PRIVATE_KEY=secret_key_safasf
BASE_DIR=/mnt/c/cachePhoto
```

---

## Sequelize Commands

Run all migrations:

```bash
npx sequelize-cli db:migrate --config sequelize-cli.config.cjs
```

Undo last migration:

```bash
npx sequelize-cli db:migrate:undo --config sequelize-cli.config.cjs
```

Undo all migrations:

```bash
npx sequelize-cli db:migrate:undo:all --config sequelize-cli.config.cjs
```

Check migration status:

```bash
npx sequelize-cli db:migrate:status --config sequelize-cli.config.cjs
```

Generate new migration:

```bash
npx sequelize-cli migration:generate --name <migration-name> --config sequelize-cli.config.cjs
```

---

## Run Project

```bash
npm run start
```

---

## Dev Tip

Reset DB quickly:

```bash
npx sequelize-cli db:migrate:undo:all --config sequelize-cli.config.cjs
npx sequelize-cli db:migrate --config sequelize-cli.config.cjs
```

---

## 📖 API Documentation

This project uses [Swagger](https://swagger.io/) for REST API documentation.  
After starting the application, you can access the docs at:

👉 [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

There you can explore available endpoints, their parameters, and example requests/responses.
