import Head from 'next/head';
import { FormEvent, useState } from 'react';

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

            <main className='bg-gray-200 h-screen w-screen p-8 flex flex-col items-center justify-center text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl'>
                <form action='/api/get-video-url' method='get' className='w-full' onSubmit={onSubmit}>
                    <div className='w-full flex flex-wrap sm:flex-nowrap items-center'>
                        <div className='w-full'>
                            <label htmlFor='url' className='block font-medium text-gray-700'>
                                Video page url:
                            </label>
                            <input
                                // className='w-full'
                                className='block w-full rounded-md border-gray-300 border px-4 focus:border-gray-500 focus:ring-gray-500'
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
                            className='bg-cyan-50 rounded-md border-gray-300 border w-full mt-5 p-4 sm:w-auto sm:ml-4 sm:py-2'
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <div className='w-full mt-5'>
                    <label className='block font-medium text-gray-700'>Direct url:</label>
                    <textarea
                        className='block w-full rounded-md border-gray-300 border px-4 focus:border-gray-500 focus:ring-gray-500 text-sm'
                        rows={5}
                        value={isLoading ? 'Loading...' : videoUrl || ''}
                    />
                </div>
            </main>
        </>
    );
}
