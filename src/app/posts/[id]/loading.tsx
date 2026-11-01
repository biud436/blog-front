import React from 'react';

/**
 * 글 페이지는 서버에서 데이터를 받아 렌더링하므로, 카드를 누른 직후 바로 보여줄 자리 표시자입니다.
 * 실제 PostHeader / 본문과 같은 폭·간격을 써서 로드 후 레이아웃이 흔들리지 않게 합니다.
 */
export default function PostLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="글을 불러오는 중"
      // 푸터가 화면 중간에 잠깐 보였다가 밀려나지 않도록 화면 높이만큼 차지합니다.
      style={{ minHeight: '100vh' }}
    >
      <div className="b-post-head">
        <div className="b-skeleton" style={{ height: 14, width: 96 }} />
        <div
          className="b-skeleton"
          style={{ height: 28, width: 72, marginTop: 22, borderRadius: 999 }}
        />
        <div
          className="b-skeleton"
          style={{ height: 42, width: '92%', marginTop: 28 }}
        />
        <div
          className="b-skeleton"
          style={{ height: 42, width: '58%', marginTop: 19 }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 30,
            paddingBottom: 32,
            borderBottom: '1px solid var(--b-border)',
          }}
        >
          <div
            className="b-skeleton"
            style={{ width: 40, height: 40, borderRadius: 999 }}
          />
          <div style={{ display: 'grid', gap: 8 }}>
            <div className="b-skeleton" style={{ height: 13, width: 72 }} />
            <div className="b-skeleton" style={{ height: 11, width: 112 }} />
          </div>
        </div>
      </div>

      <div className="b-post-layout">
        <div className="b-post-article" style={{ display: 'grid', gap: 14 }}>
          {[96, 100, 88, 100, 72, 0, 100, 94, 100, 64].map((width, i) =>
            width === 0 ? (
              <div key={i} style={{ height: 18 }} />
            ) : (
              <div
                key={i}
                className="b-skeleton"
                style={{ height: 16, width: `${width}%` }}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
