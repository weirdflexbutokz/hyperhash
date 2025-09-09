import fs from 'fs';
import pathModule from 'path';

export function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function readWordlist(path) {
  const absolutePath = pathModule.isAbsolute(path)
    ? path
    : pathModule.join(process.cwd(), path);
  try {
    const data = fs.readFileSync(absolutePath, 'utf8');
    return data.split(/\r?\n/).filter(Boolean);
  } catch (err) {
    throw new Error(`Error reading wordlist: ${err.message}`);
  }
}

export async function randomLine(path) {
  const absolutePath = pathModule.isAbsolute(path)
    ? path
    : pathModule.join(process.cwd(), path);
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(absolutePath, 'utf8');
    let chosen = null;
    let count = 0;
    let leftover = '';
    stream.on('data', chunk => {
      leftover += chunk;
      let lines = leftover.split(/\r?\n/);
      leftover = lines.pop();
      for (const line of lines) {
        if (line) {
          count++;
          if (Math.random() < 1 / count) {
            chosen = line;
          }
        }
      }
    });
    stream.on('end', () => {
      if (leftover && leftover.trim()) {
        count++;
        if (Math.random() < 1 / count) {
          chosen = leftover.trim();
        }
      }
      resolve(chosen);
    });
    stream.on('error', err => {
      reject(new Error(`Error reading file: ${err.message}`));
    });
  });
}

export function randomLineSync(path) {
  const absolutePath = pathModule.isAbsolute(path)
    ? path
    : pathModule.join(process.cwd(), path);
  try {
    const data = fs.readFileSync(absolutePath, 'utf8');
    const lines = data.split(/\r?\n/).filter(Boolean);
    return choice(lines);
  } catch (err) {
    throw new Error(`Error reading file: ${err.message}`);
  }
}

export function getFilesInDirectory(path) {
  const absolutePath = pathModule.isAbsolute(path)
    ? path
    : pathModule.join(process.cwd(), path);
  try {
    return fs.readdirSync(absolutePath).map(file => pathModule.join(absolutePath, file));
  } catch (err) {
    throw new Error(`Error reading directory: ${err.message}`);
  }
}

export function randomFile(dir) {
  const files = getFilesInDirectory(dir);
  return choice(files);
}

function main() {
  choiceLineFromFile('./wordlists/priv1').then(console.log).catch(console.error);
  console.log(choiceLineFromFileSync('./wordlists/priv1'));
}

// main();