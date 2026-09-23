# Arma Downloads\nfl-semana3\index.html con los JSON verificados.
import json, glob, os, sys, datetime, re

AQUI = os.path.dirname(os.path.abspath(__file__))     # carpeta constructor/
RAIZ = os.path.dirname(AQUI)                          # carpeta del proyecto
HERE = os.path.join(RAIZ, 'datos')                    # de aquí salen los JSON
OUT_DIR = RAIZ                                        # aquí se escribe index.html
os.makedirs(OUT_DIR, exist_ok=True)

def load(p):
    with open(p, encoding='utf-8-sig') as f:
        return json.load(f)

games, problems = [], []
for p in sorted(glob.glob(os.path.join(HERE, 'game-*.json'))):
    try:
        g = load(p)
    except Exception as e:
        problems.append(f'{os.path.basename(p)}: JSON inválido ({e})'); continue
    games.append(g)

verify = load(os.path.join(HERE, 'verify.json')) if os.path.exists(os.path.join(HERE, 'verify.json')) else {}
league = load(os.path.join(HERE, 'league.json')) if os.path.exists(os.path.join(HERE, 'league.json')) else None

DAY = {'Jueves': 24, 'Domingo': 27, 'Lunes': 28}
for g in games:
    gid = g.get('id')
    for k in ['id', 'away', 'home', 'kickoff_utc', 'venue', 'lines', 'teams', 'model']:
        if k not in g: problems.append(f'#{gid}: falta {k}')
    t = g.get('teams', [])
    if len(t) != 2 or t[0].get('side') != 'away' or t[1].get('side') != 'home':
        problems.append(f'#{gid}: teams no es [visitante, local]')
    try:
        k = datetime.datetime.fromisoformat(g['kickoff_utc'].replace('Z', '+00:00'))
        cdmx = k - datetime.timedelta(hours=6)
        want = DAY.get(g.get('day_label'))
        if want and cdmx.day != want:
            problems.append(f"#{gid}: {g.get('day_label')} pero en CDMX cae el {cdmx.day}")
    except Exception as e:
        problems.append(f'#{gid}: kickoff_utc inválido ({g.get("kickoff_utc")})')
    L = g.get('lines', {})
    for k in ['spread_home', 'total', 'ml_away', 'ml_home']:
        if not isinstance(L.get(k), (int, float)):
            problems.append(f'#{gid}: línea {k} no numérica')
    if isinstance(L.get('ml_away'), (int, float)) and isinstance(L.get('ml_home'), (int, float)) and isinstance(L.get('spread_home'), (int, float)):
        home_fav_ml = L['ml_home'] < L['ml_away']
        if L['spread_home'] != 0 and home_fav_ml != (L['spread_home'] < 0):
            problems.append(f'#{gid}: spread y moneyline señalan favoritos distintos')
    v = verify.get(str(gid))
    if v: g['_verify'] = v
    # clima del agente de liga: Open-Meteo a la hora del juego, medido el 22 sep (su campo "covered" = techado)
    if league and t:
        norm = lambda a: {'WSH': 'WAS'}.get((a or '').upper(), (a or '').upper())
        for w in league.get('weather', []):
            if norm(w.get('home')) == norm(t[1].get('abbr')):
                v = g.setdefault('venue', {})
                if v.get('lat') is None: v['lat'], v['lon'] = w['lat'], w['lon']
                if not w.get('covered') and w.get('temp_c') is not None:
                    wx = dict(g.get('weather') or {})
                    # los agentes cruzaron NWS/AccuWeather/Open-Meteo: sus números mandan.
                    # Open-Meteo solo rellena lo que falte, para no contradecir el texto.
                    for campo, valor in [('temp_c', w.get('temp_c')), ('wind_kmh', w.get('wind_kmh')),
                                         ('gust_kmh', w.get('gust_kmh')), ('precip_pct', w.get('precip_pct')),
                                         ('humidity', w.get('humidity'))]:
                        if wx.get(campo) is None and valor is not None: wx[campo] = valor
                    # una ráfaga menor que el viento sostenido es imposible: se quita
                    if wx.get('gust_kmh') is not None and wx.get('wind_kmh') is not None and wx['gust_kmh'] < wx['wind_kmh']:
                        wx.pop('gust_kmh')
                    wx.setdefault('is_forecast', True)
                    if not wx.get('source'): wx['source'] = 'Open-Meteo, 22 sep'
                    g['weather'] = wx
                break
        else:
            problems.append(f'#{gid}: sin clima del agente de liga para {t[1].get("abbr")}')

games.sort(key=lambda g: g.get('id', 99))
ids = [g.get('id') for g in games]
missing = [i for i in range(1, 17) if i not in ids]
if missing: problems.append(f'faltan juegos: {missing}')

ticket = open(os.path.join(HERE, 'ticket.txt'), encoding='utf-8').read() if os.path.exists(os.path.join(HERE, 'ticket.txt')) else ''
data = {'games': games, 'league': {'notes': league.get('notes')} if league else None,
        'meta': {'researched': sys.argv[1] if len(sys.argv) > 1 else '', 'built': datetime.datetime.now().isoformat(timespec='minutes'), 'ticket': ticket}}
tpl = open(os.path.join(AQUI, 'template.html'), encoding='utf-8').read()
live = open(os.path.join(AQUI, 'live.js'), encoding='utf-8').read() if os.path.exists(os.path.join(AQUI, 'live.js')) else ''
js = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
html = tpl.replace('/*__DATA__*/{"games":[],"league":null,"meta":{}}', js, 1).replace('/*__LIVE__*/', live, 1)
assert js in html, 'no se inyectaron los datos'
out = os.path.join(OUT_DIR, 'index.html')
open(out, 'w', encoding='utf-8').write(html)
print(f'OK {out} · {len(games)} juegos · {len(html)//1024} KB')
for p in problems: print('PROBLEMA:', p)
