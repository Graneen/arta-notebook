# Тестовое задание “Записная книжка”

Тестовое приложение выполняет роль простой записной книжки с короткими заметками (от 1 до 200 символов).
Использованный стек: TypeScript, React Next.js, Redux Toolkit, стилизация module SCSS, бэкенд Node.js, сервер Express.js, ORM Sequelize, БД MySql.

##  Client
Для установки зависимостей приложения ввести следующую команду в терминале папки client:

```
npm install --force

```

##  Серверная часть и база данных

Прежде всего создайте .env файл по примеру .env.example, заполните его осмысленной информацией, убедитесь, что у вас установлено ПО для работы СУБД MySQL. 
Для установки зависимостей и инициалзации БД, ее наполнения миграциями при помощи Prisma, ввести следующие команды в терминале папки client:

```
mysql -u root -p
CREATE DATABASE notebook_db;
exit;
npx prisma migrate dev --name add_posts_table

```
Для запуска приложения введите следующую команду в терминале:

```
npm run dev

```
Все заметки хранятся на сервере.

1. При создании заметки она помещается в список, поле ввода очищается.
2. При нажатии на заметку из списка, её содержимое появляеится в поле ввода и так же
появляется кнопка удаления заметки.
3. Снизу списка заметок сделана пагинация по 5 заметок на страницу.


