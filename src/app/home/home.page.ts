import {
  Component, OnDestroy, computed, signal, inject, ChangeDetectionStrategy
} from '@angular/core';
import { Operator, Loadout } from '../models/operator.model';
import { OPERATORS, getImageUrl } from '../data/operators';
import { I18nService } from '../services/i18n.service';

type Filter = 'all' | 'attacker' | 'defender';

type OperatorProfile = {
  maps: string[];
  tip: { en: string; es: string };
};

const OPERATOR_PROFILES: Record<string, OperatorProfile> = {
  sledge: {
    maps: ['Chalet','Bank','Clubhouse','Oregon','Consulate'],
    tip: {
      en: 'Use Sledge to open soft walls and floors quickly. Push with a team mate and smash through rotation holes or hatches to split defenders.',
      es: 'Usa a Sledge para abrir paredes y suelos blandos con rapidez. Avanza con un aliado y rompe rotaciones o tragaluces para dividir a los defensores.',
    }
  },
  ash: {
    maps: ['Border','Kanal','Oregon','Clubhouse','Coastline'],
    tip: {
      en: 'Ash excels at fast entry and room clearing. Fire breaching rounds from a distance, then use speed to capitalize on early pressure.',
      es: 'Ash destaca en entradas rápidas y limpiar habitaciones. Dispara sus proyectiles de brecha a distancia y aprovecha su velocidad para presionar desde el inicio.',
    }
  },
  thermite: {
    maps: ['Bank','Kafe Dostoyevsky','Clubhouse','Consulate','Oregon'],
    tip: {
      en: 'Thermite should open reinforced walls and hatches for the team. Coordinate with hard breachers and use his utility to create new lines of sight.',
      es: 'Thermite debe abrir paredes y tragaluces reforzados para el equipo. Coordina con los demás y usa su carga para crear nuevas líneas de visión.',
    }
  },
  twitch: {
    maps: ['Consulate','Clubhouse','Kanal','Oregon','Coastline'],
    tip: {
      en: 'Use Twitch to deny gadgets and pressure defenders. Hack cameras, disable utility, and open new attack paths while staying mobile.',
      es: 'Usa a Twitch para negar gadgets y presionar a los defensores. Hackea cámaras, desactiva utilidades y abre nuevas rutas de ataque mientras te mueves.',
    }
  },
  montagne: {
    maps: ['Clubhouse','Bank','Hereford Base','Border','Kafe Dostoyevsky'],
    tip: {
      en: 'Montagne is best on frontal pushes and safe plant cover. Stay with teammates while extending the shield to soak fire and create pressure.',
      es: 'Montagne brilla en empujes frontales y cobertura de planta segura. Quédate con el equipo mientras extiendes el escudo para absorber fuego y generar presión.',
    }
  },
  glaz: {
    maps: ['Coastline','Kanal','Skyscraper','Oregon','Clubhouse'],
    tip: {
      en: 'Glaz should hold long sightlines and deny windows. Use zoomed vision to cover rotates and pick off anchors from a distance.',
      es: 'Glaz debe cubrir líneas largas y negar ventanas. Usa su visión de zoom para vigilar rotaciones y eliminar anclajes desde lejos.',
    }
  },
  fuze: {
    maps: ['Kafe Dostoyevsky','Clubhouse','Bank','Oregon','Chalet'],
    tip: {
      en: 'Fuze is strong on bomb sites with soft floors. Launch cluster charges through ceilings and punish defenders hiding in common rooms.',
      es: 'Fuze es fuerte en sitios con suelos blandos. Lanza cargas por los techos y castiga a defensores escondidos en habitaciones comunes.',
    }
  },
  blitz: {
    maps: ['Bank','Consulate','Clubhouse','Oregon','Kanal'],
    tip: {
      en: 'Blitz is a close-range flanker. Flash enemies with your shield, then close the distance to finish off stunned defenders.',
      es: 'Blitz es un flanqueador de corta distancia. Ciega enemigos con el escudo y acércate para rematar a los defensores aturdidos.',
    }
  },
  iq: {
    maps: ['Border','Kanal','Clubhouse','Consulate','Oregon'],
    tip: {
      en: 'IQ is perfect for hunting electronics and clearing roamers. Keep moving and spot gadgets from a distance to help your team enter safely.',
      es: 'IQ es ideal para cazar electrónicos y despejar roamers. Muévete con fluidez y detecta gadgets desde lejos para ayudar a tu equipo a entrar seguro.',
    }
  },
  buck: {
    maps: ['House','Chalet','Kanal','Clubhouse','Bank'],
    tip: {
      en: 'Buck shines on vertical play and soft destruction. Open floors and make quick peek angles while supporting an aggressive entry.',
      es: 'Buck brilla en juego vertical y destrucción blanda. Abre suelos y crea ángulos de peek rápidos mientras apoyas una entrada agresiva.',
    }
  },
  blackbeard: {
    maps: ['Bank','Kanal','Clubhouse','Consulate','Border'],
    tip: {
      en: 'Blackbeard should duel through long sightlines and protect himself with the rifle shield. Peek windows carefully and trade utility for info.',
      es: 'Blackbeard debe pelear en líneas largas y protegerse con su escudo. Mira ventanas con cuidado y cambia utilidades por información.',
    }
  },
  capitao: {
    maps: ['Border','Consulate','Kanal','Clubhouse','Oregon'],
    tip: {
      en: 'Capitão is excellent for area denial and plant cover. Use fire bolts to block rotations and smoke to conceal pushes.',
      es: 'Capitão es excelente para negar zonas y proteger la planta. Usa sus tornillos de fuego para cortar rotaciones y humo para cubrir avances.',
    }
  },
  hibana: {
    maps: ['Kafe Dostoyevsky','Oregon','Bank','Clubhouse','Coastline'],
    tip: {
      en: 'Hibana can open reinforced walls at range. Focus on creating vertical pressure and soft breaches when the team needs an alternate entry.',
      es: 'Hibana puede abrir paredes reforzadas a distancia. Enfócate en crear presión vertical y brechas blandas cuando el equipo necesite una entrada alternativa.',
    }
  },
  jackal: {
    maps: ['Oregon','Clubhouse','Bank','Consulate','Kanal'],
    tip: {
      en: 'Jackal is built to hunt roamers. Track footsteps on his scanner and force defenders back into site with coordinated pressure.',
      es: 'Jackal está diseñado para cazar roamers. Sigue huellas con su escáner y fuerza a los defensores a retroceder hacia el sitio con presión coordinada.',
    }
  },
  ying: {
    maps: ['Consulate','Clubhouse','Kafe Dostoyevsky','Bank','Oregon'],
    tip: {
      en: 'Ying excels at disorienting anchors and clearing rooms. Use her Candela charges to force defenders out of entrenched positions.',
      es: 'Ying sobresale en desorientar anclajes y limpiar habitaciones. Usa sus Candelas para forzar a los defensores a salir de posiciones fijas.',
    }
  },
  zofia: {
    maps: ['Consulate','Clubhouse','Bank','Kafe Dostoyevsky','Oregon'],
    tip: {
      en: 'Zofia is a flexible entry fragger. Use her concussion grenades to force defenders out and bully important angles early.',
      es: 'Zofia es una fragger flexible. Usa sus concusiones para forzar a los defensores y dominar ángulos importantes temprano.',
    }
  },
  dokkaebi: {
    maps: ['Clubhouse','Bank','Consulate','Oregon','Kafe Dostoyevsky'],
    tip: {
      en: 'Dokkaebi is great for information and flanking. Hack defender phones to create chaos, then use the callout to attack soft spots.',
      es: 'Dokkaebi es genial para obtener información y flanquear. Hackea los teléfonos defensores para crear caos y ataca las zonas blandas con aviso.',
    }
  },
  lion: {
    maps: ['Bank','Consulate','Kanal','Clubhouse','Kafe Dostoyevsky'],
    tip: {
      en: 'Lion can lock down rotations with his scan. Use it before a push to catch defenders moving or to deny late retakes.',
      es: 'Lion puede bloquear rotaciones con su escaneo. Úsalo antes del empuje para atrapar defensores en movimiento o negar remontadas.',
    }
  },
  finka: {
    maps: ['Clubhouse','Bank','Kanal','Chalet','Consulate'],
    tip: {
      en: 'Finka boosts the team with adrenaline. Push with your squad after activating the boost and use throwables to clear common positions.',
      es: 'Finka potencia al equipo con adrenalina. Avanza con tu escuadrón tras activar el boost y usa granadas para despejar posiciones comunes.',
    }
  },
  maverick: {
    maps: ['Bank','Kafe Dostoyevsky','Clubhouse','Oregon','Consulate'],
    tip: {
      en: 'Maverick is perfect for quiet hard breach. Use his torch to open hatches and reinforced walls without alerting the site.',
      es: 'Maverick es perfecto para brechas silenciosas. Usa su antorcha para abrir tragaluces y paredes reforzadas sin alertar al sitio.',
    }
  },
  nomad: {
    maps: ['Kanal','Clubhouse','Bank','Coastline','Oregon'],
    tip: {
      en: 'Nomad can deny pushes with Airjab traps. Place them on common reinforcement routes and use her weapon to cover the entry.',
      es: 'Nomad puede negar avances con trampas Airjab. Colócalas en rutas comunes y cubre la entrada con su arma.',
    }
  },
  gridlock: {
    maps: ['Clubhouse','Kanal','Coastline','Oregon','Bank'],
    tip: {
      en: 'Gridlock controls space with Trax Stingers. Lock down key flanks and force defenders to move through choke points.',
      es: 'Gridlock controla el espacio con Trax Stingers. Cierra flancos clave y obliga a los defensores a moverse por puntos estrechos.',
    }
  },
  nokk: {
    maps: ['Clubhouse','Kanal','Border','Coastline','Oregon'],
    tip: {
      en: 'Nøkk excels at sneaky entry and roam denial. Stay silent, use her gadget to avoid cameras, and punish distracted defenders.',
      es: 'Nøkk destaca en entradas sigilosas y negar roamers. Mantente silenciosa, usa su gadget para evitar cámaras y castiga a defensores distraídos.',
    }
  },
  amaru: {
    maps: ['Kafe Dostoyevsky','Clubhouse','Bank','Consulate','Oregon'],
    tip: {
      en: 'Amaru offers surprise vertical plays with her grappling hook. Use it to reach unexpected windows or start a rush from the balcony.',
      es: 'Amaru ofrece jugadas verticales sorpresa con su gancho. Úsalo para alcanzar ventanas inesperadas o iniciar un rush desde el balcón.',
    }
  },
  kali: {
    maps: ['Tower','Kanal','Clubhouse','Oregon','Bank'],
    tip: {
      en: 'Kali can break hard walls at distance and pick off roamers. Use her LV Lance to open sightlines and control key long angles.',
      es: 'Kali puede romper paredes duras a distancia y eliminar roamers. Usa su LV Lance para abrir líneas y controlar ángulos largos clave.',
    }
  },
  iana: {
    maps: ['Consulate','Oregon','Clubhouse','Kafe Dostoyevsky','Bank'],
    tip: {
      en: 'Iana’s hologram is perfect for distraction and site recon. Send it in first, then follow up with the real operator on the safest route.',
      es: 'El holograma de Iana es perfecto para distracción y reconocimiento. Envíalo primero y luego sigue con la operadora real por la ruta más segura.',
    }
  },
  ace: {
    maps: ['Bank','Kafe Dostoyevsky','Clubhouse','Consulate','Oregon'],
    tip: {
      en: 'Ace can create hard breach openings from a distance. Use S.E.L.M.A. to cut lines and give your team new attack angles.',
      es: 'Ace puede abrir brechas reforzadas a distancia. Usa S.E.L.M.A. para cortar líneas y dar al equipo nuevos ángulos de ataque.',
    }
  },
  zero: {
    maps: ['Clubhouse','Kanal','Border','Consulate','Oregon'],
    tip: {
      en: 'Zero can place cameras anywhere with his Argus. Use them to watch flanks and generate intel on defender rotations.',
      es: 'Zero puede colocar cámaras en cualquier lugar con su Argus. Úsalas para vigilar flancos y generar información de rotaciones.',
    }
  },
  flores: {
    maps: ['Clubhouse','Bank','Consulate','Oregon','Kafe Dostoyevsky'],
    tip: {
      en: 'Flores can deny plant and trail defenders with his remote cameras. Place the RCE carefully and hold verticals where enemies are likely to retake.',
      es: 'Flores puede negar la planta y rastrear defensores con sus cámaras remotas. Coloca el RCE con cuidado y cubre verticales donde los enemigos retomarían.',
    }
  },
  osa: {
    maps: ['Consulate','Clubhouse','Bank','Oregon','Chalet'],
    tip: {
      en: 'Osa is all about mobile cover. Use her shield to push into contested areas, then reposition quickly to keep the defender guessing.',
      es: 'Osa se trata de cobertura móvil. Usa su escudo para empujar zonas disputadas y reposiciónate rápido para mantener confundido al defensor.',
    }
  },
  sens: {
    maps: ['Border','Clubhouse','Consulate','Oregon','Kanal'],
    tip: {
      en: 'Sens can project drones to gather information without exposing yourself. Use the R.O.U. system to spot defenders before entry.',
      es: 'Sens puede proyectar drones para obtener información sin exponerse. Usa el sistema R.O.U. para detectar defensores antes de entrar.',
    }
  },
  grim: {
    maps: ['Clubhouse','Consulate','Oregon','Kanal','Bank'],
    tip: {
      en: 'Grim works as a support entry. Use his hive launcher to pressure rooms and keep defenders forced into predictable movement.',
      es: 'Grim funciona como apoyo de entrada. Usa su lanzador de enjambre para presionar habitaciones y forzar movimientos previsibles.',
    }
  },
  brava: {
    maps: ['Clubhouse','Bank','Kafe Dostoyevsky','Oregon','Consulate'],
    tip: {
      en: 'Brava’s drone-based utility helps with reconnaissance and denial. Use the Kludge Drone to force defenders from hiding spots and gather site info.',
      es: 'La utilidad basada en drones de Brava ayuda en reconocimiento y negación. Usa el Kludge Drone para forzar defensores y reunir información del sitio.',
    }
  },
  ram: {
    maps: ['Clubhouse','Kafe Dostoyevsky','Bank','Consulate','Oregon'],
    tip: {
      en: 'Ram is a specialist breacher. Use the BU-GI on reinforced surfaces and push through the gap while defenders are distracted.',
      es: 'Ram es un breacher especialista. Usa el BU-GI en superficies reforzadas y empuja por la brecha cuando los defensores estén distraídos.',
    }
  },
  smoke: {
    maps: ['Kafe Dostoyevsky','Clubhouse','Bank','Consulate','Oregon'],
    tip: {
      en: 'Smoke is excellent at denying plants and delaying pushes. Keep your canisters ready for late-round holds and choke points.',
      es: 'Smoke es excelente para negar plantas y retrasar empujes. Mantén tus botes listos para defensas de última ronda y puntos de estrangulamiento.',
    }
  },
  mute: {
    maps: ['Consulate','Clubhouse','Bank','Oregon','Kafe Dostoyevsky'],
    tip: {
      en: 'Mute is key for stopping drones and hard breaches. Place jammers on reinforced walls and near entry points to cut attacker intel.',
      es: 'Mute es clave para detener drones y brechas. Coloca sus jammers en paredes reforzadas y entradas para cortar la información atacante.',
    }
  },
  castle: {
    maps: ['Clubhouse','Bank','Kafe Dostoyevsky','Oregon','Consulate'],
    tip: {
      en: 'Castle can lock down rotators and deny entry. Use armor panels on common doors and keep a backup line in case the panel is breached.',
      es: 'Castle puede bloquear rotaciones y negar entradas. Usa paneles en puertas comunes y mantén una línea secundaria por si lo rompen.',
    }
  },
  pulse: {
    maps: ['Bank','Clubhouse','Kafe Dostoyevsky','Consulate','Oregon'],
    tip: {
      en: 'Pulse can hunt roamers through walls. Use the heartbeat sensor to locate enemies and call out their position to teammates.',
      es: 'Pulse puede cazar roamers a través de paredes. Usa el sensor de ritmo para localizar enemigos y comunicarlos al equipo.',
    }
  },
  doc: {
    maps: ['Oregon','Clubhouse','Kafe Dostoyevsky','Bank','Consulate'],
    tip: {
      en: 'Doc is an anchor and healer. Keep your stim pistol ready to revive or boost teammates, and hold tight angles where healing matters most.',
      es: 'Doc es un ancla y sanador. Mantén la pistola estimulante lista para revivir o potenciar aliados y cubre ángulos cerrados donde la curación importa.',
    }
  },
  rook: {
    maps: ['Clubhouse','Bank','Kafe Dostoyevsky','Oregon','Consulate'],
    tip: {
      en: 'Rook gives extra armor to the team. Stay near the site and use your plates to help anchors survive initial contact.',
      es: 'Rook da armadura extra al equipo. Quédate cerca del sitio y usa tus placas para ayudar a los anclajes a sobrevivir el primer contacto.',
    }
  },
  kapkan: {
    maps: ['Consulate','Oregon','Coastline','Bank','Kanal'],
    tip: {
      en: 'Kapkan is great for denying doorways and entry points. Place traps on common attack routes and keep some in hard-to-spot locations.',
      es: 'Kapkan es ideal para negar puertas y accesos. Coloca trampas en rutas de ataque comunes y algunas en sitios difíciles de ver.',
    }
  },
  tachanka: {
    maps: ['Kanal','Clubhouse','Oregon','Bank','Consulate'],
    tip: {
      en: 'Tachanka can lock down a site with his turret. Anchor near strong positions and use his firepower to make attackers think twice.',
      es: 'Tachanka puede asegurar un sitio con su torreta. Ancla en posiciones fuertes y usa su potencia para que los atacantes lo piensen dos veces.',
    }
  },
  jager: {
    maps: ['Bank','Consulate','Kanal','Clubhouse','Coastline'],
    tip: {
      en: 'Jäger is perfect for gadget denial. Place ADS devices to protect key utilities and slow down hard breachers.',
      es: 'Jäger es perfecto para negar gadgets. Coloca ADS en utilidades clave y frena a los hard breachers.',
    }
  },
  bandit: {
    maps: ['Bank','Kafe Dostoyevsky','Clubhouse','Consulate','Oregon'],
    tip: {
      en: 'Bandit can electrify reinforced walls and barbed wire. Use his Shock Wire to deny hard breachers and delay plant attempts.',
      es: 'Bandit puede electrificar muros reforzados y alambre de púas. Usa su Shock Wire para negar hard breachers y retrasar la planta.',
    }
  },
  frost: {
    maps: ['Clubhouse','Border','House','Kafe Dostoyevsky','Chalet'],
    tip: {
      en: 'Frost is a trap anchor. Place welcome mats in doorways and rotate holes to catch enemies pushing through common entry points.',
      es: 'Frost es una ancla trampa. Coloca las alfombras en puertas y agujeros de rotación para pillar a quienes empujen por entradas comunes.',
    }
  },
  valkyrie: {
    maps: ['Clubhouse','Bank','Border','Consulate','Oregon'],
    tip: {
      en: 'Valkyrie uses Black Eyes to give constant intel. Place cameras in hidden spots and feed your team real-time enemy positions.',
      es: 'Valkyrie usa Black Eyes para dar intel constante. Coloca cámaras ocultas y pasa posiciones enemigas en tiempo real.',
    }
  },
  caveira: {
    maps: ['Consulate','Border','Clubhouse','Kafe Dostoyevsky','Oregon'],
    tip: {
      en: 'Caveira is excellent at roaming and interrogation. Stay silent, ambush lone attackers, and use Interrogation to reveal enemy positions.',
      es: 'Caveira es excelente para roamear e interrogaciones. Mantente sigilosa, embosca a atacantes solos y usa la interrogación para revelar posiciones.',
    }
  },
  echo: {
    maps: ['Kanal','Clubhouse','Bank','Oregon','Consulate'],
    tip: {
      en: 'Echo can stall pushes with Yokai drones. Hide them on site and use disruption to stop plant attempts and force attackers out of position.',
      es: 'Echo puede retrasar empujes con drones Yokai. Escóndelos en el sitio y usa la interrupción para parar plantas y sacar a los atacantes de posición.',
    }
  },
  lesion: {
    maps: ['Consulate','Bank','Clubhouse','Oregon','Kafe Dostoyevsky'],
    tip: {
      en: 'Lesion is a slow-denial defender. Place Gu Mines on likely attacker paths and use the damage over time to track and delay pushes.',
      es: 'Lesion es un defensor de negación lenta. Coloca Gu Mines en rutas probables y usa el daño continuo para rastrear y retrasar empujes.',
    }
  },
  ela: {
    maps: ['Kanal','Bank','Clubhouse','Consulate','Oregon'],
    tip: {
      en: 'Ela is great for area denial and flank control. Use her mines to make attackers think twice before entering and then punish the delayed push.',
      es: 'Ela es ideal para negar áreas y controlar flancos. Usa sus minas para que los atacantes duden antes de entrar y castiga el avance retrasado.',
    }
  },
  vigil: {
    maps: ['Border','Clubhouse','Coastline','Kanal','Oregon'],
    tip: {
      en: 'Vigil excels at avoiding drones and roaming. Activate ERC-7 before drones scan you and move unpredictably through the site.',
      es: 'Vigil destaca en evitar drones y roamear. Activa ERC-7 antes de que te escaneen y muévete con imprevisibilidad por el sitio.',
    }
  },
  maestro: {
    maps: ['Kafe Dostoyevsky','Clubhouse','Bank','Consulate','Oregon'],
    tip: {
      en: 'Maestro is a strong anchor with Evil Eyes. Hide them behind cover to gather intel and delay plants while remaining hard to destroy.',
      es: 'Maestro es un ancla fuerte con Evil Eyes. Escóndelos tras cobertura para obtener intel y retrasar plantas mientras son difíciles de destruir.',
    }
  },
  alibi: {
    maps: ['Clubhouse','Consulate','Bank','Oregon','Kafe Dostoyevsky'],
    tip: {
      en: 'Alibi’s decoys are great for making attackers waste shots. Place Prisma near common paths and use them to bait pushes.',
      es: 'Las señuelos de Alibi son geniales para hacer que los atacantes desperdicien disparos. Coloca Prisma cerca de rutas comunes y úsalo como cebo.',
    }
  },
  kaid: {
    maps: ['Bank','Clubhouse','Kafe Dostoyevsky','Oregon','Consulate'],
    tip: {
      en: 'Kaid is ideal for reinforcing and electrifying. Use his Electroclaws on walls and hatches to deny hard breachers, then anchor behind strong angles.',
      es: 'Kaid es ideal para reforzar y electrificar. Usa sus Electroclaws en paredes y tragaluces para negar hard breachers, luego ancla detrás de buenos ángulos.',
    }
  },
  mozzie: {
    maps: ['Kanal','Clubhouse','Bank','Consulate','Oregon'],
    tip: {
      en: 'Mozzie can steal attacker drones and convert them into intel. Catch enemy drones early and use Pest to watch flanks and rotations.',
      es: 'Mozzie puede robar drones atacantes y convertirlos en intel. Atrapa drones temprano y usa Pest para vigilar flancos y rotaciones.',
    }
  },
  warden: {
    maps: ['Kafe Dostoyevsky','Bank','Clubhouse','Oregon','Consulate'],
    tip: {
      en: 'Warden excels in low-visibility holds. Keep your glasses ready for smoke, watch key choke points, and deny flanks through blind spots.',
      es: 'Warden brilla en defensas de baja visibilidad. Mantén las gafas listas para el humo, vigila los puntos estrechos clave y niega flancos por puntos ciegos.',
    }
  },
  wamai: {
    maps: ['Border','Kanal','Clubhouse','Consulate','Coastline'],
    tip: {
      en: 'Wamai can pull and disrupt projectiles. Place magnets near plant sites and common breaching lines to turn attacker utility against them.',
      es: 'Wamai puede atraer y desviar proyectiles. Coloca imanes cerca de sites y líneas de brecha comunes para usar la utilidad atacante en su contra.',
    }
  },
  oryx: {
    maps: ['Kanal','Consulate','Coastline','Clubhouse','Oregon'],
    tip: {
      en: 'Oryx is a fast roamer with dash. Use his mobility to hunt flanks and pinch attackers from unexpected angles.',
      es: 'Oryx es un roamer rápido con dash. Usa su movilidad para cazar flancos y presionar atacantes desde ángulos inesperados.',
    }
  },
  melusi: {
    maps: ['Clubhouse','Consulate','Border','Oregon','Kanal'],
    tip: {
      en: 'Melusi slows pushes with her Banshee Sonic Defense. Place them on likely rush routes and hold the delayed attackers from a safe angle.',
      es: 'Melusi ralentiza empujes con su Banshee. Colócalas en rutas probables y cubre a los atacantes retrasados desde un ángulo seguro.',
    }
  },
  aruni: {
    maps: ['Consulate','Bank','Clubhouse','Oregon','Kafe Dostoyevsky'],
    tip: {
      en: 'Aruni blocks entries with Surya Gates. Use them on windows and doors to slow attackers and give your team time to react.',
      es: 'Aruni bloquea entradas con Surya Gates. Úsalas en ventanas y puertas para frenar atacantes y dar tiempo al equipo para reaccionar.',
    }
  },
  thunderbird: {
    maps: ['Clubhouse','Bank','Consulate','Kafe Dostoyevsky','Oregon'],
    tip: {
      en: 'Thunderbird can heal teammates and deny plant attempts. Keep healing stations near common fight areas and support anchors through utility.',
      es: 'Thunderbird puede curar aliados y negar plantas. Mantén estaciones de curación cerca de zonas clave y apoya a los anclajes con utilidad.',
    }
  },
  thorn: {
    maps: ['Clubhouse','Bank','Kafe Dostoyevsky','Consulate','Oregon'],
    tip: {
      en: 'Thorn’s Razorblooms are great for area denial. Place them on soft rotations and use them to control where attackers can move.',
      es: 'Los Razorblooms de Thorn son geniales para negar zonas. Colócalos en rotaciones blandas y úsalos para controlar movimientos de atacantes.',
    }
  },
  azami: {
    maps: ['Clubhouse','Consulate','Bank','Chalet','Oregon'],
    tip: {
      en: 'Azami excels at window control with Kiba Barriers. Use them to block pushes while keeping line of sight for your team.',
      es: 'Azami sobresale controlando ventanas con Kiba Barriers. Úsalas para bloquear empujes y mantener línea de visión para tu equipo.',
    }
  },
  solis: {
    maps: ['Clubhouse','Bank','Consulate','Kafe Dostoyevsky','Oregon'],
    tip: {
      en: 'Solis can deny utility and delay executions with his electro sensor. Place it in high-traffic areas and track attackers through exposed positions.',
      es: 'Solis puede negar utilidad y retrasar ejecuciones con su sensor. Colócalo en áreas de mucho tráfico y rastrea atacantes en posiciones expuestas.',
    }
  },
  fenrir: {
    maps: ['Bank','Clubhouse','Oregon','Consulate','Kafe Dostoyevsky'],
    tip: {
      en: 'Fenrir can deny plants with his mine and deployable shields. Use the shield to block lines while the mine stops rushes.',
      es: 'Fenrir puede negar plantas con su mina y escudos desplegables. Usa el escudo para bloquear líneas mientras la mina detiene empujes.',
    }
  },
  tubarao: {
    maps: ['Clubhouse','Bank','Consulate','Oregon','Kafe Dostoyevsky'],
    tip: {
      en: 'Tubarão provides mobile shield defense. Use it to protect your team and stall attackers while they reposition.',
      es: 'Tubarão ofrece defensa con escudo móvil. Úsalo para proteger al equipo y retrasar a atacantes mientras se reposicionan.',
    }
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnDestroy {
  i18n = inject(I18nService);

  // ── State ─────────────────────────────────────────────────────────────
  filter  = signal<Filter>('all');
  spinning = signal(false);
  displayOp = signal<Operator>(OPERATORS[0]);
  loadout   = signal<Loadout | null>(null);
  history   = signal<Operator[]>([]);
  imgError  = signal(false);
  copyDone  = signal(false);

  constructor() {
    const initial = this.rand(this.pool());
    this.displayOp.set(initial);
    this.loadout.set(this.createLoadout(initial));
  }

  // ── Computed ──────────────────────────────────────────────────────────
  pool = computed(() => {
    const f = this.filter();
    return f === 'all' ? OPERATORS : OPERATORS.filter(o => o.role === f);
  });

  accent = computed(() =>
    (this.loadout()?.operator.role ?? this.displayOp().role) === 'attacker'
      ? 'var(--sr-atk)' : 'var(--sr-def)'
  );

  accentHex = computed(() =>
    (this.loadout()?.operator.role ?? this.displayOp().role) === 'attacker'
      ? '#E8640C' : '#2a9fd6'
  );

  recommendedMaps = computed(() => {
    const op = this.loadout()?.operator;
    const profile = op && OPERATOR_PROFILES[op.id];
    return op?.recommendedMaps ?? profile?.maps ?? this.defaultMapsFor(op);
  });

  tacticalTip = computed(() => {
    const op = this.loadout()?.operator;
    const profile = op && OPERATOR_PROFILES[op.id];
    if (op?.tacticalTip) {
      return op.tacticalTip;
    }
    return profile?.tip[this.i18n.lang()] ?? this.defaultTipFor(op);
  });

  private defaultMapsFor(op?: Operator): string[] {
    if (!op) {
      return ['Clubhouse', 'Consulate', 'Bank', 'Chalet', 'Oregon'];
    }

    const attackerMapSets: Record<number, string[]> = {
      3: ['Coastline', 'Kanal', 'Oregon', 'Clubhouse', 'Bank'],
      2: ['Chalet', 'Consulate', 'Bank', 'Clubhouse', 'Oregon'],
      1: ['Kafe Dostoyevsky', 'Hereford Base', 'Bank', 'Clubhouse', 'Oregon'],
    };

    const defenderMapSets: Record<number, string[]> = {
      3: ['Clubhouse', 'Border', 'Skyscraper', 'Chalet', 'Bank'],
      2: ['Consulate', 'Oregon', 'Coastline', 'Kanal', 'Bank'],
      1: ['Chalet', 'Bank', 'Clubhouse', 'Kafe Dostoyevsky', 'Hereford Base'],
    };

    return op.role === 'attacker'
      ? attackerMapSets[op.speed]
      : defenderMapSets[op.speed];
  }

  private defaultTipFor(op?: Operator): string {
    if (!op) {
      return this.i18n.lang() === 'es'
        ? 'Selecciona un operador para ver consejos y mapas recomendados específicos.'
        : 'Select an operator to see specific tips and recommended maps.';
    }

    const commonTip = this.i18n.lang() === 'es'
      ? 'Ajusta tu posición y aprovecha tu gadget para maximizar el impacto en el equipo rival.'
      : 'Adjust your positioning and use your gadget to maximize impact on the enemy team.';

    const roleTip = op.role === 'attacker'
      ? this.i18n.lang() === 'es'
        ? `Como atacante, usa a ${op.name} para abrir líneas y forzar rotaciones.`
        : `As an attacker, use ${op.name} to open lines and force rotations.`
      : this.i18n.lang() === 'es'
        ? `Como defensor, usa a ${op.name} para negar avances y asegurar zonas clave.`
        : `As a defender, use ${op.name} to deny access and hold key areas.`;

    return `${roleTip} ${commonTip}`;
  }

  speedDots = computed(() => {
    const s = this.displayOp().speed;
    return [1, 2, 3].map(i => i <= s);
  });

  // ── Timers ────────────────────────────────────────────────────────────
  private timers: ReturnType<typeof setTimeout>[] = [];

  ngOnDestroy() { this.clearTimers(); }
  private clearTimers() { this.timers.forEach(clearTimeout); this.timers = []; }

  // ── Helpers ───────────────────────────────────────────────────────────
  private rand<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  getImgUrl(id: string): string { return getImageUrl(id); }

  private createLoadout(operator: Operator): Loadout {
    return {
      operator,
      primary: this.rand(operator.primaries),
      secondary: this.rand(operator.secondaries),
      throwable: this.rand(operator.throwables),
    };
  }

  // ── Roll ──────────────────────────────────────────────────────────────
  roll(): void {
    const p = this.pool();
    if (this.spinning() || p.length === 0) return;

    this.clearTimers();
    this.spinning.set(true);
    this.loadout.set(null);
    this.imgError.set(false);

    const chosen  = this.rand(p);
    const result: Loadout = {
      operator:  chosen,
      primary:   this.rand(chosen.primaries),
      secondary: this.rand(chosen.secondaries),
      throwable: this.rand(chosen.throwables),
    };

    const STEPS = 12;
    let cum = 0;

    for (let i = 0; i < STEPS; i++) {
      const prog   = i / STEPS;
      cum += 18 + prog * prog * 260; // even shorter and faster ease-out
      const stepOp = i < STEPS - 1 ? this.rand(p) : chosen;
      const isLast = i === STEPS - 1;

      this.timers.push(setTimeout(() => {
        this.displayOp.set(stepOp);
        this.imgError.set(false);

        if (isLast) {
          this.spinning.set(false);

          // Update history
          const h = [chosen, ...this.history()].slice(0, 10);
          this.history.set(h);

          setTimeout(() => this.loadout.set(result), 80);
        }
      }, cum));
    }
  }

  // ── Filter ────────────────────────────────────────────────────────────
  setFilter(f: Filter): void { this.filter.set(f); }

  // ── Copy loadout ──────────────────────────────────────────────────────
  async copyLoadout(): Promise<void> {
    const l = this.loadout();
    if (!l) return;
    const text =
      `SiegeRoll.gg — ${l.operator.name.toUpperCase()}\n` +
      `Role: ${this.i18n.t[l.operator.role]}\n` +
      `${this.i18n.t.primary}: ${l.primary}\n` +
      `${this.i18n.t.secondary}: ${l.secondary}\n` +
      `${this.i18n.t.gadget}: ${this.i18n.translateEquipment(l.operator.gadget)}\n` +
      `${this.i18n.t.tactical}: ${this.i18n.translateEquipment(l.throwable)}`;
    await navigator.clipboard?.writeText(text);
    this.copyDone.set(true);
    setTimeout(() => this.copyDone.set(false), 2000);
  }


  // ── Lang ──────────────────────────────────────────────────────────────
  toggleLang(): void { this.i18n.toggle(); }
}
