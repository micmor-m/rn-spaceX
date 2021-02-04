# SpaceX App

SpaceX App is an application built with Expo, React and React-Native that displays a table of accordions which is scrollable displaying the data of each SpaxeX rockets' launch.

## Final Product

!["Screenshot of Rockets list"]()
!["screenshot of Toggled Rocket"]()

## Dependencies

- expo
- expo-app-loading
- expo-status-bar
- react
- react-dom
- react-native
- react-native-web
- expo-asset
- expo-font

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node start` command.
- Scan the QR code that will appear on the page with the Expo app (Android)
- DISCLAIMER: At this time, the app works only on Android devices.

### Display

- An Header with the name of the app;
- A Infinite scrollable list with the name of the rockets

### Behaviour

When the app completes all data fetch from the SpaceX API (https://docs.spacexdata.com/), an infinite list will be displayed with rockets' name.
Clicking the name will open the accordion for that specific rocket and display more information:

- Start of each mission
- Mission Name
- Site launched location name, lat, long
- If the mission was a success or a failure with the reason
