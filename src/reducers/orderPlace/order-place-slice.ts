
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ORDER_HISTORY_END_POINT, CONSUMER_KEY, CONSUMER_SECRET } from '@service/constants';
import { PlaceOrderResponse } from '@types/PlaceOrder';
import { IPlaceOrderModelResponse } from '@model/placeOrder/PlaceOrderModel';

const initialState: PlaceOrderResponse = {
    data: {},
    loading: false,
    error: "",
};

export const postOrderPlaceData = createAsyncThunk('order-place-slice/postOrderPlaceData', async (
    { paymentMethod,paymentMethodTitle, name,address,city,country,email,phone,customerNote,couponCode,shippingLine,selectedProductItems }
    ) => {
    try {
        console.log("paymentMethod " + paymentMethod)
        console.log("paymentMethodTitle " + paymentMethodTitle)
        console.log("name " + name)
        console.log("address " + address)
        console.log("city " + city)
        console.log("country " + country)
        console.log("email " + email)
        console.log("phone " + phone)
        console.log("customerNote " + customerNote)
        console.log("couponCode " + couponCode)
        console.log("shippingLine " + JSON.stringify(shippingLine))
        console.log("selectedProductItems " + JSON.stringify(selectedProductItems))

        var requestData;
        if(couponCode.lenght>0){
            requestData = {
                payment_method: paymentMethod,
                payment_method_title: paymentMethodTitle,
                status: "processing",
                set_paid: false,
                billing: {
                    first_name: name,
                    last_name: "",
                    address_1: address,
                    address_2: "",
                    city: city,
                    state: "",
                    postcode: "",
                    country: country,
                    email: email,
                    phone: phone
                },
                shipping: {
                    first_name: name,
                    last_name: "",
                    address_1: address,
                    address_2: "",
                    city: city,
                    state: "",
                    postcode: "",
                    country: country
                },
                line_items: selectedProductItems,
                customer_note: customerNote,
                coupon_lines: [
                    {
                      code: couponCode
                    }
                  ],
                shipping_lines: [
                    shippingLine
                ]
            };
        }
        else{
            requestData = {
                payment_method: paymentMethod,
                payment_method_title: paymentMethodTitle,
                status: "processing",
                set_paid: false,
                billing: {
                    first_name: name,
                    last_name: "",
                    address_1: address,
                    address_2: "",
                    city: city,
                    state: "",
                    postcode: "",
                    country: country,
                    email: email,
                    phone: phone
                },
                shipping: {
                    first_name: name,
                    last_name: "",
                    address_1: address,
                    address_2: "",
                    city: city,
                    state: "",
                    postcode: "",
                    country: country
                },
                line_items: selectedProductItems,
                customer_note: customerNote,
                shipping_lines: [
                    shippingLine
                ]
            };
        }


        const queryParams = {
            'consumer_key': CONSUMER_KEY,
            'consumer_secret': CONSUMER_SECRET,
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: queryParams,
        };

        var response
        response = await axios.post(BASE_URL + ORDER_HISTORY_END_POINT, requestData, config);


        return response.data as IPlaceOrderModelResponse;
    } catch (error) {
        throw error;
    }
});

const orderPlaceDataSlice = createSlice({
    name: 'orderPlaceData',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(postOrderPlaceData.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(postOrderPlaceData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(postOrderPlaceData.rejected, (state, action) => {
                state.loading = false;
                console.log("action.error "+action.error)
                state.error = action.error.message ?? "Unable to server at the moment";
            });
    },
});

export default orderPlaceDataSlice.reducer;