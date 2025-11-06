#!/usr/bin/env node

/**
 * Mintlify to GitBook Converter
 * 
 * Converts Mintlify .mdx files with custom components to GitBook-compatible Markdown
 * 
 * Usage: node convert-to-gitbook.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = './api-reference';
const OUTPUT_DIR = './gitbook-output';
const ROOT_FILES = ['introduction.mdx', 'authentication.mdx'];

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Convert Mintlify MDX to GitBook Markdown
 */
function convertMdxToGitBook(content, filename) {
  let converted = content;

  // 1. Convert frontmatter
  converted = converted.replace(
    /---\ntitle: "(.*?)"\napi: "(.*?)"\ndescription: "(.*?)"\n---/,
    (match, title, api, description) => {
      return `---\ndescription: ${description}\n---\n\n# ${title}\n\n**Endpoint:** \`${api}\``;
    }
  );

  // Handle frontmatter without 'api' field
  converted = converted.replace(
    /---\ntitle: "(.*?)"\ndescription: "(.*?)"\n---/,
    (match, title, description) => {
      return `---\ndescription: ${description}\n---\n\n# ${title}`;
    }
  );

  // 2. Convert ParamField (headers) to table
  const headerParams = [];
  converted = converted.replace(
    /<ParamField header="(.*?)" type="(.*?)"(.*?)>([\s\S]*?)<\/ParamField>/g,
    (match, name, type, attrs, description) => {
      const required = attrs.includes('required') ? '✅ Yes' : '❌ No';
      const defaultVal = attrs.match(/default="(.*?)"/)?.[1] || '-';
      const cleanDesc = description.trim();
      
      headerParams.push({ name, type, required, defaultVal, description: cleanDesc });
      return ''; // Remove from content, will add as table
    }
  );

  // 3. Convert ParamField (query params) to table
  const queryParams = [];
  converted = converted.replace(
    /<ParamField query="(.*?)" type="(.*?)"(.*?)>([\s\S]*?)<\/ParamField>/g,
    (match, name, type, attrs, description) => {
      const required = attrs.includes('required') ? '✅ Yes' : '❌ No';
      const defaultVal = attrs.match(/default="(.*?)"/)?.[1] || '-';
      const cleanDesc = description.trim().replace(/\*\*Range:\*\*/g, 'Range:');
      
      queryParams.push({ name, type, required, defaultVal, description: cleanDesc });
      return '';
    }
  );

  // 4. Convert ParamField (body params) to table
  const bodyParams = [];
  converted = converted.replace(
    /<ParamField body="(.*?)" type="(.*?)"(.*?)>([\s\S]*?)<\/ParamField>/g,
    (match, name, type, attrs, description) => {
      const required = attrs.includes('required') ? '✅ Yes' : '❌ No';
      const defaultVal = attrs.match(/default="(.*?)"/)?.[1] || '-';
      const cleanDesc = description.trim();
      
      bodyParams.push({ name, type, required, defaultVal, description: cleanDesc });
      return '';
    }
  );

  // 5. Convert ResponseField to table
  const responseFields = [];
  converted = converted.replace(
    /<ResponseField name="(.*?)" type="(.*?)">([\s\S]*?)<\/ResponseField>/g,
    (match, name, type, description) => {
      const cleanDesc = description.trim().replace(/<Expandable[\s\S]*?<\/Expandable>/g, '');
      responseFields.push({ name, type, description: cleanDesc });
      return '';
    }
  );

  // 6. Remove Expandable tags (nested structures need manual review)
  converted = converted.replace(/<Expandable title="(.*?)">([\s\S]*?)<\/Expandable>/g, 
    (match, title, content) => {
      return `\n**${title}**\n${content}`;
    }
  );

  // 7. Clean up sections and add tables
  if (headerParams.length > 0) {
    const headerTable = generateTable(
      ['Header', 'Type', 'Required', 'Description'],
      headerParams.map(p => [`\`${p.name}\``, p.type, p.required, p.description])
    );
    converted = converted.replace(/## Headers\s*/g, `## Headers\n\n${headerTable}\n`);
  }

  if (queryParams.length > 0) {
    const queryTable = generateTable(
      ['Parameter', 'Type', 'Required', 'Default', 'Description'],
      queryParams.map(p => [`\`${p.name}\``, p.type, p.required, p.defaultVal, p.description])
    );
    converted = converted.replace(/## Query Parameters\s*/g, `## Query Parameters\n\n${queryTable}\n`);
  }

  if (bodyParams.length > 0) {
    const bodyTable = generateTable(
      ['Field', 'Type', 'Required', 'Default', 'Description'],
      bodyParams.map(p => [`\`${p.name}\``, p.type, p.required, p.defaultVal, p.description])
    );
    converted = converted.replace(/## Request Body\s*/g, `## Request Body\n\n${bodyTable}\n`);
  }

  if (responseFields.length > 0) {
    const responseTable = generateTable(
      ['Field', 'Type', 'Description'],
      responseFields.map(p => [`\`${p.name}\``, p.type, p.description])
    );
    converted = converted.replace(/## Response\s*/g, `## Response\n\n${responseTable}\n`);
  }

  // 8. Convert code blocks (already Markdown-compatible, but ensure proper formatting)
  converted = converted.replace(/```json\n/g, '```json\n');

  // 9. Add GitBook hints for warnings/info
  converted = converted.replace(/⚠️\s*(.*?)(\n|$)/g, '{% hint style="warning" %}\n$1\n{% endhint %}\n');
  converted = converted.replace(/ℹ️\s*(.*?)(\n|$)/g, '{% hint style="info" %}\n$1\n{% endhint %}\n');

  // 10. Clean up extra whitespace
  converted = converted.replace(/\n{3,}/g, '\n\n');

  return converted;
}

/**
 * Generate Markdown table
 */
function generateTable(headers, rows) {
  const headerRow = `| ${headers.join(' | ')} |`;
  const separator = `| ${headers.map(() => '---').join(' | ')} |`;
  const dataRows = rows.map(row => `| ${row.join(' | ')} |`).join('\n');
  
  return `${headerRow}\n${separator}\n${dataRows}`;
}

/**
 * Process all files in a directory recursively
 */
function processDirectory(inputDir, outputDir) {
  const items = fs.readdirSync(inputDir);

  items.forEach(item => {
    const inputPath = path.join(inputDir, item);
    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) {
      const newOutputDir = path.join(outputDir, item);
      fs.mkdirSync(newOutputDir, { recursive: true });
      processDirectory(inputPath, newOutputDir);
    } else if (item.endsWith('.mdx')) {
      const content = fs.readFileSync(inputPath, 'utf-8');
      const converted = convertMdxToGitBook(content, item);
      const outputFilename = item.replace('.mdx', '.md');
      const outputPath = path.join(outputDir, outputFilename);
      
      fs.writeFileSync(outputPath, converted);
      console.log(`✅ Converted: ${inputPath} → ${outputPath}`);
    }
  });
}

/**
 * Generate SUMMARY.md for GitBook navigation
 */
function generateSummary() {
  let summary = `# Table of Contents\n\n`;
  summary += `* [Introduction](introduction.md)\n`;
  summary += `* [Authentication](authentication.md)\n\n`;
  summary += `## API Reference\n\n`;

  const folders = fs.readdirSync(path.join(OUTPUT_DIR, 'api-reference'));
  
  folders.forEach(folder => {
    const folderPath = path.join(OUTPUT_DIR, 'api-reference', folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));
      
      if (files.length > 0) {
        const groupName = folder
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        summary += `* [${groupName}](api-reference/${folder}/README.md)\n`;
        files.forEach(file => {
          const title = file
            .replace('.md', '')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          summary += `  * [${title}](api-reference/${folder}/${file})\n`;
        });
      }
    }
  });

  fs.writeFileSync(path.join(OUTPUT_DIR, 'SUMMARY.md'), summary);
  console.log(`✅ Generated SUMMARY.md`);
}

/**
 * Generate .gitbook.yaml configuration
 */
function generateGitBookConfig() {
  const config = `root: ./

structure:
  readme: introduction.md
  summary: SUMMARY.md

redirects: {}
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, '.gitbook.yaml'), config);
  console.log(`✅ Generated .gitbook.yaml`);
}

/**
 * Main execution
 */
console.log('🚀 Starting Mintlify to GitBook conversion...\n');

// Convert root files
ROOT_FILES.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf-8');
    const converted = convertMdxToGitBook(content, file);
    const outputFile = file.replace('.mdx', '.md');
    fs.writeFileSync(path.join(OUTPUT_DIR, outputFile), converted);
    console.log(`✅ Converted: ${file} → ${outputFile}`);
  }
});

// Process api-reference directory
if (fs.existsSync(INPUT_DIR)) {
  const apiOutputDir = path.join(OUTPUT_DIR, 'api-reference');
  fs.mkdirSync(apiOutputDir, { recursive: true });
  processDirectory(INPUT_DIR, apiOutputDir);
}

// Generate GitBook files
generateSummary();
generateGitBookConfig();

console.log('\n✨ Conversion complete!');
console.log(`📁 Output directory: ${OUTPUT_DIR}`);
console.log('\n📋 Next steps:');
console.log('1. Review converted files in gitbook-output/');
console.log('2. Push to GitHub repository');
console.log('3. Connect GitBook via Git Sync');
console.log('4. Publish your documentation! 🎉');
