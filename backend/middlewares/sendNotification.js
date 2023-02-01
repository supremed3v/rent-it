import { Expo } from "expo-server-sdk";

const expo = new Expo();

export default async function sendNotification(pushTokens, message, title) {
  const messages = [];
  pushTokens.forEach((pushToken) => {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      return;
    }
    messages.push({
      to: pushToken,
      sound: "default",
      body: message,
      title: title,
    });
    expo.sendPushNotificationsAsync(messages).then((receipts) => {
      console.log(receipts);
    });
  });
}
