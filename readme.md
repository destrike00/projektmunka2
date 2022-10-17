Leírás csak nekünk, később delete helyette meg rendes readme
https://github.com/WiringPi/WiringPi-Python
Pythonban fogjuk megírni azt a kis kódocskát ami érzékelésre küld egy POST-ot a szerónak, hogy a szoftvert futtató pi a saját xy koordinátáján átbillentette a foglaltságot. Szerencsére pythonnal könnyű és el tudjuk küldeni Jánosnak ezt a libet amit egyébként én már élesben is használtam csak C-vel, de szerencsére van pythonhoz is, amivel lehet postolni agyrák nélkül, innen ha kell ki is szedem azokat a függvényeket mutatóba ami kéne, gyakorlatilag a pint kell inicializálni hogy mit figyelünk, oda felhúzóellenállás aztán viszlát figyeljük a változást, az triggerel.

Igértünk egy adatbázist, ez végülis ha kell ha nem megvalósul mert valamiből dolgoznia kell a backendnek.
Ezt teljesmértékben rátok bízom, 1 vagy 2 táblára van szükség alapvetően, de tudok javasolni egy django+postgresql kombót
Merthogy igértünk webes felületet is aminek kell egy tápos backend hogy könnyen dolgozzunk api endpointokkal és modellekkel
Ez viszont jó nekünk mert így nem kell hakkolni a kódban hogy terminálban megjelenítsünk szarokat hanem kirendereli majd a frontend

Jó felosztás lehet:
Adri:adatbázis létrehozása (pgadmin?) egyelőre 2 táblával csak hogy valami kapcsolat legyen benne, még agyalunk rajta csak a struktúra létezzen

Krisztián(+Adri ha kell és kevés a sajátja):utánanézni hogyan csinálunk djangoban api viewt, szükség van egy GET-re ami visszadobja valamilyen ésszerű struktúrában mi a helyzet az összes parkolóhellyel, esetlegesen bónuszként specifikus parkolóhelyet lehessen lekérdezni (id-val pl.) és akkor van foglalórendszerhez egy jövőbetekintésünk amit tudunk mutogatni, plusz kontent. És kell egy POST (id-val) ami befrissíti a parkolóhely foglaltságát.

Peti(+én ha kellek): A "raspberrynken" futtatandó python kód amiben besetteljük az eszköz pozícióját (id), és érzékelésre (nálunk nyilván kézzel való meghívásra) küld egy POST-ot Krisztiánék endpointjára hogy el lett foglalva a hely, ugyanez elhagyással.

Én: Webpage ami folyamatosan figyeli a backendet és kirajzolja globálban meg emeletekre lebontva mi az ábra.

Ha van kérdés hogy valamit hogy gondoltam stb keressetek külön is, de fogunk még együtt is beszélni

https://www.youtube.com/watch?v=njEkyDmyr1s
  

