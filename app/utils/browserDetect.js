/**
 * Returns true if the browser is Safari.
 *
 * This function will return true for both the desktop and mobile versions of
 * Safari, as well as for Safari Technology Preview.
 *
 * Note that this function is not foolproof, and it is possible for a non-Safari
 * browser to masquerade as Safari by modifying the User-Agent header. However,
 * this function should be reliable enough for most use cases.
 */
export function isSafari() {
  // Chromium-based browsers support navigator.userAgentData
  if (navigator.userAgentData) {
    return navigator.userAgentData.brands.some(b => b.brand === "Safari");
  }

  // Fallback for Safari itself (doesn't yet expose proper UA-CH).
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua) && !/Edg/.test(ua);
}

/**
 * Returns true if the browser is Firefox Mobile on Android or iOS.
 */
export function isFirefoxMobile() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('firefox') && /android|iphone|ipad|ipod|mobile/.test(ua);
}
