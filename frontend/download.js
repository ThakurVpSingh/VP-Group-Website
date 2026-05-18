const https = require('https');
const fs = require('fs');

https.get('https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => fs.writeFileSync('avatar.svg', data));
}).on('error', (e) => {
    console.error(e);
});
