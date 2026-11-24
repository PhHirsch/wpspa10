"""Haus-Katalog: frei kombinierbare Teile. Felder: id, slot, name, price, lvl, months, unit, stars (Sterne-Bedingung), kind, color."""
import json
H = []
def add(id, slot, name, price=0, **kw): H.append(dict(id=id, slot=slot, name=name, price=price, **kw))

# Untergrund
add("g-grass", "ground", "Césped verde", kind="grass", color="#79b955")
add("g-meadow", "ground", "Prado de flores", 80, kind="meadow", color="#86c25e")
add("g-weser", "ground", "Orilla del Weser", 150, kind="weser", color="#73b052")
add("g-beach", "ground", "Playa", 200, kind="beach", color="#ecd79a")
add("g-snow", "ground", "Nieve", 120, kind="snow", color="#f4f8fc", months=[12, 1, 2])
add("g-autumn", "ground", "Hojas de otoño", 100, kind="autumn", color="#b8913f", months=[10, 11])
add("g-desert", "ground", "Desierto", 180, kind="desert", color="#e2bd78")
add("g-moon", "ground", "Superficie lunar 🌙", 700, lvl=5, kind="moon", color="#b9bcc6")
add("g-candy", "ground", "País de los caramelos 🍭", 800, lvl=6, kind="candy", color="#f7a8cf")
add("g-lava", "ground", "Isla de lava 🌋", 1200, lvl=8, stars=40, kind="lava", color="#3a2a2a")

# Wände (Material) – Farbe kommt aus „wcolor“
add("w-plaster", "wall", "Revoque", kind="plaster")
add("w-wood", "wall", "Tablas de madera", 80, kind="wood")
add("w-brick", "wall", "Ladrillos", 120, kind="brick")
add("w-timber", "wall", "Entramado (como en Höxter)", 200, kind="timber")
add("w-log", "wall", "Troncos", 220, kind="log")
add("w-stone", "wall", "Piedra", 250, kind="stone")
add("w-glass", "wall", "Cristal (moderno)", 400, lvl=4, kind="glass")
add("w-rainbow", "wall", "Rayas arcoíris 🌈", 600, lvl=5, kind="rainbow")
add("w-gold", "wall", "Oro 👑", 1500, lvl=9, stars=50, kind="gold")

# Wandfarben
for i, (k, n, c, p) in enumerate([("cream", "Crema", "#efe3c8", 0), ("white", "Blanco", "#f4f4f2", 30), ("sky", "Azul cielo", "#a9cdea", 40),
                                   ("mint", "Menta", "#b5e0c4", 40), ("rose", "Rosa", "#f2b8c6", 40), ("sun", "Amarillo sol", "#f5d36b", 40),
                                   ("peach", "Melocotón", "#f4b98e", 40), ("lilac", "Lila", "#c7b4e6", 50), ("grey", "Gris piedra", "#a9adb3", 40),
                                   ("red", "Rojo granero", "#b5453a", 60), ("navy", "Azul marino", "#3b4f7a", 60), ("black", "Negro", "#34363b", 80), ("neon", "Verde neón ⚡", "#7cff4f", 300)]):
    add(f"wc-{k}", "wcolor", n, p, color=c)

# Dächer
add("r-gable", "roof", "Tejado a dos aguas", kind="gable")
add("r-hip", "roof", "Tejado a cuatro aguas", 100, kind="hip")
add("r-flat", "roof", "Tejado plano", 100, kind="flat")
add("r-green", "roof", "Tejado verde (jardín arriba)", 250, kind="green")
add("r-thatch", "roof", "Tejado de paja", 250, kind="thatch")
add("r-pagoda", "roof", "Tejado de pagoda", 400, lvl=4, kind="pagoda")

# Dachfarben
for k, n, c, p in [("red", "Rojo teja", "#b8442f", 0), ("brown", "Marrón", "#7a4a2c", 30), ("slate", "Pizarra", "#4a5260", 40), ("green", "Verde", "#3f7a45", 50),
                   ("blue", "Azul", "#2f5d9a", 50), ("black", "Negro", "#2a2a2e", 50), ("purple", "Morado", "#6a3fa0", 80), ("pink", "Rosa chicle", "#e0679a", 100), ("gold", "Oro ✨", "#e2b23a", 600)]:
    add(f"rc-{k}", "rcolor", n, p, color=c)

# Fenster
add("win-classic", "window", "Ventanas clásicas", kind="classic")
add("win-shutter", "window", "Ventanas con contraventanas", 80, kind="shutter")
add("win-round", "window", "Ventanas redondas", 100, kind="round")
add("win-arch", "window", "Ventanas en arco", 120, kind="arch")
add("win-wide", "window", "Ventanas panorámicas", 150, kind="wide")
add("win-stained", "window", "Vidrieras", 300, lvl=3, kind="stained")
add("win-heart", "window", "Ventanas de corazón 💖", 400, lvl=4, kind="heart")

# Türen
add("d-wood", "door", "Puerta de madera", kind="door", color="#6b4226")
add("d-red", "door", "Puerta roja", 50, kind="door", color="#c0392b")
add("d-blue", "door", "Puerta azul", 50, kind="door", color="#2f5d9a")
add("d-arch", "door", "Puerta en arco", 120, kind="arch", color="#5a3a1a")
add("d-glass", "door", "Puerta de cristal", 150, kind="glass", color="#3a3f48")
add("d-castle", "door", "Portón de castillo", 350, lvl=4, kind="castle", color="#4a3220")
add("d-space", "door", "Escotilla espacial 🚀", 600, lvl=6, kind="space", color="#9aa4b4")

# Dach-Extras
add("rx-none", "roofx", "Nada")
add("rx-chimney", "roofx", "Chimenea con humo", 80, kind="chimney")
add("rx-solar", "roofx", "Placas solares", 150, kind="solar")
add("rx-dish", "roofx", "Antena parabólica", 120, kind="dish")
add("rx-flag", "roofx", "Bandera", 100, kind="flag")
add("rx-rooster", "roofx", "Veleta de gallo", 120, kind="rooster")
add("rx-turbine", "roofx", "Aerogenerador", 250, kind="turbine")
add("rx-lights", "roofx", "Luces de Navidad 🎄", 150, kind="lights", months=[12, 1])
add("rx-telescope", "roofx", "Telescopio", 400, lvl=5, kind="telescope")
add("rx-heli", "roofx", "Helipuerto 🚁", 900, lvl=7, stars=35, kind="heli")

# Zaun
add("f-none", "fence", "Sin valla")
add("f-picket", "fence", "Valla blanca", 80, kind="picket", color="#f4f4f2")
add("f-wood", "fence", "Valla de madera", 80, kind="picket", color="#8a5a32")
add("f-hedge", "fence", "Seto", 120, kind="hedge", color="#3f8a3a")
add("f-stone", "fence", "Muro de piedra", 180, kind="stone", color="#a9a49a")
add("f-lights", "fence", "Guirnalda de luces ✨", 200, kind="lights", color="#7a5a32", months=[11, 12, 1])

# Garten (gleiche Liste für alle Garten-Plätze)
add("y-none", "yard", "Vacío")
add("y-tree", "yard", "Roble", 60, kind="tree")
add("y-pine", "yard", "Pino", 60, kind="pine")
add("y-apple", "yard", "Manzano", 90, kind="apple")
add("y-flowers", "yard", "Macizo de flores", 70, kind="flowers")
add("y-veg", "yard", "Huerto", 90, kind="veg")
add("y-bench", "yard", "Banco de jardín", 80, kind="bench")
add("y-bbq", "yard", "Barbacoa", 120, kind="bbq")
add("y-doghouse", "yard", "Caseta de perro", 150, kind="doghouse")
add("y-gnomes", "yard", "Gnomos de jardín", 150, kind="gnomes")
add("y-trampoline", "yard", "Cama elástica", 200, kind="trampoline")
add("y-swing", "yard", "Columpio", 200, kind="swing")
add("y-pond", "yard", "Estanque con patos", 220, kind="pond")
add("y-car", "yard", "Coche familiar", 300, kind="car")
add("y-pool", "yard", "Piscina", 400, stars=15, kind="pool")
add("y-boat", "yard", "Barco del Weser", 350, kind="boat")
add("y-corvey", "yard", "Mini Corvey (Höxter)", 500, stars=20, kind="corvey")
add("y-fountain", "yard", "Fuente", 450, lvl=4, kind="fountain")
add("y-xmas", "yard", "Árbol de Navidad 🎄", 150, kind="xmas", months=[12, 1])
add("y-snowman", "yard", "Muñeco de nieve ⛄", 100, kind="snowman", months=[12, 1, 2])
add("y-pumpkins", "yard", "Calabazas 🎃", 100, kind="pumpkins", months=[10, 11])
add("y-eggs", "yard", "Huevos de Pascua 🐣", 100, kind="eggs", months=[3, 4])
add("y-dino", "yard", "Estatua de dinosaurio 🦖", 700, lvl=6, kind="dino")
add("y-ufo", "yard", "OVNI aterrizado 🛸", 1000, lvl=7, kind="ufo")
add("y-rocket", "yard", "Cohete 🚀", 1500, lvl=9, stars=50, kind="rocket")
# Unit-Teile (erscheinen erst, wenn die Unit freigeschaltet ist) – Apúntate 2
add("y-piragua", "yard", "Piragua", 150, unit=1, kind="piragua")
add("y-bicimontana", "yard", "Bici de montaña", 200, unit=1, kind="bici")
add("y-escenario", "yard", "Escenario de la banda", 250, unit=2, kind="escenario")
add("y-horreo", "yard", "Hórreo gallego", 300, unit=3, kind="horreo")
add("y-faro", "yard", "Faro", 400, unit=3, kind="faro")
add("y-fruteria", "yard", "Puesto de mercado", 250, unit=9, kind="puesto")
# Adventskalender (erst nach 24 Türchen kaufbar)
add("y-pinata", "yard", "Piñata de estrella gigante", 100, kind="pinata", adv=24)

HSLOTS = ["ground", "wall", "wcolor", "roof", "rcolor", "window", "door", "roofx", "fence", "yard1", "yard2", "yard3", "yard4"]
HDEFAULT = {"ground": "g-grass", "wall": "w-plaster", "wcolor": "wc-cream", "roof": "r-gable", "rcolor": "rc-red", "window": "win-classic",
            "door": "d-wood", "roofx": "rx-none", "fence": "f-none", "yard1": "y-none", "yard2": "y-none", "yard3": "y-none", "yard4": "y-none"}
STAGES = [0, 5, 12, 20, 30, 45, 65]          # Sterne für Zelt, Hütte, Häuschen, Haus, großes Haus, Villa, Anwesen
YARD_STAGE = {"yard1": 1, "yard2": 2, "yard3": 4, "yard4": 5}

if __name__ == "__main__":
    ids = [h["id"] for h in H]; assert len(ids) == len(set(ids))
    print(len(H), "Hausteile")
