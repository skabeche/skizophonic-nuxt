<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <AppHeader />
    <NuxtPage :page-key="route => route.fullPath" />
    <AppFooter />
  </div>
</template>
