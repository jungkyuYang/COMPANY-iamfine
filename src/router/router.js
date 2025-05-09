function router() {
  const route = location.hash || '#/'
  const app = document.getElementById('app')

  switch (route) {
    case '#/':
      showSkeletonThenHome()
      break
    case '#/about':
      window.open(
        'https://scalloped-warrior-42f.notion.site/1ec16a671737807ea022c6159245ec8f',
        '_blank',
        'noopener'
      )
      location.hash = '#/'
      break
    default:
      app.innerHTML = renderNotFoundPage()
  }
}
