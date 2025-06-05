# Используем официальный образ Node для сборки
FROM node:18-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем React-приложение для production
RUN npm run build

# Используем легкий образ nginx для сервировки статических файлов
FROM nginx:alpine

# Копируем собранное React-приложение в директорию nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурационный файл nginx (если нужен, например, для настроек)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
