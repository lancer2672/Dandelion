module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "babel-plugin-module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@components": "./src/components",
            "@src": "./src",
            // modules: './src/modules',
            // lib: './src/lib',
            // types: './src/types',
            "@constants": "./src/constants",
          },
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
      ],
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
        },
      ],
    ],
  };
};
