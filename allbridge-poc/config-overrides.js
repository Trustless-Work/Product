const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = function override(config, webpackEnv) {
    console.log('overriding webpack config...');

    config.resolve.fallback = {
        url: require.resolve('url'),
        fs: require.resolve('fs'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify'),
    };

    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';
    const loaders = config.module.rules[1].oneOf;

    loaders.splice(loaders.length - 1, 0, {
        test: /\.(js|mjs|cjs)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: require.resolve('babel-loader'),
        options: {
            babelrc: false,
            configFile: false,
            compact: false,
            presets: [
                [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                ],
            ],
            cacheDirectory: true,
            cacheCompression: false,
            cacheIdentifier: getCacheIdentifier(
                isEnvProduction
                    ? 'production'
                    : isEnvDevelopment && 'development',
                [
                    'babel-plugin-named-asset-import',
                    'babel-preset-react-app',
                    'react-dev-utils',
                    'react-scripts',
                ]
            ),
            sourceMaps: shouldUseSourceMap,
            inputSourceMap: shouldUseSourceMap,
        },
    });

    return config;
};
