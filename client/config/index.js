const src = './client/src/js/';
const dist = './client/dist/';
const jsOutput = `${dist}/js/`;


module.exports = {
    clientPort: 3000,
    src,
    dist,
    entry: `${src}index.js`,
    jsOutput,
    appPath: `${jsOutput}/app/`,
    vendorPath: `${jsOutput}/vendor/`
}