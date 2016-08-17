# Battleship

Skapa en implementation av *Battleship*/*Sänka skepp*.

**Introduktion**:
I denna uppgiften kommer ni att självständigt skapa en implementation av *Battleship*, med valfritt grafikbibliotek. Denna uppgift kommer att ge en inblick i hur du arbetar med olika lägen i ett program, t.ex. kommando läsning och sedan exekvering vid olika programtillstånd.
 
**Koncept**: Grafik, Programlägen, Kommandoexekvering, Spelprogrammering

**Externa Bibliotek**:
 - Förslag till grafik
   [PyOpenGL](https://pypi.python.org/pypi/PyOpenGL)
   [nCurses ](https://pypi.python.org/pypi/UniCurses)
   [PyGame  ](http://www.pygame.org/download.shtml)

- **Svårighetsgrad:** 3

## Implementera Battleship

Följande skall finnas i spelet:
	
 1. Spelet skall börja med att båda spelarna plaserar sina skepp på sin sida av spelplanen utan att motståndaren kan se skeppen.

 2. Ett skepp skall kunna roteras under plaseringssekvensen.

 3. När spelaren är klar kan inte dennes skepp flyttas.
 
 4. När båda spelarna har plaserat sina skepp börjar stridsläget.
 
 5. Varje spelare tar tur om att försöka skjuta på motståndarens skepp, vare sig man träffar en skeppsdel eller inte skall detta markeras, givetvis med olika markeringar. Man kan alltid se sina tidigare markeringar under sin egen tur, men inte under motståndarens.

 6. När alla en spelares skeppsdelar har sänkts vinner motståndaren och spelet avslutas, alternativt börjar om.

 7. På sin egen runda kan man se sina egna skepp, som då är markerade på de delar som motståndaren träffat, men
    motståndarens missade skott syns inte.

 8. Det skall finns skepp av olika storlekar och former.

## Utbyggnad

Försök gärna överföra spelet till 3D om ni använder PyGame eller PyOpenGL. **Svårighetsgrad 3**

Inför nya vapen som har olika attribut och som kan väljas på sin egen runda. **Svårighetsgrad 2**

Om ni implementerar spelet genom enkla kommandon, t.ex. "moveto (x, y)" eller "fire (x, y)" är det relativt enkelt att spela över ett nätverk om dessa kommandon skickas mellan de spelande datorerna. Notera att även om ni har byggt spelet för musklickningar eller tangenttryck kan dessa översättas till de motsvarande textkommandon som skulle kunna skickas över nätet. **Svårighetsgrad 2**

Lycka till!
