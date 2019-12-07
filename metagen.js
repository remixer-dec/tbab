//import fs from 'fs'
const fs = require('fs')
let probe = require('/usr/local/lib/node_modules/@zerodeps/image-probe').ImageProbe
let x = fs.readdirSync('./img')

let output = []
for(let img of x ){
    const buffer = fs.readFileSync("img/"+img);
    const results = probe.fromBuffer(buffer);
    let z = {
        url:'./img/'+img,
        w:results.width,
        h:results.height,
        name:img.replace(/.png|.jpg/g,''),
    }
    output.push(z)
}

fs.writeFileSync('meta/textures.json',JSON.stringify(output))