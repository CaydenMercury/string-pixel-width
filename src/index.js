import deburr from 'lodash.deburr';
import widthsMap from './widthsMap';
import widthsMapV2 from './widthsMapV2';

const settingsDefaults = { font: 'Arial', size: 100, fontWeight: 400, version: 1 };
const availableFontWeights = [400, 500, 600, 700];

const getWidth = (string, settings) => {
  const sett = { ...settingsDefaults, ...settings };

  const font = sett.font.toLowerCase();
  const size = sett.size;
  const version = typeof sett.version == 'undefined' ? 1 : sett.version;
  const variant = typeof sett.fontWeight != 'undefined' && availableFontWeights.indexOf(sett.fontWeight) > -1 ? availableFontWeights.indexOf(sett.fontWeight) : 0;

  const map = version > 1 ? widthsMapV2 : widthsMap;
  const available = Object.keys(map);
  if (available.indexOf(font) === -1) {
    throw new Error(`This font is not supported. Supported fonts are: ${available.join(', ')}`);
  }
  
  let totalWidth = 0;
  deburr(string).split('').forEach((char) => {
    if (/[\x00-\x1F]/.test(char)) { // non-printable character
      return true;
    }
    // use width of 'x' as fallback for unregistered char
    const widths = map[font][char] || map[font].x;
    const width = widths[variant];
    totalWidth += width;
    return true;
  });
  return totalWidth * (size / 100);
};

export default getWidth;
