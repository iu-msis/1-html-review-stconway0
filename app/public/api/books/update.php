<?php

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");

    exit;
}

require("class/DbConnection.php");
$db = DbConnection::getConnection();

// Creaing and running the query
$stmt = $db->prepare(
    'UPDATE books SET 
      title = ?,
      author = ?,
      year_published = ?,
      publisher = ?,
      page_count = ?,
      msrp = ?,
    WHERE id = ?'
  );

$stmt->execute([
  $_POST['title'],
  $_POST['author'],
  $_POST['year_published'],
  $_POST['publisher'],
  $_POST['page_count'],
  $_POST['msrp'],
  $_POST['id']
]);

// Output
header('HTTP/1.1 303 See Other');
header('Location: ../books/');