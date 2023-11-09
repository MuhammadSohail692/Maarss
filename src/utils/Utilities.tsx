import Toast from 'react-native-simple-toast';
import {ICartMessage} from '@types/type'

export const showShortToast = (message:string) => {
    Toast.show(message, Toast.BOTTOM);
}