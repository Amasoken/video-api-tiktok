const regexp = /^https?:\/\/(www\.|vm\.|vt\.)?(tiktok\.com)\/?(.*)$/;

export default function validateUrl(url: string): boolean {
    if (!url || typeof url !== 'string' || !url?.trim() || !regexp.test(url)) {
        return false;
    }

    return true;
}
