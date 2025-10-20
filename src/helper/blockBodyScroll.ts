export const blockBodyScroll = (block: boolean) => {
  if (typeof window === 'undefined') return
  if (block) {
    document.getElementsByTagName('body')[0].classList.add('no-scroll')
  }
  else {
    document.getElementsByTagName('body')[0].classList.remove('no-scroll')

  }
}
