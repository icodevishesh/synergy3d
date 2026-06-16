const fs = require("fs");
const http = require("http");

const body = JSON.stringify({
  practiceName: "Test Practice",
  contactName: "Vishesh Purkait",
  email: "visheshpurkait23@gmail.com",
  phone: "9560818929",
  address: "1147 Route 9",
  city: "Wappingers Falls",
  state: "NY",
  zip: "12590",
  weight: "5",
  casesEnclosed: "2",
});

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/api/ups/create-label",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  },
};

console.log("⏳ Requesting UPS label...");

const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => (data += chunk));

  res.on("end", () => {
    try {
      const json = JSON.parse(data);

      if (!json.success) {
        console.error("❌ Error from API:", json.error);
        return;
      }

      // Convert base64 → PDF
      const pdfBuffer = Buffer.from(json.label, "base64");
      const filename = `ups-label-${json.trackingNumber}.pdf`;
      fs.writeFileSync(filename, pdfBuffer);

      console.log("✅ Label generated successfully!");
      console.log(`📦 Tracking Number: ${json.trackingNumber}`);
      console.log(`📄 PDF saved as: ${filename}`);
      console.log(`👉 Open it from your project root folder`);
    } catch (err) {
      console.error("❌ Failed to parse response:", err.message);
      console.error("Raw response:", data);
    }
  });
});

req.on("error", (err) => {
  console.error("❌ Request failed:", err.message);
});

req.write(body);
req.end();