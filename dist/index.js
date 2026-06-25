#!/usr/bin/env bun
// @bun
var{defineProperty:w,getOwnPropertyNames:Qy,getOwnPropertyDescriptor:Wy}=Object,Xy=Object.prototype.hasOwnProperty;function Yy(y){return this[y]}var P=(y)=>{var q=(k??=new WeakMap).get(y),$;if(q)return q;if(q=w({},"__esModule",{value:!0}),y&&typeof y==="object"||typeof y==="function"){for(var Q of Qy(y))if(!Xy.call(q,Q))w(q,Q,{get:Yy.bind(y,Q),enumerable:!($=Wy(y,Q))||$.enumerable})}return k.set(y,q),q},k;var Zy=(y)=>y;function Jy(y,q){this[y]=Zy.bind(null,q)}var Ky=(y,q)=>{for(var $ in q)w(y,$,{get:q[$],enumerable:!0,configurable:!0,set:Jy.bind(q,$)})};var zy=(y,q)=>()=>(y&&(q=y(y=0)),q);var D=import.meta.require;var F={};Ky(F,{ValidationError:()=>H,TemplateError:()=>g,ResumeGeneratorError:()=>L,PDFGenerationError:()=>G,NetworkError:()=>p,FileSystemError:()=>U});var L,H,U,G,g,p;var A=zy(()=>{L=class L extends Error{code;isCatastrophic;suggestions;constructor(y,q,$=!1,Q=[]){super(y);this.code=q;this.isCatastrophic=$;this.suggestions=Q;this.name="ResumeGeneratorError"}getFormattedMessage(y=!1){let q=`\u274C ${this.message}`;if(this.suggestions.length>0)q+=`

\uD83D\uDCA1 Suggestions:`,this.suggestions.forEach(($,Q)=>{if(q+=`
  ${Q+1}. ${$.action}`,$.command)q+=`
     Command: ${$.command}`;if($.explanation)q+=`
     ${$.explanation}`});if(y){if(q+=`

\uD83D\uDD0D Debug Info:`,q+=`
  Error Code: ${this.code}`,q+=`
  Catastrophic: ${this.isCatastrophic}`,this.stack)q+=`
  Stack Trace:
${this.stack}`}return q}};H=class H extends L{validationErrors;lineNumber;columnNumber;constructor(y,q=[],$,Q){let W=y;if($!==void 0){if(W+=` at line ${$}`,Q!==void 0)W+=`, column ${Q}`}let Z=H.generateSuggestions(q);super(W,"VALIDATION_ERROR",!1,Z);this.validationErrors=q;this.lineNumber=$;this.columnNumber=Q}static generateSuggestions(y){let q=[];for(let $ of y){let Q=$.instancePath||"";switch($.keyword){case"required":q.push({action:`Add the required field: ${$.params?.missingProperty}`,explanation:`The field '${$.params?.missingProperty}' is required in the JSON schema.`});break;case"format":if($.params?.format==="email")q.push({action:"Fix email format",explanation:'Use a valid email format like "user@example.com"'});else if($.params?.format==="date")q.push({action:"Fix date format",explanation:'Use ISO date format like "2024-01-15" or "2024-01-15T10:30:00Z"'});else if($.params?.format==="uri")q.push({action:"Fix URL format",explanation:'Use a complete URL like "https://example.com"'});break;case"type":q.push({action:`Change ${Q||"value"} to ${$.params?.type} type`,explanation:`Expected ${$.params?.type}, but got ${typeof $.data}`});break;case"additionalProperties":q.push({action:`Remove unknown field: ${$.params?.additionalProperty}`,explanation:"This field is not part of the resume schema"});break}}if(q.length===0)q.push({action:"Check the JSON schema documentation",command:"resume-pdf validate --help",explanation:"Review the expected JSON structure for resumes"},{action:"Use an example JSON as a starting point",command:"resume-pdf init --example",explanation:"Generate a valid example resume JSON file"});return q}};U=class U extends L{filePath;constructor(y,q=!1,$){let Q=U.generateSuggestions(y,$);super(y,"FILESYSTEM_ERROR",q,Q);this.filePath=$}static generateSuggestions(y,q){let $=[];if(y.includes("ENOENT")||y.includes("not found")){if($.push({action:"Check if the file path is correct",explanation:q?`Verify that "${q}" exists and is accessible`:"Verify the file path exists"}),q?.endsWith(".json"))$.push({action:"Create the file if it doesn't exist",command:"resume-pdf init --example > resume.json",explanation:"Generate a sample resume JSON file"})}if(y.includes("EACCES")||y.includes("permission")||y.includes("Permission denied")||y.includes("Access denied"))$.push({action:"Check file permissions",command:q?`ls -la "${q}"`:"ls -la",explanation:q?`Ensure you have read/write permissions for "${q}"`:"Ensure you have read/write permissions for the file"});if(y.includes("ENOSPC")||y.includes("space"))$.push({action:"Free up disk space",command:"df -h",explanation:"Check available disk space and clean up if necessary"});return $}};G=class G extends L{context;constructor(y,q){let $=G.generateSuggestions(y,q);super(y,"PDF_GENERATION_ERROR",!1,$);this.context=q}static generateSuggestions(y,q){let $=[];if(y.includes("browser")||y.includes("chromium"))$.push({action:"Install Playwright browsers",command:"npx playwright install chromium",explanation:"PDF generation requires Playwright browser binaries"});if(y.includes("timeout"))$.push({action:"Try with a simpler template",command:"resume-pdf generate resume.json --ats-mode",explanation:"ATS mode uses minimal styling and loads faster"});if(y.includes("memory")||y.includes("heap"))$.push({action:"Increase Node.js memory limit",command:"node --max-old-space-size=4096 resume-pdf generate resume.json",explanation:"Allocate more memory for PDF generation"});return $.push({action:"Validate your JSON first",command:"resume-pdf validate resume.json",explanation:"Ensure your resume data is valid before PDF generation"}),$}};g=class g extends L{templateName;constructor(y,q){let $=[{action:"Try a different template",command:"resume-pdf generate resume.json --template professional",explanation:"Some templates may not support all resume features"},{action:"Use ATS mode for maximum compatibility",command:"resume-pdf generate resume.json --ats-mode",explanation:"ATS mode has the fewest requirements and highest compatibility"}];super(y,"TEMPLATE_ERROR",!1,$);this.templateName=q}};p=class p extends L{constructor(y){let q=[{action:"Check your internet connection",explanation:"Some operations may require network access for downloading dependencies"},{action:"Use offline mode",explanation:"The resume generator is designed to work completely offline"}];super(y,"NETWORK_ERROR",!1,q)}}});import{Command as Dy}from"commander";import Y from"chalk";import K from"chalk";import e from"ora";import{promises as Ny}from"fs";import{promises as Iy}from"fs";import xy from"path";import Ly from"ajv";import By from"ajv-formats";var d={$schema:"http://json-schema.org/draft-07/schema#",type:"object",required:["basics","work"],properties:{basics:{type:"object",required:["name","email"],properties:{name:{type:"string",minLength:1},label:{type:"string"},email:{type:"string",format:"email"},phone:{type:"string"},url:{type:"string",format:"uri"},summary:{type:"string"},location:{type:"object",properties:{address:{type:"string"},postalCode:{type:"string"},city:{type:"string"},countryCode:{type:"string"},region:{type:"string"}}},profiles:{type:"array",items:{type:"object",properties:{network:{type:"string"},username:{type:"string"},url:{type:"string",format:"uri"}}}}}},work:{type:"array",items:{type:"object",required:["name","position","startDate"],properties:{name:{type:"string",minLength:1},position:{type:"string",minLength:1},url:{type:"string",format:"uri"},startDate:{type:"string",format:"date"},endDate:{type:"string",format:"date"},summary:{type:"string"},highlights:{type:"array",items:{type:"string"}},location:{type:"string"}}}},education:{type:"array",items:{type:"object",properties:{institution:{type:"string"},area:{type:"string"},studyType:{type:"string"},startDate:{type:"string",format:"date"},endDate:{type:"string",format:"date"},gpa:{type:"string"},courses:{type:"array",items:{type:"string"}}}}},skills:{type:"array",items:{type:"object",properties:{name:{type:"string"},level:{type:"string"},keywords:{type:"array",items:{type:"string"}}}}},projects:{type:"array",items:{type:"object",properties:{name:{type:"string"},description:{type:"string"},highlights:{type:"array",items:{type:"string"}},keywords:{type:"array",items:{type:"string"}},startDate:{type:"string",format:"date"},endDate:{type:"string",format:"date"},url:{type:"string",format:"uri"}}}},awards:{type:"array",items:{type:"object",properties:{title:{type:"string"},date:{type:"string",format:"date"},awarder:{type:"string"},summary:{type:"string"}}}},certifications:{type:"array",items:{type:"object",properties:{name:{type:"string"},date:{type:"string",format:"date"},issuer:{type:"string"},url:{type:"string",format:"uri"}}}},publications:{type:"array",items:{type:"object",properties:{name:{type:"string"},publisher:{type:"string"},releaseDate:{type:"string",format:"date"},url:{type:"string",format:"uri"},summary:{type:"string"}}}},languages:{type:"array",items:{type:"object",properties:{language:{type:"string"},fluency:{type:"string"}}}},interests:{type:"array",items:{type:"object",properties:{name:{type:"string"},keywords:{type:"array",items:{type:"string"}}}}},references:{type:"array",items:{type:"object",properties:{name:{type:"string"},reference:{type:"string"}}}}}};A();var m=new Ly({allErrors:!0});By(m);var v=m.compile(d);function b(y){if(!v(y)&&v.errors){let $=v.errors.map((Q)=>{let W=Q.instancePath||"";return W=W.replace(/^\//,"").replace(/\//g,"."),W=W.replace(/\.(\d+)/g,"[$1]"),`${W}: ${Q.message}`});throw new H(`Resume validation failed:
${$.join(`
`)}`,v.errors)}}function _y(y){try{let q=JSON.parse(y);return b(q),q}catch(q){if(q instanceof SyntaxError){let $=q.message.match(/line (\d+)/),Q=q.message.match(/column (\d+)/),W=$?parseInt($[1],10):void 0,Z=Q?parseInt(Q[1],10):void 0,z="Invalid JSON format";if(W){if(z+=` at line ${W}`,Z)z+=`, column ${Z}`}throw new H(z,[],W,Z)}throw q}}function c(y){try{let $=D("fs").readFileSync(y,"utf-8");return _y($)}catch(q){if(q&&typeof q==="object"&&"code"in q&&q.code==="ENOENT")throw new((A(),P(F))).FileSystemError(`File not found: ${y}`,!1,y);if(q&&typeof q==="object"&&"code"in q&&q.code==="EACCES")throw new((A(),P(F))).FileSystemError(`Permission denied: ${y}`,!1,y);throw q}}A();import M from"handlebars";import Uy from"handlebars";class u{cache=new Map;MAX_CACHE_SIZE=10;CACHE_TTL=300000;getTemplate(y,q){let $=Date.now(),Q=this.cache.get(y);if(Q&&$-Q.compiledAt<this.CACHE_TTL)return Q.lastUsed=$,Q.useCount++,Q.template;let W=Uy.compile(q);return this.cache.set(y,{template:W,compiledAt:$,lastUsed:$,useCount:1}),this.cleanupCache(),W}cleanupCache(){if(this.cache.size<=this.MAX_CACHE_SIZE)return;let y=Date.now();if(Array.from(this.cache.entries()).filter(([Q,W])=>y-W.compiledAt>=this.CACHE_TTL).map(([Q])=>Q).forEach((Q)=>this.cache.delete(Q)),this.cache.size>this.MAX_CACHE_SIZE){let Q=Array.from(this.cache.entries());Q.sort(([,Z],[,z])=>Z.lastUsed-z.lastUsed),Q.slice(0,Q.length-this.MAX_CACHE_SIZE).forEach(([Z])=>this.cache.delete(Z))}}clear(){this.cache.clear()}getStats(){let y=Date.now();return{size:this.cache.size,maxSize:this.MAX_CACHE_SIZE,entries:Array.from(this.cache.entries()).map(([q,$])=>({key:q,compiledAt:$.compiledAt,lastUsed:$.lastUsed,useCount:$.useCount,age:y-$.compiledAt}))}}}var h=new u;M.registerHelper("formatDate",(y)=>{if(!y)return"Present";let q;if(y.includes("T"))q=new Date(y);else{let[$,Q,W]=y.split("-").map(Number);q=new Date($,Q-1,W)}if(isNaN(q.getTime()))return"Invalid Date";return q.toLocaleDateString("en-US",{year:"numeric",month:"long"})});M.registerHelper("formatYear",(y)=>{if(!y)return"";let q;if(y.includes("T"))q=new Date(y);else{let[$]=y.split("-").map(Number);return $.toString()}if(isNaN(q.getTime()))return"";return q.getFullYear().toString()});M.registerHelper("join",function(y,q=", "){let $=typeof q==="string"?q:", ";if(Array.isArray(y))return y.join($);return""});M.registerHelper("contactIcon",(y,q)=>{if(q)return"";return{email:"\uD83D\uDCE7",phone:"\uD83D\uDCDE",location:"\uD83D\uDCCD",url:"\uD83C\uDF10"}[y]||""});var Ay=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{basics.name}} - Resume</title>
  <style>
    @page {
      size: letter;
      margin: 0.5in;
    }
    body {
      font-family: serif;
      font-size: 11pt;
      line-height: 1.3;
      color: #000;
      margin: 0;
      padding: 0;
      max-width: 7.5in;
      background: white;
    }
    h1 { 
      font-size: 20pt; 
      font-weight: bold;
      margin: 0 0 8px 0; 
      text-align: center;
      color: #000;
    }
    h2 { 
      font-size: 12pt; 
      font-weight: bold;
      margin: 16px 0 8px 0; 
      {{#unless atsMode}}text-transform: uppercase;
      border-bottom: 1px solid #000; 
      padding-bottom: 2px;{{/unless}}
      color: #000;
    }
    h3 { 
      font-size: 11pt; 
      font-weight: bold;
      margin: 10px 0 3px 0; 
      color: #000;
    }
    p {
      margin: 3px 0;
    }
    .contact-info { 
      text-align: center;
      margin-bottom: 20px; 
      font-size: 10pt;
    }
    .contact-info span { 
      margin: 0 8px;
      color: #000;
    }
    .work-entry, .education-entry { 
      margin-bottom: 12px; 
    }
    .job-header {
      {{#unless atsMode}}display: flex;
      justify-content: space-between;
      align-items: baseline;{{/unless}}
      margin-bottom: 2px;
    }
    .job-title { 
      font-weight: bold; 
      font-size: 11pt;
    }
    .company { 
      font-weight: normal;
      font-style: italic; 
      font-size: 11pt;
      color: #5e5e5e;
    }
    .dates-location { 
      font-size: 10pt;
      color: #000;
      text-align: right;
    }
    .highlights { 
      margin: 5px 0 0 0; 
      padding-left: 16px;
    }
    .highlights li { 
      margin-bottom: 3px; 
      font-size: 10pt;
      line-height: 1.2;
    }
    .skills-section { 
      margin-top: 8px; 
    }
    .skill-category { 
      margin-bottom: 6px; 
      font-size: 10pt;
    }
    .skill-name { 
      font-weight: bold; 
      color: #000;
    }
    .keywords { 
      color: #000; 
      font-weight: normal;
    }
    .education-details {
      font-size: 10pt;
      margin-top: 2px;
    }
  </style>
</head>
<body>
  <header>
    <h1>{{basics.name}}</h1>
    {{#if basics.label}}<p style="text-align: center; margin: 5px 0 15px 0; font-size: 14pt; font-weight: bold; color: #000;">{{basics.label}}</p>{{/if}}
    <div class="contact-info">
      {{#if basics.location.city}}<span>{{basics.location.city}}{{#if basics.location.region}}, {{basics.location.region}}{{/if}}</span>{{/if}}
      {{#if basics.email}}<span><strong>Email:</strong> {{basics.email}}</span>{{/if}}
      {{#if basics.phone}}<span><strong>Phone:</strong> {{basics.phone}}</span>{{/if}}
      {{#if basics.url}}<span>{{basics.url}}</span>{{/if}}
    </div>
    {{#if basics.summary}}<p style="text-align: center; margin-bottom: 20px; font-style: italic;">{{basics.summary}}</p>{{/if}}
  </header>

  {{#if work}}
  <section>
    <h2>Work Experience</h2>
    {{#each work}}
    <div class="work-entry">
      <div class="job-header">
        <div>
          <div class="job-title">{{position}}</div>
          <div class="company">{{name}}</div>
        </div>
        <div class="dates-location">
          {{formatDate startDate}} - {{formatDate endDate}}{{#if location}}, {{location}}{{/if}}
        </div>
      </div>
      {{#if summary}}<p style="font-size: 10pt; margin: 3px 0;">{{summary}}</p>{{/if}}
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
      <h3>{{studyType}}{{#if area}} - {{area}}{{/if}}</h3>
      <div class="education-details">{{institution}}{{#if location}} \u2022 {{location}}{{/if}}{{#if endDate}} \u2022 {{formatYear endDate}}{{/if}}</div>
      {{#if startDate}}<p style="font-size: 10pt;">{{formatDate startDate}} - {{formatDate endDate}}</p>{{/if}}
      {{#if gpa}}<p style="font-size: 10pt;">GPA: {{gpa}}</p>{{/if}}
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
        <span class="skill-name">{{name}}:</span> <span class="keywords">{{join keywords}}</span>
      </div>
      {{/each}}
    </div>
  </section>
  {{/if}}
</body>
</html>`;async function i(y,q={}){let $=Ay,W=(q.template||"ats-optimized")==="professional"?"professional":"default",Z=h.getTemplate(W,$),z={...y,atsMode:q.atsMode||!1,templateName:q.template||"ats-optimized"};return Z(z)}import{promises as l}from"fs";var S={removeTimestamps:!0,removeVariableMetadata:!0};async function s(y,q=S){if(!q.removeTimestamps&&!q.removeVariableMetadata)return;let Q=(await l.readFile(y)).toString("binary");if(q.removeTimestamps)Q=Q.replace(/\/CreationDate \([^)]*\)/g,"").replace(/\/ModDate \([^)]*\)/g,"");if(q.removeVariableMetadata)Q=Q.replace(/\/ID \[[^\]]+\]/g,"").replace(/\/Producer \([^)]*\)/g,"/Producer (Resume PDF Generator)").replace(/\/Creator \([^)]*\)/g,"/Creator (Resume PDF Generator)");if(q.fixedCreationDate){let W=Q.match(/\/Title \([^)]*\)/);if(W){let Z=W.index+W[0].length;Q=Q.slice(0,Z)+`
/CreationDate (${q.fixedCreationDate})`+Q.slice(Z)}}await l.writeFile(y,Buffer.from(Q,"binary"))}import{chromium as Hy}from"playwright";class n{browser=null;context=null;isShuttingDown=!1;lastUsed=Date.now();IDLE_TIMEOUT=1e4;idleTimer=null;async getBrowserPage(){if(this.isShuttingDown)throw Error("Browser pool is shutting down");if(await this.ensureBrowser(),this.lastUsed=Date.now(),this.resetIdleTimer(),!this.context)throw Error("Browser context not available");let y=await this.context.newPage();return await y.setViewportSize({width:794,height:1123}),await y.route("**/*",(q)=>{let $=q.request().url(),Q=q.request().resourceType();if(["document","stylesheet","font"].includes(Q))if($.startsWith("file://")||$.startsWith("data:")||$.startsWith("blob:"))q.continue();else q.abort("internetdisconnected");else q.abort("blockedbyclient")}),y}async releasePage(y){try{if(await y.evaluate(()=>{if(document.body.innerHTML="",window.gc)window.gc()}),await y.close(),global.gc)global.gc()}catch(q){console.warn("Error closing page:",q)}}async ensureBrowser(){if(!this.browser||!this.browser.isConnected())await this.createBrowser();if(!this.context)await this.createContext()}async createBrowser(){this.browser=await Hy.launch({headless:!0,args:["--no-sandbox","--disable-dev-shm-usage","--disable-gpu","--disable-web-security","--disable-features=TranslateUI","--disable-ipc-flooding-protection","--disable-renderer-backgrounding","--disable-backgrounding-occluded-windows","--disable-background-timer-throttling","--disable-background-media-suspend","--no-first-run","--no-default-browser-check","--memory-pressure-off","--max-old-space-size=128"]})}async createContext(){if(!this.browser)throw Error("Browser not available");this.context=await this.browser.newContext({ignoreHTTPSErrors:!0,offline:!0,viewport:{width:794,height:1123},deviceScaleFactor:1})}resetIdleTimer(){if(this.idleTimer)clearTimeout(this.idleTimer);this.idleTimer=setTimeout(()=>{this.shutdown()},this.IDLE_TIMEOUT)}async shutdown(){if(this.isShuttingDown)return;if(this.isShuttingDown=!0,this.idleTimer)clearTimeout(this.idleTimer),this.idleTimer=null;try{if(this.context)await this.context.close(),this.context=null}catch(y){console.warn("Error closing browser context:",y)}try{if(this.browser)await this.browser.close(),this.browser=null}catch(y){console.warn("Error closing browser:",y)}this.isShuttingDown=!1}getStats(){return{hasBrowser:!!this.browser,hasContext:!!this.context,lastUsed:this.lastUsed,idleDuration:Date.now()-this.lastUsed}}}var O=new n;process.on("exit",()=>{O.shutdown()});process.on("SIGINT",async()=>{await O.shutdown(),process.exit(0)});process.on("SIGTERM",async()=>{await O.shutdown(),process.exit(0)});async function t(y,q={}){b(y);let $=q.output||"resume.pdf",Q=null;try{let W=xy.dirname($);await Iy.mkdir(W,{recursive:!0});let Z=await i(y,q);if(Q=await O.getBrowserPage(),await Q.setContent(Z,{waitUntil:"domcontentloaded",timeout:1e4}),await Q.pdf({path:$,format:"A4",margin:{top:"0.5in",right:"0.5in",bottom:"0.5in",left:"0.5in"},printBackground:!0,preferCSSPageSize:!0,tagged:!0,scale:1,displayHeaderFooter:!1}),q.deterministic!==!1){let J=q.deterministicConfig||S;await s($,J)}return $}catch(W){if(W.code==="ENOENT"||W.code==="EACCES")throw new U(`Cannot write to output path: ${$}`);throw new G(`Failed to generate PDF: ${W.message}`)}finally{if(Q)await O.releasePage(Q)}}A();import{watch as Vy}from"fs";import N from"chalk";function o(y,q,$,Q={}){let{debounceMs:W=500,persistent:Z=!0}=Q,z=null,J=Vy(y,{persistent:Z},async(R)=>{if(R==="change"){if(z)clearTimeout(z);z=setTimeout(async()=>{try{console.log(N.blue("\uD83D\uDCDD File changed, regenerating...")),await q(),console.log(N.green("\u2705 Regeneration complete"))}catch(f){if(console.error(N.red("\u274C Regeneration failed:"),f.message),$)$(f)}},W)}});J.closed=!1,J.on("error",(R)=>{if(console.error(N.red("File watcher error:"),R.message),$)$(R)});let _=J.close.bind(J);J.close=()=>{if(J.closed=!0,z)clearTimeout(z);return _()};let T=()=>{console.log(N.yellow(`
\uD83D\uDED1 Shutting down file watcher...`)),J.close(),process.exit(0)};return process.on("SIGINT",T),process.on("SIGTERM",T),J}A();import{promises as a}from"fs";import I from"path";async function r(y){let{inputPath:q,output:$,template:Q,atsMode:W,timestamp:Z,force:z=!1}=y;if(!q||q.trim()==="")throw Error("Input path cannot be empty");let J;if($){J=I.resolve($),Gy(J);let _=I.dirname(J);if(await a.mkdir(_,{recursive:!0}),!await Ty(J,z))throw new U("File already exists. Use --force to overwrite")}else{if(J=jy(q,Q,W),Z)J=Oy(J);J=I.resolve(J)}return J}function jy(y,q,$){let Q=I.basename(y,I.extname(y)),W="";if($)W="-ats";else if(q&&q!=="ats-optimized")W=`-${q}`;return`${Q}${W}.pdf`}function Oy(y){let q=I.extname(y),$=I.basename(y,q),Q=new Date().toISOString().split("T")[0];return`${$}-${Q}${q}`}async function Ty(y,q){try{return await a.access(y),q}catch{return!0}}function Gy(y){if(!y||y.trim()==="")throw Error("Output path cannot be empty");if(y.includes("\x00"))throw Error("Output path contains invalid characters");if(!y.endsWith(".pdf"))throw Error("Output file must have .pdf extension");let q=I.normalize(y);if(q==="/"||q===".")throw Error("Invalid output path")}async function C(y,q,$){if($)$.start(K.blue("Reading resume data..."));let Q=await Ny.readFile(y,"utf8"),W=JSON.parse(Q);if($)$.text=K.blue("Determining output path...");let Z=await r({inputPath:y,output:q.output,template:q.template,atsMode:q.atsMode,timestamp:q.timestamp,force:q.force});if($)$.text=K.blue("Validating resume schema...");if($)$.text=K.blue("Generating PDF...");let z={...q,output:Z};return await t(W,z),Z}async function E(y,q){if(q.watch){console.log(K.blue(`\uD83D\uDC41\uFE0F  Watching ${y} for changes... (Press Ctrl+C to stop)`)),console.log(K.gray("Making initial generation..."));try{let W=e(),Z=await C(y,q,W);W.succeed(K.green(`PDF generated successfully: ${Z}`))}catch(W){console.error(K.red(`Initial generation failed: ${W.message}`))}o(y,async()=>{let W=await C(y,q);console.log(K.green(`\u2705 PDF updated: ${W}`))},(W)=>{console.error(K.red(`Watch error: ${W.message}`))})}else{let $=e();try{let Q=await C(y,q,$);$.succeed(K.green(`PDF generated successfully: ${Q}`))}catch(Q){if(Q instanceof H)$.fail(K.red("Validation failed")),console.error(K.red(Q.message)),process.exit(1);else if(Q instanceof U)$.fail(K.red("File system error")),console.error(K.red(Q.message)),process.exit(1);else if(Q instanceof L)$.fail(K.red("PDF generation failed")),console.error(K.red(Q.message)),process.exit(1);else if(Q instanceof SyntaxError)$.fail(K.red("Invalid JSON")),console.error(K.red(`JSON parsing error: ${Q.message}`)),process.exit(1);else $.fail(K.red("Unexpected error")),console.error(K.red(`Error: ${Q.message}`)),process.exit(1)}}}import B from"chalk";import Ry from"ora";A();A();import X from"chalk";class V{options;constructor(y={}){this.options=y;this.options={debug:!1,verbose:!1,showSuggestions:!0,exitOnError:!0,...y}}handle(y){if(y instanceof L)this.handleResumeGeneratorError(y);else this.handleGenericError(y);if(this.options.exitOnError)process.exit(1)}handleResumeGeneratorError(y){if(console.error(X.red(y.getFormattedMessage(this.options.debug))),this.options.verbose&&y.code)console.error(X.gray(`
Error Code: ${y.code}`));if(y.isCatastrophic)console.error(X.red.bold(`
\u26A0\uFE0F  This is a catastrophic error that requires immediate attention.`));this.logContextualHelp(y)}handleGenericError(y){if(console.error(X.red(`\u274C Unexpected error: ${y.message}`)),this.options.debug&&y.stack)console.error(X.gray(`
Stack trace:`)),console.error(X.gray(y.stack));console.error(X.blue(`
\uD83D\uDCA1 General suggestions:`)),console.error(X.blue("  1. Run with --debug flag for more information")),console.error(X.blue("     Command: resume-pdf --debug <your-command>")),console.error(X.blue("  2. Check the GitHub issues for similar problems")),console.error(X.blue("     URL: https://github.com/your-repo/resume-pdf-generator/issues"))}logContextualHelp(y){switch(y.code){case"VALIDATION_ERROR":this.logValidationHelp();break;case"PDF_GENERATION_ERROR":this.logPDFGenerationHelp();break;case"FILESYSTEM_ERROR":this.logFileSystemHelp();break;case"TEMPLATE_ERROR":this.logTemplateHelp();break}}logValidationHelp(){if(!this.options.verbose)return;console.error(X.blue(`
\uD83D\uDCDA JSON Validation Help:`)),console.error(X.blue("  \u2022 Required fields: basics.name, basics.email, work")),console.error(X.blue('  \u2022 Date format: YYYY-MM-DD (e.g., "2024-01-15")')),console.error(X.blue("  \u2022 Email format: user@domain.com")),console.error(X.blue("  \u2022 URL format: https://example.com")),console.error(X.blue("  \u2022 Arrays should contain objects with proper structure"))}logPDFGenerationHelp(){if(!this.options.verbose)return;console.error(X.blue(`
\uD83C\uDFD7\uFE0F  PDF Generation Help:`)),console.error(X.blue("  \u2022 Ensure Playwright browsers are installed")),console.error(X.blue("  \u2022 Check available disk space for output file")),console.error(X.blue("  \u2022 Try ATS mode for simpler PDF generation")),console.error(X.blue("  \u2022 Reduce resume size if memory issues occur"))}logFileSystemHelp(){if(!this.options.verbose)return;console.error(X.blue(`
\uD83D\uDCC1 File System Help:`)),console.error(X.blue("  \u2022 Check file/directory permissions")),console.error(X.blue("  \u2022 Ensure paths use forward slashes (/) on Unix")),console.error(X.blue("  \u2022 Verify sufficient disk space")),console.error(X.blue("  \u2022 Use absolute paths if relative paths fail"))}logTemplateHelp(){if(!this.options.verbose)return;console.error(X.blue(`
\uD83C\uDFA8 Template Help:`)),console.error(X.blue("  \u2022 Available templates: professional, ats-optimized")),console.error(X.blue("  \u2022 ATS mode provides maximum compatibility")),console.error(X.blue("  \u2022 Check if all required data fields are present")),console.error(X.blue("  \u2022 Some templates may not support all resume sections"))}static createFromOptions(y){return new V(y)}static handleUncaughtErrors(y={}){let q=new V(y);process.on("uncaughtException",($)=>{console.error(X.red.bold(`
\uD83D\uDCA5 Uncaught Exception:`)),q.handle($)}),process.on("unhandledRejection",($)=>{if(console.error(X.red.bold(`
\uD83D\uDCA5 Unhandled Promise Rejection:`)),$ instanceof Error)q.handle($);else if(console.error(X.red(`\u274C ${String($)}`)),y.exitOnError!==!1)process.exit(1)})}}function yy(y,q=!1){if(y instanceof L)return y.getFormattedMessage(q);let $=`\u274C ${y.message}`;if(q&&y.stack)$+=`

\uD83D\uDD0D Debug Info:
${y.stack}`;return $}function qy(y){if(y instanceof L)return y.isCatastrophic?2:1;return 1}async function $y(y,q={}){let $=Ry(),Q=new V({debug:q.debug,verbose:q.verbose,showSuggestions:!0,exitOnError:!1});try{let W=Date.now();$.start(B.blue("Reading and validating resume file..."));let Z=c(y),J=Date.now()-W;if($.succeed(B.green(`Resume validation passed! \u2713 (${J}ms)`)),q.verbose){if(console.log(B.blue(`
\uD83D\uDCCA Validation Summary:`)),console.log(B.blue(`  \u2022 File: ${y}`)),console.log(B.blue(`  \u2022 Duration: ${J}ms`)),console.log(B.blue("  \u2022 Schema: Valid JSON Resume format")),Z&&typeof Z==="object"){let _=Z;if(_.basics?.name)console.log(B.blue(`  \u2022 Name: ${_.basics.name}`));if(_.work?.length)console.log(B.blue(`  \u2022 Work Entries: ${_.work.length}`));if(_.skills?.length)console.log(B.blue(`  \u2022 Skill Categories: ${_.skills.length}`))}}console.log(B.green(`
\u2705 Your resume is ready for PDF generation!`)),console.log(B.blue("\uD83D\uDCA1 Next step: resume-pdf generate "+y))}catch(W){if($.fail(B.red("Validation failed")),W instanceof L){if(console.error(`
`+yy(W,q.debug)),q.verbose)console.error(B.gray(`
Validation took ${Date.now()-Date.now()}ms before failing`));process.exit(qy(W))}else Q.handle(W)}}var x=new Dy,j={debug:!1,verbose:!1};x.name("resume-gen").description("Generate ATS-compliant PDF resumes from JSON").version("1.0.0").option("--debug","enable debug mode with verbose output").option("--verbose","enable verbose output").hook("preAction",(y)=>{let q=y.opts();j.debug=q.debug||!1,j.verbose=q.verbose||q.debug||!1,V.handleUncaughtErrors({debug:j.debug,verbose:j.verbose,showSuggestions:!0,exitOnError:!0})});x.argument("[input]","JSON resume file path").option("-f, --file <path>","JSON resume file path").option("-o, --output <path>","output PDF file path").option("--ats-mode","enable ATS-optimized mode").option("--timestamp","add timestamp to filename").option("--force","overwrite existing files").option("-w, --watch","watch for file changes").action(async(y,q)=>{let $=y||q.file;if(!$)console.error(Y.red("Error: Please specify a JSON resume file")),console.error(Y.gray("Usage: resume-gen --file resume.json")),console.error(Y.gray("   or: resume-gen resume.json")),console.error(Y.gray("")),console.error(Y.yellow("\uD83D\uDCA1 Tip: Copy resume-data.example.json to resume-data.json to get started")),process.exit(1);try{await import("fs").then((Q)=>Q.promises.access($))}catch(Q){if(console.error(Y.red(`Error: File '${$}' not found`)),$==="resume-data.json")console.error(Y.gray("")),console.error(Y.yellow("\uD83D\uDCA1 It looks like you're trying to use the default resume data file.")),console.error(Y.gray("   Copy resume-data.example.json to resume-data.json and customize it:")),console.error(Y.cyan("   cp resume-data.example.json resume-data.json"));process.exit(1)}E($,{...q,...j})});x.command("generate").description("Generate PDF from JSON resume (explicit command)").argument("<input>","JSON resume file path").option("-o, --output <path>","output PDF file path").option("--ats-mode","enable ATS-optimized mode").option("--timestamp","add timestamp to filename").option("--force","overwrite existing files").option("-w, --watch","watch for file changes").action(async(y,q)=>{try{await import("fs").then(($)=>$.promises.access(y))}catch($){if(console.error(Y.red(`Error: File '${y}' not found`)),y==="resume-data.json")console.error(Y.gray("")),console.error(Y.yellow("\uD83D\uDCA1 It looks like you're trying to use the default resume data file.")),console.error(Y.gray("   Copy resume-data.example.json to resume-data.json and customize it:")),console.error(Y.cyan("   cp resume-data.example.json resume-data.json"));process.exit(1)}E(y,{...q,...j})});x.command("validate").description("Validate JSON resume schema").argument("<input>","JSON resume file to validate").action(async(y,q)=>{try{await import("fs").then(($)=>$.promises.access(y))}catch($){if(console.error(Y.red(`Error: File '${y}' not found`)),y==="resume-data.json")console.error(Y.gray("")),console.error(Y.yellow("\uD83D\uDCA1 It looks like you're trying to use the default resume data file.")),console.error(Y.gray("   Copy resume-data.example.json to resume-data.json and customize it:")),console.error(Y.cyan("   cp resume-data.example.json resume-data.json"));process.exit(1)}$y(y,{...q,...j})});x.command("help [command]").description("Display help for command").action((y)=>{if(y)x.commands.find((q)=>q.name()===y)?.help();else x.help()});if(process.argv.length===2)console.log(Y.blue("\uD83D\uDCC4 Resume Generator CLI")),console.log(),console.log(Y.green("Quick start:")),console.log(Y.gray("  cp resume-data.example.json resume-data.json")),console.log(Y.gray("  resume-gen --file resume-data.json")),console.log(Y.gray("  resume-gen resume-data.json")),console.log(),console.log(Y.green("Common options:")),console.log(Y.gray("  -o, --output     Specify output PDF path")),console.log(Y.gray("  --ats-mode       Generate ATS-optimized version")),console.log(Y.gray("  -w, --watch      Watch for file changes")),console.log(),console.log(Y.yellow('Run "resume-gen --help" for full options')),process.exit(0);x.parse();export{j as globalOptions};
