const DIST = './dist';

const CLIENT_SRC = './client/src';
const CLIENT_DIST = `${DIST}/client`;

const SERVER_SRC = './server/src'
const SERVER_DIST = `${DIST}/server`;

const JS_OUTPUT = `${CLIENT_DIST}/js`;
const JS_SRC = `${CLIENT_SRC}/js`;

const TEMPLATE_SRC = `${CLIENT_SRC}/templates`


module.exports = {
    CLIENT_PORT: 3000,
    CLIENT_SRC,
    CLIENT_DIST,
    CLIENT_ENTRY: `${JS_SRC}/index.js`,
    JS_OUTPUT,
    JS_SRC,
    TEMPLATE_SRC,
    APP_PATH: `${JS_OUTPUT}/app`,
    PUBLIC_PATH: `js/app/`,
    VENDOR_PATH: `${JS_OUTPUT}/vendor`
}