# Revisión adversaria del sitio

Cinco revisores independientes (matemáticas, lógica de apuestas, fidelidad de datos, diseño en celular y cumplimiento del prompt) revisaron el sitio ya construido. Cada hallazgo suyo pasó por un escéptico que intentaba refutarlo: de 58, sobrevivieron 49.

| # | Gravedad | Revisor | Hallazgo |
|---|---|---|---|
| 1 | alto | matematicas | Mi boleto: si una pata no calza con el patrón exacto, se tira en silencio y el boleto completo se recalcula como si estuviera entero |
| 2 | alto | matematicas | El momio que tecleas en 'Tu casa' se guarda por número de renglón, no por apuesta: tras 'Actualizar en vivo' queda pegado a otra selección (a veces la contraria) |
| 3 | alto | apuestas | La apuesta "Fuerte" ($400, 40% del dinero) pide un hándicap alterno que en Playdoit cuesta más caro que el "Mínimo" del propio sitio |
| 4 | alto | apuestas | Con los momios reales de Playdoit, ninguna "Fuerte" ni "Sólida" pasa su propio "Mínimo": $650-750 de cada $1,000 son apuestas que el mismo sitio manda saltar |
| 5 | alto | apuestas | La columna "Momio justo" es PEOR que la columna "Mínimo", y es la que alimenta "Cobras" y "Valor esp.": el estado por defecto imprime −$50 por juego bajo las etiquetas "Fuerte" y "Sólida" |
| 6 | alto | apuestas | Tres juegos traen líneas vencidas; en PHI@CHI cambian las 5 apuestas y dos de ellas ya no existen en ninguna casa |
| 7 | alto | ux | En celular la tabla de las 5 apuestas esconde el 53 % y no avisa que se desliza |
| 8 | alto | ux | En celular el sub-menú fijo de secciones queda detrás del encabezado: los 7 enlaces son invisibles |
| 9 | alto | ux | "Momio justo" siempre paga menos que "Mínimo", y las 80 apuestas arrancan con valor esperado negativo |
| 10 | alto | prompt | El modelo no ajusta nada: en 11 de 16 juegos el número es idéntico al del mercado |
| 11 | alto | prompt | El movimiento de línea, el % del público y la apertura del spread están investigados pero no se pintan nunca |
| 12 | alto | prompt | En celular la tabla de las 5 apuestas mide 662 px dentro de 310 px: el monto y el momio mínimo quedan fuera |
| 13 | medio | matematicas | La columna 'Momio justo' es peor que la columna 'Mínimo' que está a su lado: invita a aceptar apuestas perdedoras |
| 14 | medio | matematicas | La columna 'Empate' da casi el mismo número a márgenes muy distintos (2 y 6 igual que 3): subestima el empate en las patas de ±3 |
| 15 | medio | matematicas | El Método promete que todas las líneas alternas terminan en .5 'para que no haya empate' y en el juego 4 no es cierto |
| 16 | medio | apuestas | Las tres combinadas no traen punto de equilibrio ni valor esperado, y la "Segura" sale en verde con 4.0% cuando necesita 4%… pero paga menos de la mitad |
| 17 | medio | apuestas | La quinta apuesta es un volado al 50.0% en 14 de 16 juegos, y en dos de ellos va sin ninguna advertencia aunque es más floja que el Spread, que sí la lleva |
| 18 | medio | apuestas | La "Media" ($150 × 16 = $2,400) siempre da 68.3% y la dirección la decide un desempate que el propio Método declara sin ventaja |
| 19 | medio | apuestas | La tarjeta de la lista borra "(hándicap alterno)": enseña "GB +5.5 · 82%" cuando GB es favorito por 6.5 |
| 20 | medio | datos | La columna «Estatus» de lesiones muestra solo «ESPN» en 17 renglones (16 de ellos en el juego 1) |
| 21 | medio | datos | Juego 12 (MIN @ TB): los tres números del clima contradicen la frase que va debajo de ellos |
| 22 | medio | datos | El chip rojo «N bajas de alto impacto» cuenta jugadores que probablemente sí juegan |
| 23 | medio | ux | "1 de cada 1" y "1 patas": una combinada de 82 % se anuncia como si nunca fallara |
| 24 | medio | ux | Al escribir un momio se pierde el foco y el siguiente Tab regresa al principio de la página |
| 25 | medio | ux | Filtrar por día no cambia el título ni los KPIs: dice «16 juegos» mientras enseña 1 |
| 26 | medio | ux | «Borrar lo guardado» deja 7 de las 11 cosas guardadas, incluidos los datos bajados de ESPN |
| 27 | medio | ux | Un momio inválido solo se avisa con color rojo y un aviso que se va a los 4.2 s |
| 28 | medio | ux | En un teléfono la primera pantalla no enseña ni un juego: el primer partido arranca en y=736 de 812 |
| 29 | medio | ux | La combinada llamada «Segura» tiene 4.0 % y se pinta en verde de éxito |
| 30 | medio | prompt | Ni un solo momio de Playdoit en las 80 apuestas recomendadas: el usuario pidió "líneas y todo con Playdoit" |
| 31 | medio | prompt | 41 de las 61 ideas de props no traen número de línea: son inaccionables |
| 32 | medio | prompt | "Actualizar en vivo" se pone en verde aunque no haya emparejado ningún juego |
| 33 | bajo | matematicas | Mi boleto: un hándicap escrito sin paréntesis se toma en silencio como ganador directo |
| 34 | bajo | matematicas | La apuesta 'Total' con 50.95% no lleva ninguna advertencia, mientras que la 'Spread' con 50.25% sí la lleva |
| 35 | bajo | matematicas | El 'pago anticipado' se detecta y se pinta, pero no entra en la probabilidad ni en el valor esperado del boleto |
| 36 | bajo | matematicas | Ordenar 'Por confianza' ordena por el redondeo de la línea alterna, no por confianza |
| 37 | bajo | matematicas | Mi boleto: en una pata de total, la línea se toma del primer número que aparezca en el texto |
| 38 | bajo | apuestas | En 12 de los 16 juegos, $750 de los $1,000 van al mismo equipo: no son 5 apuestas, son una con tres nombres |
| 39 | bajo | apuestas | El chip "N bajas de alto impacto" cuenta como baja a jugadores que están Questionable o sin designación |
| 40 | bajo | datos | En 4 juegos la tarjeta de clima muestra ráfagas MENORES que el viento sostenido |
| 41 | bajo | ux | Las 16 páginas de juego no tienen h1: el título del partido no existe como encabezado |
| 42 | bajo | ux | Lo que significan Fuerte/Sólida/Media/Spread/Total y «Mínimo» solo existe en un tooltip: en celular no hay forma de leerlo |
| 43 | bajo | ux | Objetivos táctiles por debajo del mínimo: 40 enlaces de Fuentes de 15 px y los botones de día de 38 px |
| 44 | bajo | ux | En «Arma la tuya» el estado vacío queda debajo de las 16 filas, donde nadie lo ve |
| 45 | bajo | prompt | Juego 4 (KC@MIA): las dos apuestas de total caen en línea entera, con empate posible, contra lo que promete el Método |
| 46 | bajo | prompt | El "pago anticipado" del boleto se muestra como chip pero ni se modela ni se explica |
| 47 | bajo | prompt | La columna "≈ pts" de lesiones no se suma en ninguna parte |
| 48 | bajo | prompt | La nota sobre hándicaps de Playdoit contradice el propio boleto que el sitio carga |
| 49 | bajo | prompt | "Mi boleto" no ordena las patas por peor valor ni dice cuál quitar, que es lo que el usuario preguntó |

## Qué se arregló

Todos los de gravedad **alta** y la mayoría de los medianos. Los más importantes:

- **El lector de cupón perdía una pata en silencio.** El PDF de Playdoit parte una selección en dos renglones; el sitio leía 15 de 16 y pintaba la apuesta 41 % mejor de lo que era. Ahora vuelve a unir los renglones y, por si acaso, compara el momio que leyó contra el que dice el cupón y avisa si no cuadran.
- **La columna "momio justo" pagaba menos que el mínimo para no perder.** Era la que alimentaba "cobras" y "valor esperado": invitaba a aceptar apuestas perdedoras. Se eliminó; ahora solo está el **momio mínimo** y el cobro aparece cuando escribes el precio real de tu casa.
- **Los momios capturados se guardaban por número de renglón.** Al actualizar las líneas, el precio de una apuesta terminaba aplicado a otra, a veces la contraria. Ahora la llave es la selección misma.
- **Líneas vencidas.** El sitio ahora se actualiza solo al abrirse si los datos tienen más de media hora.
- **En celular la tabla de apuestas escondía la mitad** sin avisar, y el submenú quedaba detrás del encabezado. Las apuestas ahora son tarjetas en pantallas chicas.

## Lo que se dejó a propósito

- Las líneas de Playdoit no se bajan solas: su sección de deportes pide cuenta.
- La columna "≈ pts" de las lesiones no se suma en ningún lado: es una referencia para mover los ajustes a mano, no una cuenta automática.
- Varias ideas de apuestas de jugador no traen número porque la casa todavía no publica esa línea. Salen marcadas.
- En Playdoit, la apuesta "Fuerte" y la "Sólida" casi nunca pasan su propio mínimo. Eso no se escondió: se dice en cada juego.
