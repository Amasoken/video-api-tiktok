import type { NextApiRequest, NextApiResponse } from 'next';
import getVideoUrl from '../../utils/getVideoUrl';
import validateUrl from './../../utils/validateUrl';

type SuccessData = {
    url: string;
    success: boolean;
};

type ErrorData = {
    success: boolean;
    message: string;
};

type Data = SuccessData | ErrorData;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { url } = req.query;

    if (typeof url !== 'string' || !validateUrl(url)) {
        return res.status(400).json({ message: 'Expected url to be a valid tiktok video url string', success: false });
    }

    return getVideoUrl(url).then(({ videoUrl, error }) => {
        if (error) {
            let status = 400;
            if (error.message.includes('Resource was not loaded. Status: ')) {
                status = Number(error.message.split('Status: ')[1]);
            }

            return res.status(status).json({ message: error.message, success: false });
        } else {
            return res.status(200).json({ url: videoUrl, success: true });
        }
    });
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '0b',
        },
        responseLimit: '1kb',
    },
};
