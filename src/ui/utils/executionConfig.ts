import * as fs from 'fs';
import * as path from 'path';

interface ExecutionConfig {
  feature: { enabled: boolean; tagName: string };
  e2e: { enabled: boolean; tagName: string };
}

function parseProperties(filePath: string): Record<string, string> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const result: Record<string, string> = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    result[key.trim()] = rest.join('=').trim();
  }
  return result;
}

export function loadExecutionConfig(): ExecutionConfig {
  const filePath = path.join(__dirname, '../../../test/execution.config.properties');
  const props = parseProperties(filePath);
  return {
    feature: {
      enabled: props['feature.enabled'] === 'true',
      tagName: props['feature.tagName'] || 'smoke',
    },
    e2e: {
      enabled: props['e2e.enabled'] === 'true',
      tagName: props['e2e.tagName'] || 'smoke',
    },
  };
}

export function buildGrepPattern(): string | undefined {
  const config = loadExecutionConfig();
  const tags: string[] = [];

  if (config.feature.enabled) tags.push(`@feature-${config.feature.tagName}`);
  if (config.e2e.enabled) tags.push(`@e2e-${config.e2e.tagName}`);

  if (tags.length === 0) return undefined;
  // If both suites use the same tag, deduplicate
  const unique = [...new Set(tags)];
  return unique.join('|');
}
