import handlebars from 'handlebars';
import { PDFOptions } from '../generators/pdf-generator.js';
import { validateCompleteOfflineCompatibility } from '../utils/offline-validator.js';
import { templateCache } from '../utils/template-cache.js';

// Register Handlebars helpers
handlebars.registerHelper('formatDate', (dateString: string) => {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
});

handlebars.registerHelper('join', function(array: string[], separator: string = ', ') {
  if (Array.isArray(array)) {
    return array.join(separator);
  }
  // Handle case where array might be undefined or not an array
  return '';
});

handlebars.registerHelper('contactIcon', (type: string, atsMode: boolean) => {
  if (atsMode) return '';
  const icons = {
    email: '📧',
    phone: '📞',
    location: '📍',
    url: '🌐'
  };
  return icons[type] || '';
});

// Ultra-simple ATS template with minimal styling
const ultraAtsTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{basics.name}} - Resume</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #000;
      margin: 20px;
      max-width: 8.5in;
    }
    h1 { font-size: 16pt; margin: 0 0 15px 0; font-weight: bold; }
    h2 { font-size: 14pt; margin: 20px 0 10px 0; font-weight: bold; }
    h3 { font-size: 12pt; margin: 10px 0 5px 0; font-weight: bold; }
    p { margin: 5px 0; }
    ul { margin: 10px 0; padding-left: 20px; }
    li { margin-bottom: 3px; }
    .contact-info p { margin: 2px 0; }
  </style>
</head>
<body>
  <header>
    <h1>{{basics.name}}</h1>
    {{#if basics.label}}<p>{{basics.label}}</p>{{/if}}
    <div class="contact-info">
      {{#if basics.email}}<p>{{basics.email}}</p>{{/if}}
      {{#if basics.phone}}<p>{{basics.phone}}</p>{{/if}}
      {{#if basics.location.city}}<p>{{basics.location.city}}{{#if basics.location.region}}, {{basics.location.region}}{{/if}}</p>{{/if}}
      {{#if basics.url}}<p>{{basics.url}}</p>{{/if}}
    </div>
    {{#if basics.summary}}<p>{{basics.summary}}</p>{{/if}}
  </header>

  {{#if work}}
  <section>
    <h2>Work Experience</h2>
    {{#each work}}
    <div>
      <h3>{{position}} at {{name}}</h3>
      <p>{{formatDate startDate}} - {{formatDate endDate}}</p>
      {{#if location}}<p>{{location}}</p>{{/if}}
      {{#if summary}}<p>{{summary}}</p>{{/if}}
      {{#if highlights}}
      <ul>
        {{#each highlights}}
        <li>{{this}}</li>
        {{/each}}
      </ul>
      {{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if education}}
  <section>
    <h2>Education</h2>
    {{#each education}}
    <div>
      <h3>{{studyType}}{{#if area}} in {{area}}{{/if}}</h3>
      <p>{{institution}}</p>
      {{#if startDate}}<p>{{formatDate startDate}} - {{formatDate endDate}}</p>{{/if}}
      {{#if gpa}}<p>GPA: {{gpa}}</p>{{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if skills}}
  <section>
    <h2>Skills</h2>
    {{#each skills}}
    <div>
      <p>{{name}}: {{join keywords}}</p>
    </div>
    {{/each}}
  </section>
  {{/if}}
</body>
</html>`;

// Standard ATS-optimized template with better styling but still ATS-friendly
const atsTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{basics.name}} - Resume</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #333;
      margin: 0;
      padding: 20px;
      max-width: 8.5in;
    }
    h1 { font-size: 18pt; margin: 0 0 10px 0; }
    h2 { font-size: 14pt; margin: 20px 0 10px 0; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
    h3 { font-size: 12pt; margin: 15px 0 5px 0; }
    .contact-info { margin-bottom: 20px; }
    .contact-info span { margin-right: 15px; }
    .work-entry, .education-entry { margin-bottom: 15px; }
    .job-title { font-weight: bold; }
    .company { font-weight: bold; }
    .dates { font-style: italic; color: #666; }
    .location { color: #666; }
    .highlights { margin: 10px 0; }
    .highlights li { margin-bottom: 5px; }
    .skills-section { margin-top: 15px; }
    .skill-category { margin-bottom: 10px; }
    .skill-name { font-weight: bold; }
    .keywords { color: #666; }
  </style>
</head>
<body>
  <header>
    <h1>{{basics.name}}</h1>
    {{#if basics.label}}<p><strong>{{basics.label}}</strong></p>{{/if}}
    <div class="contact-info">
      {{#if basics.email}}<span>📧 {{basics.email}}</span>{{/if}}
      {{#if basics.phone}}<span>📞 {{basics.phone}}</span>{{/if}}
      {{#if basics.location.city}}<span>📍 {{basics.location.city}}{{#if basics.location.region}}, {{basics.location.region}}{{/if}}</span>{{/if}}
      {{#if basics.url}}<span>🌐 {{basics.url}}</span>{{/if}}
    </div>
    {{#if basics.summary}}<p>{{basics.summary}}</p>{{/if}}
  </header>

  {{#if work}}
  <section>
    <h2>Work Experience</h2>
    {{#each work}}
    <div class="work-entry">
      <h3>
        <span class="job-title">{{position}}</span> at <span class="company">{{name}}</span>
      </h3>
      <p class="dates">{{formatDate startDate}} - {{formatDate endDate}}</p>
      {{#if location}}<p class="location">{{location}}</p>{{/if}}
      {{#if summary}}<p>{{summary}}</p>{{/if}}
      {{#if highlights}}
      <ul class="highlights">
        {{#each highlights}}
        <li>{{this}}</li>
        {{/each}}
      </ul>
      {{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if education}}
  <section>
    <h2>Education</h2>
    {{#each education}}
    <div class="education-entry">
      <h3>{{studyType}}{{#if area}} in {{area}}{{/if}}</h3>
      <p><strong>{{institution}}</strong></p>
      {{#if startDate}}<p class="dates">{{formatDate startDate}} - {{formatDate endDate}}</p>{{/if}}
      {{#if gpa}}<p>GPA: {{gpa}}</p>{{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if projects}}
  <section>
    <h2>Projects</h2>
    {{#each projects}}
    <div class="work-entry">
      <h3>{{name}}</h3>
      {{#if startDate}}<p class="dates">{{formatDate startDate}} - {{formatDate endDate}}</p>{{/if}}
      {{#if description}}<p style="margin: 8px 0;">{{description}}</p>{{/if}}
      {{#if highlights}}
      <ul class="highlights">
        {{#each highlights}}
        <li>{{this}}</li>
        {{/each}}
      </ul>
      {{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if skills}}
  <section>
    <h2>Skills</h2>
    <div class="skills-section">
      {{#each skills}}
      <div class="skill-category">
        <span class="skill-name">{{name}}:</span>
        <span class="keywords">{{join keywords}}</span>
      </div>
      {{/each}}
    </div>
  </section>
  {{/if}}
</body>
</html>`;

// Professional template with enhanced styling but still ATS-friendly
const professionalTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{basics.name}} - Resume</title>
  <style>
    body {
      font-family: "Calibri", Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #2c3e50;
      margin: 0;
      padding: 30px;
      max-width: 8.5in;
    }
    h1 { 
      font-size: 24pt; 
      margin: 0 0 15px 0; 
      color: #34495e;
      font-weight: 300;
    }
    h2 { 
      font-size: 16pt; 
      margin: 25px 0 15px 0; 
      color: #2980b9;
      border-bottom: 2px solid #3498db;
      padding-bottom: 8px;
      font-weight: 600;
    }
    h3 { 
      font-size: 13pt; 
      margin: 15px 0 8px 0; 
      color: #2c3e50;
      font-weight: 600;
    }
    .contact-info { 
      margin-bottom: 25px; 
      padding: 15px 0;
      border-bottom: 1px solid #ecf0f1;
    }
    .contact-info span { 
      margin-right: 20px; 
      color: #7f8c8d;
      font-size: 10pt;
    }
    .work-entry, .education-entry { 
      margin-bottom: 20px; 
      padding-bottom: 15px;
      border-bottom: 1px solid #ecf0f1;
    }
    .job-title { 
      font-weight: 600; 
      color: #2c3e50;
    }
    .company { 
      font-weight: 600; 
      color: #3498db;
    }
    .dates { 
      font-style: italic; 
      color: #95a5a6; 
      font-size: 10pt;
    }
    .location { 
      color: #95a5a6; 
      font-size: 10pt;
    }
    .highlights { 
      margin: 12px 0; 
      padding-left: 20px;
    }
    .highlights li { 
      margin-bottom: 6px; 
      color: #2c3e50;
    }
    .skills-section { 
      margin-top: 15px; 
    }
    .skill-category { 
      margin-bottom: 12px; 
      padding: 8px 0;
    }
    .skill-name { 
      font-weight: 600; 
      color: #2c3e50;
    }
    .keywords { 
      color: #7f8c8d; 
      font-size: 10pt;
    }
  </style>
</head>
<body>
  <header>
    <h1>{{basics.name}}</h1>
    {{#if basics.label}}<p style="font-size: 14pt; color: #3498db; margin-bottom: 15px;"><strong>{{basics.label}}</strong></p>{{/if}}
    <div class="contact-info">
      {{#if basics.email}}<span>✉ {{basics.email}}</span>{{/if}}
      {{#if basics.phone}}<span>☎ {{basics.phone}}</span>{{/if}}
      {{#if basics.location.city}}<span>📍 {{basics.location.city}}{{#if basics.location.region}}, {{basics.location.region}}{{/if}}</span>{{/if}}
      {{#if basics.url}}<span>🌐 {{basics.url}}</span>{{/if}}
    </div>
    {{#if basics.summary}}<p style="font-size: 12pt; line-height: 1.6; margin-bottom: 20px;">{{basics.summary}}</p>{{/if}}
  </header>

  {{#if work}}
  <section>
    <h2>Work Experience</h2>
    {{#each work}}
    <div class="work-entry">
      <h3>
        <span class="job-title">{{position}}</span> at <span class="company">{{name}}</span>
      </h3>
      <p class="dates">{{formatDate startDate}} - {{formatDate endDate}}</p>
      {{#if location}}<p class="location">{{location}}</p>{{/if}}
      {{#if summary}}<p style="margin: 8px 0;">{{summary}}</p>{{/if}}
      {{#if highlights}}
      <ul class="highlights">
        {{#each highlights}}
        <li>{{this}}</li>
        {{/each}}
      </ul>
      {{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if education}}
  <section>
    <h2>Education</h2>
    {{#each education}}
    <div class="education-entry">
      <h3>{{studyType}}{{#if area}} in {{area}}{{/if}}</h3>
      <p><strong style="color: #2c3e50;">{{institution}}</strong></p>
      {{#if startDate}}<p class="dates">{{formatDate startDate}} - {{formatDate endDate}}</p>{{/if}}
      {{#if gpa}}<p style="color: #27ae60;">GPA: {{gpa}}</p>{{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if projects}}
  <section>
    <h2>Projects</h2>
    {{#each projects}}
    <div class="work-entry">
      <h3>{{name}}</h3>
      {{#if startDate}}<p class="dates">{{formatDate startDate}} - {{formatDate endDate}}</p>{{/if}}
      {{#if description}}<p style="margin: 8px 0;">{{description}}</p>{{/if}}
      {{#if highlights}}
      <ul class="highlights">
        {{#each highlights}}
        <li>{{this}}</li>
        {{/each}}
      </ul>
      {{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if skills}}
  <section>
    <h2>Skills</h2>
    <div class="skills-section">
      {{#each skills}}
      <div class="skill-category">
        <span class="skill-name">{{name}}:</span>
        <span class="keywords">{{join keywords}}</span>
      </div>
      {{/each}}
    </div>
  </section>
  {{/if}}
</body>
</html>`;

export async function generateHTML(resumeData: unknown, options: PDFOptions = {}): Promise<string> {
  let templateSource: string;
  let cacheKey: string;
  
  // Select template based on options and create cache key
  if (options.atsMode) {
    templateSource = ultraAtsTemplate;
    cacheKey = 'ultra-ats';
  } else if (options.template === 'professional') {
    templateSource = professionalTemplate;
    cacheKey = 'professional';
  } else {
    // Default to standard ATS template
    templateSource = atsTemplate;
    cacheKey = 'ats-optimized';
  }
  
  // Get compiled template from cache
  const template = templateCache.getTemplate(cacheKey, templateSource);
  
  // Pass options to template for conditional logic
  const templateData = {
    ...resumeData,
    atsMode: options.atsMode || false,
    templateName: options.template || 'ats-optimized'
  };
  
  const htmlContent = template(templateData);
  
  // Validate offline compatibility (only in development/debug mode)
  if (process.env.NODE_ENV !== 'production') {
    const validation = validateCompleteOfflineCompatibility(htmlContent);
    if (!validation.isOfflineCompatible) {
      console.warn('⚠️  Offline compatibility issues detected:');
      validation.issues.forEach(issue => console.warn(`  - ${issue}`));
    }
    
    if (validation.warnings.length > 0) {
      console.info('ℹ️  Offline compatibility warnings:');
      validation.warnings.forEach(warning => console.info(`  - ${warning}`));
    }
  }
  
  return htmlContent;
}