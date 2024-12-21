$(document).ready(function(){
    $('.jakGracLink').on('click', function(event) {
        event.preventDefault(); // Zapobiega domyślnemu działaniu linku
        $('.jakGrac').html('gra się prosto').css('display', 'block');
    });
    // Losowanie samochodu i wyświetlanie info o nim
    $("#losuj").click(function(){
        $.ajax({
            url: "random.php", 
            method: "POST", 
            success: function(data){
                var losowySamochod = JSON.parse(data); // Przekształcenie odpowiedzi JSON w obiekt JS
                if(losowySamochod.error){
                    $("#wylosowany").html(losowySamochod.error).css("display", "block");
                } else {
                    
                    $("#wylosowany").data("car", JSON.stringify(losowySamochod)); // Przechowywanie w danych
                }
            }
        });
    });
    // Pojawianie się sugestii podczas wpisywania w pole wyszukiwania
    $("#pole_szukania").keyup(function(){
        var przechowywana = $(this).val();
        if(przechowywana != ""){
            $.ajax({
                url: "search.php",
                method: "POST",
                data: {input: przechowywana},
                success: function(data){
                    console.log("Sugestie:", data);  // Dodane logowanie odpowiedzi z serwera
                    $("#sugestie").html(data).css("display", "block");
                }
            });
        } else {
            $("#sugestie").html("").css("display", "none");
        }
    });
    // Dodanie wybranej sugestii do inputa po kliknięciu
    $(document).on('click', '.suggestion', function () {
        var fullSuggestion = $(this).data('suggestion'); 
        var suggestionParts = fullSuggestion.split(' '); 
        var model = suggestionParts.slice(1).join(' '); 
        console.log("Wybrany model:", model);  // Dodane logowanie modelu
        $("#pole_szukania").val(model); 
        var wybrany = model; 
        $("#sugestie").html("").css("display", "none"); 
        // Wyświetlanie tabelki po wybraniu modelu
        $.ajax({
            url: "selected.php",
            method: "POST",
            data: { model: wybrany },
            success: function(response) {
                console.log("Odpowiedź z selected.php:", response);  // Dodane logowanie odpowiedzi z serwera
                // Sprawdzanie czy odpowiedź jest poprawna przed parsowaniem
                var wybranySamochod = JSON.parse(response);  // Parsowanie odpowiedzi JSON
                var wylosowanySamochod = JSON.parse($("#wylosowany").data("car")); // Pobranie danych wylosowanego samochodu
                var historiaWyszukiwania = [];
                if(wybranySamochod.error){
                    $("#tabelka").html(wybranySamochod.error).css("display", "block");
                } else {

                    


                    //model
                    if(wylosowanySamochod.model == wybranySamochod.model){
                        $(".win").html(`Brawo! Wygrałeś. Wylosowanym samochodem był ${wylosowanySamochod.marka} ${wylosowanySamochod.model}`).css("display", "block");
                    } else {
                        // Budowanie tabeli dynamicznie
                        var tabela = `
                        <table>
                            <tr>
                                <th>Parametr</th>
                                <th>Wybrany Samochód</th>
                            </tr>
                            <tr>
                                <td>Marka</td>
                                <td><div class="marka">${wybranySamochod.marka}</div></td>
                            </tr>
                            <tr>
                                <td>Model</td>
                                <td><div class="model">${wybranySamochod.model}</div></td>
                            </tr>
                            <tr>
                                <td>Rocznik</td>
                                <td><div class="rocznik">${wybranySamochod.roczniki}</div></td>
                            </tr>
                            <tr>
                                <td>Nadwozia</td>
                                <td><div class="nadwozie">${wybranySamochod.nadwozia}</div></td>
                            </tr>
                            <tr>
                                <td>Skrzynie</td>
                                <td><div class="skrzynia">${wybranySamochod.skrzynie}</div></td>
                            </tr>
                            <tr>
                                <td>Kraj</td>
                                <td><div class="kraj">${wybranySamochod.kraj}</div></td>
                            </tr>
                        </table>`;
                        // Wstawienie tabeli do div'a
                        $("#tabelka").html(tabela).css("display", "block");
                        



                        function ZapiszDoHistorii(){
                            var obecnaTabela = tabela;
                            historiaWyszukiwania.push(obecnaTabela)
                            $("#historia").prepend(historiaWyszukiwania)
                        }
                        ZapiszDoHistorii()
                        
                        
                        
                        //marka
                        if(wylosowanySamochod.marka === wybranySamochod.marka){
                            $(".marka").css("background-color", "greenyellow");
                        } else {
                            $(".marka").css("background-color", "red");

                        }
                        //roczniki
                        var [rokPoczatkowyWylosowany, rokKoncowyWylosowany] =wylosowanySamochod.roczniki.split(" - ");
                        var [rokPoczatkowyWybrany, rokKoncowyWybrany] =wybranySamochod.roczniki.split(" - ");
                        if(rokPoczatkowyWylosowany == rokPoczatkowyWybrany && rokKoncowyWylosowany == rokKoncowyWybrany){
                            $(".rocznik").css("background-color", "greenyellow");
                        } else if(rokPoczatkowyWylosowany == rokPoczatkowyWybrany || rokKoncowyWylosowany == rokKoncowyWybrany){
                            $(".rocznik").css("background-color", "yellow");
                        } else if(rokPoczatkowyWylosowany != rokPoczatkowyWybrany && rokKoncowyWylosowany != rokKoncowyWybrany){
                            $(".rocznik").css("background-color", "red");
                        }
                        
                        //nadwozia
                        function podzielNadwozia(nadwozia) {
                            let pierwsze, drugie;
                            if (nadwozia.includes(", ")) {
                                const podzielone = nadwozia.split(", ");
                                pierwsze = podzielone[0];
                                drugie = podzielone[1];
                            } else {
                                pierwsze = nadwozia;
                                drugie = null;
                            }
                            return { pierwsze, drugie };
                        }
                        const { pierwsze: pierwszeNadwozieWylosowane, drugie: drugieNadwozieWylosowane } = podzielNadwozia(wylosowanySamochod.nadwozia);
                        const { pierwsze: pierwszeNadwozieWybrane, drugie: drugieNadwozieWybrane } = podzielNadwozia(wybranySamochod.nadwozia);
                        if (
                            (pierwszeNadwozieWylosowane === pierwszeNadwozieWybrane && drugieNadwozieWylosowane === drugieNadwozieWybrane) ||
                            (drugieNadwozieWylosowane === null && drugieNadwozieWybrane === null && pierwszeNadwozieWylosowane === pierwszeNadwozieWybrane)
                        ) {
                            $(".nadwozie").css("background-color", "greenyellow");
                        } else if (
                            pierwszeNadwozieWylosowane === pierwszeNadwozieWybrane ||
                            pierwszeNadwozieWylosowane === drugieNadwozieWybrane ||
                            drugieNadwozieWylosowane === pierwszeNadwozieWybrane
                        ) {
                            $(".nadwozie").css("background-color", "yellow");
                        } else {
                            $(".nadwozie").css("background-color", "red");
                        }
                        
                        //skrzynie
                        function podzielSkrzynie(skrzynie) {
                            let pierwsza, druga;
                            if (skrzynie.includes(", ")) {
                                const podzielone = skrzynie.split(", ");
                                pierwsza = podzielone[0];
                                druga = podzielone[1];
                            } else {
                                pierwsza = skrzynie;
                                druga = null;
                            }
                            return { pierwsza, druga };
                        }
                        const { pierwsza: pierwszaSkrzyniaWylosowana, druga: drugaSkrzyniaWylosowana } = podzielSkrzynie(wylosowanySamochod.skrzynie);
                        const { pierwsza: pierwszaSkrzyniaWybrana, druga: drugaSkrzyniaWybrana } = podzielSkrzynie(wybranySamochod.skrzynie);
                        
                        if (
                            pierwszaSkrzyniaWylosowana === pierwszaSkrzyniaWybrana &&
                            drugaSkrzyniaWylosowana === drugaSkrzyniaWybrana
                        ) {
                            $(".skrzynia").css("background-color", "greenyellow");
                        } else if (
                            pierwszaSkrzyniaWylosowana === pierwszaSkrzyniaWybrana ||
                            pierwszaSkrzyniaWylosowana === drugaSkrzyniaWybrana ||
                            drugaSkrzyniaWylosowana === pierwszaSkrzyniaWybrana
                        ) {
                            $(".skrzynia").css("background-color", "yellow");
                        } else {
                            $(".skrzynia").css("background-color", "red");
                        }
                        //kraj
                        if(wylosowanySamochod.kraj == wybranySamochod.kraj){
                            $(".kraj").css("background-color", "greenyellow");
                        } else {
                            $(".kraj").css("background-color", "red");
                        }
                    }
                }
            }
        });
    });
});