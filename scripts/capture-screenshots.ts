#!/usr/bin/env node
import { Builder, Browser, WebDriver, until, By } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import * as fs from 'fs';
import * as path from 'path';

interface ScreenshotConfig {
  name: string;
  url: string;
  waitForSelector?: string;
  actions?: Array<{
    type: 'click' | 'fill' | 'wait';
    selector?: string;
    value?: string;
    delay?: number;
  }>;
  viewport: {
    width: number;
    height: number;
  };
}

class PortfolioScreenshotCapture {
  private driver: WebDriver | null = null;
  private baseUrl = 'http://localhost:5173';
  private outputDir = path.join(process.cwd(), 'screenshots');

  private screenshots: ScreenshotConfig[] = [
    {
      name: '01-landing-page',
      url: '/',
      waitForSelector: '[data-testid="meeting-list"], .meeting-list, h1',
      viewport: { width: 1920, height: 1080 }
    },
    {
      name: '02-new-meeting-form',
      url: '/',
      waitForSelector: 'button',
      actions: [
        { type: 'click', selector: 'button:contains("Nova Ata"), button:contains("New"), [data-testid="new-meeting"]' },
        { type: 'wait', delay: 1000 }
      ],
      viewport: { width: 1920, height: 1080 }
    },
    {
      name: '03-form-filled',
      url: '/',
      actions: [
        { type: 'click', selector: 'button:contains("Nova"), button:contains("New"), [data-testid="new-meeting"]' },
        { type: 'wait', delay: 1000 },
        { type: 'fill', selector: 'input[name="title"], input[placeholder*="título"], input[type="text"]:first', value: 'Reunião de Planejamento Estratégico Q4 2024' },
        { type: 'fill', selector: 'input[name="location"], input[placeholder*="local"]', value: 'Sala de Conferências Principal - Escritório SP' },
        { type: 'wait', delay: 500 }
      ],
      viewport: { width: 1920, height: 1080 }
    },
    {
      name: '04-participants-section',
      url: '/',
      actions: [
        { type: 'click', selector: 'button:contains("Nova"), button:contains("New")' },
        { type: 'wait', delay: 1000 },
        { type: 'fill', selector: 'input[name="title"], input[type="text"]:first', value: 'Reunião de Planejamento' },
        { type: 'click', selector: 'button:contains("Adicionar Participante"), button:contains("Add Participant")' },
        { type: 'wait', delay: 500 }
      ],
      viewport: { width: 1920, height: 1080 }
    },
    {
      name: '05-mobile-responsive',
      url: '/',
      waitForSelector: 'body',
      viewport: { width: 375, height: 812 }
    },
    {
      name: '06-tablet-view',
      url: '/',
      waitForSelector: 'body',
      viewport: { width: 768, height: 1024 }
    }
  ];

  async initialize(): Promise<void> {
    // Verificar se o diretório existe
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Configurar Chrome options para melhor captura
    const options = new Options();
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-web-security');
    options.addArguments('--disable-extensions');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');

    this.driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .build();

    console.log('✅ Selenium WebDriver initialized');
  }

  async captureScreenshot(config: ScreenshotConfig): Promise<void> {
    if (!this.driver) throw new Error('Driver not initialized');

    try {
      console.log(`📸 Capturing: ${config.name}`);

      // Configurar viewport
      await this.driver.manage().window().setRect({
        width: config.viewport.width,
        height: config.viewport.height
      });

      // Navegar para a URL
      await this.driver.get(`${this.baseUrl}${config.url}`);

      // Aguardar carregamento
      await this.driver.sleep(2000);

      // Aguardar selector específico se definido
      if (config.waitForSelector) {
        try {
          await this.driver.wait(
            until.elementLocated(By.css(config.waitForSelector)),
            10000
          );
        } catch (error) {
          console.warn(`⚠️  Selector não encontrado: ${config.waitForSelector}`);
          // Continuar mesmo se o selector não for encontrado
        }
      }

      // Executar ações se definidas
      if (config.actions) {
        for (const action of config.actions) {
          await this.executeAction(action);
        }
      }

      // Aguardar um pouco antes de capturar
      await this.driver.sleep(1000);

      // Capturar screenshot
      const screenshot = await this.driver.takeScreenshot();
      const filepath = path.join(this.outputDir, `${config.name}.png`);

      fs.writeFileSync(filepath, screenshot, 'base64');
      console.log(`✅ Screenshot saved: ${filepath}`);

    } catch (error) {
      console.error(`❌ Error capturing ${config.name}:`, error);
    }
  }

  private async executeAction(action: any): Promise<void> {
    if (!this.driver) return;

    try {
      switch (action.type) {
        case 'click':
          if (action.selector) {
            // Tentar múltiplos seletores
            const selectors = action.selector.split(',').map((s: string) => s.trim());
            let element = null;

            for (const selector of selectors) {
              try {
                if (selector.includes(':contains(')) {
                  // Para seletores com :contains, usar XPath
                  const text = selector.match(/\:contains\("([^"]+)"\)/)?.[1];
                  if (text) {
                    element = await this.driver.findElement(
                      By.xpath(`//button[contains(text(), "${text}")]`)
                    );
                    break;
                  }
                } else {
                  element = await this.driver.findElement(By.css(selector));
                  break;
                }
              } catch (e) {
                continue;
              }
            }

            if (element) {
              await element.click();
              console.log(`✅ Clicked: ${action.selector}`);
            } else {
              console.warn(`⚠️  Element not found: ${action.selector}`);
            }
          }
          break;

        case 'fill':
          if (action.selector && action.value) {
            try {
              const element = await this.driver.findElement(By.css(action.selector));
              await element.clear();
              await element.sendKeys(action.value);
              console.log(`✅ Filled: ${action.selector}`);
            } catch (error) {
              console.warn(`⚠️  Could not fill: ${action.selector}`);
            }
          }
          break;

        case 'wait':
          if (action.delay) {
            await this.driver.sleep(action.delay);
          }
          break;
      }
    } catch (error) {
      console.warn(`⚠️  Action failed:`, error);
    }
  }

  async captureAll(): Promise<void> {
    console.log('🚀 Starting portfolio screenshot capture...');

    for (const config of this.screenshots) {
      await this.captureScreenshot(config);
    }

    console.log('✅ All screenshots captured successfully!');
  }

  async cleanup(): Promise<void> {
    if (this.driver) {
      await this.driver.quit();
      console.log('🧹 Driver cleanup completed');
    }
  }
}

// Função principal
async function main() {
  const capture = new PortfolioScreenshotCapture();

  try {
    await capture.initialize();
    await capture.captureAll();
  } catch (error) {
    console.error('❌ Screenshot capture failed:', error);
    process.exit(1);
  } finally {
    await capture.cleanup();
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { PortfolioScreenshotCapture };