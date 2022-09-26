// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = 'sk5nbekTGsBdlroyOVxCozaLgttmT8l4zhzf8XNaQfix96HYtyWg7bJ5vYqgcdC3eVQpRDgpHGNEsDM4Ar6lZnplmA227GVmMKIvuOFOeSydIeh7mrePnZDBj0hqFLJFsh7Fto3RxZlMAGd7jBFa22rZ5pNSiOPSVkobxcdAsQmP3KuaFWTD'

// Replace `remoteUrl` with your deployed Next.js site
//const remoteUrl = `https://your-nextjs-site.com`
const localUrl = `http://localhost:3000`

export default function resolveProductionUrl(doc) {
  //const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

  const previewUrl = new URL(localUrl)

  previewUrl.pathname = `/api/preview`
  previewUrl.searchParams.append(`secret`, previewSecret)
  if(doc?.slug?.current) {
    previewUrl.searchParams.append(`slug`, doc?.slug?.current ?? `/`)
  }

  return previewUrl.toString()
}