module.exports = {
    test: /\.(jsx?)$/,
    exclude: /node_modules\/(?!@beisen\/talent-ui)/, //本正则由张跃同学提供
    loader: "babel-loader",
    options: require('../helpers/babel-config.js')
};
