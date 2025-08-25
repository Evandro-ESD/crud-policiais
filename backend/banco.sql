create database crud_policiais;
use crud_policiais;

create table policiais(
	id int auto_increment primary key,
    rg_civil varchar(20) not null unique,
    rg_militar varchar(20) not null unique,
    cpf varchar(14) not null unique,
    data_nascimento date not null,
    matricula varchar(50) not null
);

