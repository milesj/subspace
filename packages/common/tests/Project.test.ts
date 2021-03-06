import { getFixturePath } from '@boost/test-utils';
import { Path, Project } from '../src';

describe('Project', () => {
  describe('getProject()', () => {
    it('returns contents of package.json', () => {
      expect(new Project(getFixturePath('module-basic')).getPackage()).toEqual({
        name: 'module-basic',
        version: '0.0.0',
        main: './index.js',
      });
    });

    it('errors if no package.json found', () => {
      expect(() => new Project(getFixturePath('module-no-package')).getPackage()).toThrow(
        'No `package.json` found within project root.',
      );
    });
  });

  describe('getWorkspaceGlobs()', () => {
    it('returns an empty array if no workspace config', () => {
      expect(new Project(getFixturePath('workspace-no-packages')).getWorkspaceGlobs()).toEqual([]);
    });

    it('returns an array of workspaces for yarn `workspaces` property', () => {
      expect(new Project(getFixturePath('workspace-yarn')).getWorkspaceGlobs()).toEqual([
        getFixturePath('workspace-yarn', 'packages/*'),
      ]);
    });

    it('returns an array of workspaces for yarn no hoist `workspaces.packages` property', () => {
      expect(new Project(getFixturePath('workspace-yarn-nohoist')).getWorkspaceGlobs()).toEqual([
        getFixturePath('workspace-yarn-nohoist', 'packages/*'),
      ]);
    });

    it('returns an array of workspaces for lerna `packages` property', () => {
      expect(new Project(getFixturePath('workspace-lerna')).getWorkspaceGlobs()).toEqual([
        getFixturePath('workspace-lerna', 'packages/*'),
      ]);
    });

    it('returns an array of workspaces for pnpm `packages` property', () => {
      expect(
        new Project(getFixturePath('workspace-pnpm')).getWorkspaceGlobs({ relative: true }),
      ).toEqual(['packages/**', '!**/qux']);
    });

    it('returns an array of all workspaces', () => {
      expect(new Project(getFixturePath('workspace-multiple')).getWorkspaceGlobs()).toEqual([
        getFixturePath('workspace-multiple', 'packages/*'),
        getFixturePath('workspace-multiple', 'modules/*'),
      ]);
    });

    it('returns an array of all workspaces as relative paths', () => {
      expect(
        new Project(getFixturePath('workspace-multiple')).getWorkspaceGlobs({ relative: true }),
      ).toEqual(['packages/*', 'modules/*']);
    });
  });

  describe('getWorkspacePackages()', () => {
    it('returns an empty array if no workspace config', () => {
      expect(new Project(getFixturePath('workspace-no-packages')).getWorkspacePackages()).toEqual(
        [],
      );
    });

    it('loads all package.jsons and appends metadata', () => {
      const rootPath = new Path(getFixturePath('workspace-multiple'));
      const project = new Project(rootPath);

      expect(project.getWorkspacePackages()).toEqual([
        {
          package: { name: 'test-boost-workspace-multiple-baz', version: '0.0.0' },
          metadata: project.createWorkspaceMetadata(
            rootPath.append('packages/baz/package.json').path(),
          ),
        },
        {
          package: { name: 'test-boost-workspace-multiple-foo', version: '0.0.0' },
          metadata: project.createWorkspaceMetadata(
            rootPath.append('packages/foo/package.json').path(),
          ),
        },
        {
          package: { name: 'test-boost-workspace-multiple-bar', version: '0.0.0' },
          metadata: project.createWorkspaceMetadata(
            rootPath.append('modules/bar/package.json').path(),
          ),
        },
      ]);
    });

    it("loads package.json's for yarn", () => {
      const rootPath = new Path(getFixturePath('workspace-yarn'));
      const project = new Project(rootPath);

      expect(project.getWorkspacePackages()).toEqual([
        {
          package: { name: 'test-boost-workspace-foo-yarn', version: '0.0.0' },
          metadata: project.createWorkspaceMetadata(
            rootPath.append('packages/foo/package.json').path(),
          ),
        },
      ]);
    });

    it("loads package.json's for lerna", () => {
      const rootPath = new Path(getFixturePath('workspace-lerna'));
      const project = new Project(rootPath);

      expect(project.getWorkspacePackages()).toEqual([
        {
          package: { name: 'test-boost-workspace-foo-lerna', version: '0.0.0' },
          metadata: project.createWorkspaceMetadata(
            rootPath.append('packages/foo/package.json').path(),
          ),
        },
      ]);
    });

    it("loads package.json's for pnpm", () => {
      const rootPath = new Path(getFixturePath('workspace-pnpm'));
      const project = new Project(rootPath);

      expect(project.getWorkspacePackages()).toEqual([
        {
          package: { name: 'test-boost-workspace-foo-pnpm', version: '0.0.0' },
          metadata: project.createWorkspaceMetadata(
            rootPath.append('packages/foo/package.json').path(),
          ),
        },
      ]);
    });
  });

  describe('getWorkspacePackagePaths()', () => {
    it('returns an empty array if no workspace config', () => {
      expect(
        new Project(getFixturePath('workspace-no-packages')).getWorkspacePackagePaths(),
      ).toEqual([]);
    });

    it('returns an empty array if no workspace packages', () => {
      expect(new Project(getFixturePath('workspace-mismatch')).getWorkspacePackagePaths()).toEqual(
        [],
      );
    });

    it('returns an array of all packages within all workspaces', () => {
      expect(new Project(getFixturePath('workspace-multiple')).getWorkspacePackagePaths()).toEqual([
        getFixturePath('workspace-multiple', 'packages/baz'),
        getFixturePath('workspace-multiple', 'packages/foo'),
        getFixturePath('workspace-multiple', 'modules/bar'),
      ]);
    });

    it('returns an array of all packages within all workspaces as relative paths', () => {
      expect(
        new Project(getFixturePath('workspace-multiple')).getWorkspacePackagePaths({
          relative: true,
        }),
      ).toEqual(['packages/baz', 'packages/foo', 'modules/bar']);
    });
  });
});
