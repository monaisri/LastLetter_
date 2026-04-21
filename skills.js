// =============================================
//  สกิล Freeze และ Slow
// =============================================

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
  slowActive    = true;
  slowTickCount = 0;
  setStatus('🐢 Slow! เวลาช้าลง 6 วิ', 'ok');
  clearTimeout(effectTimeout);
  effectTimeout = setTimeout(() => {
    slowActive = false;
    setStatus('');
    updatePotionUI(); // ปลดล็อคปุ่มหลัง Slow หมด
  }, 6000);
}


// =============================================
//  อัปเดต UI ปุ่มสกิล
// =============================================


function updatePotionUI() {
  // อัปเดตตัวเลขสต็อก
  document.getElementById('freeze-count').textContent = potions.freeze;
  document.getElementById('slow-count').textContent   = potions.slow;

  // Freeze button
  const btnFreeze = document.getElementById('btn-freeze');
  if (btnFreeze) {
    if (!gameActive) {
      btnFreeze.disabled = true;
    } else if (timerPaused || slowActive) {
      btnFreeze.disabled = true;
    } else if (potions.freeze <= 0) {
      btnFreeze.disabled = true;
    } else {
      btnFreeze.disabled = false;
    }
  }

  // Slow button
  const btnSlow = document.getElementById('btn-slow');
  if (btnSlow) {
    if (!gameActive) {
      btnSlow.disabled = true;
    } else if (timerPaused || slowActive) {
      btnSlow.disabled = true;
    } else if (potions.slow <= 0) {
      btnSlow.disabled = true;
    } else {
      btnSlow.disabled = false;
    }
  }
}