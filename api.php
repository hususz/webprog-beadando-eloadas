<?php
$host = 'localhost'; 
$dbname = 'gamfwebprog'; 
$user = 'gamfwebprog';
$pass = 'Asdasd123';

try {
    $dbh = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass, array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
} catch (PDOException $e) {
    die(json_encode(["error" => "Kapcsolódási hiba: " . $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

header('Content-Type: application/json; charset=utf-8');

switch ($method) {
    case 'GET': 
        $stmt = $dbh->query("SELECT * FROM pilotak");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST': 
        $nev = $input['nev'];
        $nemzetseg = $input['nemzetseg'];
        $stmt = $dbh->prepare("INSERT INTO pilotak (nev, nemzetseg) VALUES (?, ?)");
        $stmt->execute([$nev, $nemzetseg]);
        echo json_encode(["message" => "Sikeres hozzáadás"]);
        break;

    case 'PUT': 
        $id = $input['id'];
        $nev = $input['nev'];
        $stmt = $dbh->prepare("UPDATE pilotak SET nev = ? WHERE id = ?");
        $stmt->execute([$nev, $id]);
        echo json_encode(["message" => "Sikeres módosítás"]);
        break;

    case 'DELETE': 
        $id = $input['id'];
        $stmt = $dbh->prepare("DELETE FROM pilotak WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Sikeres törlés"]);
        break;
}
?>