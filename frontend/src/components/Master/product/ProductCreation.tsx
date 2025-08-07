import React from 'react';

interface Props {
  companyId: number;
  tenantId: string;
}

const ProductionCreation: React.FC<Props> = ({ companyId, tenantId }) => {
  return (
    <div className="production-creation">
      <h2>Production Creation</h2>
      {/* Add form fields or table here */}
    </div>
  );
};

export default ProductionCreation;
