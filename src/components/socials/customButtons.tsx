
import {FacebookSvgIcon, GoogleSvgIcon, TwitterSvgIcon} from './icons/icons';
import {createButton, createSvgIcon} from "react-social-login-buttons";

const facebookSignupConfig = {
  text: "Sign Up with Facebook",
  icon: createSvgIcon(FacebookSvgIcon),
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#3b5998", fontSize: '14px' },
  activeStyle: { background: "#293e69" }
};
/** Facebook Sign Up button. */
const FacebookSignUpButton = createButton(facebookSignupConfig);


const twitterSignupConfig = {
    text: "Sign Up with Twitter",
    icon: createSvgIcon(TwitterSvgIcon),
    iconFormat: name => `fa fa-${name}`,
    style: { background: "#1DA1F2", fontSize: "14px" },
    activeStyle: { background: "#0d86d0" },
};
/** Twitter Sign Up button. */
const TwitterSignUpButton = createButton(twitterSignupConfig);


const googleSignUpConfig = {
    text: "Sign Up with Google",
    icon: createSvgIcon(GoogleSvgIcon),
    iconFormat: name => `fa fa-${name}`,
    style: { background: "white", fontSize: '14px', color: 'black', },
    activeStyle: { background: "#EFF0EE" }
  };
  /** Google Sign Up button. */
  const GoogleSignUpButton = createButton(googleSignUpConfig);


export{ FacebookSignUpButton, GoogleSignUpButton, TwitterSignUpButton }