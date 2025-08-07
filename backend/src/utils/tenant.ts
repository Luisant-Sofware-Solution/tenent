export function generateGlobalCompanyTenantId(existingTenantIds: string[]): string {
  const suffixes = existingTenantIds
    .map(id => parseInt(id.split('_')[1]))
    .filter(num => !isNaN(num));

  const next = Math.max(...suffixes, 0) + 1;
  return `company_${String(next).padStart(4, '0')}`;
}
