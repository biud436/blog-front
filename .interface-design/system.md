# Design System — blog-front

## Direction

**Personality:** Warmth & Craft
**Foundation:** Warm stone (stone palette)
**Depth:** Surface card with subtle layered shadow, borders-only internally
**Feel:** 글쓰기에 몰입할 수 있는 따뜻하고 차분한 환경. 잉크와 양피지의 메타포.

---

## Tokens

### Colors

```
--ink:            #1c1917        /* Primary text — stone-900 */
--ink-secondary:  #57534e        /* Supporting text — stone-600 */
--ink-tertiary:   #a8a29e        /* Metadata, timestamps — stone-400 */
--ink-muted:      #d6d3d1        /* Disabled, placeholder — stone-300 */
--parchment:      #fafaf9        /* Base background — stone-50 */
--surface:        #ffffff        /* Card / elevated surface */
--accent:         #c2410c        /* Brand accent — orange-700 */
--accent-soft:    #fff7ed        /* Accent tint background — orange-50 */
--accent-hover:   #9a3412        /* Accent hover — orange-800 */
--border:         rgba(28, 25, 23, 0.06)   /* Subtle separation */
--border-hover:   rgba(28, 25, 23, 0.12)   /* Hover emphasis */
--border-strong:  rgba(28, 25, 23, 0.18)   /* Focus / strong emphasis */
--destructive:    #dc2626        /* Error / delete — red-600 */
--destructive-soft: #fef2f2      /* Error background — red-50 */
```

### Spacing

Base: 8px
Scale: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64

Responsive padding scale (xs / sm / md):

- Content padding: 20px / 28px / 48px
- Section vertical: 24px / 28px / 32px

### Radius

Scale: 2px (accent marker), 8px (controls, buttons), 12px (cards mobile), 16px (cards desktop)

### Typography

- Headline: 700 weight, letter-spacing -0.02em, line-height 1.3
- Body: 400 weight, line-height 1.7
- Label: 600 weight, 0.75rem, uppercase, letter-spacing 0.05em
- Button: 600 weight, 0.875rem

### Animation

Duration: 150ms
Easing: ease
Button active: scale(0.98)

---

## Depth Strategy

**Outer card** — Layered shadow on md+:

```
0 1px 3px rgba(28,25,23,0.04),
0 4px 16px rgba(28,25,23,0.06)
```

**Internal sections** — Borders-only:

```
border: 1px solid rgba(28, 25, 23, 0.06)
```

**Focus rings** — Accent soft glow:

```
box-shadow: 0 0 0 3px #fff7ed
border-color: #c2410c
```

---

## Patterns

### Surface Card (PostContainer / Editor)

- Max-width: 860px (post view), 960px (editor)
- Background: #ffffff on #fafaf9
- Border-radius: 0 (xs), 16px (md)
- Shadow: none (xs), layered (md)
- Overflow: hidden

### Title Input

- Border: none
- Font: 1.5rem, 700 weight, -0.02em tracking
- Bottom accent line: gradient from accent to accent-soft, 2px height
- Background: transparent

### Category Select (Custom)

- Background: parchment (#fafaf9)
- Border: 1px solid border token
- Radius: 8px
- Padding: 10px 16px
- Custom chevron SVG arrow
- Focus: accent border + accent-soft ring

### Button Primary

- Background: accent (#c2410c)
- Color: white
- Padding: 10px 24px
- Radius: 8px
- Font: 0.875rem, 600 weight
- Hover: accent-hover + shadow glow
- Active: scale(0.98)

### Button Ghost (Cancel)

- Background: transparent
- Color: ink-secondary
- Border: 1px solid border token
- Hover: parchment bg + border-hover

### Accent Marker

- Width: 32px, Height: 3px
- Background: accent
- Radius: 2px
- Used above page headings

### Alert Error

- Radius: 8px
- Border: 1px solid destructive at 12% opacity
- Background: destructive-soft (#fef2f2)
- Icon color: destructive (#dc2626)

### Post Footer Buttons

- Text style buttons with icon
- Color: ink-secondary → ink on hover
- Background: transparent → parchment on hover
- Border: 1px solid border → border-hover on hover
- Radius: 8px, padding: 8px 16px

### Post Card (List)

- Padding: 32px (md), 20px (xs)
- Border-bottom: 1px solid border
- Transition: background 200ms
- Hover: parchment background
- Title: 1.25rem, 700 weight, -0.01em
- Title hover: accent color
- Excerpt: ink-secondary, 0.9375rem, line-height 1.7
- Meta: ink-tertiary, 0.8125rem, dot separator

---

## Decisions

| Decision               | Rationale                                              | Date       |
| ---------------------- | ------------------------------------------------------ | ---------- |
| Warm stone palette     | 블로그는 글쓰기 공간 — 잉크와 양피지의 따뜻함이 어울림 | 2026-02-13 |
| Borders-only internal  | 콘텐츠 밀도보다 가독성 중시, 내부는 미세한 선으로 구분 | 2026-02-13 |
| Layered shadow (outer) | 카드가 배경 위에 부드럽게 떠오르는 느낌                | 2026-02-13 |
| Custom form controls   | 네이티브 요소 대신 커스텀으로 일관된 토큰 적용         | 2026-02-13 |
| Accent as orange-700   | stone 팔레트 위에서 따뜻한 강조색, 잉크+불꽃 메타포    | 2026-02-13 |
| 8px spacing base       | 넉넉한 여백으로 읽기 편한 환경 구성                    | 2026-02-13 |
| 16px card radius (md)  | 부드럽고 친근한 느낌, 기술적이지 않은 분위기           | 2026-02-13 |
