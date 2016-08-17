# Objects in a bag

Öva med att programmera med objekt.

**Introduktion**:
I denna uppgift skapar vi ett program som tillåter dig att skapa och lägga föremål i en "säck". Vi ser denna process som om vi har två separata föremål, ett antal *föremål* som läggs i en *påse*, och programmerar därför med datastrukturer som reflekterar detta.
 
**Koncept**: Objektorienterad programmering

- **Svårighetsgrad:** 1

## Snabb introduktion - Att skapa ett objekt genom en klass

En *klass* kan ses som en mall. Det är mycket enkelt att skapa en klass i Python, allt som behövs är att skriva *class* följt av namnet på klassen:

```python
	
	class Klassnamn:
```

Med denna mall kan vi skapa objekt som följer de regler som läggs i klassen. T.ex. kan vi säga att klassen har ett namn, då kommer alla objekt som skapas från klassen få ett namn. Men vi kan också säga att ett objekt har ett visst beteende genom att lägga funktioner i klassen.

Så till att börja med kan vi säga att varje objekt av klassen *Person* skall ha ett namn med följande mall/klass

```python
	
	class Person:
		def __init__( self ):
			self.name = "Tristian"
```

Detta betyder att när vi skapar ett objekt av typen *Person* kommer ____init____ funktionen att tillkallas automatiskt (Det är en process som hanteras av Python och namnet måste stämma exakt. Däremot kan fler argument läggas till.)

Som ni märker finns det ett argument till funktionen som här kallas för *self*. Detta är en referens till objektet som precis skapats. En referens kan ses som ett id-nummer, alla objekt som kommer från mallen *Person* får ett unikt id för att urskilja dem. Detta betyder att alla funktioner som läggs i en klass måste ha *self* som första argument, så att vi vet vilket objekt som vi för tillfällt hanterar när en funktion skall exekveras i klassen.

Även ser ni att vi kan lägga till ett attribut (i vårt fall *name*) på objektet genom att skriva *self.name = värde*. Detta betyder "till det objekt med id-nummber *self*, hämta attributet *name* och sätt det till *värde*".

För att nu skapa ett objekt av typen *Person* kallar man på klassen som en funktion, som då retunerar id-nummret till det nya objektet.

```python
	
	mitt_objekt = Person()
```

Notera att vi inte angav argumentet *self*, det gör Python automatiskt för dig.

Nu är variabeln *mitt_objekt* ett id-nummber till en ny Person. Vi kan t.ex. kolla objektets namn med följande:

```python
	
	print( mitt_objekt.name )
```

Som då kommer att skriva ut *Tristian* i konsolen om programmet körs.

Man kan givetvis även ändra namnet på samma sätt som i __init __, men istället anger vi *mitt_objekt* som id-nummer:

```python
	
	mitt_objekt.name = värde
```

Fler funktioner kan givetvis läggas till i klassen och flera klasser kan skapas, inte bara en klass som heter *Person*.

För att tillkalla andra funktioner som tillhör objektet skriver man *mitt_objekt.funktionsNamnHär( argument... )*, detta gör att *self* i den tillkallade funktionen sätts till samma värde som *mitt_objekt*.

Läs mer om klasser i [Pythons dokumentation](https://docs.python.org/2/tutorial/classes.html)

## Implementera uppgiften

Vi kommer att skapa två klasser (*Item* och *Bag*) och ett litet testprogram.

### Skapa en klass 'Item'

1. Skapa en klass som heter *Item* och säg i *__init __( self, name, color, weight )* att den skall ha attributen *name*, *color* och *weight* som sätts till motsvarande funktionsargument.

2. Ge klassen en funktion *getDescription( self )* som retunerar en sträng i följande format:

"[name: *objektets_namn*, color: *objektets_färg*, weight: *objektets_vikt*]"

[Läs mer om att använda funktioner här](https://docs.python.org/2/tutorial/controlflow.html#defining-functions)

### Skapa en klass 'Bag'

1. Skapa en klass som heter *Bag* och säg i *__init __( self, label )* att den skall ha attributen *items*, *label*. Attributet *label* sätts till motsvarande funktionsargument medan attributet *items* sätts till en tom lista (denna kommer sedan att innehålla referenser till objekt av typen *Item*).

2. Skapa en funktion som heter *addItem( self, item_object )* som lägger till *item_object* i sitt attribut *items*, som är en lista.

3. Skapa en klass funktion som heter *getDescription( self )* som retunerar en sträng med sitt eget namn samt innehållet från alla objekt i sitt attribut *items*, där *Items* version av funktionen *getDescription()* kallas.

### Testprogram

Följande programbit skall nu kunna exekveras utan problem.

```python
	
	bag = Bag( "Min säck" )
	item_1 = Item( "Fisk", "röd", 10.0 )
	item_2 = Item( "Hund", "brun", 20.0 )
	item_3 = Item( "Fredrik", "grön", 9001.0 )
	print( bag.getDescription() )
```

Och borde ge ett liknande resultat i konsolen:

	'Min säck' contains the following:
		- [name: Fisk, color: röd, weight: 10.0]
		- [name: Hund, color: brun, weight: 20.0]
		- [name: Fredrik, color: grön, weight: 9001.0]

## Utökningar

Gör en programloop som låter dig ta in kommandon genom *input()* och därmed påverka innehållet i säcken. Exempel på kommandon kan vara:
 - "exit" - avsluta programmet.
 - "add (name) (color) (weight)" - lägg till ett nytt objekt i säcken med de angivna värdena.
 - "show" - skriv ut säckens nuvarande beskrivning i konsolen.
 - "shuffle" - blanda runt innehållet i säcken.

 **Svårighetsgrad 2**
