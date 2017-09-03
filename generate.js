'use strict';

const fs = require('fs');

function makeDeps(basename, num, depthLeft) {
  if (depthLeft < 1) return [];

  const deps = [];
  for (let i = 0; i < num; ++i) {
    const depName = `${basename}-${i}`;
    deps.push({
      path: depName,
      deps: makeDeps(depName, num, depthLeft - 1),
    });
  }
  return deps;
}

// Generate a module tree with 5 imports per file and 5 imports depth
const rootModule = {
  path: 'index',
  deps: makeDeps('index', 5, 5),
};

function formatCommonJSImport(dep) {
  return `require('./${dep.path}');`;
}

function writeCommonJS(desc) {
  fs.writeFileSync(`cjs/${desc.path}.js`, `'use strict';

${desc.deps.map(formatCommonJSImport).join('\n')}

process.emit('not-an-actual-event', { answer: 42 });
`);

  desc.deps.forEach(writeCommonJS);
}
writeCommonJS(rootModule);

function formatESImport(dep) {
  return `import './${dep.path}';`;
}

function writeES(desc) {
  fs.writeFileSync(`mjs/${desc.path}.mjs`, `${desc.deps.map(formatESImport).join('\n')}

  process.emit('not-an-actual-event', { answer: 42 });
`);

  desc.deps.forEach(writeES);
}
writeES(rootModule);
