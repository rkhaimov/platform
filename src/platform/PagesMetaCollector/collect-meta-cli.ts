import * as path from 'path';
import { FSFileManager } from './FSFileManager';
import { PagesMetaCollector } from './index';

const fs = new FSFileManager();
const collector = new PagesMetaCollector(fs);

const root = path.join(__dirname, '..', '..', '..');
const pages = path.join(root, 'dist', 'pages');
const meta = path.join(root, 'dist', 'meta.json');

collector.collectJoinedPagesMeta(pages, meta);
