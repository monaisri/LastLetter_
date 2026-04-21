function updatePotionUI() {
  // อัปเดตตัวเลขสต็อกสกิลและสถานะ disabled ของปุ่ม
  document.getElementById('freeze-count').textContent = potions.freeze;
  document.getElementById('slow-count').textContent   = potions.slow;
  document.getElementById('btn-freeze').disabled = !gameActive || potions.freeze === 0;
  document.getElementById('btn-slow').disabled   = !gameActive || potions.slow   === 0;
}

function usePotion(type) {
  if (!gameActive || potions[type] <= 0) return;

  // ห้ามใช้สกิลทับกัน
  if (timerPaused || slowActive) {
    setStatus('สกิลกำลังทำงานอยู่ รอก่อนนะ!', 'err');
    return;
  }

  potions[type]--;
  updatePotionUI();

  if (type === 'freeze') applyFreeze();
  if (type === 'slow')   applySlow();
}

function applyFreeze() {
  // หยุดเวลา 3 วินาที
  timerPaused = true;
  setStatus('❄️ Freeze! เวลาหยุด 3 วิ', 'ok');
  renderTimer();
  clearTimeout(effectTimeout);
  effectTimeout = setTimeout(() => {
    timerPaused = false;
    setStatus('');
    renderTimer();
    updatePotionUI(); // ปลดล็อคปุ่มหลัง Freeze หมด
  }, 3000);
}

function applySlow() {
  // ทำให้เวลาเดินช้าลง 2 เท่า เป็นเวลา 6 วินาที
  if (slowActive) return; // ถ้า Slow อยู่แล้ว → ไม่ทำซ้ำ
  slowActive    = true;
  slowTickCount = 0;
  setStatus('Slow! เวลาช้าลง 6 วินาที', 'ok');
  clearTimeout(effectTimeout);
  effectTimeout = setTimeout(() => {
    slowActive = false;
    setStatus('Slow หมดแล้ว', '');
  }, 6000);
}