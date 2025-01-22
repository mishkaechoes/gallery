import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 1000 }, // Ramp-up to 1,000 users over 1 minute
    { duration: '3m', target: 5000 }, // Ramp-up to 5,000 users over 3 minutes
    { duration: '3m', target: 10000 }, // Ramp-up to 10,000 users over 3 minutes
    { duration: '5m', target: 10000 }, // Stay at 10,000 users for 5 minutes
    { duration: '2m', target: 0 }, // Ramp-down to 0 users over 2 minutes
  ],
};

export default function () {
  const url = `https://anyproduct.mkofman.people.aws.dev?nocache=${Date.now()}`;
  const res = http.get(url);

  // Validate response status
  if (res.status !== 200) {
    console.error(`Unexpected response status: ${res.status}`);
  }

  // Smaller pause between requests
  sleep(0.2); // Pause for 200 milliseconds
}
