# Тестовое задание “Записная книжка”

Макет должен быть свёрстан без использования UI библиотек, для стилизации нужно использовать
SCSS.
В качестве фреймворка нужно использовать Next.js.
Так же нужно применить redux toolkit, typescript и использовать БД (MySql).
Результат выполнения выложить на GitHub.
Приложение должно выполнять роль простой записной книжки с короткими заметками (от 1 до 200
символов):
1. При создании заметки она должна помещаться в список, поле ввода очищается.
2. При нажатии на заметку из списка, её содержимое должно появляться в поле ввода и так же должна
появиться кнопка удаления заметки.
3. Снизу списка заметок должна быть пагинация по 5 заметок на страницу.
4. Список страниц должен рендериться на сервере, поле ввода и кнопки должны быть только
клиентскими.

##  Client
Для установки зависимостей и билда приложения ввести следующие команды в терминале:
```
npm install 
npm run dev
```
1. При создании заметки она помещается в список, поле ввода очищается.
2. При нажатии на заметку из списка, её содержимое появляеится в поле ввода и так же
появляется кнопка удаления заметки.
3. Снизу списка заметок сделана пагинация по 5 заметок на страницу.
4. При клике вне компонентов записной книжки (.window) содержимое поля ввода также очищается, предусмотрена защита от случайного удаления заметки (кнопка становится не активна).

##  Серверная часть и база данных

Прежде всего создайте .env файл по примеру .env.example, заполните его осмысленной информацией, убедитесь, что у вас установлено ПО для работы СУБД MySQL. 
Для установки зависимостей и инициалзации БД, ее наполнения миграциями и тестовыми данными, ввести следующие команды в терминале:

```
npm install 
npx sequelize db:create 
npx sequelize db:migrate:all
npx sequelize db:seed:all

```
Для запуска работы сервера (Express.js) введите следующую команду в терминале:

```
npm run dev

```


