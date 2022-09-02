import { Icons } from '@utils';

export interface ConfigurationState {
  pages: Page[];
  selectedPage?: string;
  theme: Theme;
}

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export interface Page {
  name: string;
  icon: Icons;
}

export interface AugmentedPageData extends Page {
  isSelected: boolean;
}
