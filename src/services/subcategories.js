'use server'
import * as actions from '@/features/categories/server/subcategories.actions'
export async function getSubcategories(params = {}) { return actions.getSubcategories(params) }
