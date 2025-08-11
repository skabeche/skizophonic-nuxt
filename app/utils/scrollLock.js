export function disableScroll() {
  document.body.classList.add('scroll-lock');
  document.documentElement.classList.add('scroll-lock');
}

export function enableScroll() {
  document.body.classList.remove('scroll-lock');
  document.documentElement.classList.remove('scroll-lock');

  window.scrollTo(0, 0);
}
