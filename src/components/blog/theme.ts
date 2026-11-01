export const THEME_STORAGE_KEY = 'blog-theme';

/** 밝은 색이 하드코딩된 화면(에디터)은 항상 라이트 테마로 보여줍니다. */
export const LIGHT_ONLY_PATH_PREFIXES = ['/edit2'];

/**
 * 첫 페인트 전에 테마를 적용하는 인라인 스크립트 (루트 레이아웃 <head>에서 사용).
 * 저장된 값이 없으면 OS 설정(prefers-color-scheme)을 따릅니다.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var p=location.pathname;${JSON.stringify(
  LIGHT_ONLY_PATH_PREFIXES,
)}.forEach(function(x){if(p.indexOf(x)===0){t='light'}});document.documentElement.setAttribute('data-blog-theme',t)}catch(e){}})();`;

/** 저장된 테마(없으면 OS 설정)를 다시 적용합니다. */
export function applyStoredTheme() {
  let theme: string | null = null;
  try {
    theme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    // 저장소를 쓸 수 없으면 OS 설정을 따릅니다.
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  document.documentElement.setAttribute('data-blog-theme', theme);
}
