import { FC, ImgHTMLAttributes } from 'react';
import logo from '../../assets/images/logo.svg';

export type LogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export const Logo: FC<LogoProps> = (props) => {
  return <img src={logo} alt="LOGO" {...props} />;
};
