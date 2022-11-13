import Head from 'next/head';
import { FormEvent, useState } from 'react';

const classes = {
    labelText: 'block font-medium text-slate-600 dark:text-gray-300',
    input:
        'block w-full rounded-md outline-none px-4 border bg-gray-100 dark:bg-slate-900 ' +
        'border-neutral-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-400 ' +
        'placeholder:opacity-30  placeholder:text-slate-900 dark:placeholder:text-gray-100',
};

export default function Home() {
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);
        setVideoUrl('');

        const pageUrl = (event.target as HTMLFormElement).url.value;

        fetch(`/api/get-video-url?url=${pageUrl}`)
            .then((res) => res.json())
            .then(({ url, message, success }) => {
                if (!success) throw new Error(message);
                setVideoUrl(url);
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <Head>
                <title>Get TikTok video direct url</title>
                <meta name='description' content='Basic api for getting video link' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className='bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-gray-100 h-screen w-screen p-8 flex flex-col items-center justify-center text-sm md:text-base lg:text-lg lg:px-12 xl:text-xl 2xl:text-2xl 2xl:px-16'>
                <form action='/api/get-video-url' method='get' className='w-full' onSubmit={onSubmit}>
                    <div className='w-full flex flex-wrap sm:flex-nowrap items-center'>
                        <div className='w-full'>
                            <label htmlFor='url' className={classes.labelText}>
                                Video page url:
                            </label>
                            <input
                                className={classes.input}
                                type='text'
                                id='url'
                                name='url'
                                required
                                pattern='^https?:\/\/(www\.|vm\.|vt\.)?(tiktok\.com)\/?(.*)$'
                                title='Link should be in format https://vt.tiktok.com/abcde1234'
                                placeholder='https://vt.tiktok.com/abcde1234'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading}
                            className='rounded-md w-full mt-5 p-4 font-bold whitespace-nowrap text-slate-600 dark:text-gray-300 sm:w-auto sm:ml-4 sm:py-2 bg-slate-200 dark:bg-gray-600 border border-neutral-300 dark:border-gray-600'
                        >
                            Get direct url
                        </button>
                    </div>
                </form>

                <div className='w-full mt-5 h-1/2'>
                    <label className={classes.labelText}>Direct url:</label>
                    <textarea
                        className={`${classes.input} h-full`}
                        rows={5}
                        readOnly
                        value={isLoading ? 'Loading...' : videoUrl || ''}
                        onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                    />
                </div>
            </main>
        </>
    );
}
