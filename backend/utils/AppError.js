import axios from 'axios'; // For sending webhook messages
// import { connectDB } from '../config/db'; // Assuming you have a db module for database operations

class AppError extends Error {
  constructor(message, statusCode = 400, details = {}, report = { type: 'none', url: null, webhookType: 'error' }) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.report = report;

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  async handleReport() {
    if (this.report.type === 'none') return;
    console.log('details')
    console.log(this.details)

    // if (this.report.type === 'webhook' || this.report.type === 'both') {
    //   await this.sendWebhookMessage();
    // }

    // if (this.report.type === 'database' || this.report.type === 'both') {
    //   await this.storeInDatabase();
    // }
  }

  async sendWebhookMessage() {
    if (!this.report.url) {
      throw new Error('Webhook URL is not provided.');
    }

    try {
      await axios.post(this.report.url, {
        type: this.report.webhookType,
        error: {
          message: this.message,
          statusCode: this.statusCode,
          details: this.details,
        },
      });
    } catch (error) {
      console.error('Failed to send webhook message:', error);
    }
  }

  // TODO : Handle this with the mongoose
  async storeInDatabase() {
    try {
      await connectDB.errors.insertOne({
        message: this.message,
        statusCode: this.statusCode,
        details: this.details,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Failed to store error in the database:', error);
    }
  }
}

export default AppError;
