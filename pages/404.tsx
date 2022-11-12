import errorImage from '../public/404.png';
import CustomError, { ImagePosition } from './../components/CustomError/index';

export default function Custom404() {
    const img = { src: errorImage, position: ImagePosition.Right };

    return <CustomError code={404} message='Not Found' messageSize={10} img={img} />;
}
