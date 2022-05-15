Projeto Store Management

Banco utilizado: MySQL
Configuração inicial do BD.

```
create database if not exists voll_store;

use voll_store;

create table users
(
	id int not null auto_increment,
	name varchar(50) not null,
	email varchar(200) not null,
	password varchar(100) not null,
	coins int,
	admin tinyint(1) not null,
    primary key(id)
);

insert into users (name, email, password, admin)

values
	('admin', 'admin@admin.com',  'admin', TRUE);

create table products
(
	id int not null auto_increment,
    name varchar(100) not null,
    price float not null,
    stock integer not null,
    image varchar(255),
    primary key(id)
);

insert into products (name, price, stock)

values
	('produto1', 50.0, 50);
```
