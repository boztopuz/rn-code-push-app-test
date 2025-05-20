cd _apps/mobileApp
# 1. Kill existing Metro processes
lsof -ti :8081 | xargs kill -9

# 2. Clear Metro cache
rm -rf $TMPDIR/metro-*
watchman watch-del-all

# 3. Clear npm cache
npm cache clear --force

# 4. Reinstall dependencies
rm -rf node_modules
rm package-lock.json
npm install

# Clear Metro and Pod cache
rm -rf $TMPDIR/metro-*

# Clean iOS build
cd ios
rm -rf build
rm -rf Pods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
# Reinstall pods
pod deintegrate
pod install
