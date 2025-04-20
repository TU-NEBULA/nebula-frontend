chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");

  chrome.action.onClicked.addListener(function () {
    chrome.tabs.create({ url: "index.html" });
  });

  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "midnightAlarm") {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

    chrome.history.search(
      {
        text: "",
        startTime: yesterdayStart.getTime(),
        endTime: todayStart.getTime(),
        maxResults: 1000,
      },
      (results) => {
        console.log("어제 하루의 브라우저 히스토리:", results);
      }
    );
  }
});

function scheduleMidnightAlarm() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const delay = midnight.getTime() - now.getTime();

  chrome.alarms.create("midnightAlarm", {
    when: Date.now() + delay,
    periodInMinutes: 1440,
  });
}

scheduleMidnightAlarm();
