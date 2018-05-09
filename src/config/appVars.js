const appVars = {
    url: `${window.location.protocol}//${window.location.host}`,
    title: 'Stageverslag',
    api: {
        local: 'https://stageverslag.local/wp-json/wp/v2/',
        live: 'https://wordpress.florisschippers.nl/index.php/wp-json/wp/v2/',
    },
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
    }
};

export default appVars;
