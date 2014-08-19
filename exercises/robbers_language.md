# Rövarspråk

**Svårighetsgrad:** 1

Skriv ett program som översätter från svenska till rövarspråket!

## Delmoment

1. Ett program som skriver ut översättningen för en given sträng (eller argument under körning). **Svårighetsgrad 1**.

  ```bash
  python robber.py Johan
  Jojohohanon
  ```

2. Ett program som väntar på input från användaren och skriver ut översättningen tills programmet avslutas. **Svårighetsgrad 1**.

  ```bash
  python robber.py
  Hi! What do you want to translate?
  > Johan
  The translation is:
  Jojohohanon
  > Hästar är fina.
  The translation is:
  HoHäsostotaror äror fofinona.
  ...
  ```
3. Ett program som givet en sökväg till en textfil översätter allt innehåll. **Svårighetsgrad 1**.

  ```bash
  python robber.py svensk_fil.txt
  Translating from 'svensk_fil.txt':
  <Translation here .. >
  ```
4. Ett program som gör allt ovanstående på samma gång! Dvs. beroende på argument till programmet ska den bete sig olika. **Svårighetsgrad 2**.

  ```bash
  # Med enkelt ord som argument
  python robber.py Johan
  Jojohohanon
  # Inget argument
  python robber.py
  Hi! What do you want to translate?
  > Johan
  The translation is:
  Jojohohanon
  # Sökväg till textfil som argument
  python robbery.py svensk_fil.txt
  <Translation here .. >
  ```
Programmet bör alltså känna igen olika argument och därmed bestämma sig för hur den ska köra.

## Om rövarspråket

> Rövarspråket (rorövovarorsospoproråkoketot) är ett enkelt kodspråk som framför allt används av barn. Det blev populärt i och med Astrid Lindgrens romaner om Kalle Blomkvist. Idén till rövarspråket ska ha kommit från Astrids make, Sture Lindgren, som använde det i lek med sina kamrater som barn. Eftersom rövarspråket har en enkel struktur som är lätt att avkoda passar sig språket inte i skriven form. Men i talad form kan det vara svårt för en oinsatt att förstå vad som sägs, särskilt om det talas snabbt.

[Wikipedia](http://sv.wikipedia.org/wiki/R%C3%B6varspr%C3%A5ket)

Regeln för rövarspråket är att man efter varje konsonant lägger ett o (kort å-ljud) och därefter samma konsonant igen, till exempel byts b ut mot "bob" och f mot "fof". Vokalerna är oförändrade. "Jag talar rövarspråket" blir alltså "jojagog totalolaror rorövovarorsospoproråkoketot".
