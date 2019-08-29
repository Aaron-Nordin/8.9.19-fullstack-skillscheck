SELECT * FROM posts
WHERE (author_id != $1 AND
title LIKE $2)