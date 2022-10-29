export default function getRandomNickname() {
  const adjectives = [
    '평온한',
    '화가난',
    '우울한',
    '배고픈',
    '짜증난',
    '몽롱한',
    '엄금진',
    '어리석은',
    '아픈',
    '개빡친',
    '열받은',
    '현타온',
    '머리아픈',
    '바쁜',
    '여유로운',
    '똑똑한',
    '씩씩한',
    '어지러운'
  ];

  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}개념이`;
}
