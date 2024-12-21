<?php   
    include("database.php");

    $minIdQuery = "SELECT MIN(id) AS min_id
                FROM (
                SELECT MIN(samochody.id) AS id
                FROM samochody
                JOIN marki ON samochody.marka_id = marki.id
                GROUP BY marki.marka, samochody.model
                ) AS unique_cars";
    $resultMinId = mysqli_query($connection, $minIdQuery);
    $rowMinId = mysqli_fetch_assoc($resultMinId);
    $minId = $rowMinId['min_id'];

    $maxIdQuery = "SELECT MAX(unique_cars.id) AS max_id
                FROM (
                SELECT MIN(samochody.id) AS id
                FROM samochody
                JOIN marki ON samochody.marka_id = marki.id
                JOIN nadwozia ON samochody.nadwozie_id = nadwozia.id
                JOIN skrzynie ON samochody.skrzynia_id = skrzynie.id
                JOIN kraje ON samochody.kraj_id = kraje.id
                GROUP BY marki.marka, samochody.model
                ORDER BY id
                LIMIT 10
                )    AS unique_cars";
    $resultMaxId = mysqli_query($connection, $maxIdQuery);
    $rowMaxId = mysqli_fetch_assoc($resultMaxId);
    $maxId = $rowMaxId['max_id'];

    
    $idQuery = "SELECT MIN(samochody.id) AS id
            FROM samochody
            JOIN marki ON samochody.marka_id = marki.id
            JOIN nadwozia ON samochody.nadwozie_id = nadwozia.id
            JOIN skrzynie ON samochody.skrzynia_id = skrzynie.id
            JOIN kraje ON samochody.kraj_id = kraje.id
            GROUP BY marki.marka, samochody.model
            ORDER BY id
            LIMIT 10";
    $resultId = mysqli_query($connection, $idQuery);    

    $availableIds = [];
    while ($rowId = mysqli_fetch_assoc($resultId)) {
        $availableIds[] = $rowId['id'];
    }

    $usedIds = [];

    if (!empty($availableIds)) {
        do {
            $losoweId = $availableIds[array_rand($availableIds)];
        } while (in_array($losoweId, $usedIds)); 

        $usedIds[] = $losoweId;

        $losowySamochodQuery = "SELECT marki.marka, samochody.model, GROUP_CONCAT(DISTINCT nadwozia.nadwozie) AS nadwozia,
                        GROUP_CONCAT(DISTINCT skrzynie.skrzynia) AS skrzynie,
                        CONCAT(MIN(samochody.rocznik), ' - ', MAX(samochody.rocznik)) AS roczniki,
                        kraje.kraj
                        FROM samochody
                        JOIN marki ON samochody.marka_id = marki.id
                        JOIN nadwozia ON samochody.nadwozie_id = nadwozia.id
                        JOIN skrzynie ON samochody.skrzynia_id = skrzynie.id
                        JOIN kraje ON samochody.kraj_id = kraje.id
                        WHERE samochody.id = '{$losoweId}'
                        GROUP BY marki.marka, samochody.model";

        $resultLosowySamochod = mysqli_query($connection, $losowySamochodQuery);
        $rowLosowySamochod = mysqli_fetch_assoc($resultLosowySamochod);

        // Przekazanie danych w formacie JSON
        echo json_encode($rowLosowySamochod);
    } else {
        echo json_encode(["error" => "random.php linia 75 coś się zjebało"]);
    }
?>
