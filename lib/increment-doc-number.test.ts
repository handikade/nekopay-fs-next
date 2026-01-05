import incrementDocNumber from './increment-doc-number';

describe('incrementDocNumber', () => {
  it('should increment a basic document number correctly', () => {
    expect(incrementDocNumber('INV001')).toBe('INV002');
  });

  it('should handle rollover and maintain padding correctly (099 to 100)', () => {
    expect(incrementDocNumber('INV099')).toBe('INV100');
  });

  it('should add a default number if the input has no number part', () => {
    expect(incrementDocNumber('INV')).toBe('INV001');
  });

  it('should return default padded number for an empty string input', () => {
    expect(incrementDocNumber('')).toBe('001');
  });

  it('should increment a number without a prefix', () => {
    expect(incrementDocNumber('123')).toBe('124');
  });

  it('should handle number growing beyond initial padding', () => {
    expect(incrementDocNumber('DOC9')).toBe('DOC10');
  });

  it('should maintain padding for different initial number lengths', () => {
    expect(incrementDocNumber('ABC01')).toBe('ABC02');
    expect(incrementDocNumber('XYZ0005')).toBe('XYZ0006');
  });

  it('should work with longer prefixes', () => {
    expect(incrementDocNumber('VERYLONGPREFIX005')).toBe('VERYLONGPREFIX006');
  });
});
