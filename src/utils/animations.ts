import anime from 'animejs';

// 淡入滑入動畫
export function fadeSlideIn(
  targets: string | HTMLElement | HTMLElement[],
  options?: {
    delay?: number;
    duration?: number;
    translateY?: number;
    easing?: string;
  }
) {
  const { delay = 0, duration = 800, translateY = 30, easing = 'easeOutExpo' } = options || {};
  
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [translateY, 0],
    duration,
    delay,
    easing,
  });
}

// 依序淡入（stagger）
export function staggerFadeIn(
  targets: string | HTMLElement | HTMLElement[],
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
  }
) {
  const { delay = 0, stagger = 100, duration = 600 } = options || {};
  
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [20, 0],
    duration,
    delay: anime.stagger(stagger, { start: delay }),
    easing: 'easeOutQuad',
  });
}

// 打字機效果
export function typeWriter(
  element: HTMLElement,
  text: string,
  options?: {
    speed?: number;
    onComplete?: () => void;
  }
) {
  const { speed = 50, onComplete } = options || {};
  
  element.textContent = '';
  let index = 0;
  
  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
    } else {
      clearInterval(interval);
      onComplete?.();
    }
  }, speed);
  
  return () => clearInterval(interval);
}

// 進度條填充
export function progressFill(
  target: string | HTMLElement,
  percentage: number,
  options?: {
    duration?: number;
    easing?: string;
  }
) {
  const { duration = 1500, easing = 'easeInOutQuad' } = options || {};
  
  return anime({
    targets: target,
    width: `${percentage}%`,
    duration,
    easing,
  });
}

// 脈動光暈
export function pulseGlow(
  target: string | HTMLElement,
  options?: {
    scale?: number;
    duration?: number;
  }
) {
  const { scale = 1.05, duration = 1500 } = options || {};
  
  return anime({
    targets: target,
    scale: [1, scale, 1],
    boxShadow: [
      '0 0 0 rgba(212, 168, 75, 0)',
      '0 0 30px rgba(212, 168, 75, 0.5)',
      '0 0 0 rgba(212, 168, 75, 0)',
    ],
    duration,
    easing: 'easeInOutSine',
    loop: true,
  });
}

// 卡片翻轉
export function cardFlip(
  target: string | HTMLElement,
  options?: {
    duration?: number;
  }
) {
  const { duration = 800 } = options || {};
  
  return anime({
    targets: target,
    rotateY: [0, 180],
    duration,
    easing: 'easeInOutQuad',
  });
}

// 震動效果
export function shake(
  target: string | HTMLElement,
  options?: {
    intensity?: number;
    duration?: number;
  }
) {
  const { intensity = 10, duration = 500 } = options || {};
  
  return anime({
    targets: target,
    translateX: [0, -intensity, intensity, -intensity, intensity, 0],
    duration,
    easing: 'easeInOutSine',
  });
}

// 縮放彈出
export function scaleIn(
  target: string | HTMLElement,
  options?: {
    delay?: number;
    duration?: number;
  }
) {
  const { delay = 0, duration = 600 } = options || {};
  
  return anime({
    targets: target,
    scale: [0, 1],
    opacity: [0, 1],
    duration,
    delay,
    easing: 'easeOutBack',
  });
}

// 數字滾動
export function countUp(
  element: HTMLElement,
  endValue: number,
  options?: {
    duration?: number;
    suffix?: string;
  }
) {
  const { duration = 2000, suffix = '' } = options || {};
  const obj = { value: 0 };
  
  return anime({
    targets: obj,
    value: endValue,
    round: 1,
    duration,
    easing: 'easeOutExpo',
    update: () => {
      element.textContent = `${Math.round(obj.value)}${suffix}`;
    },
  });
}
