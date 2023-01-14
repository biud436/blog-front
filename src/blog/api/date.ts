import moment from 'moment-timezone';

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

/**
 * 현재 사용중인 라이브러리는 모먼트이지만, 모먼트는 deprecated 되었으므로
 * 추후 날짜 라이브러리를 다른 라이브러리로 변환하기 쉽게 하기 위해 유틸로 분리하는 디커플링 패턴을 사용하였습니다.
 */
export namespace DateUtil {
    /**
     * iso8601 형식의 문자열을 원하는 날짜 문자열 타입으로 포맷팅합니다.
     */
    export function toDateString(
        iso8601: string,
        formatter: DateFormatter[DateFormatterKeyMap],
    ): string {
        return moment(iso8601).format(formatter);
    }

    export function ToDateStringByTimezone(
        iso8601: string,
        formatter: DateFormatter[DateFormatterKeyMap],
    ): string {
        return moment(iso8601).tz('UTC').add(1, 'hour').format(formatter);
    }

    export function ToDateStringBySeoul(
        iso8601: string,
        formatter: DateFormatter[DateFormatterKeyMap],
    ): string {
        return moment(iso8601).tz('UTC').add(9, 'hour').format(formatter);
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
        const dt = moment(iso8601).add(9, 'hour').format(formatter);
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
        return moment().format(formatter);
    }
}
