const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  // Watch files in the shared package
  watchFolders: [
    path.resolve(__dirname, '../shared/src'),
    path.resolve(__dirname, '../shared/dist'),
  ],

  resolver: {
    // Enable symlinks resolution
    unstable_enableSymlinks: true,

    // Add support for TypeScript files
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json'],

    // Node modules to resolve
    nodeModulesPaths: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ],

    // Alias for shared package - point to source files
    alias: {
      '@meeting-minutes/shared': path.resolve(__dirname, '../shared/src/index.ts'),
      '@meeting-minutes/shared/types': path.resolve(__dirname, '../shared/src/types/index.ts'),
      '@meeting-minutes/shared/schemas': path.resolve(__dirname, '../shared/src/schemas/index.ts'),
      '@meeting-minutes/shared/utils': path.resolve(__dirname, '../shared/src/utils/index.ts'),
    },
  },

  // Transform options
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
