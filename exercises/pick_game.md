# Pick one pick two game

Implementera följande enkela spel mellan två spelare: det finns `N` pinnar och varje tur får man välja att plocka 1 eller 2 stycken. Spelaren som drar den sista pinnen vinner.

- Svårighetsgrad: 1

## Moment
0. Slumpa antalet pinnar mellan 15 och 25. **Svårighetsgrad 1**.
1. Skapa en loop som växlar tur så länge som det finns pinnar kvar. **Svårighetsgrad 1**.
2. I varje iteration: skriv ut antalet pinnar som finns kvar och låt spelaren välja att avlägsna 1 eller 2 pinnar. **Svårighetsgrad 1**.
3. Spelaren som tar den sista pinnen vinner. **Svårighetsgrad 1**.

## Utbyggnad
* Låt varje spelare välja varsitt namn innan matchen startar. **Svårighetsgrad 1**.
* Skriv ut grafisk representation av antalet pinnar istället för siffra: `"||||| ||||| ||"`. **Svårighetsgrad 1**.
* Låt spelaren välja att spela 1vs1 eller 1vsAI, där AI antingen är väldigt intelligent, helt slumpad eller något därimellan. **Svårighetsgrad 2**.

## Externa bibliotek
* (inga)