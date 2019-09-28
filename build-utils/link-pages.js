const path = require('path');
const { readdirSync, mkdirSync, existsSync, writeFileSync, readFileSync } = require('fs');

const PAGES_PATH = path.resolve(__dirname, '..', '..', 'pages');
const DIST_PATH = path.resolve(__dirname, '..', 'dist', 'pages');

if (!existsSync(DIST_PATH)) {
    mkdirSync(DIST_PATH);
}

readdirSync(PAGES_PATH)
    .map(page => {
        const dirSource = path.join(PAGES_PATH, page, 'dist');
        const dirTarget = path.join(DIST_PATH, page);

        if (!existsSync(dirTarget)) {
            mkdirSync(dirTarget);
        }

        readdirSync(dirSource).map(file => {
            const fileSource = path.join(dirSource, file);
            const fileTarget = path.join(dirTarget, file);

            writeFileSync(fileTarget, readFileSync(fileSource))
        });
    });

