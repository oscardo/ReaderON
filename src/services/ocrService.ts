import { createWorker } from 'tesseract.js';

export async function performOCR(imageSrc: string): Promise<string> {
  const worker = await createWorker('eng+spa');
  const ret = await worker.recognize(imageSrc);
  await worker.terminate();
  return ret.data.text;
}
