import { connectToDatabase } from "./db.js";

const bucketName = "anycompany-unicorns";
const files = [
  "annie-spratt-Jr8byYZmTTU-unsplash.jpg",
  "arad-adiban-VY2H8fA4cUM-unsplash.jpg",
  "david-clode-0izux0eMf28-unsplash.jpg",
  "faisal-alhassan-QLQlcMCUXkw-unsplash.jpg",
  "ines-pimentel-opkaRk20tAw-unsplash.jpg",
  "jason-goodman-Oalh2MojUuk-unsplash.jpg",
  "joen-patrick-caagbay-Qe8EBN9U44k-unsplash.jpg",
  "juliana-araujo-the-artist--l_EZkgghrg-unsplash.jpg",
  "karen-powers-QjQU3Sa7Eas-unsplash.jpg",
  "katie-gerrard-W5FtVwjaJQM-unsplash.jpg",
  "leo_visions-Id1zKguVcU0-unsplash.jpg",
  "lisette-harzing-HsV938kchb0-unsplash.jpg",
  "loow-invernissi-Vvaq9UalaBY-unsplash.jpg",
  "lucas-santos-Z-6lf1EgbJg-unsplash.jpg",
  "nicolas-baumgartner-woz-YSeU6BU-unsplash.jpg",
  "nik-Geu-i5VvI1A-unsplash.jpg",
  "nipyata-RmxzH3S0F4o-unsplash.jpg",
  "paul-bill-6bzHYJ799pE-unsplash.jpg",
  "paul-bill-J04u1Er5IgA-unsplash.jpg",
  "pierre-chatel-innocenti-cT-f5HbyB80-unsplash.jpg",
  "ryunosuke-kikuno-Fc-6aFuKtE8-unsplash.jpg",
  "sarah-j-jyCgF_RD4a0-unsplash.jpg",
  "sincerely-media-dsTo2aTiJFY-unsplash.jpg",
  "stephanie-watters-flores-clEmzwXbOdg-unsplash.jpg",
  "tao-yuan-tOWZ1lneRxE-unsplash.jpg",
  "valentin-petkov-hLlJ0PZZc48-unsplash.jpg",
  "viktor-bystrov-b9PU1YYwvKU-unsplash.jpg",
  "wilmer-martinez-8WR86Z_mLms-unsplash.jpg",
  "yazid-n-sQVu2sI12dc-unsplash.jpg",
  "yifei-chen-D3A50t283ck-unsplash.jpg",
  "yura-timoshenko-ynbMXmcToRs-unsplash.jpg",
];

const insertImages = async () => {
  const pool = await connectToDatabase();

  const query = `
    INSERT INTO images (name, image_url)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE image_url = VALUES(image_url)
  `;

  try {
    for (const file of files) {
      const imageUrl = `https://${bucketName}.s3.amazonaws.com/${file}`;
      await pool.query(query, [file, imageUrl]);
      console.log(`Inserted or updated: ${file}`);
    }
    console.log("All images inserted successfully.");
  } catch (error) {
    console.error("Error inserting images:", error);
  } finally {
    pool.end();
  }
};

insertImages();
