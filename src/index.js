import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Linking,
  Platform,
  Image,
  TextInput,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

/**
 * Rating modal component
 * @prop {boolean} visible - visability modal
 * @prop {function} onClose - call when cancel button pressed
 * @prop {function} sendComment - call when send button pressed, return comment text & select rating {text, selectRating}
 * @prop {function} ratingConfirm - call when user voted, return selectedRating
 * @prop {function} changeRating - call when rating changed, return rating
 * @prop {string} iTunesURL - url to app in itunes (ios) 'itms-apps://itunes.apple.com/app/{APP_ID}'
 * @prop {string} playMarketURL - url to app in playmarket (android) 'market://details?id={APP_PACKAGE_NAME}'
 * @prop {number} defaultRating - initial rating; default = 5
 * @prop {string} animationType - modal animation type
 * @prop {object} inputStyle - styles for input
 * @prop {object} ratingBoxStyle - styles for rating box
 * @prop {object} ratingBoxTitleStyle - styles for rating box title
 * @prop {string} ratingBoxTitleText - rating box title text
 * @prop {object} modalContainerStyle - styles for modal container
 * @prop {object} starBtnStyles - styles for star button
 * @prop {string} cancelBtnText - cancel button text
 * @prop {object} cancelBtnTextStyles - cancel button text styles
 * @prop {object} cancelBtnStyles - cancel button styles
 * @prop {string} commentBoxTitle - comment box title (style prop === ratingBoxTitleStyle)
 * @prop {string} commentBoxPlaceholder - comment box input placeholder
 * @prop {string} sendBtnText - send btn text
 */
const RatingModal = ({
  visible = true,
  onClose = () => {},
  sendComment = () => {},
  ratingConfirm = () => {},
  changeRating = () => {},
  iTunesURL = '',
  playMarketURL = '',
  inputStyle = {},
  defaultRating = 5,
  animationType = 'fade',
  ratingBoxStyle = {},
  ratingBoxTitleStyle = {},
  ratingBoxTitleText = '',
  modalContainerStyle = {},
  starBtnStyles = {},
  cancelBtnText = 'Cancel',
  cancelBtnTextStyles = {},
  cancelBtnStyles = {},
  rateBtnText = 'Rate',
  rateBtnTextStyles = {},
  rateBtnStyles = {},
  commentBoxTitle = '',
  commentBoxPlaceholder = '...',
  sendBtnText = 'Send',
}) => {
  const [selectRating, setSelectRating] = React.useState(5);
  const [openComment, setOpenComment] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  return (
    <Modal animationType={animationType} transparent visible={visible}>
      <View style={[styles.container, modalContainerStyle]}>
        {openComment ? (
          <View style={[styles.ratingBox, ratingBoxStyle]}>
            <Text style={[styles.ratingBoxTitle, ratingBoxTitleStyle]}>
              {commentBoxTitle}
            </Text>
            <TextInput
              style={[styles.input, inputStyle]}
              multiline
              value={commentText}
              onChangeText={text => setCommentText(text)}
              placeholder={commentBoxPlaceholder}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => onClose()}
                style={[styles.cancelBtn, cancelBtnStyles]}>
                <Text style={[styles.cancelBtnText, cancelBtnTextStyles]}>
                  {cancelBtnText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sendComment({text: commentText, selectRating});
                  onClose();
                }}
                style={[styles.rateBtn, rateBtnStyles]}>
                <Text style={[styles.rateBtnText, rateBtnTextStyles]}>
                  {sendBtnText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[styles.ratingBox, ratingBoxStyle]}>
            <Text style={[styles.ratingBoxTitle, ratingBoxTitleStyle]}>
              {ratingBoxTitleText}
            </Text>
            <View style={styles.starsWrapper}>
              <TouchableOpacity
                onPress={() => {
                  setSelectRating(1);
                  changeRating(1);
                }}
                style={[styles.starBtn, starBtnStyles]}>
                <Image
                  resizeMode="contain"
                  source={require('./assets/star-active.png')}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectRating(2);
                  changeRating(2);
                }}
                style={[styles.starBtn, starBtnStyles]}>
                <Image
                  resizeMode="contain"
                  source={
                    selectRating >= 2
                      ? require('./assets/star-active.png')
                      : require('./assets/star-inactive.png')
                  }
                  style={styles.starIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectRating(3);
                  changeRating(3);
                }}
                style={[styles.starBtn, starBtnStyles]}>
                <Image
                  resizeMode="contain"
                  source={
                    selectRating >= 3
                      ? require('./assets/star-active.png')
                      : require('./assets/star-inactive.png')
                  }
                  style={styles.starIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectRating(4);
                  changeRating(4);
                }}
                style={[styles.starBtn, starBtnStyles]}>
                <Image
                  resizeMode="contain"
                  source={
                    selectRating >= 4
                      ? require('./assets/star-active.png')
                      : require('./assets/star-inactive.png')
                  }
                  style={styles.starIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectRating(5);
                  changeRating(5);
                }}
                style={[styles.starBtn, starBtnStyles]}>
                <Image
                  resizeMode="contain"
                  source={
                    selectRating >= 5
                      ? require('./assets/star-active.png')
                      : require('./assets/star-inactive.png')
                  }
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => onClose()}
                style={[styles.cancelBtn, cancelBtnStyles]}>
                <Text style={[styles.cancelBtnText, cancelBtnTextStyles]}>
                  {cancelBtnText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (selectRating > 3) {
                    ratingConfirm(selectRating);
                    onClose();
                    Platform.OS === 'ios'
                      ? Linking.openURL(iTunesURL)
                      : Linking.openURL(playMarketURL);
                  } else {
                    setOpenComment(true);
                  }
                }}
                style={[styles.rateBtn, rateBtnStyles]}>
                <Text style={[styles.rateBtnText, rateBtnTextStyles]}>
                  {rateBtnText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default RatingModal;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  ratingBox: {
    backgroundColor: 'white',
    width: '100%',
    padding: 24,
    borderRadius: 12,
  },
  ratingBoxTitle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 24,
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    textAlign: 'center',
    marginTop: -4,
  },
  starsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 24,
  },
  starIcon: {
    width: '100%',
    height: '100%',
  },
  starBtn: {
    width: 26,
    height: 26,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#f9f6f7',
  },
  cancelBtnText: {
    fontSize: 14,
    color: 'black',
    opacity: 0.5,
    fontWeight: '500',
  },
  rateBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#ee98b2',
  },
  rateBtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#dedce4',
    paddingLeft: 0,
    paddingBottom: 8,
    fontSize: 18,
    width: '100%',
    color: 'black',
    marginBottom: 24,
  },
});

EStyleSheet.build();
