/**
 * Mock analytics service
 */
export class Analytics {
  private static instance: Analytics;
  private enabled: boolean = true;
  private userId: string | null = null;
  private sessionId: string = this.generateId();
  private events: Array<{
    name: string;
    params: Record<string, any>;
    timestamp: number;
  }> = [];

  private constructor() {}

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  /**
   * Enable or disable analytics tracking
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    console.log(`Analytics tracking ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Set the user ID for user tracking
   */
  setUserId(userId: string | null): void {
    this.userId = userId;
    console.log(`Analytics user ID set: ${userId}`);
  }

  /**
   * Track an event with parameters
   */
  trackEvent(name: string, params: Record<string, any> = {}): void {
    if (!this.enabled) return;

    const event = {
      name,
      params: {
        ...params,
        sessionId: this.sessionId,
        userId: this.userId,
      },
      timestamp: Date.now(),
    };

    this.events.push(event);
    console.log(`Tracked event: ${name}`, params);
  }

  /**
   * Track a screen view
   */
  trackScreenView(screenName: string, params: Record<string, any> = {}): void {
    this.trackEvent('screen_view', {
      screen_name: screenName,
      ...params,
    });
  }

  /**
   * Start a new session
   */
  startNewSession(): void {
    this.sessionId = this.generateId();
    console.log(`Started new analytics session: ${this.sessionId}`);
  }

  /**
   * Get all tracked events (for testing/debugging)
   */
  getEvents(): Array<{
    name: string;
    params: Record<string, any>;
    timestamp: number;
  }> {
    return [...this.events];
  }

  /**
   * Clear all tracked events (for testing/debugging)
   */
  clearEvents(): void {
    this.events = [];
    console.log('Cleared all tracked events');
  }

  /**
   * Generate a random ID
   */
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

export const analyticsService = Analytics.getInstance();
