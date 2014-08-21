# Fibonacci-tal

En applikation som tar ett tal som input, och skriver ut det första [fibonacci-talet](http://en.wikipedia.org/wiki/Fibonacci_number) som är större än detta.

- **Svårighetsgrad:** 1

## Delmoment

1. Låt programmet ta emot input och skriv ut detta. **Svårighetsgrad:** 1
2. Skriv en metod som räknar ut och returnerar det första fibonacci-tal som är större än input-talet. Se till att ändra så att resultatet från metoden är det som skrivs ut istället. **Svårighetsgrad:** 1

## Utbyggnad

- Låt användaren kunna ange input-talet som ett argument till programmet, exempelvis:  
`python fibonacci.py 35`
- Prova att generera talserien [rekursivt](http://interactivepython.org/courselib/static/pythonds/Recursion/recursionsimple.html) istället för iterativt. **Svårighetsgrad:** 2
- Få programmet att fråga och svara användaren om och om igen istället för bara en gång. Spara dessutom den uträknade talserien i en lista, så att om användaren frågar om ett tal mindre än det största talet i den sparade talserien behöver talserien inte räknas ut på nytt. Istället letar man igenom listan efter svaret. Frågar däremot användaren om ett tal som är större än eller lika med det största talet i den sparade talserien så fortsätter man att generera talserien från slutet av den sparade talserien istället för att börja om på nytt. **Svårighetsgrad:** 2