// filepath: /Users/traianalexandru/mega/angular/angular14/add-standalone.js
const fs = require('fs');
const path = require('path');

const COMPONENT_SUFFIX = '.component.ts';

function updateComponentMetadata(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if the component already has `standalone`
  if (content.includes('standalone:')) {
    console.log(`Skipping (already has standalone): ${filePath}`);
    return;
  }

  // Add `standalone: false` to the @Component decorator
  content = content.replace(
    /@Component\(\{([\s\S]*?)\}/,
    (match, metadata) => {
      return `@Component({${metadata.trim()}, standalone: false}`;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${filePath}`);
}

function findComponents(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      findComponents(fullPath);
    } else if (file.endsWith(COMPONENT_SUFFIX)) {
      updateComponentMetadata(fullPath);
    }
  });
}

// Start from the `src/app` directory
const componentsDir = path.join(__dirname, 'src', 'app');
findComponents(componentsDir);
