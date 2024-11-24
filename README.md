### How to Run Test

#### Back-end
```sh
cd backend
composer install
cp .env.example .env
php artisan migrate
php artisan db:seed
php artisan serve
```

| User Type     | Email                         | Password |
|---------------|-------------------------------|----------|
| Normal User   | normal-user@example.com       | password |
| Admin User    | admin-user@example.com        | password |


#### Front-end
```sh
cd frontend
npm install
cp .env.example .env
npm run dev
```