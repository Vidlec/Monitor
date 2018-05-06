const environment = require('./environment');

const ENVIRONMENT = environment().type;
const DEVELOPMENT = ENVIRONMENT === 'development';

const DIST = './dist';

const CLIENT_SRC = './client/src';
const CLIENT_DIST = `${DIST}/client`;

const SERVER_SRC = './server/src';
const SERVER_DIST = `${DIST}/server`;

const GFX_OUTPUT = `${CLIENT_DIST}/gfx`;
const GFX_SRC = `${CLIENT_SRC}/gfx`;

const SVG_OUTPUT = `${GFX_OUTPUT}/svg`;
const SVG_SRC = `${GFX_SRC}/svg`;

const FONTS_OUTPUT = `${CLIENT_DIST}/fonts`;
const FONTS_SRC = `${CLIENT_SRC}/fonts`;

const JS_OUTPUT = `${CLIENT_DIST}/js`;
const JS_SRC = `${CLIENT_SRC}/js`;

const CSS_ENTRY = `${CLIENT_SRC}/sass/main.scss`;
const CSS_SRC = `${CLIENT_SRC}/sass/**/*.scss`;
const CSS_OUTPUT = `${CLIENT_DIST}/css`;

const TEMPLATE_SRC = `${CLIENT_SRC}/templates`;

const CLIENT_PORT = 3000;
const CLIENT_ENTRY = `${JS_SRC}/index.js`;
const APP_PATH = `${JS_OUTPUT}/app`;
const PUBLIC_PATH = 'js/app/';
const VENDOR_PATH = `${JS_OUTPUT}/vendor`;

module.exports = {
  CLIENT_PORT,
  SERVER_SRC,
  SERVER_DIST,
  CLIENT_SRC,
  CLIENT_DIST,
  CLIENT_ENTRY,
  GFX_OUTPUT,
  GFX_SRC,
  SVG_OUTPUT,
  SVG_SRC,
  JS_OUTPUT,
  JS_SRC,
  FONTS_OUTPUT,
  FONTS_SRC,
  CSS_SRC,
  CSS_ENTRY,
  CSS_OUTPUT,
  TEMPLATE_SRC,
  APP_PATH,
  PUBLIC_PATH,
  VENDOR_PATH,
  DEVELOPMENT,
  ENVIRONMENT,
};
