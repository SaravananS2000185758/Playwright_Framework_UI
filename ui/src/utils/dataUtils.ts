import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import * as XLSX from 'xlsx';
import { getLogger } from './logger';

const logger = getLogger('DataUtils');

/**
 * Read CSV file and convert to JSON
 * @param filePath - Path to CSV file
 * @returns Promise with array of objects
 */
export async function readCSVtoJSON(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`CSV file not found: ${filePath}`);
      }

      const results: any[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: any) => results.push(data))
        .on('end', () => {
          logger.info(`✓ Successfully read CSV file: ${filePath} (${results.length} rows)`);
          resolve(results);
        })
        .on('error', (error: Error) => {
          logger.error(`✗ Error reading CSV file: ${error.message}`);
          reject(error);
        });
    } catch (error) {
      logger.error(`✗ Error: ${(error as Error).message}`);
      reject(error);
    }
  });
}

/**
 * Write JSON array to CSV file
 * @param filePath - Path to output CSV file
 * @param data - Array of objects to convert to CSV rows
 * @param headers - Optional list of CSV headers; defaults to keys from first object
 * @returns Promise resolved when file is written
 */
export async function writeJSONToCSV(filePath: string, data: any[], headers?: string[]): Promise<void> {
  try {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('CSV write requires a non-empty array of objects');
    }

    const csvHeaders = headers?.length ? headers : Array.from(
      data.reduce((keys, row) => {
        Object.keys(row).forEach((key) => keys.add(key));
        return keys;
      }, new Set<string>())
    );

    const escapeValue = (value: any) => {
      const cell = value === undefined || value === null ? '' : String(value);
      return `"${cell.replace(/"/g, '""')}"`;
    };

    const rows = data.map((row) =>
      csvHeaders.map((header) => escapeValue(row[header])).join(',')
    );

    const csvContent = [csvHeaders.join(','), ...rows].join('\r\n');

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await fs.promises.writeFile(filePath, csvContent, 'utf8');
    logger.info(`✓ Successfully wrote CSV file: ${filePath} (${data.length} rows)`);
  } catch (error) {
    logger.error(`✗ Error writing CSV file: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Read Excel file and convert to JSON
 * @param filePath - Path to Excel file
 * @param sheetName - Sheet name (optional, defaults to first sheet)
 * @returns Array of objects
 */
export function readExcelData(filePath: string, sheetName?: string): any[] {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Excel file not found: ${filePath}`);
    }

    const workbook = XLSX.readFile(filePath);
    const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]];

    if (!sheet) {
      throw new Error(`Sheet not found in Excel file`);
    }

    const data = XLSX.utils.sheet_to_json(sheet);
    logger.info(`✓ Successfully read Excel file: ${filePath} (${data.length} rows)`);
    return data;
  } catch (error) {
    logger.error(`✗ Error reading Excel file: ${(error as Error).message}`);
    throw error;
  }
}

/**
 * Get timestamp in various formats
 * @param format - Format type: 'full', 'date', 'time', 'iso'
 * @returns Formatted timestamp string
 */
export function getTimestamp(format: 'full' | 'date' | 'time' | 'iso' = 'full'): string {
  const now = new Date();

  switch (format) {
    case 'date':
      return now.toISOString().split('T')[0]; // YYYY-MM-DD
    case 'time':
      return now.toTimeString().split(' ')[0]; // HH:mm:ss
    case 'iso':
      return now.toISOString(); // ISO format
    case 'full':
    default:
      return `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`; // YYYY-MM-DD HH:mm:ss
  }
}

/**
 * Generate unique ID
 * @returns Unique ID string
 */
export function generateUniqueId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Retry a promise-based function
 * @param fn - Function to retry
 * @param retries - Number of retries
 * @param delay - Delay between retries in milliseconds
 * @returns Result of function
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
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

/**
 * Wait for a specific time
 * @param milliseconds - Time to wait in milliseconds
 */
export async function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Random delay between min and max
 * @param min - Minimum delay in milliseconds
 * @param max - Maximum delay in milliseconds
 */
export async function randomDelay(min: number = 1000, max: number = 3000): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  await wait(delay);
}
