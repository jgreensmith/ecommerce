import { createClient } from 'next-sanity'
import { config } from './config'

export const sanityClient = (pid) =>  createClient({...config, projectId: pid})

export const previewClient = (pid) => 
  createClient({
    ...config,
    useCdn: false,
    projectId: pid,
    token: "skpQhwhL8a9CIEz8vLuPmnnwSgLlB2WQGeHbAzCBFR61z8UolZjGsSdtmMJUjqQ3aoIDki1oicmqoJg3M1yWPfW0ZvtVA6bykm3mQBNWUJHVSX2aAbkjbRu1cAIKiNK0EwDozDjcJtLHaQHwlZse8nkmN0uCoabXro9D4NK0RCLJSxgCEWke"
  })

export const inventoryClient = (pidObj) =>  createClient({
  ...config,
  projectId: pidObj.pid,
  token: pidObj.manage_inventory
})

export const getClient = (pidObj, preview) => (preview ? previewClient(pidObj.pid) : sanityClient(pidObj.pid))