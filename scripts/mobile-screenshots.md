# 📱 Mobile Screenshots Implementation Guide

## React Native Screenshot Automation Solutions

### 1. **react-native-view-shot** (Recommended)
```bash
npm install react-native-view-shot
# iOS
cd ios && pod install
```

#### Implementation:
```typescript
import { captureRef } from 'react-native-view-shot';

const captureScreen = async () => {
  try {
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 1.0,
      result: 'tmpfile',
    });
    console.log('Screenshot saved:', uri);
    return uri;
  } catch (error) {
    console.error('Screenshot failed:', error);
  }
};
```

### 2. **Detox E2E Testing** (Professional)
```bash
npm install --save-dev detox
```

#### Configuration:
```json
{
  "detox": {
    "configurations": {
      "ios.sim.debug": {
        "device": "ios.simulator",
        "app": "ios.debug"
      }
    }
  }
}
```

#### Screenshot automation:
```typescript
// e2e/screenshots.e2e.js
describe('Portfolio Screenshots', () => {
  it('should capture home screen', async () => {
    await device.takeScreenshot('01-home-screen');
  });

  it('should capture form screen', async () => {
    await element(by.text('Nova Ata')).tap();
    await device.takeScreenshot('02-form-screen');
  });
});
```

### 3. **Flipper Integration** (Development)
- Built-in screenshot capability
- Real-time device preview
- Network inspection
- Layout debugging

### 4. **Maestro** (Modern E2E)
```bash
# Install Maestro
curl -Ls "https://get.maestro.mobile.dev" | bash

# Create test flow
# .maestro/screenshot_flow.yaml
appId: com.meetingminutesapp
---
- takeScreenshot: "01-launch"
- tapOn: "Nova Ata"
- takeScreenshot: "02-form"
```

## Implementation Plan for Portfolio

### Phase 1: Basic Screenshots
1. **Add react-native-view-shot**
2. **Create screenshot utility component**
3. **Add screenshot buttons in dev mode**

### Phase 2: Automated E2E
1. **Setup Detox or Maestro**
2. **Create screenshot test suite**
3. **Generate portfolio images**

### Code Example:
```tsx
// src/components/ScreenshotHelper.tsx
import React, { useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { captureRef } from 'react-native-view-shot';

interface ScreenshotHelperProps {
  children: React.ReactNode;
  filename: string;
}

export const ScreenshotHelper: React.FC<ScreenshotHelperProps> = ({
  children,
  filename,
}) => {
  const viewRef = useRef();

  const takeScreenshot = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1.0,
      });
      console.log(`Screenshot saved: ${filename}`, uri);
    } catch (error) {
      console.error('Screenshot error:', error);
    }
  };

  return (
    <View ref={viewRef} style={{ flex: 1 }}>
      {children}
      {__DEV__ && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 50,
            right: 20,
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={takeScreenshot}
        >
          <Text style={{ color: 'white' }}>📸 {filename}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
```

## Portfolio Integration
- **Device Mockups**: Use device frames for presentation
- **Multiple Resolutions**: iPhone, Android, Tablet
- **Dark/Light Theme**: Showcase theme switching
- **Interactive Features**: Form filling, navigation

## Tools for Device Mockups
- **Figma**: Professional device frames
- **Mockuphone**: Free online tool
- **Shots**: macOS screenshot beautifier
- **CleanShot X**: Advanced screenshot editing

## Best Practices
- **High DPI**: Use 2x or 3x resolution
- **Consistent Timing**: Wait for animations
- **Real Data**: Use meaningful content
- **Multiple States**: Loading, filled forms, etc.