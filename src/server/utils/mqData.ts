export function toObject(data: Buffer) {
  return JSON.parse(data.toString());
}

export function toBuffer(data: any) {
  return Buffer.from(JSON.stringify(data));
}
