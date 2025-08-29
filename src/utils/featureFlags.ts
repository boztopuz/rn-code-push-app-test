/**
 * Mock feature flags service
 */
export class FeatureFlags {
  private static instance: FeatureFlags;
  private flags: Record<string, boolean> = {
    enableDarkMode: false,
    enablePushNotifications: true,
    enableInAppMessages: true,
    enableAnalytics: true,
    showNewFeaturePopup: true,
    enableBetaFeatures: false,
  };

  private constructor() {}

  public static getInstance(): FeatureFlags {
    if (!FeatureFlags.instance) {
      FeatureFlags.instance = new FeatureFlags();
    }
    return FeatureFlags.instance;
  }

  /**
   * Check if a feature flag is enabled
   */
  isEnabled(flagName: string): boolean {
    return !!this.flags[flagName];
  }

  /**
   * Set a feature flag
   */
  setFlag(flagName: string, enabled: boolean): void {
    this.flags[flagName] = enabled;
    console.log(`Feature flag '${flagName}' set to ${enabled}`);
  }

  /**
   * Get all feature flags
   */
  getAllFlags(): Record<string, boolean> {
    return { ...this.flags };
  }

  /**
   * Update multiple flags at once
   */
  updateFlags(flags: Record<string, boolean>): void {
    this.flags = {
      ...this.flags,
      ...flags,
    };
    console.log('Feature flags updated', flags);
  }

  /**
   * Reset all flags to default values
   */
  resetFlags(): void {
    this.flags = {
      enableDarkMode: false,
      enablePushNotifications: true,
      enableInAppMessages: true,
      enableAnalytics: true,
      showNewFeaturePopup: true,
      enableBetaFeatures: false,
    };
    console.log('Feature flags reset to defaults');
  }
}

export const featureFlagsService = FeatureFlags.getInstance();
