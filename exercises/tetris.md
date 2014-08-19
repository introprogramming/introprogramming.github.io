# Tetris

- **Svårighetsgrad:** 3

## Delmoment

1. Skapa ett fönster att rita upp komponenterna på.
2. Skapa ett simpelt block och få detta att ritas ut.
3. Få blocket att kunna röra sig vid tangenttryckningar.
4. Gör en spel-loop som flyttar ned blocket med ett visst intervall.
5. Få blocket att, när det når botten av fönstret, ligga kvar samtidigt som ett nytt block börjar falla från toppen.
6. Se till att block inte kan röra sig utanför fönstret eller in i andra block.
7. När en rad är fylld utav block ska den raden tas bort och ovanliggande rader ska flyttas ned.
8. När ett nytt block skapas måste det kontrolleras så att det inte redan finns något block på dess position, om det gör det så har man förlorat och spelet ska avslutas.
9. Om ni inte redan har gjort det så utöka blocket till att bestå av flera block som tillsammans utgör olika former, vilka kan slumpas när ett nytt skapas. Flera ställen i koden behöver uppdateras i detta läge, men det mesta bör vara ganska simpla förändringar (t.ex. flyttar man fyra block samtidigt istället för bara ett).
10. Få block att rotera vid tangenttryckning.

## Utbyggnad

* Räkna poäng.
* Ge alternativ till att starta om spelet när man har förlorat.
* Öka hastigheten på spelet successivt.

## Externa bibliotek
* [pygame](http://www.pygame.org/download.shtml)