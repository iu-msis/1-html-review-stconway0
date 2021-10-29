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
    // print_r($_POST);
    // echo file_get_contents('php://input');
    exit;
}

require("public/class/DbConnection.php");

$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
  'UPDATE books SET
    title = ?,
    author = ?,
    yearPublished = ?,
    Publisher = ?,
    numberOfPages = ?,
    msrp = ?
  WHERE id = ?'
);

$stmt->execute([
  $_POST['title'],
  $_POST['author'],
  $_POST['yearPublished'],
  $_POST['publisher'],
  $_POST['numberOfPages'],
  $_POST['msrp'],
  $_POST['id']
]);

// Get auto-generated PK from DB
// https://www.php.net/manual/en/pdo.lastinsertid.php
// $pk = $db->lastInsertId();  

// Step 4: Output
// Here, instead of giving output, I'm redirecting to the SELECT API,
// just in case the data changed by entering it
header('HTTP/1.1 303 See Other');
header('Location: ../books/');