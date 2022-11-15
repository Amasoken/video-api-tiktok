const USER_AGENT =
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3738.0 Safari/537.36';

interface Data {
    videoUrl: string;
    error?: Error | null;
}

export default function getVideoUrl(url: string): Promise<Data> {
    return fetch(url, { method: 'GET', headers: { 'User-Agent': USER_AGENT, 'Content-Type': 'application/json' } })
        .then((res) => {
            if (res.status === 404) throw new Error('Video is unavailable');
            if (res.url === 'https://www.tiktok.com/') throw new Error('Video not found');
            if (res.status === 403) throw new Error("Couldn't fetch the video page");

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

            return { videoUrl, error: null };
        })
        .catch((error) => {
            return { videoUrl: '', error };
        });
}
