insert into users2 (username, password)
values (${username}, ${password});
select * from users2 where username = ${username}