'use server'
import * as actions from '@/features/categories/server/categories.actions'
export async function getCategories(params = {}) { return actions.getCategories(params) }
export async function getCategory(id) { return actions.getCategory(id) }
