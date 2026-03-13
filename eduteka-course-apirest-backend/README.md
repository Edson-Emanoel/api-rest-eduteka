composer global require laravel/installer

laravel new eduteka-course-apirest-backend

php artisan migrate:reset

php artisan migrate

php artisan serve

php artisan db:seed

php artisan install:api

## Novo modulo

php artisan make:controller --api

php artisan route:list --path=api

php artisan make:request StoreUserRequest

php artisan make:request UpdateUserRequest
