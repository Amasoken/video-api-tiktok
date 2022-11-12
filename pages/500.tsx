import errorImage from '../public/500.png';
import CustomError, { ImagePosition } from './../components/CustomError/index';

export default function Custom500() {
    const img = { src: errorImage, position: ImagePosition.Left };

    return <CustomError code={500} message='Internal Server Error' messageSize={5} img={img} />;
}
