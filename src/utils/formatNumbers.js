/**
 * formatNumber — Converts large numbers into human-readable short format.
 *
 * Examples:
 *   1200     → "1.2k"
 *   1000000  → "1M"
 *   1500000  → "1.5M"
 *   999      → 999
 *   null     → "0"
 *
 * @param {number|null|undefined} num - The number to format
 * @returns {string|number} - Formatted string or original number if < 1000
 */
export function formatNumber(num) {
  // Handle null or undefined → return "0"
  if (num === null || num === undefined) return "0";

  // Millions: >= 1,000,000 → "1.2M" format
  if (num >= 1_000_000) {
    const formatted = (num / 1_000_000).toFixed(1);
    // Remove trailing ".0" (e.g., "1.0M" → "1M")
    return formatted.replace(/\.0$/, "") + "M";
  }

  // Thousands: >= 1,000 → "1.2k" format
  if (num >= 1_000) {
    const formatted = (num / 1_000).toFixed(1);
    // Remove trailing ".0" (e.g., "1.0k" → "1k")
    return formatted.replace(/\.0$/, "") + "k";
  }

  // Below 1,000 → return as-is
  return num;
}
