import { Settings } from 'react-native';

export const Currency = () => {
  switch (Settings.get('currency')) {
    case 'Dollar':
      return '$';
    case 'Euro':
      return '€';
    case 'Pound':
      return '£';
    case 'Won':
      return '₩';
    case 'Yen':
      return '¥';
    default:
      return '$';
  }
};
