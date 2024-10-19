/*
  Helper function used to show/animate given svg path(s)

  timeline: the animeJS timeline object
  paths: the SVG path(s) of the icon
  duration: the anime's length for both blocks
  offset: at which time to start the animations

  returns: the updated timeline
*/
export function showIcon(timeline, paths, duration, offset) {
  timeline.add({
    targets: paths,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: duration,
    delay: anime.stagger(150),
  }, offset)

  return timeline
}
