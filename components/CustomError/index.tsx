import Head from 'next/head';
import styles from './index.module.css';
import { Bowlby_One_SC } from '@next/font/google';
import Image, { StaticImageData } from 'next/image';

const bowlbyOneSc = Bowlby_One_SC({ weight: '400', subsets: ['latin'] });

export enum ImagePosition {
    Right = 'right',
    Left = 'left',
}

interface Props {
    code: number;
    message: string;
    messageSize: 5 | 10;
    img: {
        src: StaticImageData;
        position: ImagePosition;
    };
}

export default function CustomError({ code, message, messageSize, img }: Props) {
    const { src, position } = img;

    return (
        <div className='w-screen h-screen bg-[#FF49A6]'>
            <Head>
                <title>{message}</title>
                <meta name='description' content='Error page' />
            </Head>

            <div
                className={`flex items-center justify-center flex-col h-1/2 w-screen text-[#FFFB5B] ${bowlbyOneSc.className}`}
            >
                <p className={`${styles.fontSize25} drop-shadow-[5px_5px_0px_#9F0089]`}>{code}</p>
                <p className={`${styles[`fontSize${messageSize}`]} drop-shadow-[3px_3px_0px_#9F0089]`}>{message}</p>
            </div>
            <Image
                className={`fixed ${position}-0 bottom-0 max-w-[80%] max-h-[50%] h-auto w-auto`}
                src={src}
                alt='Picture of the author'
                priority
            />
        </div>
    );
}
