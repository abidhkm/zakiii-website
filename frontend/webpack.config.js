// required modules
const path = require("path");
const webpack = require("webpack");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

// setting up project configs and some vars
const t9config = require("./t9config.json");
const isDevelopment = (process.env.NODE_ENV === "development");
const isProduction = (process.env.NODE_ENV === "production");
const port = process.env.DEV_SERVER_PORT || 8080;
const webpackConfigArray = [];

// match replacement function
const replacement = (language, app) => function (match) {
  // we have: language, file path, placeholder, app
  const placeholder = match.slice(2, -2);

  // try to get from overwrites
  delete require.cache[require.resolve(`./src/apps/${app}/app/dictionary-overwrites.json`)]
  const overwrites = require(`./src/apps/${app}/app/dictionary-overwrites.json`);
  let value;
  if (overwrites["*"] && (value = overwrites["*"][placeholder])) {
    return value;
  } else if (overwrites[language] && (value = overwrites[language][placeholder])) {
    return value;
  } else {
    // then, try from this.resourcePath.json
    delete require.cache[require.resolve(path.join(path.dirname(this.resourcePath), "/dictionary.json"))]
    const fileDictionary = require(path.join(path.dirname(this.resourcePath), "/dictionary.json"));
    if (fileDictionary[language] && (value = fileDictionary[language][placeholder])) {
      return value;
    } else {
      // and then try the fallbacks
      delete require.cache[require.resolve(`./src/apps/${app}/app/dictionary-fallbacks.json`)]
      const fallbacks = require(`./src/apps/${app}/app/dictionary-fallbacks.json`);
      if (fallbacks["*"] && (value = fallbacks["*"][placeholder])) {
        return value;
      } else if (fallbacks[language] && (value = fallbacks[language][placeholder])) {
        return value;
      } else {
        // finally if it's not found, set a placeholder value instead
        return "PLACEHOLDER";
      }
    }
  }
};

// pushWebpackConfig function
const pushWebpackConfig = (language, app) => {
  webpackConfigArray.push({
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
      contentBase: t9config.bundles.distFolder,
      compress: true,
      headers: { "Access-Control-Allow-Origin": "*" },
      hot: true,
      liveReload: false,
      disableHostCheck: true,
      host: "0.0.0.0",
      port,
      writeToDisk: true,
    },
    // https://webpack.js.org/configuration/devtool/#development
    devtool: isProduction ? false : "eval-source-map",
    // https://webpack.js.org/configuration/entry-context/
    entry: path.join(__dirname, "./src/apps/", app, "/app/index.tsx"),
    // https://webpack.js.org/configuration/mode/
    mode: isProduction ? "production" : (isDevelopment ? "development" : "none"),
    module: {
      rules: [
        // https://github.com/microsoft/TypeScript-Babel-Starter#create-a-webpackconfigjs
        { exclude: /node_modules/, loader: "babel-loader", test: /\.tsx?$/ },
        // https://webpack.js.org/loaders/source-map-loader/
        { enforce: "pre", loader: "source-map-loader", test: /\.js$/ },
        // https://github.com/webpack-contrib/mini-css-extract-plugin/
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isDevelopment },
            },
            // https://github.com/webpack-contrib/css-loader
            "css-loader",
            // https://github.com/postcss/postcss-loader#plugins
            {
              loader: "postcss-loader",
              options: { plugins: () => [require("precss"), require("autoprefixer")] },
            },
          ],
        },
        // https://github.com/webpack-contrib/sass-loader
        {
          test: /\.(sa|sc)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isDevelopment },
            },
            // https://github.com/webpack-contrib/css-loader
            "css-loader",
            // https://github.com/postcss/postcss-loader#plugins
            {
              loader: "postcss-loader",
              options: { plugins: () => [require("precss"), require("autoprefixer")] },
            },
            {
              loader: StringReplacePlugin.replace({
                replacements: [{ pattern: /({\|)[A-Za-z0-9\s]+(\|})/ig, replacement: replacement(language, app) }],
              }),
            },
            "sass-loader",
          ],
        },
        // https://github.com/webpack-contrib/less-loader
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: isDevelopment },
            },
            // https://github.com/webpack-contrib/css-loader
            "css-loader",
            // https://github.com/postcss/postcss-loader#plugins
            {
              loader: "postcss-loader",
              options: { plugins: () => [require("precss"), require("autoprefixer")] },
            },
            {
              loader: StringReplacePlugin.replace({
                replacements: [{ pattern: /({\|)[A-Za-z0-9\s]+(\|})/ig, replacement: replacement(language, app) }],
              }),
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                javascriptEnabled: true,
              }
            },
          ],
        },
        // https://github.com/webpack-contrib/file-loader
        {
          test: /\.(png|jpe?g|gif|svg|ico|ttf|woff2?)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: "w/assets",
              }
            },
          ],
        },
        // https://github.com/jamesandersen/string-replace-webpack-plugin
        {
          test: /\.([tj]sx?|html|pug)?$/,
          loader: StringReplacePlugin.replace({
            replacements: [{ pattern: /({\|)[A-Za-z0-9\s]+(\|})/ig, replacement: replacement(language, app) }],
          }),
        },
      ],
    },
    // https://webpack.js.org/configuration/optimization/#optimizationminimizer
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        cacheGroups: {
          common: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            chunks: 'all',
            filename: 'w/common.js',
          },
        },
      },
    },
    // https://webpack.js.org/concepts/output/#multiple-entry-points
    output: {
      chunkFilename: "w/" + language + "/" + "[name].chunk.[hash].js",
      filename: "w/" + language + "/" + "[name].[hash].js",
      path: path.join(__dirname, t9config.bundles.distFolder, t9config.bundles.publicPath),
      publicPath: path.join(t9config.bundles.publicPath),
    },
    plugins: [
      // https://webpack.js.org/plugins/hot-module-replacement-plugin/
      isDevelopment ? new webpack.HotModuleReplacementPlugin() : () => null,
      // https://github.com/webpack-contrib/mini-css-extract-plugin#advanced-configuration-example
      new MiniCssExtractPlugin({
        filename: "w/" + language + "/" + "[name].[hash].css",
        chunkFilename: "w/" + language + "/" + "[id].[hash].css",
      }),
      // https://webpack.js.org/plugins/html-webpack-plugin/
      new HtmlWebpackPlugin({
        filename: `${t9config.defaultLanguage !== language ? language + "/" : ""}index.html`,
        template: `pug-loader!./src/apps/${app}/app/index.pug`,
      }),
    ],
    resolve: {
      // https://webpack.js.org/configuration/resolve/#resolvealias
      alias: {
        "t9/redux": path.resolve(__dirname, "src/redux"),
        "t9/apps": path.resolve(__dirname, "src/apps"),
        "src": path.resolve(__dirname, "src"),
        "config": path.resolve(__dirname, "config"),
      },
      // https://webpack.js.org/configuration/resolve/#resolveextensions
      extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".pug", ".svg", ".ico"]
    },
    // https://webpack.js.org/configuration/target/
    target: "web",
  });
};

// pushing configs for each language
for (const language of t9config.languages) {
  // if (language !== t9config.defaultLanguage) continue; // for dev environment
  for (const app of t9config.apps) {
    // push a config version
    pushWebpackConfig(language, app);
  }
}

// exporting configs
module.exports = webpackConfigArray;
