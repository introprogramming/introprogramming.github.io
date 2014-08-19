# Adventure game

Text-baserat äventyrsspel: Utforska en värld, plats för plats, och interagera med världen med hjälp av text-kommandon.


## Tips

Börja med en väldigt enkel värld, och se till att de grundläggande funktionerna är korrekta. Separera koden för att skapa världen ("model") från koden som hanterar dessa funktioner ("controller"). En lämplig uppdelning kan vara att ha en fil för datamodellen, en separat fil för datan som använder sig av denna modell (den konkreta "världen"), samt en fil som styr själva spelet.

Skapa gärna ett roligt äventyr, men ha i åtanke att det inte är på att utveckla spelets innehåll ni lär er, utan på dess olika funktioner.

- **Svårighetsgrad:** 2

## Delmoment

1. Skapa en klass för platser i världen. Fundera över vilka attribut som utmärker en plats. Skapa ett par olika platser som objekt (i separat fil, se ovan).
2. Skapa en funktion `move(direction)` som kan flytta spelaren mellan platser.
3. Skapa en funktion `look` som beskriver nuvarande eller angränsande platser.
4. Skapa en funktion som lyssnar på input från användaren, och agerar i enlighet med det kommando användaren angivit.
5. Sätt ihop byggstenarna till ett spel.

## Utbyggnad

- Introducera andra saker som är möjliga att göra än att bara titta och röra sig. **Svårighetsgrad 2**
- Gör så att platser kan förändras baserat på vad spelaren gör. **Svårighetsgrad 2**
- Introducera flyttbara saker ("items") till spelet, och ge spelaren möjlighet att bära med sig ("inventory") och använda dessa. **Svårighetsgrad 2**
- Färgkoda utskrifterna för att göra spelet snyggare. **Svårighetsgrad 2**
- Använd biblioteket pygame för att lägga till enkel grafik, med bilder som visas med all beskrivande text. **Svårighetsgrad 2**
