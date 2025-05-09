const DEFAULT_ICON = '✔️'
const DEFAULT_DURATION = 2000

window.Toast = (function () {
  function renderToast() {
    document.getElementById('toast-root').innerHTML =
      `<div id="toast" class="toast"></div>`
  }

  function showToast(msg, icon = DEFAULT_ICON, duration = DEFAULT_DURATION) {
    const toast = document.getElementById('toast')
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`
    toast.classList.add('show')
    setTimeout(() => {
      toast.classList.remove('show')
    }, duration)
  }

  return { renderToast, showToast }
})()
