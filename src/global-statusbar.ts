import { StatusBar, Style } from '@capacitor/status-bar';

export const setupStatusBar = async () => {
  // show the status bar
  await StatusBar.show();

  // Make it overlay or not
  await StatusBar.setOverlaysWebView({ overlay: false });

  // Set style (dark icons or light icons)
  await StatusBar.setStyle({ style: Style.Dark });
};
