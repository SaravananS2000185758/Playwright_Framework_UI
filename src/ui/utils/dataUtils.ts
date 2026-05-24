import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import * as XLSX from 'xlsx';
import { getLogger } from './logger';

const logger = getLogger('DataUtils');

export function readJSONData<T = Record<string, unknown>>(filePath: string): T[] {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`JSON file not found: ${filePath}`);
    }
    const data: T[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    logger.info(`✓ Successfully read JSON file: ${filePath} (${data.length} rows)`);
    return data;
  } catch (error) {
    logger.error(`✗ Error reading JSON file: ${(error as Error).message}`);
    throw error;
  }
}

export function readExcelData(filePath: string, sheetName?: string): Record<string, unknown>[] {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Excel file not found: ${filePath}`);
    }
    const workbook = XLSX.readFile(filePath);
    const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]];
    if (!sheet) {
      throw new Error(`Sheet not found in Excel file`);
    }
    const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
    logger.info(`✓ Successfully read Excel file: ${filePath} (${data.length} rows)`);
    return data;
  } catch (error) {
    logger.error(`✗ Error reading Excel file: ${(error as Error).message}`);
    throw error;
  }
}

export function getTimestamp(format: 'full' | 'date' | 'time' | 'iso' = 'full'): string {
  const now = new Date();
  switch (format) {
    case 'date':
      return now.toISOString().split('T')[0];
    case 'time':
      return now.toTimeString().split(' ')[0];
    case 'iso':
      return now.toISOString();
    case 'full':
    default:
      return `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;
  }
}

export function generateUniqueId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      logger.warn(`⚠ Retry attempt ${4 - retries}/3. Waiting ${delay}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
}

export async function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function randomDelay(min: number = 1000, max: number = 3000): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  await wait(delay);
}
