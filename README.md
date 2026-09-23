# Apuestas deportivas

Dos páginas que analizan partidos y proponen apuestas. Son archivos sueltos: se abren con doble clic, sin instalar nada.

| Archivo | Qué es |
|---|---|
| `index.html` | NFL, semana 3 de 2026. Los datos van **dentro** del archivo (los investigaron y verificaron 33 agentes). |
| `futbol.html` | Liga MX, LaLiga, Champions, Premier, Serie A, Bundesliga y Ligue 1. **Baja los partidos solo** de ESPN cada vez que se abre. |

## Cómo se usa

1. Abre `index.html`. Las líneas se actualizan solas si tienen más de media hora.
2. Entra a un juego: ahí están los equipos, lesiones, clima, campo, estadística y **5 apuestas que reparten $1,000**.
3. En la columna **"Momio mínimo"** está lo que esa apuesta tiene que pagarte para no perder dinero a la larga. Compara contra tu casa de apuestas: si te paga menos, sáltala.
4. Escribe el momio que te ofrecen en **"Tu casa"** y el sitio calcula cuánto cobras y si tiene valor.
5. En **"Mi boleto"** pegas el texto de tu cupón y te dice la probabilidad real, lo que necesitas para salir a mano y qué patas te están cobrando de más.

## El modelo

Parte del mercado. Las casas ya meten lo público (lesiones conocidas, récords, forma), así que ganarles no es cosa de "saber más de futbol americano", sino de encontrar lo que dejaron fuera.

**NFL:** promedia el margen que implica el spread con el que implica el moneyline sin comisión, y de ahí saca probabilidades con una distribución normal (desviación de 13.5 puntos en el margen y 10.5 en el total). Los ajustes propios están topados en ±3 puntos de margen y ±4 de total, y cada uno se ve en pantalla con su razón.

**Futbol:** busca los goles esperados de cada equipo que reproducen los momios de 1X2 y el más/menos (Poisson con corrección de Dixon-Coles, porque Poisson solo subestima los empates). Ajusta por altura de la sede y goles de la temporada, con tope de ±0.25 goles.

**Lo que ninguno hace:** garantizar nada. El valor esperado casi siempre es negativo, que es justo lo que el sitio te enseña en vez de esconderlo.

## Carpetas

- `datos/` — los 16 juegos ya investigados y verificados (`game-01..16.json`), el clima y las pruebas de APIs (`league.json`), el resumen de la verificación adversaria (`verify.json`), los 49 hallazgos de la revisión (`hallazgos-revision.json`) y un cupón de ejemplo (`ticket.txt`).
- `constructor/` — con esto se vuelve a armar `index.html`:

```bash
python constructor/build.py "22 sep 2026 · 16 juegos · 33 agentes"
```

`build.py` toma `constructor/template.html` (el sitio sin datos), `constructor/live.js` (la conexión con ESPN) y los JSON de `datos/`, y escribe el `index.html` final. También valida: que el día de la semana cuadre, que el visitante y el local no estén al revés y que el spread y el moneyline señalen al mismo favorito.

> Ojo: `build.py` lee los JSON de la carpeta donde vive y escribe en `Downloads\nfl-semana3\index.html`. Si mueves las carpetas, ajusta `HERE` y `OUT_DIR` al principio del archivo.

## Para la semana siguiente

Los datos de la NFL son de una semana concreta: hay que volver a investigarlos. El de futbol no, ese se actualiza solo.

## De dónde salen los datos

ESPN (calendario, marcadores, líneas de DraftKings, tabla de posiciones y reporte de lesiones) y Open-Meteo (clima a la hora exacta del juego). Los datos de la NFL los investigó un agente por juego y los verificó otro distinto, con fuentes independientes: 260 correcciones y 94 datos borrados por no poder confirmarse.

Las líneas de Playdoit no se pueden bajar: su sección de deportes pide cuenta.

## Aviso

Esto es un análisis, no una garantía. Apuesta solo lo que puedas perder.
