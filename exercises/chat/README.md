# Chat

Enkel chat i terminalen mellan två (eller flera) datorer utan server.

**Koncept**: nätverk, trådar

**Tips**: Programmet testas som enklast lokalt på samma dator mellan två terminal-fönster. Som i exemplen kan man då använda  
`zmq_socket.connect("tcp://localhost:%s" % port)`  
för att ansluta. Mellan olika datorer får man byta ut `localhost` mot datorns lokala IP-adress.  
**OBS!** Det verkar inte fungera så bra mellan flera datorer på chalmers nätverk. Det fungerar dock fint mellan flera datorer i ett hemnätverk.

- **Svårighetsgrad:** 3

## Delmoment

1. Utgå från exemplet som beskrivs [här](http://learning-0mq-with-pyzmq.readthedocs.org/en/latest/pyzmq/patterns/pair.html). Anpassa exemplet så att programmet läser in rader från terminalen istället för att slumpa data. (**Svårighetsgrad 2**)
2. Ange nätverksporten som argument till programmet (eller slumpa fram den) och låt även användaren välja vilken port programmet ska ansluta till. (**Svårighetsgrad 2**)
3. Multitrådning: (**Svårighetsgrad 3**)
    1. Som ni märker finns vissa begränsningar med att använda endast en socket - programmet låser sig då det väntar på ett meddelande. För att undvika detta behöver det finnas två trådar som körs parallellt: en som lyssnar efter användarens input och en som lyssnar efter meddelanden på nätverksporten. Skapa därför två olika funktioner som kör varsin loop. Användaren ska kunna avbryta programmet när som helst genom att skriva något lämpligt ord.
    2. Skapa en ny tråd mha [Process](https://docs.python.org/2/library/multiprocessing.html#multiprocessing.Process). Funktionen för att läsa meddelanden, `f`, används som ett argument till `Process` konstruktor:  
    `p = Process(target=f, args=())`.  
    3. Tyvärr så är inte sockets trådsäkra, därför behöver det skapas en ny context och en ny socket i den nya tråden. Om samma socket eller context används i två trådar får man en `ZMQError: Interrupted system call`.  
    Alltså, huvudtråden har en socket som  gjort `bind()` och som i en loop läser in `raw_input()` och skickar iväg detta med `send()`. Den andra tråden har en annan socket som gjort `connect()` och som i en egen loop skriver ut värdet av `recv()`.
    4. Låt den nya tråden vara en s.k. *daemon*; det innebär att den garanterat avslutas då huvudtråden avslutas.  
    Efter dessa justeringar ska man då kunna ansluta mellan två terminalfönster på samma dator samt skicka och ta emot meddelanden som man förväntar sig i ett chat-program.
4. Låt nu användaren skriva in adress och port till den dator som programmet ska ansluta till. Använd fortfarande `"localhost"` som default, men man ska nu kunna ansluta mellan två olika datorer över ett lokalt nätverk. Datorns lokala IP kan erhållas genom:  
`import socket`  
`socket.getbyhostname(socket.gethostname)`  
(**Svårighetsgrad 2**)

## Utbyggnad:
- Socketmönstret *PAIR* kan bara skapa en anslutning mellan två sockets. Med vår arkitektur som har två sockets per klient kan vi med fördel använda mönstret *Publisher/Subscriber* så att fler klienter än två kan delta i samma chatt. Se exempel [här](http://learning-0mq-with-pyzmq.readthedocs.org/en/latest/pyzmq/patterns/pubsub.html). Då kommer socketen i huvudtråden att vara *publisher* och den i daemon-tråden att vara *subscriber*. (**Svårighetsgrad 3**)
- Hantera kommandon såsom `\help` och `\connect`. Help ska skriva ut vilka kommandon som finns (exempelvis hur man avslutar programmet) och connect ska ansluta till en ny klient. (**Svårighetsgrad 2**)
- Använd filter för att skapa chatt-kanaler: man fortsätter att lyssna på alla kanaler men skriver alltid till en viss kanal. Se [guiden](http://learning-0mq-with-pyzmq.readthedocs.org/en/latest/pyzmq/patterns/pubsub.html) för *publisher/subscriber pattern*. (**Svårighetsgrad 3**)
- Implementera `\disconnect <channel>`. Tänk på att inte alla typer av objekt är trådsäkra. Använd `multiprocessing.Lock` för att säkerställa att bara en tråd ändrar på samma objekt åt gången. (**Svårighetsgrad 3**)


## Externa bibliotek
### pyzmq
Pyzmq är ett bibliotek för enkla stabila sockets.

- [Tutorial](http://learning-0mq-with-pyzmq.readthedocs.org/en/latest/pyzmq/pyzmq.html)
- [Dokumentation](http://zeromq.github.io/pyzmq/api/zmq.html)

Installeras lättast mha pakethanteraren till python, [pip](http://pip.readthedocs.org/en/latest/installing.html):  
`pip install pyzmq`