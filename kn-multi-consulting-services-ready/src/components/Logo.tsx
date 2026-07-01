/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
// @ts-ignore
import logoImg from "../assets/images/Logo.png";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-6 h-6" }: LogoProps) {
  return (
    <img
      src={logoImg}
      alt="KN Multi Consulting Logo"
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}
