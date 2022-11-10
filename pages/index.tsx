import Head from 'next/head';
import { FormEvent, useState } from 'react';

const classes = {
    labelText: 'block font-medium text-gray-700 dark:text-gray-200',
    input: 'block w-full rounded-md outline-none border-2 border-gray-300 px-4 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-800 dark:bg-gray-400 dark:text-white dark:placeholder:text-gray-200',
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

            <main className='bg-gray-200 dark:bg-gray-600 dark:text-white h-screen w-screen p-8 flex flex-col items-center justify-center text-sm md:text-base lg:text-lg lg:px-12 xl:text-xl 2xl:text-2xl 2xl:px-16'>
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
                            className='bg-cyan-50 dark:bg-cyan-800 dark:text-cyan-50 rounded-md border-gray-300 dark:border-cyan-500 border w-full mt-5 p-4 sm:w-auto sm:ml-4 sm:py-2'
                        >
                            Submit
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
                    />
                </div>
            </main>
        </>
    );
}
