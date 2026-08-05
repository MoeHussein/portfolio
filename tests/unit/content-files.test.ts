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
  locale: 'en' | 'tr';
  direction: 'ltr' | 'rtl';
  name: string;
  headline: string;
  about: { paragraphs: string[]; highlights: string[] };
  cv: {
    publicationTier: string;
    researchExperience: { title: string; bullets: string[] };
  };
  research: { doi: string };
  timeline: { period: string; title: string; organization: string; description: string }[];
  projects: Project[];
  languages: { language: string; level: string }[];
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
  it('provides complete English and Turkish profile records', () => {
    const profiles = readProfiles();

    expect(profiles.map(({ locale }) => locale).sort()).toEqual(['en', 'tr']);
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

  it('keeps the profile focused on the complete quantitative imaging pipeline', () => {
    const profiles = readProfiles();

    for (const profile of profiles) {
      expect(profile.about.paragraphs).toHaveLength(1);
      expect(profile.about.paragraphs[0]?.trim()).not.toBe('');
      expect(profile.about.highlights).toHaveLength(5);
      for (const highlight of profile.about.highlights) {
        expect(profile.about.paragraphs[0]).toContain(highlight);
      }
    }

    const english = profiles.find(({ locale }) => locale === 'en');
    expect(english?.about.paragraphs[0]).toContain('complete imaging pipeline');
    expect(english?.about.paragraphs[0]).toContain('Python-based image processing');
    expect(english?.about.paragraphs[0]).toContain('optical system design and data acquisition');
    expect(english?.about.paragraphs[0]).toContain(
      'reconstruction, calibration, and quantitative interpretation',
    );
    expect(english?.about.paragraphs[0]).not.toContain('scientific programming');
    expect(english?.about.paragraphs[0]).not.toContain('the algorithms');
  });

  it('includes the approved language proficiency levels in the CV source', () => {
    const english = readProfiles().find(({ locale }) => locale === 'en');

    expect(english?.languages).toEqual([
      { language: 'English', level: 'Academic level' },
      { language: 'Arabic', level: 'Native' },
      { language: 'Turkish', level: 'Upper-intermediate' },
      { language: 'Japanese', level: 'Beginner' },
    ]);
  });

  it('keeps one consolidated research role and the DOI-led Q1 publication highlight', () => {
    for (const profile of readProfiles()) {
      expect(profile.cv.researchExperience.title.trim()).not.toBe('');
      expect(profile.cv.researchExperience.bullets).toHaveLength(3);
      expect(profile.cv.publicationTier).toContain('Q1');
      expect(profile.research.doi).toBe('https://doi.org/10.1364/BOE.585564');
    }
  });

  it('presents the MSc study, graduate research, and TÜBİTAK project as one current entry', () => {
    for (const profile of readProfiles()) {
      expect(profile.timeline).toHaveLength(1);
      expect(profile.timeline[0]?.organization).toContain('123N774');
    }

    const english = readProfiles().find(({ locale }) => locale === 'en');
    expect(english?.timeline[0]?.title).toContain('MSc Student & Graduate Researcher');
    expect(english?.timeline[0]?.description).toContain('TÜBİTAK scholarship since 15 Jan 2024');
  });

  it('uses the approved concise class rank wording', () => {
    const englishSource = readFileSync(join(contentDirectory, 'en.json'), 'utf8');

    expect(englishSource).toContain('Ranked 3rd in my class');
    expect(englishSource).not.toContain('according to university records');
  });

  it('uses a concise title for the client website collection', () => {
    const english = readProfiles().find(({ locale }) => locale === 'en');
    const clientWork = english?.projects.find(({ id }) => id === 'client-web-design');

    expect(clientWork?.title).toBe('Client Websites');
  });

  it('does not keep removed decorative contact or footer copy', () => {
    for (const profile of readProfiles()) {
      const ui = (profile as Profile & { ui: Record<string, string> }).ui;
      expect(ui).not.toHaveProperty('contactTitle');
      expect(ui).not.toHaveProperty('copyright');
    }
  });
});
