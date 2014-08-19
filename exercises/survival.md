# Survival game

2d shooter spel: överlev mot monster så länge som möjligt. Du har vapen och (o)begränsad ammunition. Spelet kan givetvis anpassas så att det blir precis som man vill. Det här är tänkt att spelas med tangentbord och mus. Perspektivet är tänkt som rakt uppifrån.

## Tips
**OBS!** Det här är en uppgift av den större och svårare typen. Börja otroligt enkelt först och få det att fungera. Bygg ut det fungerande programmet successivt tills det är så coolt som ni vill ha det.

Exempel kan vara bra för att komma igång, bäst lär man sig dock genom att göra själv. Använd gärna [detta](http://programarcadegames.com/index.php?chapter=introduction_to_sprites) exempel som utgångspunkt. Ni kan även se andra exempel [online](http://www.pygame.org/docs/tut/intro/intro.html) eller i Pygame mappen: `C:\Python27\Lib\site-packages\pygame\examples`.

Tänk på att det inte är viktigt hur sprites:en (.png-bilderna) ser ut, rita dem väldigt enkelt i Paint eller motsvarande och lägg istället tiden på att få allt att fungera. När spelet är färdigt kan ni leta efter snygga bilder.

Ett användbart koncept i den här uppgiften är **polymorfism**. Detta kommer ni ha nytta av på update-metoden.

- **Svårighetsgrad:** 3

## Delmoment

0. Skapa ett fönster och en update-loop som ritar om fönstret efter 1/60 sekunder. Varje iteration är en s.k. **frame**.
1. Skapa en egen klass `GraphObject` som ärver `pygame.sprite.Sprite` Skapa en funktion update(self, time) som anropas i varje frame.
2. Rita ut några objekt mha `g = pygame.sprite.Group()` och `g.draw(screen)`.
2. Gör en klass för spelaren som ärver `GraphObject` och skapa ett objekt av denna som utgör spelaren. Skapa i denna klass en ny metod `update(self,time)` som även kallar på `GraphObject.update(self,time)`.
3. I update-loopen: fånga upp indata genom `pygame.event.get()`. Låt spelaren flytta på sig när man använder pil-tangenterna. Avbryt loopen om `pygame.QUIT` eller Escape matas in.
3. Flytta *kameran* då spelaren rör sig. Detta kan göras på flera sätt, exempelvis genom att man har en Board klass som håller koll på var kameran är. För att se att kameran faktiskt rör sig så är det lämpligt att rita ut några *stillastående* objekt också.
4. Skapa en projektil-klass som ärver `GraphObject`. Då du klickar på Space eller vänster musknapp ska en projektil flyga iväg åt det hållet du har muspekaren.
4. Skapa en monster-klass som ärver `GraphObject`. Rita ut några monster då spelet startas.
5. Beräkna [kollisioner](http://www.pygame.org/docs/tut/SpriteIntro.html) mha `pygame.sprite.groupcollide()` eller `pygame.sprite.spritecollide()`. Då ett monster träffas av en projektil ska han ta skada och eller dö. Om spelaren kolliderar med ett monster ska spelaren ta skada och eller dö. Se guider ovan under **Tips** för hjälp med kollisionshantering.
6. Skapa nya monster med jämna mellanrum och eller när ett monster dör. Placera ut dem på slumpade positioner.
7. Låt spelet ta slut när spelaren dör. Rita gärna ut en GameOver sprite. OBS, man måste fortfarande kunna avbryta spelet med Escape och `pygame.QUIT`.

## Utbyggnad
- Se till att brädets gränser fungerar: monster och spelaren ska inte kunna passera ut utanför brädet. Kameran ska aldrig visa något utanför brädet.
- Lägg till fler roliga monster med olika beteenden: exempelvis en som följer efter eller en som skjuter egna projektiler.
- Lägg till cooldown för skott och monster attack.
- Rita ut bakgrundsfigurer som blommor och gräs.
- Räkna poäng under spelets gång, till exempel när man dödar monster. Man kan även räkna tiden som gått sedan spelets start. Skriv ut denna poäng vid game over.
- Spela upp ljud då en spelare eller monster tar skada. Spela även upp ljud då en projektil skjuts iväg och spelet är slut.
- Låt användaren kunna pausa spelet för att fortsätta senare.
- Fixa något annat kul som ni vill lägga till :)

## Externa bibliotek
- [pygame](http://www.pygame.org/download.shtml)