import { Buffer } from 'buffer';

// Make Buffer available globally for gray-matter
window.Buffer = Buffer;
globalThis.Buffer = Buffer; 