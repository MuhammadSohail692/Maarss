import { ViewStyle, Dimensions, View } from 'react-native';
import { exp } from 'react-native-reanimated';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export const homeContainer: ViewStyle = {
  flexDirection: 'column',
  padding: 20,
};

export const scrollContainer: ViewStyle = {
  paddingBottom: 65,
};

export const flatListCartContainer: ViewStyle = {
  paddingBottom: 60,
};

export const favFlatListCartContainer: ViewStyle = {
  paddingBottom: 120,
};
export const orderHistoryFlatListCartContainer: ViewStyle = {
  paddingBottom: 105,
};


export const favouriteContainer: ViewStyle = {
  flexDirection: 'column',
  padding: 15,
  height: Dimensions.get('window').height,
};

export const productsContainer: ViewStyle = {
  flexDirection: 'column',
  paddingStart: 18,
  paddingEnd: 18,
  paddingTop: 15,
  paddingBottom: 120
};

export const parentContainer: ViewStyle = {
  flexDirection: 'column',
  paddingStart: 18,
  paddingEnd: 18,
  paddingTop: 15,
  paddingBottom: 15,
};

export const categoryContainer: ViewStyle = {
  flexDirection: 'column',
  paddingStart: 18,
  paddingEnd: 18,
  paddingTop: 15,
  paddingBottom: 15,
  height: Dimensions.get('window').height,
};


export const orderStatusParent: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  height: 35,
  borderRadius: 20
};

export const orderStatusViewOne: ViewStyle = {
  flex: 1,
  height: 35,
  borderRadius: 20
};

export const orderStatusViewTwo: ViewStyle = {
  flex: 1,
  height: 35,
  borderRadius: 20,
  marginHorizontal: 5
};

export const orderStatusViewThree: ViewStyle = {
  flex: 1,
  height: 35,
  borderRadius: 20,
  marginHorizontal: 5
};
export const orderStatusViewFour: ViewStyle = {
  flex: 1,
  height: 35,
  borderRadius: 20
};

export const cartContainer: ViewStyle = {
  flexDirection: 'column',
  padding: 15,
  paddingBottom: 105,
  height: Dimensions.get('window').height,
};

export const searchBox: ViewStyle = {
  marginStart: 20,
  marginBottom: 15,
  marginTop: 25,
  flexDirection: 'row',
  borderColor: 'lightblue',
  borderWidth: 1,
  backgroundColor: '#fff',
  height: 40,
};

export const screenContainer: ViewStyle = {
  marginStart: 15,
  marginEnd: 15,
  marginBottom: 15,
};

export const mainBottomContainer: ViewStyle = {
  flexDirection: 'row',
  position: 'absolute',
  bottom: 0,
  backgroundColor: "#ffffff",
  borderRadius: 0,
}

export const mainItemContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 0,
  borderRadius: 0,
  borderColor: "#333B42"
}

export const bottomBarPressView: ViewStyle = {
  justifyContent: 'center', alignItems: 'center', flex: 1, padding: 10
}
export const cartCountContainer: ViewStyle = {
  position: 'absolute',
  top: 5,
  right: 0,
  backgroundColor: '#477AB6',
  borderRadius: 10,
  minWidth: 20,
  padding: 2,
  alignItems: 'center',
  justifyContent: 'center',
}
export const cartCountIsFocusedContainer: ViewStyle = {
  position: 'absolute',
  top: 5,
  right: 0,
  backgroundColor: '#745D8A',
  borderRadius: 10,
  minWidth: 20,
  padding: 2,
  alignItems: 'center',
  justifyContent: 'center',
}

export const windowHeight: ViewStyle = {
  height: Dimensions.get('window').height * 1,
}


export const item: ViewStyle = {
  marginBottom: 20,
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  width: Dimensions.get('window').width * 1,
  height: 150,
};

export const contentContainer: ViewStyle = {
  width: Dimensions.get('window').width * 1,
  backgroundColor: 'rgba(52, 52, 52, 0.4)',
  height: '100%',
  justifyContent: 'center',
  paddingStart: 10
};



export const shopNowBtn: ViewStyle = {
  marginTop: 20,
  padding: 12,
  backgroundColor: '#3BB54A',
  width: 80,
};


export const applyCouponBtn: ViewStyle = {
  backgroundColor: '#3BB54A',
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 10,
};

export const textPrompt: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

export const bestProductRowItem: ViewStyle = {
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  width: 200,
  height: 250,
  marginEnd: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#D3D3D3",
};


export const pagination: ViewStyle = {
  flexDirection: 'row',
  position: 'absolute',
  bottom: -15,
  alignSelf: 'center',
};

export const fullScreenView: ViewStyle = {
  flexDirection: 'row',
  position: 'absolute',
  top: 0,
  right: 0,
  alignSelf: 'center',
  marginEnd: 12,
  marginTop: 10
};

export const productDescContainer: ViewStyle = {
  padding: 20
}

export const orderDetailContainer: ViewStyle = {
  flexDirection: 'column',
  padding: 20,
  flex:1,
  height: Dimensions.get('window').height,
}

export const billingInfoContainer: ViewStyle = {
  padding: 20
}

export const productDescViewContainer: ViewStyle = {
  marginTop: 10
}


export const productDescViewRowContainer: ViewStyle = {
  marginTop: 10,
  flexDirection: 'row',
  marginEnd: 10,
  alignContent:'center',
  alignItems:'center'
}

export const productQuantityContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  height: 30,

}
export const plusMinusContainer: ViewStyle = {
  backgroundColor: '#ffffff',
  borderRadius: 5,
  borderWidth: 1,
  padding: 10,
  borderColor: "#D3D3D3",
}
export const quantityConatiner: ViewStyle = {
  marginTop: 15
}

export const productNameViewRowContainer: ViewStyle = {
  marginTop: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
}


export const productDescViewColumnContainer: ViewStyle = {
  marginTop: 12,
  flexDirection: 'column',
}

export const addToCartBtn: ViewStyle = {
  marginTop: 18,
  padding: 12,
  backgroundColor: '#3BB54A',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#D3D3D3",
};


export const confirmCheckoutBtn: ViewStyle = {
  marginTop: 18,
  padding: 12,
  backgroundColor: '#3BB54A',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#D3D3D3",
};



export const bestfavoriteRowItem: ViewStyle = {
  flexDirection: 'row',
  alignContent: 'space-between',
  alignItems: 'center',
  marginEnd: 0,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  marginBottom: 12,
};

export const categiryRowItem: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center',
  marginEnd: 0,
  padding: 8,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  marginBottom: 8,
};

export const historyRowItem: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center',
  padding: 12,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  marginBottom: 8,
};


export const noRecordParentView: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

export const tabBarIcon: ViewStyle = {
  width: 20,
  height: 20,
}

export const headerContiner: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center'
}

export const productsHeaderContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginEnd: 2,
  alignItems: 'center',
  alignContent: 'center',
}


export const settingItemContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginEnd: 2,
  alignItems: 'center',
  alignContent: 'center',
  marginBottom: 15
}
export const productListContainer: ViewStyle = {
  marginTop: 15,
}

export const categoryListContainer: ViewStyle = {
  marginTop: 10,
}

export const orderHistoryListContainer: ViewStyle = {
  marginTop: 40,
  height: Dimensions.get('window').height,

}


export const filterContainer: ViewStyle = {
  borderColor: '#745D8A',
  borderWidth: 1,
  padding: 5,
  paddingHorizontal: 5,
  backgroundColor: '#745D8A',
  borderRadius: 5
}

export const rowFilterContainer: ViewStyle = {
  marginBottom: 6
}

export const filterBottomContent: ViewStyle = {
  backgroundColor: 'white',
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  height: 160,
}

export const filterBottomContainer: ViewStyle = {
  justifyContent: 'flex-end',
  margin: 0,
}

export const settingContainer: ViewStyle = {
  flexDirection: 'column',
  padding: 20,
  height: Dimensions.get('window').height,
};

export const forwardContainer: ViewStyle = {
  borderColor: '#745D8A',
  borderWidth: 1,
  padding: 5,
  paddingHorizontal: 5,
  backgroundColor: '#745D8A',
  borderRadius: 5
}

export const forwardCategoryContainer: ViewStyle = {
  borderColor: '#745D8A',
  borderWidth: 1,
  padding: 5,
  paddingHorizontal: 5,
  backgroundColor: '#745D8A',
  borderRadius: 5,
  marginEnd: 3,
  justifyContent: 'flex-end',
  alignItems: 'center',
}

export const orderStatusContainer: ViewStyle = {
  padding: 5,
  paddingHorizontal: 5,
  backgroundColor: '#FF0000',
  borderRadius: 5,
  marginEnd: 3,
  justifyContent: 'flex-end',
  alignItems: 'center',
}

export const settingHeaderContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  marginBottom: 20
}

export const socialIconContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  marginTop: 5
}
export const instagramIconContainer: ViewStyle = {
  marginStart: 10
}


export const registerContainer: ViewStyle = {
  flexDirection: 'column',
  padding: 20,
  height: Dimensions.get('window').height,
  alignContent: 'center',
  alignItems: 'center'
};

export const registerFildsContainer: ViewStyle = {
  height: Dimensions.get('window').height * 0.8,
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center'
};


export const inuputBoxContainer: ViewStyle =
{
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  borderColor: '#ffffff',
  paddingHorizontal: 2,
  marginTop: 10
}


export const searchInuputContainer: ViewStyle =
{
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  borderColor: '#ffffff',
  paddingHorizontal: 2,
  marginTop: 22
}


export const searchInuputCouponContainer: ViewStyle =
{
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5
}

export const inuputBoxLoginRegisterContainer: ViewStyle =
{
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  borderColor: '#ffffff',
  paddingHorizontal: 10,
  marginTop: 10
}

export const orderNotesContainer: ViewStyle =
{
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderWidth: 1,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  borderColor: '#ffffff',
  paddingHorizontal: 10,
  height: 150,
  marginTop: 10
}
export const userInputBox: ViewStyle = {
  flex: 1,
  paddingVertical: 8,
  marginStart: 10
}

export const userOrderNotesInputBox: ViewStyle = {
  flex: 1,
  paddingVertical: 8,
  height: 150,
}

export const userInputCouponBox: ViewStyle = {
  flex: 1,
  paddingVertical: 6,
  marginEnd: 10,
  borderWidth: 1,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  paddingHorizontal: 10,
  borderColor: '#ffffff',
}


export const registrationLoginContainer: ViewStyle = {
  flexDirection: 'row',
  marginTop: 20,
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center'
};


export const alreadyAccountContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignContent: 'center',
  alignItems: 'center',
  marginBottom: 15
};

export const registrationLoginBtn: ViewStyle = {
  padding: 12,
  backgroundColor: '#3BB54A',
  width: 80,
  borderWidth: 1,
  borderRadius: 10,
  borderColor: '#3BB54A',
  alignContent: 'center',
  alignItems: 'center'
};

export const instructionContainer: ViewStyle = {
  marginTop: 15
};


export const checkoutBtn: ViewStyle = {
  padding: 8,
  backgroundColor: '#3BB54A',
  width: 80,
  borderRadius: 8,
};


export const headerCartContiner: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between'
}

export const billingContiner: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between'
}

export const shipmentType: ViewStyle = {
  padding: 12,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  marginTop: 15
}

export const billingDetailsType: ViewStyle = {
  marginTop: 10,
}

export const subTotalContainer: ViewStyle = {
  flexDirection: 'row',
}
export const modalBackground:ViewStyle={
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
}

export const activityIndicatorWrapper:ViewStyle={
  backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
}

export const orderHistoryItemsContainer:ViewStyle ={
marginTop:20,
flex:1
}