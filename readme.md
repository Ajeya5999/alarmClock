This is an "Alarm Clock" app. You can set the alarm time in 12 hour format along with days and alarm sounds. You can also delete previously set alarms.

Here are a few problems with the app:-

1) The sounds do not work on chrome because it handles alert window differently than other browsers.

2) The "hasrung" property of each alarm is not needed as the alarm is checked only when the minutes change.

3) The program uses 2 different 24 to 12 hour conversion functions due to different arguments but performs almost the same function, adding to code redundancy.