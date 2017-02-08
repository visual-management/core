import VueGridLayout from 'vue-grid-layout';

import manifest from 'visual-management-pm';
import SonarPlugin from 'visual-management-pm/src/app/sonar-plugin/entry-point';
let plugins = [SonarPlugin];

let components = {
  GridLayout: VueGridLayout.GridLayout,
  GridItem  : VueGridLayout.GridItem
};

for (let plugin of manifest.plugins) {
  console.log('Plugin ' + plugin.name + ' is available.');
}

for (let plugin of plugins) {
  console.log(`Loading plugin ${plugin.name}`);
  for (let component of plugin.components) {
    components[component.tag] = component.vue;
  }
}


export default components;
