import Toast from 'react-native-simple-toast';

export const showShortToast = (message:string) => {
    Toast.show(message,Toast.BOTTOM);
}
export const showLongToast = (message:string) => {
    Toast.show(message,Toast.LONG);
}