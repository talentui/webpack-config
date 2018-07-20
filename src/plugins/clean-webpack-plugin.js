const path = require('path');
const cleanwebpack = require('clean-webpack-plugin');

module.exports = new cleanwebpack(['dist'], {
    root: process.cwd()
});