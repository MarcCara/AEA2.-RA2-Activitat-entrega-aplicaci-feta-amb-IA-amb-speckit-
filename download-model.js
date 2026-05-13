const fs = require('fs');
const path = require('path');
const https = require('https');

// CORRECT URL for ssdlite_mobilenet_v2
const BASE_URL = 'https://storage.googleapis.com/tfjs-models/savedmodel/ssdlite_mobilenet_v2/';
const MODEL_FILE = 'model.json';
// Shards for this model do NOT have .bin extension in URL or manifest
const SHARDS = [
    'group1-shard1of5',
    'group1-shard2of5',
    'group1-shard3of5',
    'group1-shard4of5',
    'group1-shard5of5'
]; 

const DEST_DIR = path.join(__dirname, 'vision-ai', 'public', 'models', 'coco-ssd');

if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function main() {
    console.log('🚀 Starting Coco-SSD model download...');

    try {
        console.log(`Downloading ${MODEL_FILE} from ${BASE_URL}...`);
        await download(`${BASE_URL}${MODEL_FILE}`, path.join(DEST_DIR, MODEL_FILE));

        for (const shard of SHARDS) {
            console.log(`Downloading ${shard}...`);
            await download(`${BASE_URL}${shard}`, path.join(DEST_DIR, shard));
        }

        console.log('✅ Model downloaded successfully!');
        console.log(`Files saved in: ${DEST_DIR}`);
    } catch (error) {
        console.error('❌ Error downloading model:', error.message);
    }
}

main();
