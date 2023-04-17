
// write the logic for logger middleware and export it.
const fs = require('fs');

function logger(req, res, next){
const { method, url, headers: { 'user-agent': userAgent } } = req;
const line = `Method:${method}, Route:${url}, user-agent:${userAgent}\n`
fs.appendFileSync('logs.txt', line)
 next()
}


module.exports = logger;