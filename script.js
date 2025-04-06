document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('challengeGrid');
  const toast = document.getElementById('toast');
  const totalDays = 21;
  let completedCount = 0;

  // ✔ 저장된 완료 목록 불러오기
  let completedDays = JSON.parse(localStorage.getItem('completedDays')) || [];

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  function updateCompletedCount() {
    completedCount = document.querySelectorAll('.day.completed').length;

    if (completedCount === totalDays) {
      showToast('🎉 You did it! 성공했어 축하해!');
    } else if (completedCount > totalDays / 2) {
      showToast('👍 Great job! 잘했어!');
    } else {
      showToast('😊 Nice try! 수고했어!');
    }
  }

  for (let i = 1; i <= totalDays; i++) {
    const dayBox = document.createElement('div');
    dayBox.classList.add('day');
    dayBox.textContent = `${i}일차`;

    // ✔ 저장된 상태 적용
    if (completedDays.includes(i)) {
      dayBox.classList.add('completed');
    }

    function toggleComplete() {
      const justCompleted = !dayBox.classList.contains('completed');
      dayBox.classList.toggle('completed');

      // ✔ localStorage 업데이트
      if (justCompleted) {
        completedDays.push(i);
        localStorage.setItem('completedDays', JSON.stringify(completedDays));
      } else {
        completedDays = completedDays.filter(day => day !== i);
        localStorage.setItem('completedDays', JSON.stringify(completedDays));
      }

      // 메시지 출력
      if (i === totalDays && justCompleted) {
        updateCompletedCount();
      } else if (justCompleted) {
        showToast('👍 Good job!');
      }
    }

    dayBox.addEventListener('click', toggleComplete);

    grid.appendChild(dayBox);
  }

  // ✔ 페이지 로드시 성공률 반영 메시지
  updateCompletedCount();
});

const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
  // 1. localStorage 초기화
  localStorage.removeItem('completedDays');

  // 2. 모든 박스에서 completed 클래스 제거
  document.querySelectorAll('.day').forEach(day => {
    day.classList.remove('completed');
  });

  // 3. 메시지 출력
  showToast('🔄 초기화되었습니다!');
});
