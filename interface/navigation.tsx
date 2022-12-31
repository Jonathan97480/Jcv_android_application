import { apiProduct } from "./api";
import { Customer } from "./customer";

export type RootProductStackParamList = {

    Product: { CatId: number, title: string };
    ProductDetails: { Product: apiProduct };
};
export type RootCustomersStackParamList = {

    CustomerDetails: { customer: Customer };


};
export type RootNotificationsStackParamList = {
    Notification: undefined;

};