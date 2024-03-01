export const variants1 = {
  initial: {
    x: 0,
    y: 0,
  },
  animate1: {
    x: 12,
    y: 44,
    transition: {
      ease: 'easeOut',
    },
  },
  animate2: {
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 1000, // 높을수록 애니메이션이 빠르고 활발
      damping: 15, // 낮을수록 스프링이 더 많이 진동
    },
  },
};

export const variants2 = {
  initial: {
    x: 0,
    y: 0,
  },
  animate1: {
    x: -12,
    y: -44,
    transition: {
      ease: 'easeOut',
    },
  },
  animate2: {
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 1000, // 높을수록 애니메이션이 빠르고 활발
      damping: 15, // 낮을수록 스프링이 더 많이 진동
    },
  },
};
