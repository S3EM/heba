const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const images = [
  'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1568252542512-9fe8df9c6add?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1596783046220-6923f7d28712?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515347619152-14228e469557?auto=format&fit=crop&w=800&q=80'
];

async function main() {
  const dir = path.join(__dirname, 'public', 'images');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log('Downloading video...');
  await downloadFile('https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', path.join(dir, 'hero-video.mp4'));

  console.log('Downloading logo...');
  // Create a simple dummy logo or download one
  await downloadFile('https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80', path.join(dir, 'logo.png'));

  console.log('Downloading images...');
  for (let i = 1; i <= 29; i++) {
    const url = images[i % images.length];
    const dest = path.join(dir, `dress-${i}.jpg`);
    await downloadFile(url, dest);
    console.log(`Downloaded dress-${i}.jpg`);
  }
  
  console.log('Done!');
}

main().catch(console.error);
