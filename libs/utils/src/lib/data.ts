export type PokemonRBGY = {
  // General Details
  number: number;
  name: PokemonNames;
  classification: string;
  captureRate: number;
  weight: UnitValue;
  height: UnitValue;
  type: [Types, Types?];
  expGrowth: ExpGrowth;
  effortValuesEarned: EffortValuesEarned;

  // Damage taken calcs
  damageTaken: DamageTaken;

  // Evolutions
  evolutionaryChain: EvolutionaryChain;

  // Locations
  locations: LocationGenI | null;

  // Moves
  learntMoves: LearntMove[];
  taughtMoves: TaughtMove[];

  // Stats
  stats: Statistics;
};

export type GeneralDetails = {
  number: number;
  name: PokemonNames;
  classification: string;
  captureRate: number;
  weight: UnitValue;
  height: UnitValue;
  type: [Types, Types?];
};

export type GeneralDetailsTwo = {
  expGrowth: ExpGrowth;
  effortValuesEarned: EffortValuesEarned;
};

export enum GenIDex {
  Picture = 'Picture',
  Name = 'Name',
  ExpGrowth = 'Experience Growth',
  Evolutions = 'Evolutionary Chain',
  Locations = 'Locations',
  LevelUpMoves = 'Generation I Level Up',
  TmHmMoves = 'TM & HM Attacks',
  Stats = 'Stats',
}

export enum Types {
  Bug = 'bug',
  Dark = 'dark',
  Dragon = 'dragon',
  Electric = 'electric',
  Fairy = 'fairy',
  Fighting = 'fighting',
  Fire = 'fire',
  Flying = 'flying',
  Ghost = 'ghost',
  Grass = 'grass',
  Ground = 'ground',
  Ice = 'ice',
  Normal = 'normal',
  Poison = 'poison',
  Psychic = 'psychic',
  Rock = 'rock',
  Steel = 'steel',
  Water = 'water',
}

export enum LanguageCodes {
  English = 'en',
  Japanese = 'ja',
  French = 'fr',
  German = 'de',
  Korean = 'ko',
}

export enum EffortValues {
  Hp = 'hp',
  Attack = 'attack',
  Defense = 'defense',
  Special = 'special',
  Speed = 'speed',
}

export enum Games {
  Red = 'red',
  Green = 'greenJp',
  BlueJp = 'blueJp',
  Blue = 'blue',
  Yellow = 'yellow',
}

export type MinMax = {
  min: number;
  max: number;
};

export type EffortValuesEarned = { [key in EffortValues]: number };

export type EffortValuesRange = { [key in EffortValues]: MinMax };

export type PokemonNames = { [key in LanguageCodes]: string };

export type LearntMove = {
  level?: number;
  name: string;
  type: string;
  attack?: number;
  accuracy: number;
  pp: number;
  effect?: number;
  description: string;
};

export type TaughtMove = {
  label: string;
  name: string;
  type: string;
  attack?: number;
  accuracy: number;
  pp: number;
  effect?: number;
  description: string;
};

export type LocationGenI = { [key in Games]: string };

export type EvolutionaryChain = {
  number: number;
  method?: string | number;
  baseForm: boolean;
  next: EvolutionaryChain[];
};

export type UnitValue = {
  unit: string;
  value: number;
};

export type ExpGrowth = {
  rank: string;
  points: number;
};

export type DamageTaken = { [key in Types]?: number };

export type Statistics = {
  base: EffortValuesEarned;
  level50: EffortValuesRange;
  level100: EffortValuesRange;
};
