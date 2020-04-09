import React from "react";
import { CubeSpinner } from "react-spinners-kit";

export const Loading = () => {
  return (
    <div className="col-12">
      <CubeSpinner size={30} color="green" />
    </div>
  );
};
