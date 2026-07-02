#!/usr/bin/env node
/**
 * Safe build script for Next.js
 * Runs 'next build' and handles errors gracefully
 */

import { execSync } from 'child_process';
import process from 'process';

try {
  console.log('🔨 Building Next.js application...');
  execSync('next build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
