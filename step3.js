const fs = require('fs');
const process = require('process');
const axios = require('axios');

function writeOutputOrLog(text, out) {

    if (out) {

        fs.writeFile(out, text, 'utf8', function(err, data) {

            if (err) {

                console.log(`Couldn't write ${out}: ${err}`);
                process.kill(1)

            }

        });

    }

    else {

        console.log(text);

    }

}

function cat(path, out) {

        fs.readFile(path, 'utf8', (err, data) => {

            if (err) {

                console.log(`Error reading ${path}`, err);
                process.kill(1);

            }
    
            writeOutputOrLog(data, out);
    
        })

}

async function webCat(url, out) {

    try {

        let resp = await axios.get(url);
        writeOutputOrLog(resp.data, out);

    }

    catch (err) {

        console.log(`Error finding ${url}`);
        process.kill(1);

    }


}

let path;
let out;

if (process.argv[2] == '--out') {

    out = process.argv[3];
    path = process.argv[4];

}

else {

    path = process.argv[2];

}

if (path.slice(0,4) === 'http') {
    webCat(path, out);
}

else {
    cat(path, out)
}


// cat(process.argv[2])
