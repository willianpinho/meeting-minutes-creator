# Meeting Minutes App - React Native

A cross-platform mobile application for creating, managing, and exporting meeting minutes built with React Native for both iOS and Android platforms.

## Features

### ✨ Core Functionality

- **Create Meeting Minutes**: Intuitive form with all necessary fields
- **Manage Participants**: Add participants with name, email, and role
- **Dynamic Agenda**: Create and organize agenda items easily
- **Detailed Discussions**: Record discussions with topics and notes
- **Structured Decisions**: Document decisions with rationale
- **Action Items & Tasks**: Manage tasks with assignees, due dates, and status
- **Local Storage**: Data saved automatically using AsyncStorage
- **Cross-Platform**: Runs on both iOS and Android
- **Responsive UI**: Material Design 3 with React Native Paper

### 📱 Mobile-Optimized Features

- **Touch-Friendly Interface**: Optimized for mobile interaction
- **Offline Support**: Works completely offline with local storage
- **Native Navigation**: Stack navigation with gestures
- **Pull-to-Refresh**: Refresh meeting list with native gesture
- **Status Management**: Visual status indicators for action items

## Tech Stack

### Frontend
- **React Native 0.81.4** - Cross-platform mobile framework
- **TypeScript** - Static typing
- **React Navigation 7** - Native navigation
- **React Native Paper** - Material Design 3 components

### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@hookform/resolvers** - Zod + React Hook Form integration

### Storage & Utilities
- **AsyncStorage** - Local data persistence
- **date-fns** - Date manipulation
- **react-native-uuid** - UUID generation

## Installation & Setup

### Prerequisites
- Node.js 18+
- React Native development environment
- For iOS: Xcode 14+ and iOS Simulator
- For Android: Android Studio and Android SDK

### Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Start Metro bundler**
   ```bash
   npm start
   ```

4. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

## Project Structure

```
src/
├── components/          # Reusable React components
├── screens/            # Screen components
│   ├── HomeScreen.tsx      # Meeting list screen
│   ├── CreateMeetingScreen.tsx # Create new meeting
│   ├── EditMeetingScreen.tsx   # Edit existing meeting
│   └── ViewMeetingScreen.tsx   # View meeting details
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx    # Stack navigator setup
├── hooks/              # Custom React hooks
│   └── useMeetings.ts      # Meeting management hook
├── services/           # Business logic services
│   └── storage.ts          # AsyncStorage service
├── types/              # TypeScript type definitions
│   └── meeting.ts          # Meeting interfaces
└── utils/              # Utility functions
    ├── dateUtils.ts        # Date formatting utilities
    └── validationSchemas.ts # Zod validation schemas
```

## Usage

### Creating a Meeting

1. Tap the "+" FAB button on the home screen
2. Fill in basic information (title, date, time, location)
3. Add participants, agenda items, discussions, and decisions as needed
4. Tap the check icon to save the meeting

### Managing Meetings

- **View**: Tap on any meeting card to view details
- **Edit**: Tap the pencil icon on a meeting card or in the detail view
- **Delete**: Tap the trash icon (with confirmation dialog)
- **Refresh**: Pull down on the meeting list to refresh

## Data Storage

The app uses AsyncStorage for local data persistence:

- **Offline First**: All data stored locally on device
- **Privacy**: No data sent to external servers
- **Persistence**: Data survives app restarts
- **Performance**: Fast local access to all meetings

## Development Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator/device
- `npm run android` - Run on Android emulator/device
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## Platform Support

### iOS Features
- Native iOS navigation gestures
- iOS-specific UI adaptations
- Safe area handling for all iPhone models

### Android Features
- Material Design 3 theming
- Android navigation patterns
- Hardware back button support

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

### Debug Mode

Enable debug mode for additional logging:
- iOS: Cmd+D in simulator
- Android: Cmd+M in emulator

## Future Enhancements

### Planned Features
- [ ] PDF export functionality
- [ ] Photo attachments for meetings
- [ ] Meeting templates
- [ ] Cloud synchronization
- [ ] Calendar integration
- [ ] Reminder notifications

## Learn More

To learn more about React Native, check out the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native
- [Getting Started](https://reactnative.dev/docs/environment-setup) - React Native environment setup
- [React Navigation](https://reactnavigation.org/) - navigation library documentation
- [React Native Paper](https://reactnativepaper.com/) - Material Design components

---

**Built with React Native + TypeScript + React Native Paper**