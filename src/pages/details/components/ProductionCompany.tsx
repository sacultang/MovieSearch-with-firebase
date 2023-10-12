import React from 'react';
import type { ProductionCompany } from '@/types/mediaType';
import { IMAGE_PATH } from '@/constants/imagePath';
interface ProductionCompanyProps {
  companies: ProductionCompany;
}

const ProductionCompanies = ({ companies }: ProductionCompanyProps) => {
  return (
    <div key={companies.id}>
      {companies.logo_path && (
        <img
          src={`${IMAGE_PATH.w200}/${companies.logo_path}`}
          alt={companies.name}
          style={{
            width: '60px',
            marginTop: '10px',
            marginRight: '10px',
          }}
        />
      )}
    </div>
  );
};

export default ProductionCompanies;
