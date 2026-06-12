import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

const errorRate = new Rate("errors");
const responseTime = new Trend("response_time");

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "1m", target: 50 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    errors: ["rate<0.1"],
    response_time: ["p(95)<2000"],
    http_req_failed: ["rate<0.05"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const payload = JSON.stringify({
    name: `Load Test User ${__VU}`,
    email: `loadtest${__VU}@example.com`,
    message: "Test message from k6 load test - ".repeat(10),
    fax: "",
    website: "",
    formTimestamp: Date.now() - 5000,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      Origin: BASE_URL,
    },
  };

  const res = http.post(`${BASE_URL}/api/contact`, payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "status is not 429": (r) => r.status !== 429,
    "response time < 2000ms": (r) => r.timings.duration < 2000,
  });

  errorRate.add(res.status !== 200);
  responseTime.add(res.timings.duration);

  sleep(1);
}
