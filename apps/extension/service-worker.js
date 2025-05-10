const manifest = chrome.runtime.getManifest();
const baseUrl = manifest.env.BASE_URL;

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");

  chrome.action.onClicked.addListener(function () {
    chrome.tabs.create({ url: "index.html" });
  });

  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "midnightAlarm") {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

    const token = await chrome.cookies.get({
      url: baseUrl,
      name: "accessToken",
    });

    if (token) {
      chrome.history.search(
        {
          text: "",
          startTime: yesterdayStart.getTime(),
          endTime: todayStart.getTime(),
          maxResults: 1000,
        },
        async (results) => {
          for (let i = 0; i < results.length; i += 100) {
            const chunk = results.slice(i, i + 100);
            const sendData = chunk.map((item) => {
              const { id, ...rest } = item;
              return rest;
            });

            let retryCount = 0;
            const maxRetries = 3;
            let success = false;

            while (!success && retryCount < maxRetries) {
              try {
                await fetch(`${baseUrl}/histories`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(sendData),
                  credentials: "include",
                });
                success = true;
              } catch (e) {
                console.error("Failed to send chunk", e);
                console.error(`Failed to send chunk (attempt ${retryCount + 1}/${maxRetries})`, e);
                retryCount++;
                if (retryCount < maxRetries) {
                  await new Promise((resolve) =>
                    setTimeout(resolve, 1000 * Math.pow(2, retryCount))
                  );
                }
              }

              if (!success) {
                console.error("Failed to send chunk after multiple attempts");
              }
            }
          }
        }
      );
    }
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
