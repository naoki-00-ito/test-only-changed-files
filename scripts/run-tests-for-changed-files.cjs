#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

/**
 * Script to run vitest tests for changed files and their dependents
 * Usage: node run-tests-for-changed-files.cjs <comma-separated-changed-files>
 */

function runTestsForChangedFiles(changedFiles) {
  const fileList = changedFiles 
    ? changedFiles.split(',').map(f => f.trim()).filter(f => f)
    : [];
  
  if (fileList.length === 0) {
    console.log('No changed files to test.');
    console.log('Skipping tests.');
    process.exit(0);
  }

  console.log('Running tests for changed files and their dependents...');
  console.log('Changed files:');
  fileList.forEach(file => {
    console.log(`  - ${file}`);
  });
  console.log('');

  try {
    // Filter to only include source files (exclude config, docs, etc.)
    const sourceFiles = fileList.filter(file => {
      const ext = path.extname(file);
      return ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'].includes(ext) &&
             file.startsWith('src/');
    });

    if (sourceFiles.length === 0) {
      console.log('No source files changed. Skipping tests.');
      process.exit(0);
    }

    console.log(`Running vitest related for ${sourceFiles.length} source file(s)...`);
    
    // Run vitest related with all changed source files
    // Use spawnSync with argument array for safe command execution
    const args = ['related', ...sourceFiles, '--run'];
    console.log(`Command: npx vitest ${args.join(' ')}`);
    console.log('');
    
    const result = spawnSync('npx', ['vitest', ...args], { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    if (result.error) {
      throw result.error;
    }
    
    if (result.status !== 0) {
      throw new Error(`Tests failed with exit code ${result.status}`);
    }
    
    console.log('');
    console.log('✓ All tests passed for changed files and their dependents!');
  } catch (error) {
    console.error('');
    console.error('✗ Tests failed!');
    if (error.message) {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

// Get changed files from command line argument
const changedFiles = process.argv[2] || process.env.CHANGED_FILES || '';
runTestsForChangedFiles(changedFiles);
