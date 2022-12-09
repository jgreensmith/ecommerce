import { createDecipheriv } from 'crypto'
import { createClient } from 'next-sanity'
import { config } from './config'

interface PidObj {
  iv: string,
  encrypted_manage_inventory: string,
  auth_tag: string,
  pid: string,
  holidayMode: string,
  preview_mode: string
}

export const sanityClient = (pid: string) =>  createClient({...config, projectId: pid})

export const previewClient = (pidObj: PidObj) => 
  createClient({
    ...config,
    useCdn: false,
    projectId: pidObj.pid,
    token: pidObj.preview_mode
  })

export const inventoryClient = (pidObj: PidObj) =>  {

const key = process.env.NEXT_PUBLIC_API_CIPHER_KEY

let iv = Buffer.from(pidObj.iv, 'hex')
let encryptedData = Buffer.from(pidObj.encrypted_manage_inventory, 'hex')
//@ts-ignore
let decipher = createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv)
decipher.setAuthTag(Buffer.from(pidObj.auth_tag, 'hex'))
let decrypted = decipher.update(encryptedData)
decrypted = Buffer.concat([decrypted, decipher.final()])

return createClient({
  ...config,
  projectId: pidObj.pid,
  token: decrypted.toString('utf-8')
})
}

export const getClient = (pidObj: PidObj, preview: boolean) => (preview ? previewClient(pidObj) : sanityClient(pidObj.pid))