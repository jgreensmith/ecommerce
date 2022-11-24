import { createClient } from 'next-sanity'
import { config } from './config'

export const sanityClient = (pid) =>  createClient({...config, projectId: pid})

export const previewClient = (pidObj) => 
  createClient({
    ...config,
    useCdn: false,
    projectId: pidObj.pid,
    token: pidObj.preview_mode
  })

export const inventoryClient = (pidObj) =>  createClient({
  ...config,
  projectId: pidObj.pid,
  token: pidObj.manage_inventory
})

export const getClient = (pidObj, preview) => (preview ? previewClient(pidObj) : sanityClient(pidObj.pid))