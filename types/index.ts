import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface AdminPanelIcon {
  label: string;
  pageTitle: string;
  icon: string;
  path: string;
}
