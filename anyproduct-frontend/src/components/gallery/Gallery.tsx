import React from "react";
import { useSearchParams } from "react-router-dom";

type ImageDict = {
  [page: number]: { [id: string]: string }; // Dictionary structure: Page -> { Image ID -> URL }
};

const Gallery: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [page, setPage] = React.useState(currentPage);

  // Static dictionary of images
  // const imageDictionary: ImageDict = {
  //   1: {
  //     "1": "https://anyproduct.mkofman.people.aws.dev/annie-spratt-Jr8byYZmTTU-unsplash.jpg",
  //     "2": "https://anyproduct.mkofman.people.aws.dev/arad-adiban-VY2H8fA4cUM-unsplash.jpg",
  //     "3": "https://anyproduct.mkofman.people.aws.dev/david-clode-0izux0eMf28-unsplash.jpg",
  //     "4": "https://anyproduct.mkofman.people.aws.dev/faisal-alhassan-QLQlcMCUXkw-unsplash.jpg",
  //     "5": "https://anyproduct.mkofman.people.aws.dev/ines-pimentel-opkaRk20tAw-unsplash.jpg",
  //     "6": "https://anyproduct.mkofman.people.aws.dev/jason-goodman-Oalh2MojUuk-unsplash.jpg",
  //   },
  //   2: {
  //     "7": "https://anyproduct.mkofman.people.aws.dev/joen-patrick-caagbay-Qe8EBN9U44k-unsplash.jpg",
  //     "8": "https://anyproduct.mkofman.people.aws.dev/juliana-araujo-the-artist--l_EZkgghrg-unsplash.jpg",
  //     "9": "https://anyproduct.mkofman.people.aws.dev/karen-powers-QjQU3Sa7Eas-unsplash.jpg",
  //     "10": "https://anyproduct.mkofman.people.aws.dev/katie-gerrard-W5FtVwjaJQM-unsplash.jpg",
  //     "11": "https://anyproduct.mkofman.people.aws.dev/leo_visions-Id1zKguVcU0-unsplash.jpg",
  //     "12": "https://anyproduct.mkofman.people.aws.dev/lisette-harzing-HsV938kchb0-unsplash.jpg",
  //   },
  //   3: {
  //     "13": "https://anyproduct.mkofman.people.aws.dev/loow-invernissi-Vvaq9UalaBY-unsplash.jpg",
  //     "14": "https://anyproduct.mkofman.people.aws.dev/lucas-santos-Z-6lf1EgbJg-unsplash.jpg",
  //     "15": "https://anyproduct.mkofman.people.aws.dev/nicolas-baumgartner-woz-YSeU6BU-unsplash.jpg",
  //     "16": "https://anyproduct.mkofman.people.aws.dev/nik-Geu-i5VvI1A-unsplash.jpg",
  //     "17": "https://anyproduct.mkofman.people.aws.dev/nipyata-RmxzH3S0F4o-unsplash.jpg",
  //     "18": "https://anyproduct.mkofman.people.aws.dev/paul-bill-6bzHYJ799pE-unsplash.jpg",
  //   },
  //   4: {
  //     "19": "https://anyproduct.mkofman.people.aws.dev/paul-bill-J04u1Er5IgA-unsplash.jpg",
  //     "20": "https://anyproduct.mkofman.people.aws.dev/pierre-chatel-innocenti-cT-f5HbyB80-unsplash.jpg",
  //     "21": "https://anyproduct.mkofman.people.aws.dev/ryunosuke-kikuno-Fc-6aFuKtE8-unsplash.jpg",
  //     "22": "https://anyproduct.mkofman.people.aws.dev/sarah-j-jyCgF_RD4a0-unsplash.jpg",
  //     "23": "https://anyproduct.mkofman.people.aws.dev/sincerely-media-dsTo2aTiJFY-unsplash.jpg",
  //     "24": "https://anyproduct.mkofman.people.aws.dev/stephanie-watters-flores-clEmzwXbOdg-unsplash.jpg",
  //   },
  //   5: {
  //     "25": "https://anyproduct.mkofman.people.aws.dev/tao-yuan-tOWZ1lneRxE-unsplash.jpg",
  //     "26": "https://anyproduct.mkofman.people.aws.dev/valentin-petkov-hLlJ0PZZc48-unsplash.jpg",
  //     "27": "https://anyproduct.mkofman.people.aws.dev/viktor-bystrov-b9PU1YYwvKU-unsplash.jpg",
  //     "28": "https://anyproduct.mkofman.people.aws.dev/wilmer-martinez-8WR86Z_mLms-unsplash.jpg",
  //     "29": "https://anyproduct.mkofman.people.aws.dev/yazid-n-sQVu2sI12dc-unsplash.jpg",
  //     "30": "https://anyproduct.mkofman.people.aws.dev/yifei-chen-D3A50t283ck-unsplash.jpg",
  //   },
  //   6: {
  //     "31": "https://anyproduct.mkofman.people.aws.dev/yura-timoshenko-ynbMXmcToRs-unsplash.jpg",
  //   },
  // };

  const imageDictionary: ImageDict = {
    1: {
      "1": "https://anyproduct.mkofman.people.aws.dev/annie-spratt-Jr8byYZmTTU-unsplash.jpg",
      "2": "https://anyproduct.mkofman.people.aws.dev/arad-adiban-VY2H8fA4cUM-unsplash.jpg",
      "3": "https://anyproduct.mkofman.people.aws.dev/david-clode-0izux0eMf28-unsplash.jpg",
    },
    2: {
      "4": "https://anyproduct.mkofman.people.aws.dev/faisal-alhassan-QLQlcMCUXkw-unsplash.jpg",
      "5": "https://anyproduct.mkofman.people.aws.dev/ines-pimentel-opkaRk20tAw-unsplash.jpg",
      "6": "https://anyproduct.mkofman.people.aws.dev/jason-goodman-Oalh2MojUuk-unsplash.jpg",
    },
    3: {
      "7": "https://anyproduct.mkofman.people.aws.dev/joen-patrick-caagbay-Qe8EBN9U44k-unsplash.jpg",
      "8": "https://anyproduct.mkofman.people.aws.dev/juliana-araujo-the-artist--l_EZkgghrg-unsplash.jpg",
      "9": "https://anyproduct.mkofman.people.aws.dev/karen-powers-QjQU3Sa7Eas-unsplash.jpg",
    },
    4: {
      "10": "https://anyproduct.mkofman.people.aws.dev/katie-gerrard-W5FtVwjaJQM-unsplash.jpg",
      "11": "https://anyproduct.mkofman.people.aws.dev/leo_visions-Id1zKguVcU0-unsplash.jpg",
      "12": "https://anyproduct.mkofman.people.aws.dev/lisette-harzing-HsV938kchb0-unsplash.jpg",
    },
    5: {
      "13": "https://anyproduct.mkofman.people.aws.dev/loow-invernissi-Vvaq9UalaBY-unsplash.jpg",
      "14": "https://anyproduct.mkofman.people.aws.dev/lucas-santos-Z-6lf1EgbJg-unsplash.jpg",
      "15": "https://anyproduct.mkofman.people.aws.dev/nicolas-baumgartner-woz-YSeU6BU-unsplash.jpg",
    },
    6: {
      "16": "https://anyproduct.mkofman.people.aws.dev/nik-Geu-i5VvI1A-unsplash.jpg",
      "17": "https://anyproduct.mkofman.people.aws.dev/nipyata-RmxzH3S0F4o-unsplash.jpg",
      "18": "https://anyproduct.mkofman.people.aws.dev/paul-bill-6bzHYJ799pE-unsplash.jpg",
    },
    7: {
      "19": "https://anyproduct.mkofman.people.aws.dev/paul-bill-J04u1Er5IgA-unsplash.jpg",
      "20": "https://anyproduct.mkofman.people.aws.dev/pierre-chatel-innocenti-cT-f5HbyB80-unsplash.jpg",
      "21": "https://anyproduct.mkofman.people.aws.dev/ryunosuke-kikuno-Fc-6aFuKtE8-unsplash.jpg",
    },
    8: {
      "22": "https://anyproduct.mkofman.people.aws.dev/sarah-j-jyCgF_RD4a0-unsplash.jpg",
      "23": "https://anyproduct.mkofman.people.aws.dev/sincerely-media-dsTo2aTiJFY-unsplash.jpg",
      "24": "https://anyproduct.mkofman.people.aws.dev/stephanie-watters-flores-clEmzwXbOdg-unsplash.jpg",
    },
    9: {
      "25": "https://anyproduct.mkofman.people.aws.dev/tao-yuan-tOWZ1lneRxE-unsplash.jpg",
      "26": "https://anyproduct.mkofman.people.aws.dev/valentin-petkov-hLlJ0PZZc48-unsplash.jpg",
      "27": "https://anyproduct.mkofman.people.aws.dev/viktor-bystrov-b9PU1YYwvKU-unsplash.jpg",
    },
    10: {
      "28": "https://anyproduct.mkofman.people.aws.dev/wilmer-martinez-8WR86Z_mLms-unsplash.jpg",
      "29": "https://anyproduct.mkofman.people.aws.dev/yazid-n-sQVu2sI12dc-unsplash.jpg",
      "30": "https://anyproduct.mkofman.people.aws.dev/yifei-chen-D3A50t283ck-unsplash.jpg",
    },
    11: {
      "31": "https://anyproduct.mkofman.people.aws.dev/yura-timoshenko-ynbMXmcToRs-unsplash.jpg",
    },
  };

  const images = imageDictionary[page] || {};

  const goToNextPage = () => {
    if (imageDictionary[page + 1]) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <h1>Gallery</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
        }}
      >
        {Object.entries(images).map(([id, url]) => (
          <div key={id}>
            <img
              src={encodeURI(url)}
              alt={`Image ${id}`}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={goToPreviousPage} disabled={page <= 1}>
          Previous
        </button>
        <button onClick={goToNextPage} disabled={!imageDictionary[page + 1]}>
          Next
        </button>
      </div>
      <div className="card">
        <p>Page: {page}</p>
      </div>
    </>
  );
};

export default Gallery;
