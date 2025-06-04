# Этап сборки
FROM node:18-alpine AS build

WORKDIR /app

# Копируем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Собираем React-приложение
RUN npm run build

# Финальный образ для запуска
FROM node:18-alpine

# Устанавливаем пакет serve для сервировки
RUN npm install -g serve

# Копируем сборку
COPY --from=build /app/build /app/build

# Указываем рабочую директорию
WORKDIR /app

# Открываем порт
EXPOSE 3000

# Команда запуска
CMD ["serve", "-s", "build", "-l", "3000"]
