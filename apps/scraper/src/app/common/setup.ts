import * as puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import {
  parseGeneralInformation,
  parseGeneralInformationTwo,
  // parseEvolutionaryChain,
  parseLevelUpMoves,
  parseLocation,
  parseTaughtMoves,
} from './helpers';
import {
  EffortValues,
  GeneralDetails,
  GeneralDetailsTwo,
  GenIDex,
  LearntMove,
  LocationGenI,
  PokemonRBGY,
  TaughtMove,
  Types,
} from '@elmdex/utils';

export async function startBrowser(): Promise<Browser> {
  const browser = await puppeteer.launch({
    headless: true,
  });
  return browser;
}

export async function scrapeRBGYPage(page: Page): Promise<PokemonRBGY> {
  let possibleTables: string[] = [];
  let learntMoves: LearntMove[] = [];
  let taughtMoves: TaughtMove[] = [];
  let locations: LocationGenI | null = null;
  let evolutions: any;
  let general: GeneralDetails | null = null;
  let generalTwo: GeneralDetailsTwo | null = null;

  const tables = await page.$$('.dextable');
  for (const table of tables) {
    let tableHeadingCell = await table.$('.fooevo');

    if (!tableHeadingCell) {
      tableHeadingCell = await table.$('.foo');
      if (!tableHeadingCell) {
        continue;
      }
    }

    const tableHeading = await tableHeadingCell.evaluate(
      (el) => el.textContent
    );

    if (!tableHeading) {
      continue;
    }

    possibleTables = [...possibleTables, tableHeading];

    switch (tableHeading) {
      case GenIDex.Name:
        // Name does all names, number, types, classification, height, weight, capture rate
        general = await parseGeneralInformation(table);
        console.log(general);
        break;
      case GenIDex.ExpGrowth:
        generalTwo = await parseGeneralInformationTwo(table);
        console.log(generalTwo);
        break;
      case GenIDex.Evolutions:
        // evolutions = await parseEvolutionaryChain(table);
        break;
      case GenIDex.LevelUpMoves:
        learntMoves = await parseLevelUpMoves(table);
        break;
      case GenIDex.TmHmMoves:
        taughtMoves = await parseTaughtMoves(table);
        break;
      case GenIDex.Locations:
        locations = await parseLocation(table);
        break;
    }
  }

  if (!general || !generalTwo) {
    return;
  }

  return {
    // Fake
    damageTaken: {},
    evolutionaryChain: {
      next: [],
      number: 1,
      baseForm: true,
    },
    stats: {
      base: {
        [EffortValues.Hp]: 10,
        [EffortValues.Attack]: 20,
        [EffortValues.Defense]: 20,
        [EffortValues.Special]: 20,
        [EffortValues.Speed]: 20,
      },
      level50: {
        [EffortValues.Hp]: {
          min: 10,
          max: 20,
        },
        [EffortValues.Attack]: {
          min: 10,
          max: 20,
        },
        [EffortValues.Defense]: {
          min: 10,
          max: 20,
        },
        [EffortValues.Special]: {
          min: 10,
          max: 20,
        },
        [EffortValues.Speed]: {
          min: 10,
          max: 20,
        },
      },
      level100: {
        [EffortValues.Hp]: {
          min: 10,
          max: 20,
        },
        [EffortValues.Attack]: {
          min: 10,
          max: 20,
        },
        [EffortValues.Defense]: {
          min: 10,
          max: 20,
        },
        [EffortValues.Special]: {
          min: 10,
          max: 20,
        },
        [EffortValues.Speed]: {
          min: 10,
          max: 20,
        },
      },
    },

    // Actual
    ...general,
    ...generalTwo,
    learntMoves,
    taughtMoves,
    locations,
  };
}
