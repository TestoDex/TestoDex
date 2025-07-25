const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts.push('db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'jpeg', 'gif', 'svg');

// Add support for additional source extensions
config.resolver.sourceExts.push('cjs', 'mjs');

// Configure resolver for better module resolution
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Optional: Add custom resolver for specific modules
config.resolver.alias = {
  // Add any custom module aliases here if needed
};

module.exports = config; 