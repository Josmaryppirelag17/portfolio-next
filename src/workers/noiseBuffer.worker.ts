self.onmessage = (e: MessageEvent<{ bufferSize: number }>) => {
  const { bufferSize } = e.data;
  const data = new Float32Array(bufferSize);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  self.postMessage({ data });
};
