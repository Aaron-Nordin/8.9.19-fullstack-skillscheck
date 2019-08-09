create table users2 (id serial primary key, username varchar(20), 
password varchar(20), profile_pic text);

create table posts (id serial primary key, title varchar(45), 
img text, content text, author_id integer references users2(id));

insert into users2 (username, password, profile_pic) 
values('Aaron', 'aaron', 'a'),
('Doge', 'doge', 'd'), ('Feral', 'feral', 'f');

insert into posts (title, img, content, author_id)
values ('bleh', 'nah', 'blehblehbleh', 1),
('nupe', 'eh', 'nupenupenupe', 3),
('amigoodboy?', 'panic', 'goodboygoodboygoodboy', 2);