/**
 * Moonpay Webhook Handler
 * Processes incoming webhook events from Moonpay
 */

import { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

export interface MoonpayWebhookEvent {
  id: string;
  type: 'buy.created' | 'buy.completed' | 'buy.failed' | 'buy.expired';
  data: {
    id: string;
    attribute: string;
    value: string;
  };
  createdAt: string;
}

export class WebhookHandler {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  /**
   * Handle incoming webhook request
   */
  async handle(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    let body = '';

    for await (const chunk of req) {
      body += chunk;
    }

    const signature = req.headers['x-moonpay-signature'] as string;

    if (!this.validateSignature(body, signature)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid signature' }));
      return;
    }

    try {
      const event: MoonpayWebhookEvent = JSON.parse(body);
      await this.processEvent(event);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ received: true }));
    } catch (err) {
      console.error('Failed to process webhook:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  }

  /**
   * Validate webhook signature using HMAC-SHA256
   */
  private validateSignature(payload: string, signature: string): boolean {
    const expected = crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(signature),
    );
  }

  /**
   * Process different webhook event types
   */
  private async processEvent(event: MoonpayWebhookEvent): Promise<void> {
    switch (event.type) {
      case 'buy.completed':
        console.log(`Buy completed: ${event.data.id}`);
        // TODO: Update database, notify user, release funds
        break;

      case 'buy.failed':
        console.log(`Buy failed: ${event.data.id}`);
        // TODO: Update database, notify user
        break;

      case 'buy.created':
        console.log(`Buy created: ${event.data.id}`);
        // TODO: Store transaction record
        break;

      case 'buy.expired':
        console.log(`Buy expired: ${event.data.id}`);
        // TODO: Clean up pending transaction
        break;
    }
  }
}

export default WebhookHandler;
