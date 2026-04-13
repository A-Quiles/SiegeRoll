export interface Operator {
  id: string;
  name: string;
  role: 'attacker' | 'defender';
  flag: string;
  speed: 1 | 2 | 3;
  primaries: string[];
  secondaries: string[];
  gadget: string;
  throwables: string[];
  recommendedMaps?: string[];
  tacticalTip?: string;
}

export interface Loadout {
  operator: Operator;
  primary: string;
  secondary: string;
  throwable: string;
}
