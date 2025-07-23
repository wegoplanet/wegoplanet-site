window.addEventListener('scroll', function () {
  const header = document.getElementById('main-header');
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
    header.classList.remove('header-default');
  } else {
    header.classList.remove('header-scrolled');
    header.classList.add('header-default');
  }
});

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  let current = 0;
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  const interval = duration / steps;

  const countUp = () => {
    current += increment;
    if (current < target) {
      counter.textContent = Math.floor(current).toLocaleString();
      setTimeout(countUp, interval);
    } else {
      counter.textContent = target.toLocaleString();
    }
  };

  countUp();
}

const counters = document.querySelectorAll('.number');
const options = {
  threshold: 0.6, // 화면에 60% 보이면 실행
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target); // 한 번만 실행되게
    }
  });
}, options);

counters.forEach(counter => {
  observer.observe(counter);
});

// 텍스트 애니메이션
const sets = document.querySelectorAll('.textSet');
let current = 0;

function showSet(index) {
  sets.forEach((set, i) => {
    if (i === index) {
      set.classList.add('active');
    } else {
      set.classList.remove('active');
    }
  });
}

showSet(current); // 처음에 첫 세트 보여주기

setInterval(() => {
  current = (current + 1) % sets.length;
  showSet(current);
}, 3500); // 3초 간격

// 기타 라디오와 입력창 요소 가져오기
const otherRadio = document.getElementById('other-radio');
const otherInput = document.getElementById('other-input');

// 모든 라디오 버튼
const radios = document.querySelectorAll('input[name="inquiry_channel"]');

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (otherRadio.checked) {
      otherInput.style.display = 'inline-block';
    } else {
      otherInput.style.display = 'none';
      otherInput.value = '';
    }
  });
});

// hamburger
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMo = document.getElementById("nav-mo");

  // 햄버거 클릭 시 모바일 메뉴 열기/닫기 + 색상 변경
  hamburger.addEventListener("click", function () {
    navMo.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // nav-mo 안의 서브메뉴 (.sub-mo) 토글 - 모바일 전용
  const menuItems = navMo.querySelectorAll(".has-submenu > a");

  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // 링크 이동 방지

        const submenu = this.nextElementSibling;

        // 이미 열려 있는 서브메뉴는 닫기
        const allSubmenus = navMo.querySelectorAll(".sub-mo.open");
        allSubmenus.forEach(function (sm) {
          if (sm !== submenu) {
            sm.classList.remove("open");
          }
        });

        // 현재 클릭한 메뉴의 서브메뉴는 토글
        if (submenu && submenu.classList.contains("sub-mo")) {
          submenu.classList.toggle("open");
        }
      }
    });
  });

  // 화면 너비가 늘어나면 모바일 메뉴 강제 닫기
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navMo.classList.remove("active");
      hamburger.classList.remove("active");

      // 서브메뉴도 전부 닫기
      const openSubmenus = navMo.querySelectorAll(".sub-mo.open");
      openSubmenus.forEach(submenu => submenu.classList.remove("open"));
    }
  });
});




// content '+'->'-'

document.addEventListener("DOMContentLoaded", function () {
  const submenuLinks = document.querySelectorAll("#nav-mo .has-submenu > a");

  submenuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // 링크 이동 방지

      const parentLi = this.parentElement;
      const isActive = parentLi.classList.contains("active");

      // 다른 메뉴 닫기
      document.querySelectorAll("#nav-mo .has-submenu").forEach(item => {
        item.classList.remove("active");
      });

      // 현재 메뉴 토글
      if (!isActive) {
        parentLi.classList.add("active");
      }
    });
  });
});


// header logo
window.addEventListener('scroll', function () {
  const header = document.getElementById('main-header');
  const logo = document.querySelector('.logo-img');

  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
    header.classList.remove('header-default');
    logo.setAttribute('src', 'images/logo.svg');
  } else {
    header.classList.remove('header-scrolled');
    header.classList.add('header-default');
    logo.setAttribute('src', 'images/logo_w.svg');
  }
});

// popup

document.addEventListener("DOMContentLoaded", function () {
  const privacyBtn = document.querySelector(".privacy");
  const termsBtn = document.querySelector(".terms");
  const popupPrivacy = document.querySelector(".popup-privacy");
  const popupTerms = document.querySelector(".popup-terms");
  const closeButtons = document.querySelectorAll(".popup-txt button");

  function fadeIn(popup) {
    popup.style.display = "flex"; // 중앙 정렬 위해 flex 사용
    popup.style.opacity = 0;

    // .popup-inner 스크롤 맨 위로 초기화
    setTimeout(() => {
      const inner = popup.querySelector(".popup-inner");
      if (inner) inner.scrollTop = 0;
    }, 0);

    let opacity = 0;
    const fade = setInterval(() => {
      opacity += 0.1;
      popup.style.opacity = opacity;
      if (opacity >= 1) clearInterval(fade);
    }, 30);
  }

  function fadeOut(popup) {
    let opacity = 1;
    const fade = setInterval(() => {
      opacity -= 0.1;
      popup.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(fade);
        popup.style.display = "none";
      }
    }, 30);
  }

  privacyBtn.addEventListener("click", () => fadeIn(popupPrivacy));
  termsBtn.addEventListener("click", () => fadeIn(popupTerms));

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const popup = btn.closest(".popup");
      fadeOut(popup);
    });
  });
});