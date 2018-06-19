const appVars = {
  url: `${window.location.protocol}//${window.location.host}`,
  title: 'Aeon of Strife',
  theme: {
    // Green
    // lighter: '#DDFAA4',
    // light: '#BCE270',
    // primary: '#7B9F35',
    // dark: '#425B10',
    // darker: '#101800',

    // Red
    lighter: '#FBE0E3',
    light: '#F75C6B',
    primary: '#E0091E',
    dark: '#99000F',
    darker: '#4D0007',

    // Blue
    // lighter: '#DCE4E5',
    // light: '#7798AB',
    // primary: '#1C6E8C',
    // dark: '#145166',
    // darker: '#0A2239',
  },
  mediaQueries: {
    mobile_landscape: '@media only screen and (min-width: 640px)',
    tablet_portrait: '@media only screen and (min-width: 768px)',
    tablet_landscape: '@media only screen and (min-width: 1024px)',
    desktop: '@media only screen and (min-width: 1250px)',
  },
};

export default appVars;
