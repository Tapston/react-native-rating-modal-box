<p align="center">
  The best Rating component for React Native.
</p>

# react-native-rating-modal-box

### Installation

```bash
$ npm i react-native-rating-modal-box --save
```

### Basic Usage

- Install `react-native` first

```bash
$ npm i react-native-cli -g
```

- Initialization of a react-native project

```bash
$ react-native init myproject
```

- Then, edit `myproject/index.js`, like this:

```jsx
import React, {useState} from 'react'

import RatingModal from 'react-native-rating-modal-box';

const MyComponent = () => {
  const [isOpenRatin, setOpenRating] = useState(true);
  return (
    <RatingModal
        iTunesURL="itms-apps://itunes.apple.com/app/11111"
        playMarketURL="market://details?id=com.myproject.text"
        onClose={() => setOpenRating(false)}
        visible={isOpenRatin}
        ratingConfirm={rating => {
          console.log('Selected rating', rating);
        }}
      />
  )
}


AppRegistry.registerComponent('myproject', () => MyComponent)
```

### Properties

#### Basic

|                |type    |default                      |description                         |
|----------------|--------------|-----------------|-----------------------------|
|visible|`bool`           | `false` |If `true`, modal is visible             | 
|onClose|`func`           |  |Call when cancel button pressed            | 
|sendComment|`func`           |  |Call when send button pressed, return comment text & select rating `{text, selectRating}`            | 
|ratingConfirm|`func`           |  |Call when user voted, return `selectedRating`           | 
|changeRating|`func`           |  |Call when rating changed, return `selectedRating`           | 
|iTunesURL|`string`           |  |URL to app in iTunes `'itms-apps://itunes.apple.com/app/{APP_ID}'`           | 
|playMarketURL|`string`           |  |URL to app in PlayMarket `'market://details?id={APP_PACKAGE_NAME}'`           | 
|defaultRating|`number`           | `5` |Initial rating         | 
|animationType|`string`           | `fade` |Modal animation type        |  
|ratingBoxTitleStyle|`object`           |  |Styles for rating box title       |
|ratingBoxTitleText|`string`           |  |Rating box title text       |
|cancelBtnText|`string`           |`'Cancel'` |Cancel button text      |
|rateBtnText|`string`           |`'Rate'` |Rate button text      |
|commentBoxTitle|`string`           |  |Comment box title (style props === `ratingBoxTitleStyle`)  |
|inputStyle|`object`           |  |Comment input styles  |
|commentBoxPlaceholder|`string`           |  |Comment box input placeholder  |

#### Styles

|                |type    |default                      |description                         |
|----------------|--------------|-----------------|-----------------------------|
|ratingBoxStyle|`object`           |  |Styles for rating box        | 
|ratingBoxTitleStyle|`object`           |  |Styles for rating box title       |
|modalContainerStyle|`object`           |  |Styles for modal container      |
|starBtnStyles|`object`           |  |Styles for star button      |
|cancelBtnTextStyles|`object`           |  |Styles for cancel button text  |
|cancelBtnStyles|`object`           |  |Styles for cancel button  |
|rateBtnTextStyles|`object`           |  |Styles for rate button text  |
|rateBtnStyles|`object`           |  |Styles for rate button  |
|sendBtnText|`string`           |  |Styles for send button  |


## Contribution

- [@r.ravkov](mailto:r.ravkov@tapston.com) The main author.

Made with ♥.
