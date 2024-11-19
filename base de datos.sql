create database TareasUsuarios
go

use TareasUsuarios
go 

create table Usuarios(
	Id int identity(1,1) primary key,
	Nombre varchar(50) not null,
	Correo varchar(100) not null,
	[Password] varchar(255) not null
)

create table Tareas(
	Id int identity(1,1) primary key,
	Titulo varchar(100) not null,
	Descripcion varchar(300) not null,
	UsuarioId int not null,
	estado varchar(30),
	foreign key (UsuarioId) references Usuarios(Id) on delete cascade
)