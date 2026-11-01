import React from 'react';
import { isRecent, relativeDate } from '../utils';

export function PostMeta({
  category,
  date,
}: {
  category?: string;
  date?: string;
}) {
  return (
    <div className="b-meta">
      {category && <span className="b-meta__cat">{category}</span>}
      {category && date && <span className="b-meta__sep" aria-hidden="true" />}
      {date && <time dateTime={date}>{relativeDate(date)}</time>}
      {isRecent(date) && <span className="b-new">NEW</span>}
    </div>
  );
}
