<?php
    include("database.php");
    class Samochod {
        public function __construct(
            public $id,
            public $marka,
            public $model,
            public $nadwozia,
            public $skrzynie,
            public $roczniki,
            public $kraj
        ) {}
    }
    if(isset($_POST['input'])){
            $przechowywana = $_POST['input']; 
    
            $query = "SELECT MIN(samochody.id) AS id,
                    marki.marka, samochody.model, GROUP_CONCAT(DISTINCT nadwozia.nadwozie) AS nadwozia, 
                    GROUP_CONCAT(DISTINCT skrzynie.skrzynia) AS skrzynie,
                    CONCAT(MIN(samochody.rocznik), ' - ', MAX(samochody.rocznik)) AS roczniki,
                    kraje.kraj
                    FROM samochody 
                    JOIN marki ON samochody.marka_id = marki.id
                    JOIN nadwozia ON samochody.nadwozie_id = nadwozia.id
                    JOIN skrzynie ON samochody.skrzynia_id = skrzynie.id
                    JOIN kraje ON samochody.kraj_id = kraje.id
                    WHERE samochody.model LIKE '{$przechowywana}%'
                    GROUP BY marki.marka, samochody.model
                    LIMIT 10";
    
            $result = mysqli_query($connection, $query); 
    
            if(mysqli_num_rows($result) > 0) { 
?>              
                <table>
                    <tbody>
                        <?php 
                            $samochody = [];
                            while($row = mysqli_fetch_assoc($result)){
                                $id = $row['id']; 
                                $marka = $row['marka'];
                                $model = $row['model'];
                                $nadwozia = $row['nadwozia'];
                                $skrzynie = $row['skrzynie'];
                                $roczniki = $row['roczniki'];
                                $kraj = $row['kraj'];
    
                                $samochody[] = new Samochod(
                                        $row['id'],
                                    $row['marka'],
                                    $row['model'],
                                    $row['nadwozia'],
                                    $row['skrzynie'],
                                    $row['roczniki'],
                                    $row['kraj']
                                );
                        ?>
                        <tr class="suggestion" data-suggestion="<?php echo $marka . ' ' . $model; ?>">
                            <td><?php echo $marka; ?></td>
                            <td><?php echo $model; ?></td>
                            <td><?php echo $roczniki; ?></td>
                        </tr>

                        <?php } ?>
                    </tbody>
                </table>
            <?php
            } else {
                echo "<p>Brak wyników dla podanego zapytania.</p>";
            }
        }
                        ?>
    
    
        

