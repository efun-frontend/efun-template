declare const Kakao: any;
declare class share_Util_thinker {
    static FB_APP_ID: number;
    static KAKAO_APP_KEY: string;
    static redirectUrl: string;
    constructor();
    init(): void;
    static shareToFacebook(FB_APP_ID?: number, redirectUrl?: string): void;
    static shareToTwitter(title: string, content: string, redirectUrl?: string): void;
    static initKaKao(): void;
    static shareToKaKao(title: string, description: string, imageUrl: string, redirectUrl?: string): void;
}
//# sourceMappingURL=tools.d.ts.map