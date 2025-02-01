import { createGlobalStyle } from 'styled-components';

import PoppinsThin from './assets/fonts/Poppins-Thin.ttf';
import PoppinsExtraLight from './assets/fonts/Poppins-ExtraLight.ttf';
import PoppinsLight from './assets/fonts/Poppins-Light.ttf';
import PoppinsRegular from './assets/fonts/Poppins-Regular.ttf';
import PoppinsMedium from './assets/fonts/Poppins-Medium.ttf';
import PoppinsSemiBold from './assets/fonts/Poppins-SemiBold.ttf';
import PoppinsBold from './assets/fonts/Poppins-Bold.ttf';
import PoppinsExtraBold from './assets/fonts/Poppins-ExtraBold.ttf';
import PoppinsBlack from './assets/fonts/Poppins-Black.ttf';
import PoppinsThinItalic from './assets/fonts/Poppins-ThinItalic.ttf';
import PoppinsExtraLightItalic from './assets/fonts/Poppins-ExtraLightItalic.ttf';
import PoppinsLightItalic from './assets/fonts/Poppins-LightItalic.ttf';
import PoppinsMediumItalic from './assets/fonts/Poppins-MediumItalic.ttf';
import PoppinsSemiBoldItalic from './assets/fonts/Poppins-SemiBoldItalic.ttf';
import PoppinsBoldItalic from './assets/fonts/Poppins-BoldItalic.ttf';
import PoppinsExtraBoldItalic from './assets/fonts/Poppins-ExtraBoldItalic.ttf';
import PoppinsBlackItalic from './assets/fonts/Poppins-BlackItalic.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    font-weight: 100;
    font-style: normal;
    font-display: swap;
    src: url(${PoppinsThin}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 200;
    font-style: normal;
    font-display: swap;
    src: url(${PoppinsExtraLight}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 300;
    font-style: normal;
    font-display: swap;
    src: url(${PoppinsLight}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url(${PoppinsRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    src: url(${PoppinsMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    src: url(${PoppinsSemiBold}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: url(${PoppinsBold}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 800;
    font-style: normal;
    font-display: swap;
    src: url(${PoppinsExtraBold}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 900;
    font-style: normal;
    font-display: swap;
    src: url(${PoppinsBlack}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 100;
    font-style: italic;
    font-display: swap;
    src: url(${PoppinsThinItalic}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 200;
    font-style: italic;
    font-display: swap;
    src: url(${PoppinsExtraLightItalic}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 300;
    font-style: italic;
    font-display: swap;
    src: url(${PoppinsLightItalic}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 500;
    font-style: italic;
    font-display: swap;
    src: url(${PoppinsMediumItalic}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 600;
    font-style: italic;
    font-display: swap;
    src: url(${PoppinsSemiBoldItalic}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 700;
    font-style: italic;
    font-display: swap;
    src: url(${PoppinsBoldItalic}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 800;
    font-style: italic;
    font-display: swap;
    src: url(${PoppinsExtraBoldItalic}) format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 900;
    font-style: italic;
    font-display: swap;
    src: url(${PoppinsBlackItalic}) format('truetype');
  }
`;
