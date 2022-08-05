import createImageUrlBuilder from '@sanity/image-url'
import { createPreviewSubscriptionHook } from 'next-sanity'
import { config } from './config'

export const imageBuilder = createImageUrlBuilder(config)

export const urlFor = (source) =>
  imageBuilder.image(source).auto('format').fit('max')

export const usePreviewSubscription = createPreviewSubscriptionHook(config)