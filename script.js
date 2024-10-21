const pieces = document.querySelectorAll('.piece');
const zones = document.querySelectorAll('.drop-zone');
const checkButton = document.getElementById('check-button');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopup = document.getElementById('close-popup');

let draggedPiece = null;

// إعدادات السحب والإفلات
pieces.forEach(piece => {
  piece.addEventListener('dragstart', dragStart);
  piece.addEventListener('dragend', dragEnd);
});

// إعدادات المناطق المخصصة للسقوط
zones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', dropPiece);
});

// دالة بدء السحب
function dragStart() {
  draggedPiece = this;
}

// دالة إنهاء السحب
function dragEnd() {
  draggedPiece = null;
}

// دالة السحب فوق المنطقة
function dragOver(e) {
  e.preventDefault();
}

// دالة إسقاط القطعة
function dropPiece() {
  if (!this.hasChildNodes() && draggedPiece) {
    this.appendChild(draggedPiece);
    draggedPiece.style.position = 'relative'; // إعادة الوضع إلى النسبي بعد السحب
  }
}

// تحقق من صحة تجميع البازل
checkButton.addEventListener('click', () => {
  let correct = true;

  zones.forEach((zone, index) => {
    const piece = zone.querySelector('img');
    if (piece && piece.id !== `piece-${index + 1}`) {
      correct = false;
    }
  });

  if (correct) {
    showPopup("You won! 🏆<br>Get ready for the 'Learn How to Learn' session!<br>Prepare for cinema surprises! 🎬");
  } else {
    showPopup("Try again! 😔");
  }
});

// دالة إظهار النافذة المنبثقة
function showPopup(message) {
  popupMessage.innerHTML = message;
  popup.classList.remove('hidden');
}

// إغلاق النافذة المنبثقة
closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
});
