// ./resolveProductionUrl.js
export default function resolveProductionUrl(document) {
    return `http://localhost:3000/${document.slug.current}`
  }