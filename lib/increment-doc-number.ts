/**
 * Increment a document number by 1. If the document number has a numeric part (e.g. "INV001"),
 * the numeric part is incremented by 1. If the document number has no numeric part (e.g. "INV"),
 * "001" is appended to the end.
 * @param {string} docNumber - The document number to increment.
 * @returns {string} The incremented document number.
 */
const incrementDocNumber = (docNumber: string): string => {
  const match = docNumber.match(/(\d+)$/);

  let prefix = docNumber;
  let numStr = "";
  let padding = 3; // Default padding for new numbers

  if (match) {
    numStr = match[1];
    prefix = docNumber.substring(0, docNumber.length - numStr.length);
    padding = numStr.length; // Use original number of digits for padding
  }

  let num = parseInt(numStr || "0", 10);
  num++;

  // Pad the incremented number with leading zeros
  const incrementedNumStr = String(num).padStart(padding, "0");

  return prefix + incrementedNumStr;
};

export default incrementDocNumber;
