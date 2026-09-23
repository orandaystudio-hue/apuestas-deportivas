# El prompt con el que se construyó

Sirve para rehacer el análisis de cualquier semana. Cambia lo que está entre llaves.

```
Actúa como Ingeniero Senior de análisis deportivo y modelado probabilístico (modos: Ingeniero para construir, Auditor para revisar tus propios números).

OBJETIVO
Construye un programa en UN SOLO archivo HTML (vanilla JS, sin Node, sin servidor) que analice todos los juegos de la semana {SEMANA} de la NFL {TEMPORADA} y recomiende apuestas.

DATOS (cada dato muestra su fuente y hora de consulta; si una fuente falla, dilo en pantalla, nunca inventes)
1. Calendario, marcadores y récords: ESPN (site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=2&week={SEMANA}&dates={TEMPORADA}).
2. Momios, spread, total y props: la casa que uses; guarda la línea de apertura y la actual para ver hacia dónde se movió.
3. Lesiones: reporte oficial (Out / Doubtful / Questionable), con la posición y el peso de cada jugador en su equipo.
4. Clima el día y la hora del juego: Open-Meteo con las coordenadas del estadio; si es domo o techo cerrado, clima = neutral.
5. Estadística por jugador y equipo: EPA por jugada, éxito por jugada, presión al QB, terceras oportunidades, zona roja, pérdidas de balón, penalidades.
6. Estadio: pasto natural o artificial, techo, altitud, zona horaria.

VARIABLES QUE EL MODELO DEBE MEDIR (cada una con su peso y un tope, visibles)
Forma de los últimos 3-5 juegos (no solo si ganó o perdió), rendimiento en casa y de visitante, rendimiento según la superficie y según el clima, viaje y husos horarios, días de descanso (jueves, lunes, semana libre), rival de división, cambio de QB, lesiones con peso según la posición, edad y experiencia de la plantilla (novatos vs. veteranos), calidad de la línea ofensiva contra la presión del rival, ritmo de juego, entrenador (agresividad en 4ª oportunidad), historial reciente entre ambos, y cuánto se ha movido la línea.

MODELO
- Parte del mercado (spread y momio sin comisión): no lo sustituyas.
- Ajusta con las variables anteriores; el total de ajustes nunca pasa de ±3 puntos sin avisar por qué.
- Convierte a probabilidades con una distribución normal (margen: desviación 13.5; total: 10.5) o con una simulación Monte Carlo de 10,000 juegos.
- Por cada apuesta, calcula el valor esperado contra el momio REAL de la casa.

APUESTAS
- {MONTO_POR_JUEGO} pesos por juego, en 5 apuestas: Fuerte (≥80%), Sólida, Media, Spread y Total. Si ninguna tiene valor esperado positivo, dilo y recomienda no apostar ese juego.
- Tres combinadas con todos los juegos (segura, realista, soñadora), con su probabilidad real de salir y lo que se cobra con {MONTO_COMBINADA}.

INTERFAZ
Lista de juegos → al entrar a uno: probabilidades, marcador esperado, todas las variables con su efecto en puntos, lesiones, clima, las 5 apuestas y controles para ajustar a mano. Tema oscuro, en español, que funcione en el celular.

REGLAS
- Ningún número sin fuente. Si falta un dato, se ve el hueco en pantalla.
- Separa lo que dice el mercado de lo que ajusta el modelo.
- Al terminar, audítate: busca doble conteo (p. ej., una lesión que el spread ya incluía) y dilo.
```

## Variables

- `{SEMANA}`, `{TEMPORADA}`
- `{MONTO_POR_JUEGO}` = 1000
- `{MONTO_COMBINADA}` = 100-150

## Cómo se hizo de verdad

No lo escribió un solo agente. Fueron tres tandas:

1. **Investigación** — un agente por juego (16), cada uno con su lista de fuentes.
2. **Verificación adversaria** — otro agente por juego (16), sin ver cómo se investigó, con el encargo de *tumbar* cada dato. Resultado: 260 correcciones y 94 datos borrados por no poder confirmarse.
3. **Revisión del sitio ya construido** — 5 revisores (matemáticas, lógica de apuestas, fidelidad de datos, diseño en celular y cumplimiento del prompt), y cada hallazgo suyo pasó por un escéptico que intentaba refutarlo. De 58 hallazgos, 49 sobrevivieron.

Lo que de verdad hizo la diferencia fue la regla de siempre: **quien escribe no verifica**.
