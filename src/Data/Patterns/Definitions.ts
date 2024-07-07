// ----------- Images -------------
import ViteLogo from "/vite.svg";
import HTMLLogo from "/html.svg";
import ReactLogo from "/react.svg";
import FirebaseLogo from "/firebase.svg";
import RubyLogo from "/ruby.svg";
import HaskellLogo from "/haskell.svg";
import RustLogo from "/rust.svg";
// import NodeLogo from '/nodejs.svg';
//import SpinAgain from '/spinagain.svg';
// ---------------------------------

export interface SlotItem {
  id: number;
  imgPath: string;
}

export const Def: SlotItem[] = [
  { id: 1, imgPath: ViteLogo },
  { id: 2, imgPath: HaskellLogo },
  { id: 3, imgPath: ReactLogo },
  { id: 4, imgPath: RustLogo },
  { id: 5, imgPath: RubyLogo },
  { id: 6, imgPath: HTMLLogo },
  { id: 7, imgPath: FirebaseLogo },
];
