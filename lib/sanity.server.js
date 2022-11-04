import { createClient } from 'next-sanity'
import { config } from './config'

export const sanityClient = (currentPid) =>  createClient({...config, projectId: currentPid.pid})

export const previewClient = (currentPid) => 
  createClient({
    ...config,
    useCdn: false,
    projectId: currentPid.pid,
    token: currentPid.preview_mode
  })

export const inventoryClient = (currentPid) =>  createClient({
  ...config,
  projectId: currentPid.pid,
  token: currentPid.manage_inventory
})

export const getClient = (currentPid, preview) => (preview ? previewClient(currentPid) : sanityClient(currentPid))