select * from users2 join posts 
on users2.id = posts.author_id 
where username = $1;