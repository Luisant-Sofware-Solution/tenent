import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/category.service";

export const createCategory = async (req: Request, res: Response) => {
  const tenantId = req.headers["tenant-id"] as string;
  const { category, companyId } = req.body;

  if (!tenantId || !companyId) {
    return res.status(400).json({ error: "Missing tenantId or companyId" });
  }

  try {
    const newCategory = await createCategoryService(tenantId, {
      category,
      companyId: Number(companyId),
    });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: "Failed to create category", details: err });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  const tenantId = req.headers["tenant-id"] as string;
  if (!tenantId) return res.status(400).json({ error: "Missing tenantId" });

  try {
    const categories = await getAllCategoriesService(tenantId);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories", details: err });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const tenantId = req.headers["tenant-id"] as string;
  const { id } = req.params;
  const { category } = req.body;

  if (!tenantId || !id) {
    return res.status(400).json({ error: "Missing tenantId or id" });
  }

  try {
    const updatedCategory = await updateCategoryService(
      tenantId,
      Number(id),
      { category }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: "Failed to update category", details: err });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const tenantId = req.headers["tenant-id"] as string;
  const { id } = req.params;

  if (!tenantId || !id) {
    return res.status(400).json({ error: "Missing tenantId or id" });
  }

  try {
    await deleteCategoryService(tenantId, Number(id));
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category", details: err });
  }
};
