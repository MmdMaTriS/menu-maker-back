import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService {
  private logger: Logger;
  private currentLogFile: string;
  private currentLogDate: string;

  constructor() {
    this.logger = new Logger('LoggerService');
    this.currentLogFile = this.generateLogFileName();
    this.currentLogDate = this.getTodaysDate();
  }

  private generateLogFileName(): string {
    const date = this.getTodaysDate();
    const logFolderPath = path.join(__dirname, '../../logs');
    const logFilePath = path.join(logFolderPath, `${date}.log`);
    // Create the folder if it doesn't exist
    if (!fs.existsSync(logFolderPath)) {
      fs.mkdirSync(logFolderPath);
    }
    return logFilePath;
  }

  private getTodaysDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Get YYYY-MM-DD format
  }

  async log(text: string): Promise<void> {
    const newLogDate = this.getTodaysDate();

    if (newLogDate !== this.currentLogDate) {
      this.currentLogFile = this.generateLogFileName();
      this.currentLogDate = newLogDate;
    }

    try {
      const logEntry = `${this.getFormattedTimestamp()} - ${text}\n`;
      await fs.promises.appendFile(this.currentLogFile, logEntry);
      this.logger.log(`Log saved to ${this.currentLogFile}`);
    } catch (error) {
      this.logger.error(`Error writing log to file: ${error.message}`);
    }
  }

  private getFormattedTimestamp(): string {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
}
