<template>
  <ul class="flex gap-4 sm:gap-6">
    <li v-for="social in socials" :key="social.name">
      <a :href="social.url" :title="social.name">
        <Icon :name="social.icon" />
      </a>
    </li>
  </ul>
</template>

<script setup>
  const socials = [
    {
      name: 'Spotify',
      icon: 'simple-icons:spotify',
      url: 'https://open.spotify.com/artist/1JqAKLKes7ERRNB4DZ2BYE'
    },
    {
      name: 'Facebook',
      icon: 'simple-icons:facebook',
      url: 'https://www.facebook.com/skizophonic'
    },
    {
      name: 'Youtube',
      icon: 'simple-icons:youtube',
      url: 'https://www.youtube.com/user/Skizophonic2009'
    },
    {
      name: 'Bandcamp',
      icon: 'simple-icons:bandcamp',
      url: 'https://skizophonic.bandcamp.com'
    },
    {
      name: 'Instagram',
      icon: 'simple-icons:instagram',
      url: 'https://www.instagram.com/skizophonic_official'
    },
    // {
    //   name: 'X',
    //   icon: 'simple-icons:x',
    //   url: 'https://x.com/skizophonic'
    // },
  ]
</script>

<style scoped>
  a {
    filter: drop-shadow(0 0 0 transparent);
    transition: all .2s ease-in-out;

    &:hover {
      filter: drop-shadow(3px 3px 1px rgb(255, 0, 71)) drop-shadow(-3px -3px 1px rgb(0, 255, 199));
    }
  }
</style>
