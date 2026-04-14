import fs from 'fs';
import path from 'path';

export default async function globalTeardown(): Promise<void> {
    const authDir = path.join(__dirname, '../.auth');
    if (fs.existsSync(authDir)) {
        fs.rmSync(authDir, { recursive: true, force: true });
        console.log('Cleaned up .auth directory after tests.');
    }
    return Promise.resolve();
}
