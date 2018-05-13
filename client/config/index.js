const SRC = './client/src';
const DIST = './dist/client';

const SERVER_SRC = './server/src';
const SERVER_DIST = `${DIST}/server`;

const GFX_OUTPUT = `${DIST}/gfx`;
const GFX_SRC = `${SRC}/gfx`;

const SVG_OUTPUT = `${GFX_OUTPUT}/svg`;
const SVG_SRC = `${GFX_SRC}/svg`;

const FONTS_OUTPUT = `${DIST}/fonts`;
const FONTS_SRC = `${SRC}/fonts`;

const JS_OUTPUT = `${DIST}/js`;
const JS_SRC = `${SRC}/js`;

const CSS_ENTRY = `${SRC}/sass/main.scss`;
const CSS_SRC = `${SRC}/sass/**/*.scss`;
const CSS_OUTPUT = `${DIST}/css`;

const TEMPLATE_SRC = `${SRC}/templates`;

const CLIENT_PORT = 3000;
const CLIENT_ENTRY = `${JS_SRC}/index.js`;
const APP_PATH = `${JS_OUTPUT}/app`;
const PUBLIC_PATH = 'js/app/';
const VENDOR_PATH = `${JS_OUTPUT}/vendor`;

module.exports = {
  SRC,
  DIST,
  CLIENT_PORT,
  SERVER_SRC,
  SERVER_DIST,
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
};
