import logoImg from '@public/gentledog-logo.svg';
import logoIconImg from '@public/gentledog-logo.svg';
import { LAYOUT_OPTIONS } from './constants';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'GENTLEDOG Vender admin',
  description: 'GENTLEDOG Vender admin CMS',
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};
