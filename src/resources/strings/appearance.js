import { faChildReaching, faFlagCheckered, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

/* Vars*/
const EXAMS_MODE_OPTIONS = [
    {
        name: 'ON',
        icon: faToggleOn,
        detail: 'El jugador no visualizará evaluaciones en las categorías',
        backgroundColor: '#66c05f',
        fontColor: 'white',
        value: true,
    },
    {
        name: 'OFF',
        icon: faToggleOff,
        detail: 'El jugador visualizará una evaluación en cada categoría',
        backgroundColor: '#e74c4c',
        fontColor: 'white',
        value: false,
    }
  ];
const PROGRESS_CONFIG_OPTIONS = [
    {
        name: 'Modo desafío',
        icon: faFlagCheckered,
        detail: 'En este modo el jugador deberá completar una categoría para desbloquear la siguiente categoría',
        backgroundColor: '#ee645a',
        fontColor: 'white',
        value: true,
    },
    {
        name: 'Modo libertad',
        icon: faChildReaching,
        detail: 'En este modo el jugador tendrá todas las categorías desbloqueadas desde un principio',
        backgroundColor: '#4ebf91',
        fontColor: 'white',
        value: false,
    }
];

/* View texts */
const BREADCRUMB = [
    {
      name: 'Apariencia',
      route: '/appearance',
    },
  ];
const SAVE_CHANGES = 'Guardar cambios';
const UPDATE_SUCCESS = {
    severity: 'success',
    text: 'La apariencia ha sido actualizada correctamente'
};
const MOBILE_SCREENS = {
    LOGIN: 'Inicio de sesión',
    CATEGORIES: 'Listado de categorías',
    QUESTION: 'Pregunta',
}

/* Tabs */
const BRAND_TAB = 'marca';
const PALETTE_TAB = 'paleta de colores';
const GAMEPLAY_TAB = 'jugabilidad';

/* Sections */
const BRAND_SECTION = {
    APP_NAME: 'Nombre de aplicación',
    OFF_LOGO: 'del logo',
};
const GAMEPLAY_SECTION = {
    PROGRESS_CONFIG: 'Modo de juego',
    EXAMS_MODE: 'Modo de evaluaciones',
    EXAMS_MODE_OPTIONS,
    PROGRESS_CONFIG_OPTIONS,
};
const PALETTE_SECTION = {
    BACKGROUND_AND_OVERGROUND_PALETTE: {
        TITLE: 'Fondo de la aplicación',
        MAIN_BACKGROUND: 'Fondo de la aplicación',
        OVERGROUND: 'Sobrefondo',
    },
    HEADER_AND_BUTTONS_PALETTE: {
        TITLE: 'Barra superior y botones',
        BACKGROUND: 'Fondo',
        LETTERS: 'Letras',
    },
    LETTERS_PALETTE: {
        TITLE: 'Letras complementarias',
        MAIN_LETTERS: 'Letras principales',
        OVERGROUND_LETTERS: 'Letras sobre fondo',
    },
    SELECTABLE_ANSWERS_PALETTE: {
        TITLE: 'Respuestas seleccionables',
        BACKGROUND: 'Fondos',
        LETTERS: 'Letras',
    },
};

/* Previews */
const LOGIN_PREVIEW = {
    FAKE_USER: 'MiUsuario',
    PASSWORD: 'Contraseña',
    FORGOT_PASSWORD: '¿Olvidaste tu contraseña?',
    LOG_IN: 'Iniciar sesión',
    SIGN_UP: 'Registrarse',
}


const APPEARANCE_STRINGS = {
    BREADCRUMB,
    SAVE_CHANGES,
    UPDATE_SUCCESS,
    MOBILE_SCREENS,
    BRAND_TAB,
    PALETTE_TAB,
    GAMEPLAY_TAB,
    BRAND_SECTION,
    GAMEPLAY_SECTION,
    PALETTE_SECTION,
    LOGIN_PREVIEW,
};

export default APPEARANCE_STRINGS;