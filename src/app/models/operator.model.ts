export interface Operator {
  id: string;
  name: string;
  role: 'attacker' | 'defender';
  flag: string;
  speed: 1 | 2 | 3;
  primaries: string[];
  secondaries: string[];
  primaryAccessories?: Record<string, string[]>;
  genericAccessories?: string[];
  gadget: string;
  throwables: string[];
  recommendedMaps?: string[];
  tacticalTip?: string;
}

export interface Loadout {
  operator: Operator;
  primary: string;
  accessory?: string;
  secondary: string;
  throwable: string;
}
