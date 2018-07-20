export function toObject(data) {
  return JSON.parse(data);
}

export function toBuffer(data) {
  return Buffer.from(JSON.stringify(data));
}
