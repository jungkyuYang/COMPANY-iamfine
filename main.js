window.addEventListener('DOMContentLoaded', function () {
  if (typeof renderHeader === 'function') renderHeader()
  if (Modal && typeof Modal.renderModal === 'function') Modal.renderModal()
  if (Toast && typeof Toast.renderToast === 'function') Toast.renderToast()
  router() // router.js의 함수

  window.addEventListener('hashchange', router)
})
