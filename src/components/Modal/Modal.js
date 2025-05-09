window.Modal = (function () {
  function renderModal({ title = '', icon = '', msg = '', buttons = [] } = {}) {
    document.getElementById('modal-root').innerHTML = `
      <div id="modal-backdrop" class="modal-backdrop">
        <div id="custom-modal" class="delete-modal">
          <div class="modal-header">
            <span class="modal-icon">${icon}</span>
            <span class="modal-title">${title}</span>
          </div>
          <div id="modal-msg" class="modal-msg">${msg}</div>
          <div class="modal-btn-area"></div>
        </div>
      </div>
    `
    // 버튼 생성 및 이벤트 바인딩
    const btnArea = document.querySelector('.modal-btn-area')
    btnArea.innerHTML = ''
    buttons.forEach(({ text, className, onClick }) => {
      const btn = document.createElement('button')
      btn.textContent = text
      btn.className = className
      btn.onclick = () => {
        hideModal()
        if (onClick) onClick()
      }
      btnArea.appendChild(btn)
    })
  }

  function showModal(msg, buttons = [], { title = '', icon = '' } = {}) {
    renderModal({ title, icon, msg, buttons })
    document.getElementById('modal-backdrop').classList.add('show')
  }

  function hideModal() {
    document.getElementById('modal-backdrop').classList.remove('show')
  }

  return { renderModal, showModal, hideModal }
})()
