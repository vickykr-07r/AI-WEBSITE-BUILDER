export const extractJson = async (text) => {
  if (!text) return null;

  // Clean markdown, multiple ``` blocks
  let cleaned = text
    .replace(/```json|```/gi, '')
    .replace(/^\s*[\r\n]/gm, '')  // Remove leading newlines
    .trim();

  // Try multiple extraction strategies
  const strategies = [
    () => {
      const start = cleaned.indexOf('{');
      if (start === -1) return null;
      let braceCount = 0;
      let end = start;
      for (let i = start; i < cleaned.length; i++) {
        if (cleaned[i] === '{') braceCount++;
        if (cleaned[i] === '}') braceCount--;
        end = i;
        if (braceCount === 0) break;
      }
      if (braceCount !== 0) return null;
      return JSON.parse(cleaned.slice(start, end + 1));
    },
    () => {
      // Fallback: first complete {..}
      const match = cleaned.match(/\{[\\s\\S]*?\}/);
      return match ? JSON.parse(match[0]) : null;
    },
    () => null  // Final fallback
  ];

  for (const strategy of strategies) {
    try {
      const result = strategy();
      if (result && result.code) return result;  // Must have .code
    } catch (e) {
      console.log('Extract strategy failed:', e.message);
    }
  }

  console.log('All extract strategies failed. Raw text:', text.slice(0, 500) + '...');
  return null;
};
