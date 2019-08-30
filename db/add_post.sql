insert into posts(author_id, title, img, content)
values ( ${author_id}, ${title}, ${img}, ${content})
returning *;