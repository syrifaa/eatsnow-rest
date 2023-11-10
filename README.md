## How to Run

### Local
1. Install dependencies
```bash
npm install
```
2. Migrate Prisma
```bash
npm run prisma:migrate
```
3. Seed Prisma
```bash
npm run prisma:seed
```
4. Set up [environment variables](#environment-variables)
5. Run the server
```bash
npm run dev
```

### Docker
1. Set up [environment variables](#environment-variables)
2. Run Docker Compose
```bash
docker-compose up -d --build
```

## Environment Variables
1. Create a `.env` file in the root directory (see [.env.example](./.env.example) for an example)
2. Add the following variables to the file (see table below for default values)

| Variable | Description | Local | Docker |
| --- | --- | --- | --- |
| `DB_HOST` | Database host | `localhost` | `db` |
| `DB_USER` | Database user | `root` | `user` |
| `DB_PASSWORD` | Database password | your password | `letmein` |
| `DB_NAME` | Database name | `eatsnow-rest-service` | `eatsnow-rest-service` |
| `DB_PORT` | Port to run the database server | `3306` | `3306` |
| `DB_URL` | Database URL | `"mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"` | `"mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"` |
| `PORT` | Port to run the server on | `8000` | `8000` |