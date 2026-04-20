// =============================================
//  โหลด wordlist จากไฟล์ words.txt (ที่วางไว้ข้างๆ HTML)
// =============================================

let validWords = new Set(); // เก็บคำทั้งหมดจาก wordlist

async function loadWordList() {
  try {
    const response = await fetch('words.txt'); // ไฟล์ต้องอยู่โฟลเดอร์เดียวกับ HTML
    const text = await response.text();
    // แปลง text → array ของคำ → ใส่ใน Set
    validWords = new Set(text.split('\n').map(w => w.trim()).filter(w => w));
    console.log('โหลด wordlist สำเร็จ:', validWords.size, 'คำ');
  } catch (err) {
    // โหลดไม่ได้ → เกมยังเล่นได้ แต่ไม่มีการเช็คคำ
    console.warn('โหลด wordlist ไม่ได้:', err);
  }
}

loadWordList(); // เรียกทันทีตอนเปิดหน้า