document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('challengeGrid');
    const toast = document.getElementById('toast');
    const totalDays = 21;
    let completedCount = 0;
  
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
        showToast('🎉 You did it!');
      } else if (completedCount > totalDays / 2) {
        showToast('👍 Great job!');
      } else {
        showToast('😊 Nice try!');
      }
    }
  
    for (let i = 1; i <= totalDays; i++) {
      const dayBox = document.createElement('div');
      dayBox.classList.add('day');
      dayBox.textContent = `${i}일차`;
  
      function toggleComplete() {
        const justCompleted = !dayBox.classList.contains('completed');
        dayBox.classList.toggle('completed');
  
        if (i === totalDays && justCompleted) {
          // 마지막 날을 성공했을 때
          updateCompletedCount();
        } else if (justCompleted) {
          showToast('👍 Good job!');
        }
      }
  
      dayBox.addEventListener('click', toggleComplete);
      // dayBox.addEventListener('touchstart', toggleComplete);  
      grid.appendChild(dayBox);
    }
  });
  