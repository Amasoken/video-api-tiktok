import type { NextApiRequest, NextApiResponse } from 'next';

type SuccessData = {
    url: string;
    success: boolean;
};

type ErrorData = {
    success: boolean;
    message: string;
};

type Data = SuccessData | ErrorData;

const regexp = /^https?:\/\/(www\.|vm\.|vt\.)?(tiktok\.com)\/?(.*)$/;

const USER_AGENT =
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3738.0 Safari/537.36';

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { url } = req.query;

    if (!url || typeof url !== 'string' || !url?.trim() || !regexp.test(url)) {
        return res.status(400).json({ message: 'Expected url to be a valid tiktok url string', success: false });
    }

    return fetch(url, { method: 'GET', headers: { 'User-Agent': USER_AGENT, 'Content-Type': 'application/json' } })
        .then((res) => {
            if ([404, 403].includes(res.status)) throw new Error("Couldn't find the video");

            return res;
        })
        .then((res) => res.text())
        .then((text) => {
            const match = text.match(/"downloadAddr":"(.*?)"/);
            const rawUrl = (match ?? [])[1] ?? '';

            return decodeURI(JSON.parse(`"${rawUrl}"`));
        })
        .then((videoUrl) => {
            if (!videoUrl) throw new Error("Couldn't get the video url");

            res.status(200).json({ url: videoUrl, success: true });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ success: false, message: error.message });
        });
}
