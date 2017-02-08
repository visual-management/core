import VueGridLayout from 'vue-grid-layout';

// vm plugin add entry
import SonarPlugin from 'visual-management-pm/src/app/sonar-plugin/entry-point';
let plugins = [SonarPlugin];

let components = {
  GridLayout: VueGridLayout.GridLayout,
  GridItem  : VueGridLayout.GridItem
};

for (let plugin of plugins) {
  console.log(`Loading plugin ${plugin.name}`);
  for (let component of plugin.components) {
    components[component.tag] = component.vue;
  }
}


export default components;
