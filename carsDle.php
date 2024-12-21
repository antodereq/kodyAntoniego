<?php
    include("database.php");
?>

<!DOCTYPE html>
<html lang="pl-PL">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <title>carsDle - zgadnij samochód</title>
</head>
<body>
    <div id="box">
        <header>cars<span style="color: red">Dle</span>.pl</header>
        <nav>
            <ul class="menu">
                <li><a href="#" class="jakGracLink">Jak grać?</a></li>
            </ul>
        </nav>
        <br>
        <input type="button" id="losuj" value="losuj samochód">
        <div id="wylosowany"></div>
        <input type="text" id="pole_szukania" placeholder="Wyszukaj samochód...">
        
        <div id="sugestie"></div>
        <div id="tabelka"></div>
        <div id="historia"></div>
        <div class="win"></div>
    </div>
</body>
</html>
