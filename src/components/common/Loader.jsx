import React, { useEffect } from 'react';
import { lineSpinner } from 'ldrs';

export const LoaderSpinner = ({ size, stroke, speed, color }) => {
  useEffect(() => {
    lineSpinner.register();
  }, []);

  //! Estableciendo valores por defecto para el Loader
  const loaderSize = size || "65";
  const loaderStroke = stroke || "6";
  const loaderSpeed = speed || "1.2";
  const loaderColor = color || "#6298DF";

  return (
    <l-line-spinner
      size={loaderSize}
      stroke={loaderStroke}
      speed={loaderSpeed}
      color={loaderColor}
    />
  );
};
