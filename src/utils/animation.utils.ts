import anime from 'animejs/lib/anime.es.js'
export const animate = ({ elem, config }) => {
  return new Promise((resolve) => {
    anime({
      targets: elem,
      easing: 'spring(1, 60, 15, 3)',
      ...config,

      update: (a) => {
        a.progress > 10 && resolve(elem)
      },
    })
  })
}

export const lineDrawingAnimation = (target) => {
  return anime({
    targets: target,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInQuad',
    duration: 2500,
    loop: false,
  })
}
