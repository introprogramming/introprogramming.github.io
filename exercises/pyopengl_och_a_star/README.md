# PyOpenGL och A*

Rita grafik med OpenGL och sökalgorithm med A*

**Introduktion**:
OpenGL är en standardiserad uppsättning av intruktioner för att hantera hårdvaruaccellererad grafikrendering (mycket effektiv ritning av bilder) i en simulerad tredimensionell miljö. Givetvis kan man även använda detta till att rendera tvådimensionella bilder, vilket denna uppgiften kommer att stega igenom. Uppgiften har 2 delar, en för att rita grafik och en för att implementera en sökalgorithm för att hitta den kortaste möjliga vägen mellan två noder i en graf (i uppgiften sätts detta i sammanhanget att hitta den kortaste vägen i en labyrit).

Eftersom att OpenGL bygger på Klient/Server interaktion kommer den delen av uppgiften vara mer utformad som ett "recept" och kan uppfattas som betydligt enklare än del 2, som kräver med kunskap om Python och programstrukturering med objekt. Själva slutprokuten är ett program som kan rita ut den kortaste vägen mellan en start- och slutpunkt i en labyrit.
 
**Koncept**: Grafik, API, algorithmimplementation, programstrukturering

**Externa Bibliotek**:
 - Grafik [PyOpenGL](https://pypi.python.org/pypi/PyOpenGL)
 - Bilder [PIL](http://www.pythonware.com/products/pil/)

- **Svårighetsgrad:** 3

## Delmoment - GLUT

1. **Importera moduler**
Importera följande i källkodsfilen för att få tillgång till OpenGL, GLUT och PIL.

```python
	
	from PIL import Image
	from OpenGL import *
	from OpenGL.GL import *
	from OpenGL.GLUT import *
```

2. **Skapa GLUT-fönster**
GLUT eller *OpenGL Utility Toolkit* är det som kommer att användas för att skapa ett fönter där OpenGL kan rita i. Detta åstakoms med följande kommandon och deras argumenttyper anges nedan:

```python
	
	glutInit( *String* )
	glutInitWindowSize( *Integer pixel_width*, *Integer pixel_height* )
	window = glutCreateWindow( *Byte-String window_title* )
```

Objektet *window* kommer då att ange en referens till fönstret som skapas.

Notera att *glutCreateWindow* tar en *Byte-String* och **inte** en vanlig sträng.

3. **Tillståndsfunktioner**
Vi behöver ange vad det skapta fönstret skall göra under dess olika tillstånd, bland annat när det väntar, ritar och byter storlek. Detta gör vi genom att binda funktionsreferenser.

```python
	
	glutReshapeFunc( *function( Integer width, Integer height )* )
	glutDisplayFunc( *function()* )
	glutIdleFunc( *function()* )
```

Funktionen som ges till *glutReshapeFunc* kommer att exekveras då fönstret byter storlek. *glutDisplayFunc* kallas när fönstret behöver ritas om. *glutIdleFunc* genomförs när inget annat exekveras. Det finns många fler tillstånd att binda funktioner till, men dessa kan hittas i [GLUTs egna dokumentation](https://www.opengl.org/resources/libraries/glut/).

Ett tips är att binda renderingsfunctionen även till *glutIdleFunc* för att få konternuerlig uppdatering av fönstret. Går renderingen av någon anledning för fort kan nu läsa om *time* modulens *sleep( secs )* function.

4. **Köra program**
Nu kan all kontroll lämnas över till förnstret själv, genom att kalla funktionen *glutMainLoop()*. Notera att detta kommer att stoppa flödet av programmet tills fönstret stängs.

Skulle programmet nu exekveras kommer ett fönster att visas på skärmen. Programmet stängs sedan av när fönstret stängs.

## Delmoment - OpenGL

1. **Koppla OpenGL till fönster**
Till att börja med, varje gång som GLUT-fönstret ändrar storlek kommer OpenGL behöva ändra sin renderingsytas storlek samt renderingläge. Detta görs med följande funktioner:

```python
	
	glViewport( *Integer offset_x*, *Integer offset_y*, *Integer width*, *Integer height* )
	glMatrixMode( GL_PROJECTION )
	glLoadIdentity()
	glOrtho( 0.0, *Float width*, 0.0, *Float height*, 0.0, 1.0 )
	glMatrixMode( GL_MODELVIEW )
```

Notera att här är några värden redan inskrivna, de är nödvändiga. *GL_PROJECTION* och *GL_MODELVIEW* är nämligen två av OpenGLs hundratals konstanter. Vill ni veta mer om dessa hänvisas ni till OpenGLs dokumentation. Kortfattat sätter vi renderingsytan till att rita i 2D över hela GLUT-fönstret.

2. **Rita med OpenGL**
Varje gång vi skall rendera till fönstret behöver vi först rensa det från skräpvärden. Sedan kan vi rita trianglar och andra primitiva geometriska figurer. Undrar man då hur man ritar en t.ex. en inladdad JPEG/PNG-bild är svaret att dessa måste ritas *på trianglar*. Lyckligtvis använder vi i denna uppgift OpenGLs *intermediate mode*, som i förhållande till de andra metoder som OpenGL erbjuder, har sämre prestanda. Här nedan, låt *w_width* och *w_height* betäckna GLUT-fönstrets nuvarande storlek.

```python
	
	glClear( GL_COLOR_BUFFER_BIT )
	glLoadIdentity()
	
	glBegin( GL_QUADS )
	glVertex2f( 10.0, *w_height* - 10 )
	glVertex2f( *w_width* - 10, *w_height* - 10 )
	glVertex2f( *w_width* - 10, 10.0 )
	glVertex2f( 10.0, 10.0 )
	glEnd()
	
	glutSwapBuffers()
```

Detta kommer att rensa fönstrets färgbuffer (*GL_COLOR_BUFFER_BIT*), återsälla koordinatsystemet (*glLoadIdentity()*) och börja rita ut en fyrhörning med de hörn-koordinater som speciferas mellan *glBegin( GL_QUADS )* och *glEnd()*. Funktionen *glutSwapBuffers()* är det som gör att det ritade innehållet faktiskt skickas till GLUT-fönstret.

Om programmet är korrekt skrivet borde ett fönter med en vit rektangel synas. Det är mycket lätt att något gått fel, **kontrollera att allt har genomförts i rätt ordning!** Även kan det vara att delmomentet med GLUT inte är rätt. Notera att om OpenGL har ett internt fel så kommer detta inte nödvändigtvis upp i felloggen när programmet körs.

Det är kanske uppenbart men viktigt att säga att alla fel måste åtgärdas innan ni fortsätter, syns inget nu kommer inget att synas senare.

3. **Färg och Texturer**
En vit triangel är kanske inte så imponerande, så för att byta färg på ett hörn kan kommandot *glColor3f( Float red, Float green, Float blue )* sättas innan ett funktionsanropp till *glVertex2f( Float x, Float y )*. Pröva gärna detta.

Men vill vi använda bilder behöver vi först ladda in bilden till en textur som kan ritas på våran fyrhörning. När en textur skapas kommer detta att ske på OpenGLs server, vilket betyder att du kommer inte (som en OpenGL-klient) att ha direkt tillgång till den. Istället kommer du att få ett nummer (*Integer*) som hänvisar till den skapta texturen. Varje gång du sedan vill använda texturen måste du ange detta referensnummer. Ett tips är att skriva detta som en funktion.

```python
	
	texture = glGenTextures( 1 )
	if texture is not 0:
		#If it is 0, then it failed to create the texture
		image = Image.open( *String path* )
		image_width = image.size[0]
		image_height = image.size[1]
		image_data = image.tostring( "raw", "RGBX", 0, -1 )
		glActiveTexture( GL_TEXTURE0 )
		glBindTexture( GL_TEXTURE_2D, texture )
		glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT )
		glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT )
		glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST )
		glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST )
		glTexImage2D( GL_TEXTURE_2D, 0, 3, image_width, image_height, 0, GL_RGBA, GL_UNSIGNED_BYTE, image_data )
```

Detta kan kännas mycket för att endast ladda in en bild, men det är nödvändigt för att överföra bilden till OpenGL. Kortfattat behöver du inte veta exakt vad detta gör om du inte vill tillsätta mängder av effekter eller ändra inställningar till texturen, varpå du bör läsa dokumentationen. Men kortfattat öppnar vi en bild via PIL.Image, skapar en textur (*glGenTextures*), säger att hedanefter vill vi använda den i alla sammanhang som involverar tvådimensionella texturer (*glBindTexture*) och sätter ett antal inställningar för filter och utritning (*glTexParameteri*). Variabeln texture kommer då att innehålla referensen till texturen. Komihåg att radera texturen när du inte behöver den längre, med *glDeleteTexture( texture )*.

Nu kan vi uppdatera renderingsfunktionen till att använda den nya texturen.

```python
	
	...
	
	glEnable( GL_TEXTURE_2D )
	
	glBegin( GL_QUADS )
	glTexCoord2f( 0.0, 0.0 )
	glVertex2f( 0.0, *w_height* )
	glTexCoord2f( 1.0, 0.0 )
	glVertex2f( *w_width*, *w_height* )
	glTexCoord2f( 1.0, 1.0 )
	glVertex2f( *w_width*, 0.0 )
	glTexCoord2f( 0.0, 1.0 )
	glVertex2f( 0.0, 0.0 )
	glEnd()
	
	glDisable( GL_TEXTURE_2D )
	
	...
```

Först säger vi att vi vill använda texturer istället för färg med *glEnable( GL_TEXTURE_2D )*. Notera att *glColor3f* kommer inte att ha någon verkan tills *glDisable( GL_TEXTURE_2D )* har kallats. *glTexCoord2f* fungerar ungefär som *glColor3f*, men istället för att ta de olika färgkomponenterna tar den istället en koordinat på texturen mellan 0.0 och 1.0. Andra värden kan användas. Om vi t.ex. byter ut 1.0 mot 10.0 skulle texturen återupprepas 10 ggr på fyrhörningen.

Detta är allt som kommer att täckas i denna uppgiften om OpenGL. Men det finns mycket (*mycket*) mer som kan användas. Besök gärna deras [officiella hemsida](https://www.opengl.org/).

## Delmoment - A*

Du kommer att beöva implementera en algorithm som letar upp den kortaste vägen i en graf genom att följa olika noder på grafen. I denna alorithmen känner varje nod till vilka andra noder den är sammankopplad med, så kallade kanter.

Varje nod i en väg från startnoden till slutnoden har tre stycket kostnader. Den så kallade G-kostnaden (anger kostnaden från startnoden till sig själv), H-kostnaden (kostnaden från sig själv till slutnoden ) och F-kostnaden ( Summan av G- och H-kostnaderna ). Den väg av noder som har minst kostnad är den som är kortast/snabbast/billigast att ta.

För att implementera denna algorithm kan du följa nedanstående algorithm:

- *parent* är en referens hos en nod till dess föregående nod i en väg.
- *start_node* anger startnoden.
- *end_node* anger slutnoden.
- *open_nodes* anger noder som är markerade som 'öppna'
- *closed_nodes* anger noder som är markerade som 'stängda'
- *current* anger den nod som är markerad som 'aktiv'
- *iteration* anger ett värde på en räknare.
- *max_interations* anger det största antalet iterationer som är tillåtet, t.ex. 200.

1. Kontrollera att *start_node* och *end_node* är existerande noder. Är en av dem inte existerande, finns det ingen väg.
 
2. Se till att *start_node* och *end_node* är tillåtna att beträdas. Skulle någon inte vara det så finns det ingen väg.

3. Är *start_node* den valda *end_node* finns det ingen väg, man är redan framme.

4. Markera *start_node* som *current* och som *öppen*.

5. Beräkna *current* nodens G-, H- och F-kostnad.

6. Har *iteration* översigit *max_iterations* så finns det **troligen** ingen väg. Eller är *current* inte en nod finns det **definitivt** ingen väg. Annars öka *iteration* med 1.

7. Leta upp den nod som har minst F-kostnad i *open_nodes* och sätt den som den nya *curent*. Är denna nod samma som *end_node*, så hoppa till steg **11**. Finns det ingen nod med lägst kostnad så finns det ingen väg.

8. Avmarkera *current* från *öppen*. Markera *current* istället som *stängd*.

9. Leta igenom *current* nodens kanter:
 
 - Är kantnoden inte tillgänglig eller stängd, ignorera.
 - Är den redan öppen: om den nya G-kostnaden är större än den G-kostnad de sattes som öppen med, ignorera den.
 - Annars markera som *öppen* och sätt dess *parent* som *current* samt beräkna den nya F-kostnaden.

10. Hoppa till steg **6**. 

11. Avmarkera all noder som *öppna* och *stängda*.

12. Följ kedjan av den nuvarande *current* nodens *parent* som nu anger kedjan av noder från *start_node* till *end_node* baklänges.
 
 Tips: Att beräkna kostnaderna för noder som ligger i ett rutnät är relativt enkelt. Ett hopp i sidled kostar 10 och ett diagonalt hopp kostar 14. Detta ger generellt givande resultat.

## Delmoment - Sammansättning

 Nu är uppgiften att använda alla delmomenten för att bygga ett program som slumpmässigt väljer en start- och slutnod på ett bräde med noder i ett rutnät. Slumpmässigt är några noder markerade som obeträdbara och en väg från start- till slutnoden får inte innehålla en sådan nod. Alla noderna skall ritas ut som punter på brädet med olika färger, beroende om noden är beträdbar eller ej. Vägen som beräknas mellan noderna skall ritas ut, eller inte ritas ut om en väg inte finns.

## Utbyggnad

 Eftersom du använder OpenGL som har stöd för tredimensionella renderingar kan du alltid försöka överföra uppgiften till den tredje dimensionen och rita ut med flera texturer. **Svårighetsgrad 3**

Lycka till!
