import { createClient } from 'next-sanity'
import { config } from './config'

export const sanityClient = createClient(config)

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
export const inventoryClient = createClient({
  ...config,
  token: process.env.NEXT_PUBLIC_SANITY_INVENORY_API
})

export const getClient = (preview) => (preview ? previewClient : sanityClient)