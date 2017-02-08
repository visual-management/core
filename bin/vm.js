#!/usr/bin/env node
let replace = require('replace');
let manifest = require('visual-management-pm');

if (process.argv.includes('--list')) {
  process.stdout.write("List of available plugins :\r\n");
  for (let plugin of manifest.plugins) {
    process.stdout.write(`\t o ${plugin.name}\r\n`);
  }
}


if (process.argv.includes('--add')) {
  while (process.argv[0] !== '--add') {
    process.argv.splice(0, 1);
  }
  process.argv.splice(0, 1);

  let pluginsToAdd = [];
  for (let arg of process.argv) {
    pluginsToAdd.push(getPlugin(arg));
  }

  for (let plugin of pluginsToAdd) {
    addPlugin(plugin);
  }

}


function getPlugin (pluginName) {
  for (let plugin of manifest.plugins) {
    if (plugin.name === pluginName) {
      return plugin;
    }
  }
  throw new Error(`Plugin ${pluginName} is not available`);
}

function addPlugin (plugin) {
  process.stdout.write(`Adding plugin ${plugin.name}\r\n`);

  replace({
    regex: "// vm plugin add entry",
    replacement: `// vm plugin add entry\r\nimport ${plugin.name} from 'visual-management-pm/src/app/${plugin.path}/entry-point';`,
    paths: ['./src/app/app.module.js'],
    recursive: true,
    silent: true,
  });

  replace({
    regex: /let plugins = \[(.*?)\];/,
    replacement: `let plugins = [$1, ${plugin.name}];`,
    paths: ['./src/app/app.module.js'],
    recursive: true,
    silent: true,
  });

}
