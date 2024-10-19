/*
  Helper function, reverse of the showIcon function
*/
export function hideIcon(timeline, paths, duration, offset) {
  timeline.add({
    targets: paths,
    strokeDashoffset: [0, anime.setDashoffset],
    duration: duration,
    delay: anime.stagger(150),
  }, offset)

  return timeline
}
