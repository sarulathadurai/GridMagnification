import React from 'react'
import { ImageShader,useImage } from '@shopify/react-native-skia'
import { APP_ICONS } from '../icons';

export default function AppIcons({index,...imageProps}) {
    const image = useImage(APP_ICONS[index]);
    if(!image)return null;
  return (
    <ImageShader image={image} {...imageProps} />
  )
}