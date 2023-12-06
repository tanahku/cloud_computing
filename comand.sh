# Melihat menu dari sequelize
npx sequelize

npx sequelize migration:create --name=create-table-users

# Perintah untuk melakukan migration
npx sequelize db:migrate

# Jalankan script ini jika terjadi ERROR : Please install mysql2 package manually
npm i mysql2
# lalu jalan kan kembali, npx sequelize db:migrate

# Perintah untuk melakukan rollback migration
npx sequelize db:migrate:undo

npx sequelize migration:create --name=create-table-courses

# Jalankeun perintah ie za di terminal
npx sequelize db:migrate:undo

npx sequelize db:migrate

npx sequelize migration:create --name=create-table-challenges

# ie za keur table challenges
npx sequelize db:migrate:undo

npx sequelize db:migrate