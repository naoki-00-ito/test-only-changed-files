#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

/**
 * Script to run vitest tests for changed files and their dependents
 * Usage: node run-tests-for-changed-files.cjs <comma-separated-changed-files>
 */

function runTestsForChangedFiles(changedFiles) {
  if (!changedFiles || changedFiles.trim() === '') {
    console.log('No changed files to test.');
    console.log('Skipping tests.');
    process.exit(0);
  }

  const fileList = changedFiles.split(',').map(f => f.trim()).filter(f => f);
  
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
    const command = `npx vitest related ${sourceFiles.join(' ')} --run`;
    console.log(`Command: ${command}`);
    console.log('');
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('');
    console.log('✓ All tests passed for changed files and their dependents!');
  } catch (error) {
    console.error('');
    console.error('✗ Tests failed!');
    process.exit(1);
  }
}

// Get changed files from command line argument
const changedFiles = process.argv[2] || process.env.CHANGED_FILES || '';
runTestsForChangedFiles(changedFiles);
