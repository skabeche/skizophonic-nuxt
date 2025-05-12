<template>
  <nav ref="albumNavRef" class="album-navigation my-4 text-2xl up [&_a]:hover:text-black [&_a]:hover:no-underline" aria-label="Album navigation">
    <ul class="flex gap-4 [&_.active]:text-black">
      <li><a href="#music" class="active" @click.prevent="handleClick">{{ $t('pages.music.labels.music') }}</a></li>
      <li><a href="#info" @click.prevent="handleClick">{{ $t('pages.music.labels.info') }}</a></li>
      <li><a href="#tracks" @click.prevent="handleClick">{{ $t('pages.music.labels.tracks') }}</a></li>
    </ul>
  </nav>
</template>

<script setup>
  const emit = defineEmits(['activeSectionId']);
  const albumNavRef = ref(null)
  const handleClick = (e) => {
    const navLinks = albumNavRef.value.querySelectorAll('a');
    const url = new URL(e.target.href);
    const anchor = url.hash;

    navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');

    emit('activeSectionId', anchor);
  }
</script>
