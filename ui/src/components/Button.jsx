import React from "react";
import discordIcon from '../assets/myicons/discord.svg';
import telegramIcon from '../assets/myicons/telegram.svg';
import codeIcon from '../assets/myicons/code.svg';
import Search from '../assets/myicons/search.svg';
import Logo from '../assets/myicons/logo.svg';
import Html from '../assets/myicons/html.svg';
import Css from '../assets/myicons/css.svg';
import Js from '../assets/myicons/javascript.svg';
import Edit from '../assets/myicons/edit.svg';

const Button = ({ icon, text }) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-primary">
          <span><SvgIcons icon={icon} /></span>
          {text}
        </button>
      </div>
    </>
  );
};

const SvgIcons = ({ icon }) => {
  const imagePath = getIconPath(icon);
  return (
    <>
      <img className="px-2" src={imagePath} alt="" />
    </>
  );
};

const getIconPath = (icon) => {
  switch (icon) {
    case 'discord':
      return discordIcon;
    case 'telegram':
      return telegramIcon;
    case 'code':
      return codeIcon;
    case 'search':
      return Search;
    case 'logo':
      return Logo;
    case 'html':
      return Html;
    case 'css':
      return Css;
    case 'javascript':
      return Js;
    case 'edit':
      return Edit;
    default:
      return ''; // You might want to provide a default icon or handle this case differently
  }
};

export default Button;
export {SvgIcons} ;