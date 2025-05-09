// 공통 유틸 함수 (import 없이 window로 등록)
window.CommonUtils = {
  // 유효성 검사
  validateIdValue(id, value, valueList, oldId = null) {
    if (!Number.isInteger(id) || id < 1)
      return 'ID는 1 이상의 자연수여야 합니다.'
    if (!Number.isInteger(value) || value < 1)
      return 'VALUE는 1 이상의 자연수여야 합니다.'
    if (valueList.some(v => v.id === id && v.id !== oldId))
      return '이미 존재하는 ID입니다.'
    return ''
  }
}
