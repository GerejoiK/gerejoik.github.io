# VBT-Archiv

## Was ist das?
Da rappers.in nicht mehr die Möglichkeit bietet, die Verläufe der alten Turniere einzusehen, ist diese Webseite entstanden.  
Es werden json-Dateien ausgelesen, die die Informationen zu den einzelnen Turnieren enthalten und dann mithilfe von JavaScript leserlich auf [gerejoik.github.io](https://gerejoik.github.io) dargestellt.

## Woher kommen die Daten?
Bisher kommen alle Daten vom [Internet Archive](https://web.archive.org) und wurden mithilfe von Skripten extrahiert.  
Allerdings war es nicht möglich alle Daten richtig zu extrahieren, weil
* manche Seiten nicht archiviert sind
* das HTML absolut schlecht geschrieben war
* es manchmal Sonderfälle gab, für die sich ein Skript nicht gelohnt hätte
* die Daten falsch sind

Deshalb würde ich mich über Hilfe freuen, die Daten zu korrigieren/zu vervollständigen.

## Wie kann ich helfen?
Die Daten sind nach diesem Prinzip aufgebaut:
```
{
   "Vorrunde 1":[
      {
         "link":"http://www.rappers.in/en/vbt_2010-Monte-Rap-vs-Sichtwaise+aka+Masafakka-378.html",
         "tn1":"Monte-Rap",
         "tn2":"Sichtwaise aka Masafakka",
         "hr1":"http://www.youtube.com/embed/b2hsDklSZag",
         "hr2":"http://www.youtube.com/embed/Zi-HN8h3AuI",
         "rr1":"",
         "rr2":"",
         "beats":"",
         "ergebnis":"4:2"
      }
    ],
    [{...}],
    ...
}
```
* link: Direktlink zur eigentlichen Seite
* tn1/tn2: jeweiliger Teilnehmer zu einem Battle
* hr1/hr2/rr1/rr2: Link zu einem Upload der HR1/HR2/...
* beats: Beatname oder auch Link
* ergebnis: Ergebnis des Battles

link, hr1, hr2, rr1, rr2 und beats können auch Arrays sein, sollte es mehrere dazu geben.  
Für Runden und Beats sind auch Reuploads erlaubt bzw. erwünscht.  
Dabei ist es egal, ob sich diese auf YouTube befinden oder anderen Platformen wie Dailymotion, MySpace, Twitter, BitChute, Mega, zippyshare, ...  
Also jede Seite, die Dateien entgegennimmt und auch für einen unbegrenzten oder zumindest längeren Zeitraum bereitstellt.  
Falls bei einem Link nur die Audio, oder nur ein Teil der gesamten Runden verfügbar ist, ist das nicht schlimm und trotzdem gern gesehen. 
Änderungen entweder per Pull-Request, Issue oder Mail [GerejoiK@protonmail.com](mailto:GerejoiK@protonmail.com)

## Darf ich ein neues Turnier hinzufügen?
Ja, das ist immer erwünscht.  
Dabei ist auch irrelevant, ob es von rappers.in veranstaltet wurde oder nicht.  
Dafür ist im Root-Verzeichnis die Datei data.json, wo bei "name" der zu anzuzeigende Name eingefügt wird und bei "normalized" der Name des Ordners, wo die Informationen zum Turnier liegen.  

## Es gibt etwas anderes, das mich stört
Dafür einfach einen Issue eröffnen oder per Mail.
