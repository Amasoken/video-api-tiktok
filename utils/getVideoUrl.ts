import { JSDOM } from 'jsdom';

const USER_AGENT =
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3738.0 Safari/537.36';

interface Data {
    videoUrl: string;
    error?: Error | null;
}

export default function getVideoUrl(url: string): Promise<Data> {
    return JSDOM.fromURL(url, { userAgent: USER_AGENT })
        .then((dom) => {
            // if redirected to main page, original video is not found
            if (dom.window.document.URL === 'https://www.tiktok.com/') {
                throw new Error('Resource was not loaded. Status: 404');
            }

            return dom.window.document.querySelector('#SIGI_STATE')?.innerHTML;
        })
        .then((text = '') => {
            const { ItemModule } = JSON.parse(text);
            const id = Object.keys(ItemModule)[0];
            const videoUrl = ItemModule[id].video.downloadAddr;

            return videoUrl;
        })
        .then((videoUrl) => {
            if (!videoUrl) throw new Error("Couldn't get the video url");

            return { videoUrl, error: null };
        })
        .catch((error) => {
            return { videoUrl: '', error };
        });
}
