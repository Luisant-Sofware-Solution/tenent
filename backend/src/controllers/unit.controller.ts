import { Request, Response } from 'express';
import { createUnitForCompany, getUnitsByCompanyId } from '../services/unit.service';

export const createUnit = async (req: Request, res: Response) => {
  try {
    const { name, decimalNOs, companyId } = req.body;

    if (!name || decimalNOs === undefined || !companyId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const unit = await createUnitForCompany({ name, decimalNOs: Number(decimalNOs), companyId: Number(companyId) });
    return res.status(201).json(unit);
  } catch (error: any) {
    console.error('❌ Error creating unit:', error.message);
    const status = error.message.includes('not found') || error.message.includes('does not exist') ? 404 : 500;
    return res.status(status).json({ error: error.message });
  }
};

export const getUnits = async (req: Request, res: Response) => {
  try {
    const companyId = parseInt(req.params.companyId);
    if (isNaN(companyId)) {
      return res.status(400).json({ error: 'Invalid companyId' });
    }

    const units = await getUnitsByCompanyId(companyId);
    return res.status(200).json(units);
  } catch (error: any) {
    console.error('❌ Error fetching units:', error.message);
    const status = error.message.includes('not found') || error.message.includes('does not exist') ? 404 : 500;
    return res.status(status).json({ error: error.message });
  }
};
