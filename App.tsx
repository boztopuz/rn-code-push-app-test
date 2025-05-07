import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  LogBox,
} from 'react-native';
import { colors } from './src/theme/colors';
import { spacing } from './src/theme/spacing';
import { typography } from './src/theme/typography';
import Button from './src/components/buttons/Button';
import Card from './src/components/cards/Card';
import { analyticsService } from './src/utils/analytics';
import { version as currentVersion } from './package.json';
import CodePush from '@appcircle/react-native-code-push';
import Snackbar from './src/components/common/snackbar';
import { featureFlagsService } from './src/utils/featureFlags';

// Ignore specific LogBox warnings
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Warning: componentWillReceiveProps has been renamed',
]);

type TabType = 'home' | 'feed' | 'notifications' | 'profile';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const handleCodePushSync = (showAlerts = false) => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
      },
      (syncStatus) => {
        switch(syncStatus) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            if (showAlerts) Alert.alert('Checking for updates...');
            setUpdateAvailable(true);
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            if (showAlerts) Alert.alert('Downloading update...');
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            if (showAlerts) Alert.alert('Installing update...');
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            if (showAlerts) {
              Alert.alert(
                'Update Installed',
                'The app has been updated. Would you like to restart now?',
                [
                  {
                    text: 'Later',
                    style: 'cancel'
                  },
                  {
                    text: 'Restart Now',
                    onPress: () => CodePush.restartApp()
                  }
                ]
              );
            }
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            if (showAlerts) Alert.alert('App is up to date!');
            setUpdateAvailable(false);
            break;
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            if (showAlerts) Alert.alert('An error occurred while checking for updates');
            break;
        }
      }
    );
  };

  useEffect(() => {
    try {
      // Initialize analytics
      analyticsService.startNewSession();
      analyticsService.setEnabled(featureFlagsService.isEnabled('enableAnalytics'));
      analyticsService.trackEvent('app_launched');

      // Check for CodePush updates
      handleCodePushSync();

      // Check update status
      const checkUpdateStatus = async () => {
        try {
          const update = await CodePush.getUpdateMetadata();
          if (update) {
            analyticsService.trackEvent('codepush_update_status', {
              label: update.label,
              description: update.description,
              isFirstRun: update.isFirstRun,
            });
          }
        } catch (error) {
          console.error('Error checking update status:', error);
        }
      };

      checkUpdateStatus();
    } catch (error) {
      console.error('Error in app initialization:', error);
    }
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    analyticsService.trackEvent('tab_change', { tab });
  };

  const checkForUpdates = () => {
    handleCodePushSync(true);
    analyticsService.trackEvent('check_for_updates');
  };

  const renderHomeScreen = () => (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to CodePush 7 mayıs 2</Text>
        <Text style={styles.subtitle}>Current Version: {currentVersion}</Text>

        <Button
          title={updateAvailable ? "Update Available!" : "Check for Updates"}
          variant="primary"
          onPress={checkForUpdates}
          style={styles.updateButton}
        />
      </View>

      <Card title="App Features" style={styles.card}>
        <Text style={styles.cardText}>
          This app demonstrates CodePush integration for over-the-air updates.
          Navigate using the tabs below to explore different sections.
        </Text>
      </Card>

      <View style={styles.codeSection}>
        <Text style={styles.sectionTitle}>About CodePush</Text>
        <Card style={styles.card}>
          <Text style={styles.cardText}>
            CodePush is a cloud service that enables React Native developers to deploy
            mobile app updates directly to their users' devices.
          </Text>
        </Card>
      </View>
    </ScrollView>
  );

  const renderFeedScreen = () => (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Feed Screen</Text>
      <Card style={styles.card}>
        <Text style={styles.cardText}>Your feed content will appear here.</Text>
      </Card>
    </ScrollView>
  );

  const renderNotificationsScreen = () => (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Notifications</Text>
      <Card style={styles.card}>
        <Text style={styles.cardText}>Your notifications will appear here.</Text>
      </Card>
    </ScrollView>
  );

  const renderProfileScreen = () => (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Profile</Text>
      <Card style={styles.card}>
        <Text style={styles.cardText}>Your profile information will appear here.</Text>
      </Card>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeScreen();
      case 'feed':
        return renderFeedScreen();
      case 'notifications':
        return renderNotificationsScreen();
      case 'profile':
        return renderProfileScreen();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      {renderContent()}
      
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'home' && styles.activeTab]}
          onPress={() => handleTabChange('home')}
        >
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'feed' && styles.activeTab]}
          onPress={() => handleTabChange('feed')}
        >
          <Text style={styles.tabIcon}>📱</Text>
          <Text style={styles.tabLabel}>Feed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'notifications' && styles.activeTab]}
          onPress={() => handleTabChange('notifications')}
        >
          <Text style={styles.tabIcon}>🔔</Text>
          <Text style={styles.tabLabel}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'profile' && styles.activeTab]}
          onPress={() => handleTabChange('profile')}
        >
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold as any,
    color: colors.dark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.gray,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  updateButton: {
    marginTop: spacing.md,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardText: {
    fontSize: typography.fontSizes.md,
    color: colors.dark,
    lineHeight: 22,
  },
  codeSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semiBold as any,
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.light,
    backgroundColor: colors.white,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  activeTab: {
    backgroundColor: `${colors.primary}20`,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  tabLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.dark,
  },
});

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
})(App);
