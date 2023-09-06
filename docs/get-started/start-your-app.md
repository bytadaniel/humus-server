# Запуск с настройкой окружения

## Установка зависимостей
```bash
npm install
```

## Определение переменных окружения
```bash
cp .env.example .env
```

## Запуск контейнера с СУБД
```bash
docker-compose up --build # если впервые
docker-compose up
```

## Настройка структуры таблиц
```bash
# для автоматической синхронизации
npm run start:dev

# ручной запуск миграций
npm run migration:generate ./src/migrations/{MIGRATION_NAME}
npm run migration:run
```

## Запуск приложения
```bash
npm run build
npm run start
```
