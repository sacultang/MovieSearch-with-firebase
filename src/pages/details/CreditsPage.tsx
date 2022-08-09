import React from 'react';

interface IProps {
  urlPath: string;
}

const CreditsPage = ({ urlPath }: IProps) => {
  console.log(urlPath);
  return <div>CreditsPage</div>;
};

export default CreditsPage;
