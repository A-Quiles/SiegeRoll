import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'es';

export interface Translations {
  subtitle: string;
  all: string; atk: string; def: string;
  roll: string; rolling: string;
  badge_atk: string; badge_def: string;
  primary: string; secondary: string;
  accessory: string; gadget: string; tactical: string;
  loadout: string; hint: string;
  attacker: string; defender: string;
  recommendedMaps: string; tacticalTip: string;
  history: string; copy: string; copied: string;
  switchTo: string;
  speed: string;
  noAccessory: string;
}

const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    subtitle:  'R6 OPERATOR ROULETTE',
    all: 'ALL', atk: 'ATTACKERS', def: 'DEFENDERS',
    roll: 'ROLL', rolling: 'ROLLING...',
    badge_atk: 'ATK', badge_def: 'DEF',
    primary:   'PRIMARY WEAPON',
    secondary: 'SECONDARY WEAPON',
    accessory: 'WEAPON ACCESSORY',
    gadget:    'OPERATOR GADGET',
    tactical:  'TACTICAL DEVICE',
    loadout:   'YOUR LOADOUT',
    hint:      'Press ROLL to get your random operator & loadout',
    attacker:  'ATTACKER', defender: 'DEFENDER',
    recommendedMaps: 'RECOMMENDED MAPS',
    tacticalTip: 'TACTICAL TIP',
    history:   'SESSION HISTORY',
    copy:      '📋  COPY LOADOUT', copied: '✅  COPIED!',
    switchTo:  'ES',
    speed:     'SPEED',
    noAccessory: 'No accessory',
  },
  es: {
    subtitle:  'RULETA DE OPERADORES R6',
    all: 'TODOS', atk: 'ATACANTES', def: 'DEFENSORES',
    roll: 'GIRAR', rolling: 'GIRANDO...',
    badge_atk: 'ATQ', badge_def: 'DEF',
    primary:   'ARMA PRINCIPAL',
    secondary: 'ARMA SECUNDARIA',
    accessory: 'ACCESORIO',
    gadget:    'GADGET DEL OPERADOR',
    tactical:  'DISPOSITIVO TÁCTICO',
    loadout:   'TU LOADOUT',
    hint:      'Pulsa GIRAR para obtener tu operador y loadout aleatorio',
    attacker:  'ATACANTE', defender: 'DEFENSOR',
    recommendedMaps: 'MAPAS RECOMENDADOS',
    tacticalTip: 'CONSEJO TÁCTICO',
    history:   'HISTORIAL DE SESIÓN',
    copy:      '📋  COPIAR LOADOUT', copied: '✅  ¡COPIADO!',
    switchTo:  'EN',
    speed:     'VELOCIDAD',
    noAccessory: 'Sin accesorio',
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  lang = signal<Lang>('en');

  private readonly equipmentTranslations: Record<Lang, Record<string, string>> = {
    en: {},
    es: {
      'breaching hammer': 'Martillo Perforador',
      'breaching round': 'Carga de Perforación',
      'exothermic charge': 'Carga Exotérmica',
      'shock drone': 'Drone de Choque',
      'extendable shield': 'Escudo Extensible',
      'flip sight': 'Mira Flip',
      'cluster charge': 'Carga Cluster',
      'flash shield': 'Escudo Flash',
      'electronics detector': 'Detector Electrónico',
      'skeleton key': 'Llave Esqueleto',
      'rifle shield': 'Escudo para Rifle',
      'tactical crossbow': 'Ballesta Táctica',
      'x-kairos': 'X-KAIROS',
      'eyenox model iii': 'Eyenox Model III',
      'candela': 'Candela',
      'ks79 lifeline': 'KS79 Lifeline',
      'logic bomb': 'Bomba Lógica',
      'ee-one-d': 'EE-ONE-D',
      'adrenal surge': 'Estímulo Adrenal',
      'breaching torch': 'Antorcha Perforadora',
      'airjab': 'Airjab',
      'trax stingers': 'Trampas de Púas',
      'hel presence reduction': 'Reducción de Presencia HEL',
      'garra hook': 'Garra Hook',
      'lv lance': 'LV Lance',
      'gemini replicator': 'Replicador Gemini',
      's.e.l.m.a.': 'S.E.L.M.A.',
      'argus cameras': 'Cámaras Argus',
      'rce-ratero charge': 'Carga RCE-Ratero',
      'talon-8 clear shield': 'Escudo Transparente Talon-8',
      'r.o.u. projector system': 'Sistema Proyector R.O.U.',
      'kludge drone': 'Drone Kludge',
      'bu-gi auto breacher': 'Auto Perforador BU-GI',
      'remote gas canister': 'Contenedor de Gas Remoto',
      'signal jammer': 'Bloqueador de Señales',
      'frag grenade': 'Granada Explosiva',
      'stun grenade': 'Granada Aturdidora',
      'breach charge': 'Carga de Perforación',
      'hard breach charge': 'Carga de Perforación Pesada',
      'claymore': 'Claymore',
      'smoke grenade': 'Granada de Humo',
      'nitro cell': 'Célula Nitro',
      'deployable shield': 'Escudo Desplegable',
      'barbed wire': 'Alambre de Púas',
      'bulletproof camera': 'Cámara a Prueba de Balas',
      'kawan hive launcher': 'Lanzador Enjambre Kawan',
      'spec-io electro-sensor': 'Electro-Sensor SPEC-IO',
      'f-natt dread mine': 'Mina F-NATT Dread',
      'zoto canister': 'Contenedor Zoto',
      'kiba barrier': 'Barrera Kiba',
      'armor pack': 'Paquete de Armadura',
      'heartbeat sensor': 'Sensor de Ritmo Cardíaco',
      'stim pistol': 'Pistola Estimulante',
      'edd mk ii tripwire': 'Cable Trampa EDD Mk II',
      'shumikha launcher': 'Lanzador Shumikha',
      'ads': 'ADS',
      'shock wire': 'Alambre de Choque',
      'welcome mat': 'Alfombra Trampa',
      'black eye': 'Ojo Negro',
      'silent step': 'Paso Silencioso',
      'yokai': 'Yokai',
      'gu mine': 'Mina Gu',
      'grzmot mine': 'Mina Grzmot',
      'erc-7': 'ERC-7',
      'evil eye': 'Ojo Maligno',
      'prisma': 'Prisma',
      'rtila electroclaw': 'Garra Eléctrica Rtila',
      'pest': 'Plaga',
      'glance smart glasses': 'Gafas Inteligentes Glance',
      'mag-net system': 'Sistema Mag-Net',
      'remah dash': 'Remah Dash',
      'banshee sonic defense': 'Defensa Sónica Banshee',
      'surya gate': 'Puerta Surya',
      'kóna station': 'Estación Kóna',
      'holographic sight': 'Mira Holográfica',
      'laser sight': 'Mira Láser',
      'compensator': 'Compensador',
      'vertical grip': 'Empuñadura Vertical',
      'suppressor': 'Silenciador',
      'red dot sight': 'Punto Rojo',
      'acog sight': 'Mira ACOG',
      'flash hider': 'Amortiguador de Destello',
      'aimpoint': 'Mira Aimpoint',
      '40mm grenade launcher': 'Lanzagranadas 40mm',
    }
  };

  translateEquipment(value: string): string {
    if (this.lang() === 'es') {
      const translation = this.equipmentTranslations.es[value.toLowerCase()];
      return translation || value;
    }
    return value;
  }

  get t(): Translations {
    return TRANSLATIONS[this.lang()];
  }

  toggle(): void {
    this.lang.set(this.lang() === 'en' ? 'es' : 'en');
  }
}
