#!/usr/bin/env node

const madge = require('madge');
const path = require('path');

/**
 * Script to find files that depend on the changed files using madge
 * Usage: node find-dependents.js <comma-separated-changed-files>
 */

async function findDependents(changedFiles) {
  if (!changedFiles || changedFiles.trim() === '') {
    console.log('No changed files to analyze.');
    return;
  }

  const fileList = changedFiles.split(',').map(f => f.trim()).filter(f => f);
  
  if (fileList.length === 0) {
    console.log('No changed files to analyze.');
    return;
  }

  console.log('Changed files:');
  fileList.forEach(file => {
    console.log(`  - ${file}`);
  });
  console.log('');

  try {
    // Run madge to analyze the dependency graph
    // We'll analyze the entire project to find all dependencies
    const res = await madge('.', {
      fileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs', 'cjs'],
      detectiveOptions: {
        es6: {
          mixedImports: true
        }
      }
    });

    const dependencyTree = res.obj();
    const allDependents = new Set();

    // For each changed file, find files that depend on it
    fileList.forEach(changedFile => {
      // Normalize the path for comparison
      const normalizedChangedFile = changedFile.replace(/\\/g, '/');
      const changedFilePath = normalizedChangedFile.replace(/\.(js|jsx|ts|tsx|mjs|cjs)$/, '');

      // Search through the dependency tree to find files that import the changed file
      Object.keys(dependencyTree).forEach(sourceFile => {
        const dependencies = dependencyTree[sourceFile] || [];
        dependencies.forEach(dep => {
          // Check if this dependency matches our changed file
          const depPath = dep.replace(/\\/g, '/');
          if (depPath.includes(changedFilePath) || changedFilePath.includes(depPath)) {
            allDependents.add(sourceFile);
          }
        });
      });
    });

    // Remove any changed files from the dependents list
    fileList.forEach(file => {
      const normalized = file.replace(/\.(js|jsx|ts|tsx|mjs|cjs)$/, '');
      allDependents.delete(normalized);
      allDependents.delete(file);
    });

    if (allDependents.size > 0) {
      console.log('Files that depend on the changed files:');
      Array.from(allDependents).sort().forEach(file => {
        console.log(`  - ${file}`);
      });
    } else {
      console.log('No dependent files found.');
    }
  } catch (error) {
    console.error('Error analyzing dependencies:', error.message);
    // If madge fails (e.g., no JS/TS files in the project), just note it
    console.log('Note: Madge analysis could not be completed. This may be because:');
    console.log('  - No JavaScript/TypeScript files exist in the project');
    console.log('  - The changed files are not JavaScript/TypeScript files');
  }
}

// Get changed files from command line argument
const changedFiles = process.argv[2] || process.env.CHANGED_FILES || '';
findDependents(changedFiles);
