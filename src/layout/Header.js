function renderHeader() {
  const header = document.getElementById('header')
  header.innerHTML = `
    <div class="header-inner">
      <span class="header-logo">😊</span>
      <nav class="header-nav">
        <a href="#/">면접과제</a>
        <a href="#/about">이력서</a>
      </nav>
    </div>
  `
}
