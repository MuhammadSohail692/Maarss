import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { Category,Image } from '@model/home/bestSellingProductModel/BestSellingProductModel';

export interface IProgramCard {
    bgImage:string,
    title: string;
    dataTime:string,
}

export interface ISettingUrl{
    url:string
}


export interface IShopNowCard {
    id:string,
    title: string;
    desc:string,
    bgImage:any,
    navigation:any
}


export interface IBestSellingProductCard {
    prodId:number,
    name:string,
    price: string;
    categories:Category[],
    image:Image[],
    navigation:any
}
export interface ICategoryCard {
    categoryId:number,
    name:string,
    navigation:any
}

export interface IOrderHistoryCard {
    orderId:number,
    status:string,
    total:string,
    navigation:any
}
export interface IShippingTypeCard {
    id:number,
    title:string,
    price: string;
}

export interface IProductDetailImage{
    imageList:Image[]
}


export interface IProductDetailFullScreenImage{
    imageList:Image[],
    navigation:any,
    route:any
}


export interface IProductColors{
    id:number
    colorName:String
}

export interface IProductDetailColors{
    id:number,
    color:string
}


export interface IProductDetailSize{
    id:number,
    size:string
}


export interface ICartMessage{
    message:string
}