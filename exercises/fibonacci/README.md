# Fibonacci-tal

En applikation som tar ett tal som input, och skriver ut det första [fibonacci-talet](http://en.wikipedia.org/wiki/Fibonacci_number) som är större än detta.

- **Svårighetsgrad:** 1

## Delmoment

1. Börja med en loop som hela tiden, med hjälp av några variabler, räknar ut nästa fibonacci-tal och skriver ut det. Loopen behöver bara gå tillräckligt många varv för att du ska kunna se om den skriver ut rätt talföljd. **Svårighetsgrad:** 1
2. Gör så att loopen, istället för att snurra ett visst antal varv, sluter när den har räknat ut ett fibonacci-tal som överstiger något tal (spelar inte så stor roll vilket tal just nu). **Svårighetsgrad:** 1
3. Låt nu användaren att under körning mata in ett tal och byt ut talet i förra delmomentet mot detta istället. **Svårighetsgrad:** 1
4. Ta bort utskriften av alla fibonacci-tal i loopen och skriv endast ut resultatet när det slutgiltiga talet är framtaget. **Svårighetsgrad:** 1
5. Skapa en funktion som tar emot ett argument och flytta in hela loopen. Funktionen ska returnera det värde som förut skrevs ut. Exempelvis ska `fibonacci(10)` returnera 13. **Svårighetsgrad:** 1
6. Se till så att programmet anropar funktionen med talet du får som input som argument och skriver ut resultatet. **Svårighetsgrad:** 1

## Utbyggnad

- Låt användaren kunna ange input-talet som ett argument till programmet, exempelvis:  
`python fibonacci.py 35`
- Prova att generera talserien [rekursivt](http://www.sparknotes.com/cs/recursion/whatisrecursion/section1.rhtml) istället för iterativt. **Svårighetsgrad:** 2
- Få programmet att fråga och svara användaren om och om igen istället för bara en gång. Spara dessutom den uträknade talserien i en lista, så att om användaren frågar om ett tal mindre än det största talet i den sparade talserien behöver talserien inte räknas ut på nytt. Istället letar man igenom listan efter svaret. Frågar däremot användaren om ett tal som är större än eller lika med det största talet i den sparade talserien så fortsätter man att generera talserien från slutet av den sparade talserien istället för att börja om på nytt. **Svårighetsgrad:** 2