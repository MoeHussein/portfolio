import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const contentDirectory = join(process.cwd(), 'src', 'content', 'profile');

type Project = {
  id: string;
  title: string;
  status: string;
  summary: string;
  role: string;
  outcome: string;
};

type Profile = {
  locale: 'en' | 'ar' | 'tr';
  direction: 'ltr' | 'rtl';
  name: string;
  headline: string;
  projects: Project[];
  contact: { email: string; github: string; orcid: string };
};

function readProfiles(): Profile[] {
  if (!readdirSafe(contentDirectory).length) return [];
  return readdirSync(contentDirectory)
    .filter((file) => file.endsWith('.json'))
    .map((file) => JSON.parse(readFileSync(join(contentDirectory, file), 'utf8')) as Profile);
}

function readdirSafe(path: string): string[] {
  try {
    return readdirSync(path);
  } catch {
    return [];
  }
}

describe('localized portfolio content', () => {
  it('provides complete English, Arabic, and Turkish profile records', () => {
    const profiles = readProfiles();

    expect(profiles.map(({ locale }) => locale).sort()).toEqual(['ar', 'en', 'tr']);
    expect(profiles.find(({ locale }) => locale === 'ar')?.direction).toBe('rtl');
    expect(profiles.filter(({ direction }) => direction === 'ltr')).toHaveLength(2);
  });

  it('preserves approved identity and contact facts in every locale', () => {
    const profiles = readProfiles();

    for (const profile of profiles) {
      expect(profile.name).toBe('Mohammad M. T.R. Hussein');
      expect(profile.headline).toContain('Computational Imaging');
      expect(profile.contact.email).toBe('mohammad.mtr.hussein@gmail.com');
      expect(profile.contact.github).toBe('https://github.com/MoeHussein');
      expect(profile.contact.orcid).toBe('https://orcid.org/0009-0009-7211-0974');
    }
  });

  it('keeps projects factual and explicit about status, role, and outcome', () => {
    const profiles = readProfiles();

    for (const profile of profiles) {
      expect(profile.projects.length).toBeGreaterThanOrEqual(6);
      for (const project of profile.projects) {
        expect(project.id).toMatch(/^[a-z0-9-]+$/);
        expect(project.title.trim()).not.toBe('');
        expect(project.status.trim()).not.toBe('');
        expect(project.summary.trim()).not.toBe('');
        expect(project.role.trim()).not.toBe('');
        expect(project.outcome.trim()).not.toBe('');
      }
    }
  });
});
