import { describe, it, expect, beforeEach } from 'vitest';
import { generateHTML } from '../../src/templates/html-generator.js';
import { PDFOptions } from '../../src/generators/pdf-generator.js';

describe('Template Selection', () => {
  let sampleResumeData: any;
  
  beforeEach(() => {
    sampleResumeData = {
      basics: {
        name: "John Doe",
        label: "Software Engineer",
        email: "john@example.com",
        phone: "(555) 123-4567",
        url: "https://johndoe.dev",
        summary: "Experienced software engineer with expertise in full-stack development.",
        location: {
          city: "San Francisco",
          region: "CA"
        },
        profiles: [
          {
            network: "LinkedIn",
            username: "johndoe",
            url: "https://linkedin.com/in/johndoe"
          }
        ]
      },
      work: [
        {
          name: "Tech Corp",
          position: "Senior Software Engineer",
          startDate: "2020-01-01",
          endDate: "2024-01-01",
          location: "San Francisco, CA",
          summary: "Led development of microservices architecture.",
          highlights: [
            "Improved system performance by 40%",
            "Led team of 5 developers",
            "Implemented CI/CD pipeline"
          ]
        }
      ],
      education: [
        {
          institution: "University of California",
          area: "Computer Science",
          studyType: "Bachelor",
          startDate: "2016-09-01",
          endDate: "2020-06-01",
          gpa: "3.8"
        }
      ],
      skills: [
        {
          name: "Programming Languages",
          level: "Expert",
          keywords: ["JavaScript", "TypeScript", "Python", "Java"]
        },
        {
          name: "Frameworks",
          level: "Advanced", 
          keywords: ["React", "Node.js", "Express", "Django"]
        }
      ]
    };
  });

  describe('Default template generation', () => {
    it('should generate HTML with default ATS-optimized template', async () => {
      const html = await generateHTML(sampleResumeData);
      
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<title>John Doe - Resume</title>');
      expect(html).toContain('font-family: serif');
      expect(html).toContain('John Doe');
      expect(html).toContain('Software Engineer');
      expect(html).toContain('john@example.com');
      expect(html).toContain('Tech Corp');
      expect(html).toContain('Senior Software Engineer');
    });

    it('should use serif font by default', async () => {
      const html = await generateHTML(sampleResumeData);

      expect(html).toContain('font-family: serif');
      expect(html).not.toContain('font-family: Georgia');
      expect(html).not.toContain('font-family: "Times New Roman"');
    });

    it('should have simple, single-column layout', async () => {
      const html = await generateHTML(sampleResumeData);
      
      // Should not contain complex layout structures
      expect(html).not.toContain('display: grid');
      expect(html).not.toContain('column-count');
      expect(html).not.toContain('float:');
      
      // Basic flex for job headers is acceptable for better formatting
      expect(html).toContain('<h1>John Doe</h1>');
      expect(html).toContain('<h2>Work Experience</h2>');
    });
  });

  describe('ATS-mode template generation', () => {
    it('should generate ultra-simple HTML with minimal styling when atsMode is true', async () => {
      const options: PDFOptions = { atsMode: true };
      const html = await generateHTML(sampleResumeData, options);
      
      // Should still contain content
      expect(html).toContain('John Doe');
      expect(html).toContain('Tech Corp');
      
      // ATS mode should use even simpler styling
      expect(html).toContain('font-family: serif');
      
      // Should not contain decorative elements that might confuse ATS
      expect(html).not.toContain('📧'); // No emojis
      expect(html).not.toContain('📞');
      expect(html).not.toContain('📍');
      expect(html).not.toContain('🌐');
    });

    it('should remove all decorative styling in ATS mode', async () => {
      const options: PDFOptions = { atsMode: true };
      const html = await generateHTML(sampleResumeData, options);
      
      // Should not contain styling that could interfere with parsing
      expect(html).not.toContain('border-bottom');
      expect(html).not.toContain('background-color');
      expect(html).not.toContain('box-shadow');
      expect(html).not.toContain('gradient');
    });

    it('should use only standard HTML tags in ATS mode', async () => {
      const options: PDFOptions = { atsMode: true };
      const html = await generateHTML(sampleResumeData, options);
      
      // Should contain standard semantic tags
      expect(html).toContain('<header>');
      expect(html).toContain('<section>');
      expect(html).toContain('<h1>');
      expect(html).toContain('<h2>');
      expect(html).toContain('<p style=');
      expect(html).toContain('<ul class="highlights">');
      expect(html).toContain('<li>');
      
      // Should not contain non-standard or complex elements
      expect(html).not.toContain('<div class="fancy-');
      expect(html).not.toContain('<table');
      expect(html).not.toContain('<td');
    });
  });

  describe('Font requirements', () => {
    it('should use serif font in ATS mode', async () => {
      const options: PDFOptions = { atsMode: true };
      const html = await generateHTML(sampleResumeData, options);

      expect(html).toContain('font-family: serif');
    });

    it('should avoid problematic fonts in ATS mode', async () => {
      const options: PDFOptions = { atsMode: true };
      const html = await generateHTML(sampleResumeData, options);
      
      // Should not contain fonts that might cause ATS parsing issues
      expect(html).not.toContain('font-family: cursive');
      expect(html).not.toContain('font-family: fantasy');
      expect(html).not.toContain('Comic Sans');
      expect(html).not.toContain('Papyrus');
    });
  });

  describe('Template selection logic', () => {
    it('should default to ATS-optimized template when no template specified', async () => {
      const html = await generateHTML(sampleResumeData, {});
      
      expect(html).toContain('font-family: serif');
      expect(html).toContain('<h2>Work Experience</h2>');
    });

    it('should handle invalid template names gracefully', async () => {
      const options: PDFOptions = { template: 'invalid-template-name' };
      const html = await generateHTML(sampleResumeData, options);
      
      // Should fall back to default template
      expect(html).toContain('John Doe');
      expect(html).toContain('font-family: serif');
    });
  });
});