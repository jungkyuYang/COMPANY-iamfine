// ================== 상수 및 상태 선언 ==================
// --- 상수 ---
const CHART_WIDTH = parseInt(getCssVar('--chart-width')) || 400
const CHART_HEIGHT = parseInt(getCssVar('--chart-height')) || 220
const CHART_BOTTOM_MARGIN = 25
const MIN_ID_VALUE = 1
const MODAL_ICON_DELETE = '&#128465;'
const MODAL_TITLE_DELETE = '삭제 안내'
const BTN_TEXT_DELETE = '삭제'
const BTN_TEXT_CANCEL = '취소'
const MSG_APPLIED = '적용되었습니다.'
const MSG_ADDED = '추가되었습니다.'
const MSG_INIT = '초기값이 추가되었습니다.'
const MSG_DELETED = '삭제되었습니다.'
const INIT_VALUES = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 100 },
  { id: 4, value: 50 },
  { id: 5, value: 3 }
]

// --- 상태 변수 ---
let valueList = []

// ================== 유틸리티 함수 ==================
// CSS 변수 값 가져오기
function getCssVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
}
// valueList 정렬
function sortValueList() {
  valueList.sort((a, b) => a.id - b.id)
}
// 두 valueList가 완전히 같은지 비교
function isValueListEqual(a, b) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id || a[i].value !== b[i].value) return false
  }
  return true
}

// ================== UI 렌더링 함수(컴포넌트) ==================
// --- 그래프 컴포넌트 ---
function renderGraphComponent() {
  return `
      <div class="block">
        <h2>1. 그래프</h2>
        <div class="chart-box">
          <canvas id="dataChart" width="400" height="220" aria-label="값 분포 차트"></canvas>
        </div>
      </div>
    `
}
// --- 값 편집 컴포넌트 ---
function renderEditComponent() {
  return `
      <div class="block">
        <div class="block-title-row">
          <h2>2. 값 편집</h2>
          <span class="validation-guide">ID, VALUE는 1 이상의 자연수, ID 중복 불가</span>
        </div>
        <table class="edit-table" id="valueTable" role="table" aria-label="값 편집 테이블">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">VALUE</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <div class="edit-action-row">
          <div id="edit-error" class="edit-error" role="alert" aria-live="polite"></div>
          <button class="btn apply-btn btn-primary" id="applyEditBtn" aria-label="값 편집 적용">Apply</button>
        </div>
      </div>
    `
}
// --- 값 추가 컴포넌트 ---
function renderAddComponent() {
  return `
      <div class="block">
        <div class="block-title-row">
          <h2>3. 값 추가</h2>
          <span class="validation-guide">ID, VALUE는 1 이상의 자연수, ID 중복 불가</span>
        </div>
        <div class="add-form-col">
          <div class="add-form-row">
            <input type="number" placeholder="ID" id="add-id" min="1" step="1" aria-label="ID 입력" />
            <input type="number" placeholder="VALUE" id="add-value" min="1" step="1" aria-label="VALUE 입력" />
            <button class="btn add-btn btn-primary" id="addValueBtn" disabled aria-label="값 추가">Add</button>
          </div>
          <div class="add-action-row">
            <div id="add-error" class="add-error" role="alert" aria-live="polite"></div>
          </div>
        </div>
      </div>
    `
}
// --- 값 고급 편집 컴포넌트 ---
function renderJsonComponent() {
  return `
      <div class="block">
        <div class="block-title-row">
          <h2>4. 값 고급 편집</h2>
          <span class="validation-guide">ID, VALUE는 1 이상의 자연수, ID 중복 불가</span>
        </div>
        <textarea id="jsonEditor" rows="10" aria-label="값 목록 JSON 편집"></textarea>
        <div class="json-action-row">
          <div id="json-error" class="json-error" role="alert" aria-live="polite"></div>
          <button class="btn apply-btn btn-primary" id="applyJsonBtn" aria-label="고급 편집 적용">Apply</button>
        </div>
      </div>
    `
}
// --- 홈 전체 화면 ---
function renderHome() {
  return `
      <section class="home-section">
        <div class="home-title-row">
          <div class="btn-group" style="display: flex; gap: 8px; align-items: center;">
            <button class="btn btn-secondary" id="showSkeletonBtn" aria-label="스켈레톤 보기">스켈레톤 보기</button>
            <button class="btn btn-primary" id="initValueBtn" aria-label="초기값 추가하기">초기값 추가하기</button>
          </div>
          <h1 class="right-title" aria-label="아이엠파인 SD팀 지원자 양정규">아이엠파인 SD팀 지원자 양정규</h1>
        </div>
        ${renderGraphComponent()}
        ${renderEditComponent()}
        ${renderAddComponent()}
        ${renderJsonComponent()}
      </section>
    `
}
// --- 스켈레톤 화면 ---
function renderSkeletonHome() {
  return `
    <section class="home-section">
      <div class="home-title-row">
        <div class="skeleton skeleton-btn" style="width: 120px; height: 42px;"></div>
        <div class="skeleton skeleton-title" style="width: 180px; height: 32px;"></div>
      </div>
      <div class="block">
        <h2><div class="skeleton skeleton-title" style="width: 80px; height: 24px;"></div></h2>
        <div class="chart-box">
          <div class="skeleton skeleton-chart" style="width: 100%; height: 220px;"></div>
        </div>
      </div>
      <div class="block">
        <div class="block-title-row">
          <h2><div class="skeleton skeleton-title" style="width: 80px; height: 24px;"></div></h2>
          <span class="skeleton skeleton-guide" style="width: 180px; height: 18px;"></span>
        </div>
        <div class="skeleton skeleton-table" style="width: 520px; height: 120px;"></div>
        <div class="edit-action-row">
          <div class="skeleton skeleton-error" style="width: 120px; height: 24px;"></div>
          <div class="skeleton skeleton-btn" style="width: 80px; height: 42px;"></div>
        </div>
      </div>
      <div class="block">
        <div class="block-title-row">
          <h2><div class="skeleton skeleton-title" style="width: 80px; height: 24px;"></div></h2>
          <span class="skeleton skeleton-guide" style="width: 180px; height: 18px;"></span>
        </div>
        <div class="add-form-row">
          <div class="skeleton skeleton-input" style="width: 100%; height: 38px;"></div>
          <div class="skeleton skeleton-input" style="width: 100%; height: 38px;"></div>
          <div class="skeleton skeleton-btn" style="width: 80px; height: 42px;"></div>
        </div>
      </div>
      <div class="block">
        <div class="block-title-row">
          <h2><div class="skeleton skeleton-title" style="width: 120px; height: 24px;"></div></h2>
          <span class="skeleton skeleton-guide" style="width: 180px; height: 18px;"></span>
        </div>
        <div class="skeleton skeleton-textarea" style="width: 100%; height: 120px;"></div>
        <div class="json-action-row">
          <div class="skeleton skeleton-error" style="width: 120px; height: 24px;"></div>
          <div class="skeleton skeleton-btn" style="width: 80px; height: 42px;"></div>
        </div>
      </div>
    </section>
  `
}

// ================== UI 업데이트 함수 ==================
// --- 테이블 업데이트 ---
function updateTableComponent() {
  const tbody = document.querySelector('#valueTable tbody')
  tbody.innerHTML = ''

  if (valueList.length === 0) {
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    td.colSpan = 3
    td.textContent = '입력된 값이 없습니다.'
    td.className = 'empty-row'
    tr.appendChild(td)
    tbody.appendChild(tr)
    return
  }

  valueList.forEach(item => {
    const tr = document.createElement('tr')
    const tdId = document.createElement('td')
    const tdValue = document.createElement('td')
    const tdBtn = document.createElement('td')

    const idInput = document.createElement('input')
    idInput.type = 'number'
    idInput.className = 'edit-id'
    idInput.setAttribute('data-old-id', item.id)
    idInput.value = item.id

    const valueInput = document.createElement('input')
    valueInput.type = 'number'
    valueInput.className = 'edit-value'
    valueInput.setAttribute('data-id', item.id)
    valueInput.value = item.value

    const deleteBtn = createButton({
      text: 'Delete',
      type: 'danger',
      onClick: () => {
        const id = item.id
        const target = valueList.find(v => v.id === id)
        if (!target) return
        openDeleteModal(target, () => {
          valueList = valueList.filter(v => v.id !== id)
          sortValueList()
          updateAllComponents()
          window.Toast.showToast(MSG_DELETED)
        })
      },
      extraClass: 'delete-btn'
    })
    deleteBtn.setAttribute('data-id', item.id)

    tdId.appendChild(idInput)
    tdValue.appendChild(valueInput)
    tdBtn.appendChild(deleteBtn)

    tr.appendChild(tdId)
    tr.appendChild(tdValue)
    tr.appendChild(tdBtn)
    tbody.appendChild(tr)
  })
}
// --- 차트 업데이트 ---
function updateChartComponent() {
  const canvas = document.getElementById('dataChart')
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  const values = valueList.map(v => v.value)
  const maxValue = valueList.length > 0 ? Math.max(...values) : 1
  const minValue = valueList.length > 0 ? Math.min(...values) : 0
  const n = valueList.length
  canvas.width = CHART_WIDTH
  const bottomMargin = CHART_BOTTOM_MARGIN
  const chartHeight = canvas.height - bottomMargin

  const totalRatio = 3 * n - 1
  const unit = (CHART_WIDTH - 25) / totalRatio
  const barWidth = unit * 2
  const gap = unit

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // y축 그리기 (25px 오른쪽)
  ctx.beginPath()
  ctx.moveTo(25.5, 0)
  ctx.lineTo(25.5, chartHeight)
  ctx.strokeStyle = getCssVar('--chart-axis-color')
  ctx.lineWidth = 2
  ctx.stroke()

  // x축 그리기
  ctx.beginPath()
  ctx.moveTo(25, chartHeight - 0.5)
  ctx.lineTo(canvas.width, chartHeight - 0.5)
  ctx.strokeStyle = getCssVar('--chart-axis-color')
  ctx.lineWidth = 2
  ctx.stroke()

  // y축 숫자(0) - y축 오른쪽, x축 선 바로 위에 표시
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'
  ctx.fillStyle = getCssVar('--chart-axis-color')
  ctx.font = getCssVar('--chart-font')
  ctx.fillText('0', 23, chartHeight - 1)

  // y축 숫자(최대값) - y축 오른쪽에 표시
  ctx.textAlign = 'right'
  ctx.textBaseline = 'top'
  ctx.fillStyle = getCssVar('--chart-axis-color')
  ctx.font = getCssVar('--chart-font')
  ctx.fillText(maxValue, 23, 0)

  // x축 숫자(id) - x축 선 바로 아래에 표시
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = getCssVar('--chart-font')
  valueList.forEach((item, i) => {
    const x = 25 + i * (barWidth + gap)
    const height =
      maxValue > 0
        ? (item.value / maxValue) *
          (chartHeight - parseInt(getCssVar('--chart-bar-height-correction')))
        : 0
    const y = chartHeight - height

    // 막대 채우기 (느낌 있는 연한 색상)
    ctx.fillStyle = getCssVar('--chart-bar-color')
    ctx.fillRect(x, y, barWidth, height)

    // 막대 테두리
    ctx.strokeStyle = getCssVar('--chart-bar-border')
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, barWidth, height)

    // value 텍스트 색상
    let valueColor = getCssVar('--color-text-light')
    if (item.value === maxValue)
      valueColor = getCssVar('--chart-value-color-max')
    else if (item.value === minValue)
      valueColor = getCssVar('--chart-value-color-min')

    // value 텍스트 중앙 상단에 표시
    ctx.fillStyle = valueColor
    ctx.font =
      item.value === maxValue || item.value === minValue
        ? getCssVar('--chart-font-bold')
        : getCssVar('--chart-font')
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(
      item.value,
      x + barWidth / 2,
      y - parseInt(getCssVar('--chart-value-text-margin'))
    )

    // x축 id 라벨
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.font = getCssVar('--chart-font')
    ctx.fillStyle = getCssVar('--chart-axis-color')
    ctx.fillText(String(item.id), x + barWidth / 2, chartHeight + 5)
  })

  // y축 숫자 스타일 원복
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
}
// --- JSON 영역 업데이트 ---
function updateJsonComponent() {
  document.getElementById('jsonEditor').value = JSON.stringify(
    valueList,
    null,
    2
  )
}
// --- 값 편집 Apply 버튼 상태 및 에러 처리 ---
function updateEditApplyBtnState() {
  const idInputs = document.querySelectorAll('#valueTable .edit-id')
  const valueInputs = document.querySelectorAll('#valueTable .edit-value')
  const editErrorDiv = document.getElementById('edit-error')
  const newList = []
  let errorMsg = ''
  for (let i = 0; i < idInputs.length; i++) {
    const newId = parseInt(idInputs[i].value)
    const value = parseInt(valueInputs[i].value)
    const oldId = parseInt(idInputs[i].dataset.oldId)
    const msg = window.CommonUtils.validateIdValue(
      newId,
      value,
      newList.concat(valueList.filter((v, idx) => idx !== i)),
      oldId
    )
    if (msg) {
      errorMsg = `${i + 1}번째 행: ${msg}`
      break
    }
    newList.push({ id: newId, value })
  }
  editErrorDiv.textContent = errorMsg
  const btn = document.getElementById('applyEditBtn')
  if (btn) {
    const isDisabled = isValueListEqual(newList, valueList) || !!errorMsg
    btn.disabled = isDisabled
  }
}
// --- JSON Apply 버튼 상태 및 에러 처리 ---
function updateJsonApplyBtnState() {
  const btn = document.getElementById('applyJsonBtn')
  const errorDiv = document.getElementById('json-error')
  let parsed
  let errorMsg = ''
  try {
    parsed = JSON.parse(document.getElementById('jsonEditor').value)
    if (!Array.isArray(parsed)) {
      errorMsg = 'JSON은 배열 형식이어야 합니다.'
    } else {
      let idSet = new Set()
      for (let i = 0; i < parsed.length; i++) {
        const item = parsed[i]
        const keys = Object.keys(item)
        if (
          keys.length !== 2 ||
          !keys.includes('id') ||
          !keys.includes('value')
        ) {
          errorMsg = `${i + 1}번째 항목의 key는 반드시 id, value만 가능합니다.`
          break
        }
        const id = item.id
        const value = item.value
        if (!Number.isInteger(id) || id < 1) {
          errorMsg = `${i + 1}번째 항목의 ID는 1 이상의 자연수여야 합니다.`
          break
        }
        if (!Number.isInteger(value) || value < 1) {
          errorMsg = `${i + 1}번째 항목의 VALUE는 1 이상의 자연수여야 합니다.`
          break
        }
        if (idSet.has(id)) {
          errorMsg = `${i + 1}번째 항목의 ID가 중복됩니다.`
          break
        }
        idSet.add(id)
      }
    }
  } catch {
    errorMsg = '유효하지 않은 JSON입니다.'
  }
  errorDiv.textContent = errorMsg
  if (btn) {
    const isDisabled = isValueListEqual(parsed, valueList) || !!errorMsg
    btn.disabled = isDisabled
  }
}
// --- Add 버튼 상태 및 에러 처리 ---
function updateAddBtnState() {
  const idInput = document.getElementById('add-id')
  const valueInput = document.getElementById('add-value')
  const addBtn = document.getElementById('addValueBtn')
  const errorDiv = document.getElementById('add-error')
  if (!idInput || !valueInput || !addBtn) return

  const id = parseInt(idInput.value)
  const value = parseInt(valueInput.value)
  let errorMsg = ''
  if (!Number.isInteger(id) || id < 1)
    errorMsg = 'ID는 1 이상의 자연수여야 합니다.'
  else if (!Number.isInteger(value) || value < 1)
    errorMsg = 'VALUE는 1 이상의 자연수여야 합니다.'
  else if (valueList.some(v => v.id === id))
    errorMsg = '이미 존재하는 ID입니다.'

  errorDiv.textContent = errorMsg
  addBtn.disabled = !!errorMsg
}
// --- 전체 UI 업데이트 ---
function updateAllComponents() {
  updateTableComponent()
  updateChartComponent()
  updateJsonComponent()
  bindEvents()
  updateEditApplyBtnState()
  updateJsonApplyBtnState()
  updateAddBtnState()
}

// ================== 이벤트 바인딩 및 핸들러 ==================
function bindEvents() {
  // 값 추가
  document.getElementById('addValueBtn').addEventListener('click', () => {
    const id = parseInt(document.getElementById('add-id').value)
    const value = parseInt(document.getElementById('add-value').value)

    if (
      isNaN(id) ||
      isNaN(value) ||
      id < MIN_ID_VALUE ||
      value < MIN_ID_VALUE
    ) {
      document.getElementById('add-error').textContent =
        'ID와 VALUE는 1 이상의 자연수만 입력할 수 있습니다.'
      return
    }

    if (valueList.some(v => v.id === id)) {
      document.getElementById('add-error').textContent =
        '이미 존재하는 ID입니다.'
      return
    }

    valueList.push({ id, value })
    sortValueList()
    document.getElementById('add-id').value = ''
    document.getElementById('add-value').value = ''
    document.getElementById('add-error').textContent = ''
    document.getElementById('addValueBtn').disabled = true
    document.getElementById('add-id').style.borderColor = ''
    document.getElementById('add-value').style.borderColor = ''
    updateAllComponents()
    window.Toast.showToast(MSG_ADDED)
  })

  // 값 편집 적용
  document.getElementById('applyEditBtn').addEventListener('click', () => {
    const idInputs = document.querySelectorAll('#valueTable .edit-id')
    const valueInputs = document.querySelectorAll('#valueTable .edit-value')
    const editErrorDiv = document.getElementById('edit-error')

    const newList = []
    let errorMsg = ''
    for (let i = 0; i < idInputs.length; i++) {
      const newId = parseInt(idInputs[i].value)
      const value = parseInt(valueInputs[i].value)
      const oldId = parseInt(idInputs[i].dataset.oldId)
      const msg = window.CommonUtils.validateIdValue(
        newId,
        value,
        newList.concat(valueList.filter((v, idx) => idx !== i)),
        oldId
      )
      if (msg) {
        errorMsg = `${i + 1}번째 행: ${msg}`
        break
      }
      newList.push({ id: newId, value })
    }
    editErrorDiv.textContent = errorMsg
    const btn = document.getElementById('applyEditBtn')
    if (btn) {
      const isDisabled = isValueListEqual(newList, valueList) || !!errorMsg
      btn.disabled = isDisabled
    }

    // 변경 여부 체크
    if (isValueListEqual(newList, valueList)) {
      updateAllComponents()
      editErrorDiv.textContent = '변경된 내용이 없습니다.'
      return
    }

    valueList = newList
    sortValueList()
    updateAllComponents()
    window.Toast.showToast(MSG_APPLIED)
  })

  // 값 삭제
  document.querySelector('#valueTable tbody').addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
      const id = parseInt(e.target.dataset.id)
      const item = valueList.find(item => item.id === id)
      if (!item) return
      openDeleteModal(item, () => {
        valueList = valueList.filter(item => item.id !== id)
        sortValueList()
        updateAllComponents()
        window.Toast.showToast(MSG_DELETED)
      })
    }
  })

  // JSON 적용
  const jsonApplyBtn = document.getElementById('applyJsonBtn')
  jsonApplyBtn.onmouseover = () => {
    jsonApplyBtn.style.background = '#115293'
  }
  jsonApplyBtn.onmouseout = () => {
    jsonApplyBtn.style.background = '#1976d2'
  }

  document.getElementById('applyJsonBtn').addEventListener('click', () => {
    const errorDiv = document.getElementById('json-error')
    let parsed
    let errorMsg = ''
    try {
      parsed = JSON.parse(document.getElementById('jsonEditor').value)
      if (!Array.isArray(parsed)) {
        errorMsg = 'JSON은 배열 형식이어야 합니다.'
      } else {
        let idSet = new Set()
        for (let i = 0; i < parsed.length; i++) {
          const item = parsed[i]
          const keys = Object.keys(item)
          if (
            keys.length !== 2 ||
            !keys.includes('id') ||
            !keys.includes('value')
          ) {
            errorMsg = `${i + 1}번째 항목의 key는 반드시 id, value만 가능합니다.`
            break
          }
          const id = item.id
          const value = item.value
          if (!Number.isInteger(id) || id < 1) {
            errorMsg = `${i + 1}번째 항목의 ID는 1 이상의 자연수여야 합니다.`
            break
          }
          if (!Number.isInteger(value) || value < 1) {
            errorMsg = `${i + 1}번째 항목의 VALUE는 1 이상의 자연수여야 합니다.`
            break
          }
          if (idSet.has(id)) {
            errorMsg = `${i + 1}번째 항목의 ID가 중복됩니다.`
            break
          }
          idSet.add(id)
        }
      }
    } catch {
      errorMsg = '유효하지 않은 JSON입니다.'
    }
    errorDiv.textContent = errorMsg
    const btn = document.getElementById('applyJsonBtn')
    if (btn) {
      const isDisabled = isValueListEqual(parsed, valueList) || !!errorMsg
      btn.disabled = isDisabled
    }

    // 변경 여부 체크
    if (isValueListEqual(parsed, valueList)) {
      updateAllComponents()
      errorDiv.textContent = '변경된 내용이 없습니다.'
      return
    }
    valueList = parsed
    sortValueList()
    updateAllComponents()
    window.Toast.showToast(MSG_APPLIED)
  })

  // 값 편집 input 변경 시 Apply 버튼 상태 갱신
  document
    .querySelectorAll('#valueTable .edit-id, #valueTable .edit-value')
    .forEach(input => {
      input.addEventListener('input', updateEditApplyBtnState)
    })

  // 값 고급 편집 textarea 변경 시 Apply 버튼 상태 갱신
  const jsonEditor = document.getElementById('jsonEditor')
  if (jsonEditor) {
    jsonEditor.addEventListener('input', updateJsonApplyBtnState)
  }

  // Add 버튼 input 변경 시 상태 갱신
  const addIdInput = document.getElementById('add-id')
  const addValueInput = document.getElementById('add-value')
  if (addIdInput) addIdInput.addEventListener('input', updateAddBtnState)
  if (addValueInput) addValueInput.addEventListener('input', updateAddBtnState)

  // 초기값 추가 버튼 이벤트
  const initBtn = document.getElementById('initValueBtn')
  if (initBtn) {
    initBtn.onclick = () => {
      valueList = [...INIT_VALUES]
      sortValueList()
      updateAllComponents()
      window.Toast.showToast(MSG_INIT)
    }
  }
}

// ================== 모달/버튼 생성 함수 ==================
// --- 삭제 모달 ---
function openDeleteModal(item, onConfirm) {
  const msg = `정말로 <b>ID: ${item.id}, VALUE: ${item.value}</b> 데이터를 삭제하시겠습니까?`
  window.Modal.showModal(
    msg,
    [
      {
        text: BTN_TEXT_DELETE,
        className: 'btn btn-danger',
        onClick: onConfirm
      },
      {
        text: BTN_TEXT_CANCEL,
        className: 'btn btn-neutral'
      }
    ],
    {
      title: MODAL_TITLE_DELETE,
      icon: MODAL_ICON_DELETE
    }
  )
}
// --- 버튼 생성 ---
function createButton({
  text,
  type = 'primary',
  id,
  onClick,
  extraClass = ''
}) {
  const btn = document.createElement('button')
  btn.textContent = text
  btn.className = `btn btn-${type} ${extraClass}`.trim()
  if (id) btn.id = id
  if (onClick) btn.onclick = onClick
  return btn
}

// ================== 초기화 및 진입점 ==================
// --- 홈 진입점 ---
function initHomePage() {
  updateAllComponents()
  const skeletonBtn = document.getElementById('showSkeletonBtn')
  if (skeletonBtn) {
    skeletonBtn.onclick = window.showSkeletonThenHome
  }
}
// --- 스켈레톤 보기 ---
function showSkeletonThenHome() {
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = window.renderSkeletonHome()
    setTimeout(() => {
      app.innerHTML = renderHome()
      initHomePage()
    }, 2000)
  }
}
window.showSkeletonThenHome = showSkeletonThenHome

window.onload = function () {
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = renderHome()
    initHomePage()
  }
}
