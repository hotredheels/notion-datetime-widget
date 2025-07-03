// Get user's city using IP location API
fetch("https://ipapi.co/json/")
  .then(response => response.json())
  .then(location => {
    const city = location.city;
    const country = location.country_name;

    // Get current time
    const updateTime = () => {
      const now = new Date();
      const localTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      document.getElementById("time").textContent = `🕒 ${localTime}`;
    };
    updateTime();
    setInterval(updateTime, 60000);

    // Get date from Aladhan API
    fetch(`https://api.aladhan.com/v1/gToH?city=${city}&country=${country}`)
      .then(response => response.json())
      .then(data => {
        const gregorian = data.data.gregorian.date;
        const hijri = data.data.hijri.date;
        const hijriFormatted = `${data.data.hijri.day} ${data.data.hijri.month.en} ${data.data.hijri.year} AH`;

        document.getElementById("gregorian").textContent = `📅 ${gregorian}`;
        document.getElementById("hijri").textContent = `🌙 ${hijriFormatted}`;
      });
  })
  .catch(() => {
    document.getElementById("gregorian").textContent = "Failed to load location.";
    document.getElementById("hijri").textContent = "";
    document.getElementById("time").textContent = "";
  });
