const src = './client/src';
const dist = './client/dist';

const jsOutput = `${dist}/js`;
const jsSrc = `${src}/js`;

const templatesSrc = `${src}/templates`


module.exports = {
    clientPort: 3000,
    src,
    dist,
    entry: `${jsSrc}/index.js`,
    jsOutput,
    jsSrc,
    templatesSrc,
    appPath: `${jsOutput}/app`,
    publicPath: `js/app/`,
    vendorPath: `${jsOutput}/vendor`
}