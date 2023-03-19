/**
 * @author Eo JinSoek
 */
export class UrlWrapper extends String {
    constructor(url: string) {
        super(url);
    }

    /**
     * 구분자
     *
     * @returns
     */
    seperator(): string {
        return this.endsWith('/') ? '' : '/';
    }

    /**
     * URL을 연결합니다.
     *
     * @param args
     * @returns
     */
    join(...args: string[]): string {
        return this + this.seperator() + args.join('/');
    }

    /**
     * URL을 연결합니다.
     *
     * @param args
     * @returns
     */
    static join(...args: string[]): string {
        const url = new UrlWrapper('');
        return url.join(...args);
    }

    [Symbol.toPrimitive](): string {
        return this.toString();
    }
}
