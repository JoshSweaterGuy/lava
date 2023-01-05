import { writeFileSync, mkdir, existsSync } from 'fs';

// store in a hidden file lavaPaths.json in the local directory called .lava
// lavaPaths.json will contain the paths to the notesDir, templatesDir, and objectsDir
export default function lavaInit(
  notesDir,
  templatesDir,
  objectsDir = undefined
) {
  if (objectsDir == undefined) {
    objectsDir = templatesDir;
  }

  console.log('Initializing lava...');

  if (notesDir == undefined || templatesDir == undefined) {
    console.log('Please specify a notes directory and a templates directory');
    process.exit(1);
  }

  const lavaPaths = {
    notesDir,
    templatesDir,
    objectsDir,
  };

  if (!existsSync('.lava')) {
    mkdir('.lava', err => {
      if (err) {
        console.log('Error creating .lava directory');
        process.exit(1);
      }
    });
  }

  writeFileSync('.lava/lavaPaths.json', JSON.stringify(lavaPaths));
}
