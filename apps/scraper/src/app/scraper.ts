import { ElementHandle, Page } from 'puppeteer';
import { PokemonRBGY } from '@elmdex/utils';
import { environment } from '../environments/environment';
import { scrapeRBGYPage, startBrowser } from './common';
import * as fs from 'fs';
import { stringify } from 'yaml';

async function getAllPokemonPages(page: Page): Promise<string[]> {
  const optionEls = await page.$$('body main table select option');
  const validOptions = await optionEls.reduce(
    async (prev: Promise<string[]>, curr: ElementHandle<Element>) => {
      if (await curr.evaluate((el) => el.hasAttribute('value'))) {
        const a = await curr.evaluate((el) => el.getAttribute('value'));
        return [...(await prev), a as string];
      }
      return prev;
    },
    Promise.resolve([])
  );

  return validOptions;
}

export const scrape = async () => {
  const browser = await startBrowser();

  const hubPage = await browser.newPage();
  await hubPage.goto(environment.constants.rbgyDexPage);
  const allPagesToScrape = await getAllPokemonPages(hubPage);

  const pageUrl = allPagesToScrape[0];
  const page = await browser.newPage();
  await page.goto(`${environment.constants.seribii}${pageUrl}`);

  const rgbyPokemonData: PokemonRBGY = await scrapeRBGYPage(page);
  // console.log(rgbyPokemonData);
  const theTestFile = `${environment.constants.outputPath}/test.yaml`;

  deleteIfExists(theTestFile);

  fs.writeFile(theTestFile, stringify(rgbyPokemonData), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    // file written successfully
    console.log('file created - ', theTestFile);
  });

  await hubPage.close();
  await browser.close();
};

function deleteIfExists(file: string) {
  fs.stat(file, function (err, stats) {
    if (err) {
      return console.error(err);
    }

    fs.unlink(file, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });
  });
}
