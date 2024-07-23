export default (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r =
      (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >>
      (c === 'x' ? 0 : 1);
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
