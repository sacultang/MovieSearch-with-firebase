const sliceTextLength = (text: string | undefined) => {
  const originalText = text || '';
  return originalText.length > 15
    ? originalText.slice(0, 17) + ' ...'
    : originalText;
};
export default sliceTextLength;
