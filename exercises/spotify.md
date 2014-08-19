# Spotify Searcher

Ett verktyg för att söka i Spotifys bibliotek efter låtar och artister.

**Svårighetsgrad: 2**

Denna övning kan göras *otroligt* mycket enklare med hjälp av det färdigskrivna verktyget [Spotipy](https://github.com/plamere/spotipy), som verkar som ett Python-lager kring [Spotifys API](https://developer.spotify.com/web-api).

Ladda ner zip-filen med biblioteket: [https://github.com/plamere/spotipy/archive/master.zip](https://github.com/plamere/spotipy/archive/master.zip), packa upp, och kör följande på en kommandorad inifrån den uppackade mappen:

```bash
python setup.py install
```
Nu bör du kunna skriva `import spotipy` överst i en Python-fil och använda det enligt [dokumentationen](https://github.com/plamere/spotipy). Exempel:

```python
import spotipy

sp = spotipy.Spotify()
tracks = sp.search(q='Stairway To Heaven')
for i, t in enumerate(tracks['tracks']['items'], 1):
  name = t['name']
  print "{1}. {0}".format(name, i)
```

## Delmoment

1. Använd `sp.search()` för att söka efter en låt och visa resultaten.  
  1.1. Visa även album och artist.

2. Låt koden söka efter en textsträng man ger skriptet: `python searcher.py 'Stairway To Heaven'`.

3. Lägg till funktion för att söka på artister.

Presentera den infon du känner är relevant! Se i [dokumentationen](https://developer.spotify.com/web-api/search-item/) vilka data som finns tillgängliga. 

## Utbyggnad

1. Spela upp de korta förhandsvisningarna av låtarna som finns (se [API-dokumentationen](https://developer.spotify.com/web-api/object-model), `preview_url` för Track Object). Externa bibliotek för ljuduppspelning lär behövas.

## Externa bibliotek

### Spotipy

[Spotipy](https://github.com/plamere/spotipy). Python-wrapper för [Spotifys Web API](https://developer.spotify.com/web-api/).

Spotipy dependar på [Requests](https://github.com/kennethreitz/requests).

#### Installation

Ladda ner eller klona mappen från GitHub, ställ dig i mappen och kör:
```bash
python setup.py install
```

Eller gå helt via pakethanterare:
```bash
pip install SpotipyWebAPI
```
eller
```bash
easy_install SpotipyWebAPI
```
