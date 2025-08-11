/**
 * Wait for all media elements (images and videos) within the specified container to load.
 * If any of them fail to load, the promise is still resolved.
 * If all media elements finish loading before the specified timeout, the promise is resolved.
 * If the timeout is reached, a warning is logged and the promise is resolved.
 * 
 * @param {Element} container - The DOM element containing media elements to wait for (css selector).
 * @param {number} timeoutMs - The time in milliseconds to wait for media elements to load.
 * @returns {Promise} A promise that resolves when all media elements have finished loading.
 */
export async function useWaitForMediaLoad(container, timeoutMs = 1000) {
  const mediaElements = container.querySelectorAll('img, video');

  const mediaPromises = Array.from(mediaElements).map(el => {
    return new Promise(resolve => {
      if (el.tagName === 'IMG') {
        // Already loaded.
        if (el.complete && el.naturalHeight !== 0) {
          return resolve();
        }
        el.addEventListener('load', resolve, { once: true });
        el.addEventListener('error', () => {
          console.warn(`Image failed to load: ${el.src}`);
          // Resolve even if failed.
          resolve();
        }, { once: true });

      } else if (el.tagName === 'VIDEO') {
        // Already loaded, HAVE_ENOUGH_DATA
        if (el.readyState >= 4) {
          return resolve();
        }
        el.addEventListener('loadeddata', resolve, { once: true });
        el.addEventListener('error', () => {
          console.warn(`Video failed to load: ${el.src}`);
          // Resolve even if failed.
          resolve();
        }, { once: true });

      } else {
        // Not a media element to wait for.
        resolve();
      }
    });
  });

  let allResolved = false;
  // Wait for all media, but don't block forever.
  const allPromise = Promise.all(mediaPromises).then(() => {
    allResolved = true;
  });

  await Promise.race([
    allPromise,
    new Promise(resolve => {
      const check = () => {
        if (!allResolved) {
          console.warn(`Media load timed out after ${timeoutMs}ms`);
          resolve();
        }
      };
      setTimeout(check, timeoutMs);
    })
  ]);
}
