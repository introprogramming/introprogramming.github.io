# MIDI Keyboard

Att bygga ett "mjukvaru-piano" eller s.k. MIDI-keyboard med ca 14 tangenter (c1-e2). När man trycker ner en tangent ska det motsvara att trycka ner en tangent på en synth (och låta genom högtalarna).

- **Svårighetsgrad:** 2

## Delmoment
1. Spela upp ett MIDI-ljud på datorn mha [pygame.midi.Output](http://www.pygame.org/docs/ref/midi.html#pygame.midi.Output), i vårt fall räcker det med `note_on()` och `note_off()`. Observera att man måste ha valt ett instrument (0 motsvarar piano) och volym, `velocity`, för att det ska låta något.  
**OBS** Om `pygame.midi.get_default_output_id()` returnerar `-1` så finns det ingen MIDI ut-enhet på datorn. Den här uppgiften behöver en fungerande MIDI out enhet.
2. Mappa [tangenter](http://www.pygame.org/docs/ref/key.html) på tangentbordet till MIDI-toner så att exempelvis 'q' översätts till `54`. Pianots mitten-c representeras av MIDI-tonen `60`, ciss av `61` etc. Sätt gärna "vita" och "svarta" tangenter på två olika rader på tangentbordet.
3. Skapa ett tomt pygame-fönster mha [pygame.display](http://www.pygame.org/docs/ref/display.html#pygame.display.set_mode). Detta behövs för att pygame ska kunna se tangentbordsnedtryckningarna.
4. Läs in tangentnedtryckningar med `pygame.event` i en loop och slå på/av respektive ton. Låt loopen avbrytas vid `pygame.QUIT` och `pygame.K_ESCAPE`, så att programmet avslutas.

## Utbyggnad
- Funktionalitet för att byta oktav med exempelvis 'z' och 'x'. **Svårighetsgrad 2**
- Låt användaren kunna höja och sänka volymen. **Svårighetsgrad 1**
- Låt användaren välja/byta [MIDI-instrument](http://www.skoogmusic.com/manual/manual1.1/Skoog-Window/navigation/MIDI-Tab/index). **Svårighetsgrad 2**

## Externa bibliotek
Spelbiblioteket `pygame` och dess modul `pygame.midi`:

- [pygame](http://www.pygame.org/download.shtml)
- [pygame.midi](http://www.pygame.org/docs/ref/midi.html#pygame.midi.Output)
