<?php
    include("database.php");
    
    $query2 = "SELECT MIN(samochody.id) AS id,
    marki.marka, samochody.model, GROUP_CONCAT(DISTINCT nadwozia.nadwozie) AS nadwozia, 
    GROUP_CONCAT(DISTINCT skrzynie.skrzynia) AS skrzynie,
    CONCAT(MIN(samochody.rocznik), ' - ', MAX(samochody.rocznik)) AS roczniki,
    kraje.kraj
    FROM samochody 
    JOIN marki ON samochody.marka_id = marki.id
    JOIN nadwozia ON samochody.nadwozie_id = nadwozia.id
    JOIN skrzynie ON samochody.skrzynia_id = skrzynie.id
    JOIN kraje ON samochody.kraj_id = kraje.id
    GROUP BY marki.marka, samochody.model
    ORDER BY samochody.id
    LIMIT 10";

    $result2 = mysqli_query($connection, $query2); 

    if (mysqli_num_rows($result2) > 0) { 
        echo '<table><tbody>';
        while ($row = mysqli_fetch_assoc($result2)) {
            echo '<tr>
                    <td>' . $row['id'] . '</td>
                    <td>' . $row['marka'] . '</td>
                    <td>' . $row['model'] . '</td>
                    <td>' . $row['nadwozia'] . '</td>
                    <td>' . $row['skrzynie'] . '</td>
                    <td>' . $row['roczniki'] . '</td>
                </tr>';
        }
        echo '</tbody></table>';
    } else {
        echo "<p>Brak wyników dla podanego zapytania.</p>";
    }
?>