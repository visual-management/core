import VueGridLayout from 'vue-grid-layout';
import PluginManager from './plugin-manager/plugin-manager';

// vm plugin add entry
import SonarPlugin from 'visual-management-pm/src/app/sonar-plugin/entry-point';
let plugs = [SonarPlugin];

let comps = {
  GridLayout: VueGridLayout.GridLayout,
  GridItem  : VueGridLayout.GridItem
};

for (let plugin of plugs) {
  console.log(`Loading plugin ${plugin.name}`);
  for (let component of plugin.components) {
    comps[component.tag] = component.vue;
  }
}

export const components = comps;
export const plugins = new PluginManager(plugs);
