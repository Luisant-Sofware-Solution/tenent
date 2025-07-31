export function generateGlobalCompanyTenantId(existingTenantIds: string[]): string {
  const suffixes = existingTenantIds
    .filter(id => id.startsWith('company_'))
    .map(id => {
      const num = parseInt(id.split('_')[1]);
      return isNaN(num) ? 0 : num;
    });

  const next = Math.max(...suffixes, 0) + 1;
  const padded = String(next).padStart(4, '0');
  return `company_${padded}`;
}
