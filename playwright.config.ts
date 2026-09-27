import { defineConfig, devices } from '@playwright/test';
const baseURL=process.env.PORTFOLIO_BASE_URL||'http://127.0.0.1:5198';
export default defineConfig({
 testDir:'./tests/portfolio',fullyParallel:false,workers:2,timeout:30000,expect:{timeout:7000},
 outputDir:'artifacts/production-migration/playwright-results',
 reporter:[['list'],['html',{outputFolder:'artifacts/production-migration/playwright-report',open:'never'}],['json',{outputFile:'artifacts/production-migration/playwright-results.json'}]],
 use:{baseURL,trace:'retain-on-failure',screenshot:'only-on-failure',...devices['Desktop Chrome'],channel:process.platform==='win32'?'chrome':undefined,viewport:{width:1440,height:1000}},
 webServer:process.env.PORTFOLIO_BASE_URL?undefined:{command:'npm run preview',url:baseURL,reuseExistingServer:!process.env.CI,timeout:120000,env:{PORT:'5198',HOST:'127.0.0.1'}},
});
