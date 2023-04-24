export const bufferToImgSrc = (buffer: Buffer): string => {
  const dataUri = `data:image/png;base64,${buffer.toString('base64')}`;
  return dataUri;
};
