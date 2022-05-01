1- In .env file put your db name, db password and db username : 

`DATABASE_URL="mysql://dbUserName@127.0.0.1:3309/dbName?serverVersion=5.7"
`

2- Install packages with composer :  

`composer install`

3- Install npm packages :

`npm i`

4- Install yarn packages :

`yarn install`

5- Create the database :

`php bin/console doctrine:database:create`

6- Make the migrations :

`php bin/console make:migration`

7- Migrate the migrations :

`php bin/console doctrine:migrations:migrate`

8- Load fixtures :

`php bin/console doctrine:fixtures:load`

9- Set jwt :

`mkdir -p config/jwt`

`openssl genrsa -out config/jwt/private.pem -aes256 4096`

(you can use the generated passphrase in your .env )

Exemple: `JWT_PASSPHRASE=*********************`


`openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem`
 
Use the same passphrase

10- in a terminal launch  

`symfony server:start`

11- in  other terminal launch  

`npm run dev-server`

12 Go to https://localhost:8000/

13 register and login for full Access

14 Take a coffee and enjoy ☕☕☕ 😉




