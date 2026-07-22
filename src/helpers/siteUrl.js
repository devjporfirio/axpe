
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_FRONT_URL ||
  "https://www.axpe.com.br"
).replace(/\/$/, "");

export default SITE_URL;
