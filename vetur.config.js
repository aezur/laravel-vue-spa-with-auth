// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true
  },
  projects: [
    './app', // Shorthand for specifying only the project root location
    // {
    //   root: './app',
    //   package: './app/package.json',
    //   tsconfig: './app/tsconfig.json',
    // }
  ],
};