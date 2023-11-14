/* eslint-disable @typescript-eslint/no-namespace */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const Formatter = {
    /**
     * 날짜
     */
    DATE: 'YYYY-MM-DD',
    /**
     * 날짜와 시간
     */
    DATETIME: 'YYYY-MM-DD HH:mm:ss',
};

export type DateFormatter = typeof Formatter;
export type DateFormatterKeyMap = keyof DateFormatter;

export namespace DateUtil {
    export function ToDateStringBySeoul(
        iso8601: string,
        formatter: DateFormatter[DateFormatterKeyMap],
    ): string {
        return dayjs(iso8601).add(9, 'hour').format(formatter);
    }

    /**
     * 현지화된 날짜 문자열을 표시합니다.
     *
     * @param iso8601
     * @param formatter
     * @returns
     */
    export function ToDateStringUsingIntl(
        iso8601: string,
        formatter: DateFormatter[DateFormatterKeyMap],
    ): string {
        const dt = dayjs(iso8601).add(9, 'hour').format(formatter);
        return Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(new Date(dt));
    }

    /**
     * 현재 컴퓨터 시간을 반환합니다.
     *
     * @param formatter 날짜 포맷터를 선택하세요.
     * @returns
     */
    export function now(
        formatter: DateFormatter[DateFormatterKeyMap] = Formatter.DATETIME,
    ): string {
        return dayjs().format(formatter);
    }
}
