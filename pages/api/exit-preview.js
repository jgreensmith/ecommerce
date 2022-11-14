export default function exit(_, res) {
    res.clearPreviewData()
  
    res.writeHead(307, {Location: `/merchants/2uh6xbh5`})
    res.end()

  }