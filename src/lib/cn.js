/** Tiny className joiner — filters falsey values. */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}
