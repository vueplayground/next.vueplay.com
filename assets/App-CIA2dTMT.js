var e=`<template>
  <div class="vp-video" :style="style">
    <iframe
      v-if="player"
      class="vp-video__frame"
      :src="player"
      :title="title || 'Video'"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowfullscreen
    />
    <video
      v-else-if="src"
      class="vp-video__frame"
      :src="src"
      :poster="poster || undefined"
      :controls="controls"
      :autoplay="autoplay"
      :muted="autoplay || muted"
      :loop="loop"
      playsinline
      preload="metadata"
    />
    <div v-else class="vp-video__empty">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M10 8.5l5.500 3.500-5.500 3.500z" /></svg>
      <span>Paste the address of a video</span>
    </div>
  </div>
</template>
<script>
// A video from YouTube or Vimeo (paste the address of its page), or a video file by its address.
export default {
  props: {
    src: { type: String, default: '', label: 'Video address', placeholder: 'https://www.youtube.com/watch?v=…' },
    title: { type: String, default: '', label: 'What it shows', placeholder: 'For screen readers' },
    shape: {
      type: String,
      default: '16 / 9',
      label: 'Shape',
      options: [{ key: 'Wide (16:9)', value: '16 / 9' }, { key: 'Photo (4:3)', value: '4 / 3' }, { key: 'Square', value: '1 / 1' }, { key: 'Tall (9:16)', value: '9 / 16' }, { key: 'Cinema (21:9)', value: '21 / 9' }]
    },
    width: { type: String, default: '', label: 'Widest', control: 'slider', unit: 'px', min: 200, max: 1600 },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 60 },
    autoplay: { type: Boolean, default: false, label: 'Starts by itself (without sound)' },
    loop: { type: Boolean, default: false, label: 'Starts over when it ends' },
    controls: { type: Boolean, default: true, label: 'Play and pause buttons' },
    muted: { type: Boolean, default: false, label: 'Without sound' },
    poster: { type: String, default: '', label: 'Picture before it plays (video files)', placeholder: 'https://…' }
  },
  computed: {
    // the address of the player for a video that lives at YouTube or Vimeo; nothing for a video file
    player() {
      const src = String(this.src || '').trim()
      const youtube = /(?:youtube(?:-nocookie)?\\.com\\/(?:watch\\?(?:.*&)?v=|embed\\/|shorts\\/|live\\/)|youtu\\.be\\/)([\\w-]{6,})/.exec(src)
      const vimeo = /vimeo\\.com\\/(?:video\\/)?(\\d+)/.exec(src)
      const quiet = this.autoplay || this.muted
      if (youtube) {
        const id = youtube[1]
        const ask = ['rel=0']
        if (this.autoplay) ask.push('autoplay=1')
        if (quiet) ask.push('mute=1')
        if (this.loop) ask.push('loop=1', 'playlist=' + id)
        if (!this.controls) ask.push('controls=0')
        return 'https://www.youtube-nocookie.com/embed/' + id + '?' + ask.join('&')
      }
      if (vimeo) {
        const ask = ['dnt=1']
        if (this.autoplay) ask.push('autoplay=1')
        if (quiet) ask.push('muted=1')
        if (this.loop) ask.push('loop=1')
        if (!this.controls) ask.push('controls=0')
        return 'https://player.vimeo.com/video/' + vimeo[1] + '?' + ask.join('&')
      }
      return ''
    },
    style() {
      return {
        '--vp-video-shape': this.shape || undefined,
        '--vp-video-radius': this.radius || undefined,
        maxWidth: this.width || undefined
      }
    }
  }
}
<\/script>
<style>
.vp-video {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: var(--vp-video-shape, 16 / 9);
  overflow: hidden;
  border-radius: var(--vp-video-radius, var(--vp-radius, 12px));
  background: #000;
}
.vp-video__frame { position: absolute; inset: 0; display: block; width: 100%; height: 100%; border: 0; object-fit: cover; }
.vp-video__empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--vp-surface, #f1f5f9);
  color: var(--vp-muted, #94a3b8);
  font-size: 0.875rem;
}
.vp-video__empty svg { width: 2.5rem; height: 2.5rem; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
</style>
`;export{e as default};