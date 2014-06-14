# Personnummer kontroll

Skriv ett enkelt program som tar in ett personnummer som argument och kontrollerar att det är ett [korrekt](http://sv.wikipedia.org/wiki/Luhn-algoritmen) personnummer.

- Svårighetsgrad 1

## Moment
1. Skapa en funktion som tar emot en sträng och raderar alla mellanslag och bindestreck. Till exempel `"123 - 4 5"` -> `"12345"`. **Svårighetsgrad 1**.
2. Skapa en funktion som kontrollerar att födelsedatumet existerar. Till exempel så borde `31 feb` returnera falskt. **Svårighetsgrad 1**.
3. Skapa en funktion som räknar ut personnumrets [kontrollvärde](
http://sv.wikipedia.org/wiki/Luhn-algoritmen). **Svårighetsgrad 1**.

## Utbyggnad
* Läs in personnumret från kommando-raden, antingen under körning eller som ett start argument.

## Externa bibliotek
* (inga)