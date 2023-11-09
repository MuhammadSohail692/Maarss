import { ViewStyle, Dimensions } from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

export const homeContainer: ViewStyle = {
    flexDirection: 'column',
    padding: 20
};
export const favouriteContainer: ViewStyle = {
  flexDirection: 'column',
  padding: 15,
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
    height: 260,
    marginEnd: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
};



export const pagination:ViewStyle={
    flexDirection: 'row',
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
  };

  export const fullScreenView:ViewStyle={
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    alignSelf: 'center',
    marginEnd:12,
    marginTop:10
  };

  export const productDescContainer:ViewStyle={
    padding:20
  }
  
  export const productDescViewContainer:ViewStyle={
    marginTop:10
  }

  
  export const productDescViewRowContainer:ViewStyle={
    marginTop:10,
    flexDirection:'row',
    marginEnd:10,
  }
  export const productNameViewRowContainer:ViewStyle={
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-between',
  }

  
  export const productDescViewColumnContainer:ViewStyle={
    marginTop:12,
    flexDirection:'column',
  }

  export const addToCartBtn: ViewStyle = {
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
  marginEnd: 10,
  backgroundColor:'#ffffff',
  borderRadius: 10,
  marginBottom:12,
};