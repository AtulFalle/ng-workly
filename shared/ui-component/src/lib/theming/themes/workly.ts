import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Constants for repeated color values
const PRIMARY_950 = '{primary.950}';
const PRIMARY_50 = '{primary.50}';

const Workly = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#082f49'
        },
        colorScheme: {
            light: {
                primary: {
                    color: PRIMARY_950,
                    contrastColor: '#ffffff',
                    hoverColor: '{primary.800}',
                    activeColor: '{primary.700}'
                },
                highlight: {
                    background: PRIMARY_950,
                    focusBackground: '{primary.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: PRIMARY_50,
                    contrastColor: PRIMARY_950,
                    hoverColor: '{primary.200}',
                    activeColor: '{primary.300}'
                },
                highlight: {
                    background: PRIMARY_50,
                    focusBackground: '{primary.300}',
                    color: PRIMARY_950,
                    focusColor: PRIMARY_950
                }
            }
        }
    }
});

export default {
    preset: Workly,
    options: {
        darkModeSelector: '.p-dark'
    }
};
