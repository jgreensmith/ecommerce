import createImageUrlBuilder from '@sanity/image-url'
import { createPreviewSubscriptionHook } from 'next-sanity'
import { config } from './config'

export const imageBuilder = (pid) => createImageUrlBuilder({
  ...config,
  projectId: pid
})

export const urlFor = (pid, source) =>
  imageBuilder(pid).image(source).auto('format').fit('max')

export const usePreviewSubscription = (pidObj) => createPreviewSubscriptionHook({
  ...config,
  projectId: pidObj.pid
})