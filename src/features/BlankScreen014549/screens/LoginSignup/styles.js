import {Dimensions} from 'react-native';
// let width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Color from '../../../styles/colors';
export default {
  cardView: {
    top: 0,
    left: 0,
    right: 0,
    marginTop: -60,
    // marginTop: height / 8.3,
    // marginTop: 300,
    marginHorizontal: 20,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: {height: 10, width: 10},
    shadowOpacity: 0.3,
    shadowColor: Color.steel,
    //  borderColor: Color.steel,
    //  borderWidth: 2
  },
  textInput: {
    borderColor: Color.steel,
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontFamily: 'UberMoveText-Regular',
    color: '#000',
  },
};