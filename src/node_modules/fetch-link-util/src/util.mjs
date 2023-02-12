/**
 * Decodes link header and delivers one href entry.
 * @param {Headers} headers as given by fetch response
 * @param {string} rel of link to retrieve
 * @return {string} href for given rel or undefined
 */
export function getHeaderLink(headers, rel = "next") {
  return decodeHeader(headers.get("link"))[rel];
}

function decodeHeader(link) {
  return link
    ? Object.fromEntries(
        link.split(/\s*,\s*/).map(r => {
          const m = r.match(/<([^>]+)>;\s*rel="([^\"]+)"/);
          return m ? [m[2], m[1]] : [];
        })
      )
    : {};
}
