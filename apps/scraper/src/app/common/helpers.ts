import { ElementHandle } from 'puppeteer';
import {
  GeneralDetails,
  Games,
  LearntMove,
  LocationGenI,
  TaughtMove,
  Types,
  GeneralDetailsTwo,
} from '@elmdex/utils';

export async function parseLevelUpMoves(
  tableEl: ElementHandle<Element>
): Promise<LearntMove[]> {
  // 1. Row 0 is the heading, Row 1 is column headings
  // 2. After row 0, ever 2 table rows are a actual row. The first contains most, the second contains a description.
  const tableRows = await tableEl.$$('tr');
  if (!tableRows) {
    return [];
  }

  let moves: LearntMove[] = [];

  for (let i = 2; i < tableRows.length; i += 2) {
    const firstRowCell = tableRows[i];
    const secondRowCell = tableRows[i + 1];

    const firstRowCells = await firstRowCell.$$('td');
    const secondRowCells = await secondRowCell.$('td');

    if (!firstRowCells || !secondRowCells) {
      continue;
    }

    if (firstRowCells.length !== 7 || !secondRowCells) {
      console.error('bad first row or second');
      continue;
    }
    const level = await firstRowCells[0].evaluate((el) => el.textContent);
    const name = await firstRowCells[1].evaluate((el) => el.textContent);
    const type = await (
      await firstRowCells[2].$('img')
    )?.evaluate((el) => el.getAttribute('src'));
    const attack = await firstRowCells[3].evaluate((el) => el.textContent);
    const accuracy = await firstRowCells[4].evaluate((el) => el.textContent);
    const pp = await firstRowCells[5].evaluate((el) => el.textContent);
    const effect = await firstRowCells[6].evaluate((el) => el.textContent);
    const description = await secondRowCells.evaluate((el) => el.textContent);
    if (
      !level ||
      !name ||
      !type ||
      !attack ||
      !accuracy ||
      !pp ||
      !effect ||
      !description
    ) {
      console.error('Missing a required table cell for a move');
      console.log(level, name, type, attack, accuracy, pp, effect, description);
      continue;
    }
    const splitTypeString = type.split('/');
    const actualType =
      splitTypeString[splitTypeString.length - 1].split('.')[0];

    const move: LearntMove = {
      name: name.toLocaleLowerCase(),
      type: actualType,
      accuracy: parseInt(accuracy),
      pp: parseInt(pp),
      description,
    };

    if (level && level !== '--') {
      move.level = parseInt(level);
    }

    if (attack && attack !== '--') {
      move.attack = parseInt(attack);
    }

    if (effect && effect !== '--') {
      move.effect = parseInt(effect);
    }

    moves = [...moves, move];
  }

  return moves;
}

export async function parseTaughtMoves(
  tableEl: ElementHandle<Element>
): Promise<TaughtMove[]> {
  // 1. Row 0 is the heading, Row 1 is column headings
  // 2. After row 0, ever 2 table rows are a actual row. The first contains most, the second contains a description.
  const tableRows = await tableEl.$$('tr');
  if (!tableRows) {
    return [];
  }

  let moves: TaughtMove[] = [];

  for (let i = 2; i < tableRows.length; i += 2) {
    const firstRowCell = tableRows[i];
    const secondRowCell = tableRows[i + 1];

    const firstRowCells = await firstRowCell.$$('td');
    const secondRowCells = await secondRowCell.$('td');

    if (!firstRowCells || !secondRowCells) {
      continue;
    }

    if (firstRowCells.length !== 7 || !secondRowCells) {
      console.error('bad first row or second');
      continue;
    }
    const label = await firstRowCells[0].evaluate((el) => el.textContent);
    const name = await firstRowCells[1].evaluate((el) => el.textContent);
    const type = await (
      await firstRowCells[2].$('img')
    )?.evaluate((el) => el.getAttribute('src'));
    const attack = await firstRowCells[3].evaluate((el) => el.textContent);
    const accuracy = await firstRowCells[4].evaluate((el) => el.textContent);
    const pp = await firstRowCells[5].evaluate((el) => el.textContent);
    const effect = await firstRowCells[6].evaluate((el) => el.textContent);
    const description = await secondRowCells.evaluate((el) => el.textContent);
    if (
      !label ||
      !name ||
      !type ||
      !attack ||
      !accuracy ||
      !pp ||
      !effect ||
      !description
    ) {
      console.error('Missing a required table cell for a move');
      console.log(label, name, type, attack, accuracy, pp, effect, description);
      continue;
    }
    const splitTypeString = type.split('/');
    const actualType =
      splitTypeString[splitTypeString.length - 1].split('.')[0];

    const move: TaughtMove = {
      label,
      name: name.toLocaleLowerCase(),
      type: actualType,
      accuracy: parseInt(accuracy),
      pp: parseInt(pp),
      description,
    };

    if (attack && attack !== '--') {
      move.attack = parseInt(attack);
    }

    if (effect && effect !== '--') {
      move.effect = parseInt(effect);
    }

    moves = [...moves, move];
  }

  return moves;
}

export async function parseLocation(
  tableEl: ElementHandle<Element>
): Promise<LocationGenI | null> {
  const tableRows = await tableEl.$$('tr');
  if (!tableRows) {
    return null;
  }

  const red = await (
    await tableRows[1].$('.fooinfo')
  )?.evaluate((el) => el.textContent);
  const blue = await (
    await tableRows[2].$('.fooinfo')
  )?.evaluate((el) => el.textContent);
  const blueJp = await (
    await tableRows[3].$('.fooinfo')
  )?.evaluate((el) => el.textContent);
  const yellow = await (
    await tableRows[4].$('.fooinfo')
  )?.evaluate((el) => el.textContent);

  if (!red || !blue || !blueJp || !yellow) {
    return null;
  }

  return {
    [Games.Red]: red,
    [Games.Green]: blue,
    [Games.Blue]: blue,
    [Games.BlueJp]: blueJp,
    [Games.Yellow]: yellow,
  };
}

export async function parseGeneralInformation(
  tableEl: ElementHandle<Element>
): Promise<GeneralDetails | null> {
  const tableRows = await tableEl.$$('tr');
  if (!tableRows) {
    return null;
  }
  const firstRowCells = await tableRows[1].$$('td.fooinfo');
  const secondRowCells = await tableRows[7].$$('td.fooinfo');

  // Name and number
  const nameEn = await firstRowCells[0].evaluate((el) => el.textContent);
  const numberStr = await firstRowCells[2].evaluate((el) => el.textContent);

  // Pokemon Names
  const otherNamesCells = await (
    await firstRowCells[1].$$('tr')
  )
    .map(async (row) => {
      const td = await (await row.$$('td'))[1].evaluate((el) => el.textContent);
      return td;
    })
    .map(async (e) => await e);

  if (!nameEn || !numberStr || otherNamesCells.length < 4) {
    return null;
  }

  // Pokemon Types
  const typesCell = (await (await tableRows[1].$('td.cen'))?.$$('a'))?.map(
    (a) =>
      a.evaluate((el) => {
        const href = el.getAttribute('href');
        console.log('for lols', href);

        if (!href) {
          return undefined;
        }

        const segments = href.split('/');
        return segments[segments.length - 1].split('.')[0] as Types;
      })
  );
  await typesCell;
  if (!typesCell || typesCell.length < 1) {
    return null;
  }
  const types: [Types, Types?] = [
    (await typesCell[0]) as Types,
    await typesCell[1],
  ];

  // Classification
  const classification = await secondRowCells[0].evaluate(
    (el) => el.textContent
  );

  // height and weight
  const height = await secondRowCells[1].evaluate((el) =>
    el.innerHTML.split('<br>')[1].trim().slice(0, -1)
  );
  const weight = await secondRowCells[2].evaluate((el) =>
    el.innerHTML.split('<br>')[1].trim().slice(0, -2)
  );

  // Capture rate
  const captureRate = await secondRowCells[3].evaluate((el) =>
    el.textContent.trim()
  );

  return {
    number: parseInt(numberStr.replace('#', '')),
    name: {
      en: nameEn.trim().toLowerCase(),
      ja: (await otherNamesCells[0]) || 'unknown',
      fr: (await otherNamesCells[1]) || 'unknown',
      de: (await otherNamesCells[2]) || 'unknown',
      ko: (await otherNamesCells[3]) || 'unknown',
    },
    classification,
    captureRate: parseInt(captureRate),
    weight: {
      unit: 'kg',
      value: parseFloat(weight),
    },
    height: {
      unit: 'm',
      value: parseFloat(height),
    },
    type: types,
    // expGrowth: {
    //   rank: 'Medium Slow',
    //   points: 1059860,
    // },
  };
}

export async function parseGeneralInformationTwo(
  tableEl: ElementHandle<Element>
): Promise<GeneralDetailsTwo | null> {
  console.log('secondTable');
  const tableRows = await tableEl.$$('tr');
  if (!tableRows) {
    return null;
  }
  const firstRowCells = await tableRows[1].$$('td.fooinfo');
  const expGrowthString = await firstRowCells[0].evaluate((el) =>
    el.innerHTML.split('<br>')
  );
  const evs = await firstRowCells[1].evaluate((el) =>
    el.innerHTML.split('<br>')
  );
  return {
    expGrowth: {
      rank: expGrowthString[1],
      points: parseInt(
        expGrowthString[0].split(' ')[0].replace(new RegExp(/,/g), '')
      ),
    },
    effortValuesEarned: {
      hp: parseInt(evs[0].split(' ')[0]),
      attack: parseInt(evs[1].split(' ')[0]),
      defense: parseInt(evs[2].split(' ')[0]),
      special: parseInt(evs[3].split(' ')[0]),
      speed: parseInt(evs[4].split(' ')[0]),
    },
  };
}

// export async function parseEvolutionaryChain(
//   tableEl: ElementHandle<Element>
// ): Promise<LocationGenI | null> {
//   const evoTable = await tableEl.$('.evochain');
//   if (!evoTable) {
//     return null;
//   }

//   const cells = await evoTable.$$('td');

//   if (cells.length === 1) {
//     // No evolutions

//   }

//   const cellOne = cells[0].evaluate(el => el);
//   const cellTwo = cells[0].evaluate(el => el);
//   if ( === '')

//   for(const cell of cells) {
//     cell.evaluate((el) => {
//       if (el.className === '')
//     });
//   }
// }

function handleStandardEvolutionaryChain() {
  return;
}
