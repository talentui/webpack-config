var {buildProd} = global['talent-ui-runtime'];

module.exports = new (require("webpack").optimize.CommonsChunkPlugin)({
    name: ["common", "webpack-bootstrap"],
    minChunks: 2,
    filename: buildProd ? "[name].[hash].js" : "[name].js"
});
