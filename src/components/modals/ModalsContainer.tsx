"use client";

import dynamic from 'next/dynamic';

const ShippingLabelModal = dynamic(() => import('./ShippingLabelModal'), { ssr: false });
const VideoModal = dynamic(() => import('./VideoModal'), { ssr: false });
const EpisodeUnlockModal = dynamic(() => import('./EpisodeUnlockModal'), { ssr: false });
const UPSTrackingWidget = dynamic(() => import('../UpsTrackingWidget'), { ssr: false });

export default function ModalsContainer() {
  return (
    <>
      <ShippingLabelModal />
      <VideoModal />
      <EpisodeUnlockModal />
      <UPSTrackingWidget />
    </>
  );
}
