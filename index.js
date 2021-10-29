const fsp = require('fs').promises;

async function load() {
    console.log('calling load');
    const buffer = await fsp.readFile('./restaurants.json');
    const restaurants = (JSON.parse(STRING(buffer)));
    return restaurants;
}

module.exports = load();