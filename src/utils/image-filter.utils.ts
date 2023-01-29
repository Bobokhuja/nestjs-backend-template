export function fileFilter(
  req: any,
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer
  }, callback: (error: (Error | null), acceptFile: boolean) => void) {
  return false
}

