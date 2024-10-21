const pieces = document.querySelectorAll('.piece');
const zones = document.querySelectorAll('.drop-zone');
const checkButton = document.getElementById('check-button');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closePopup = document.getElementById('close-popup');

let draggedPiece = null;
let initialX, initialY;

// إعدادات السحب والإفلات
pieces.forEach(piece => {
  piece.addEventListener('dragstart', dragStart);
  piece.addEventListener('dragend', dragEnd);
  piece.addEventListener('touchstart', touchStart);
  piece.addEventListener('touchend', touchEnd);
  piece.addEventListener('touchmove', touchMove);
});

// إعدادات المناطق المخصصة للسقوط
zones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', dropPiece);
  zone.addEventListener('touchenter', touchEnter);
  zone.addEventListener('touchleave', touchLeave);
});

// دالة بدء السحب
function dragStart(e) {
  draggedPiece = this;
}

function touchStart(e) {
  draggedPiece = this;
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;

  this.style.position = 'absolute';
  this.style.zIndex = '1000';
  document.body.appendChild(this);
}

function touchEnd(e) {
  if (draggedPiece) {
    // تأكد من وجود منطقة مخصصة للسقوط تحت القطعة
    const dropZone = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    if (dropZone && dropZone.classList.contains('drop-zone')) {
      dropPiece.call(dropZone);
    }
    this.style.zIndex = '';
    draggedPiece = null;
  }
}

function touchMove(e) {
  if (draggedPiece) {
    draggedPiece.style.left = `${e.touches[0].clientX - (draggedPiece.offsetWidth / 2)}px`;
    draggedPiece.style.top = `${e.touches[0].clientY - (draggedPiece.offsetHeight / 2)}px`;
  }
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
    draggedPiece = null;
  } else if (this.hasChildNodes()) {
    const currentPiece = this.querySelector('img');
    if (currentPiece) {
      // نقل الصورة الحالية إلى القطعة التي يتم سحبها
      currentPiece.style.position = 'absolute'; // لجعلها قابلة للتحريك
      currentPiece.style.zIndex = '1000';
      document.body.appendChild(currentPiece);
      draggedPiece = currentPiece; // تعيين القطعة الحالية كسحب
    }
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
