/**
 * 사이트 레이아웃은 가로를 12컬럼으로 균등하게 분할합니다.
 *
 * 왼쪽 메뉴는 정확히 2컬럼을 차지합니다.
 * 오른쪽은 10컬럼을 차지합니다.
 *
 * 비율을 계산하면
 * (2 / 12) * 100 = 16.66% 입니다.
 */
export const Column = (text, ...values: any[]) => {
  const columns = Math.min(12, Math.max(1, +values[0]));
  const formulr = (columns / 12) * 100;

  return `${formulr}%`;
};
