/**
 * Takes a string like "100, 200\n300 400" and returns 100+200+300+400 = 1000
 */
export function calculateTotal(input: string): number {
    return input
      .split(/[\s,]+/)        // split on whitespace (spaces/newlines/tabs) or commas
      .filter(Boolean)        // drop any empty strings
      .reduce((sum, chunk) => {
        const n = parseFloat(chunk)
        return sum + (isNaN(n) ? 0 : n)
      }, 0)
}