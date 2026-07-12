// Currency list, locale-based default detection, and formatting helpers.

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  { code: "THB", symbol: "฿", name: "Thai Baht" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso" },
  { code: "KRW", symbol: "₩", name: "South Korean Won" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
  { code: "TWD", symbol: "NT$", name: "Taiwan Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "AED", symbol: "AED", name: "UAE Dirham" },
  { code: "SAR", symbol: "SAR", name: "Saudi Riyal" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "DKK", symbol: "kr", name: "Danish Krone" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty" },
];

// Maps ISO-3166 region codes (from the user's browser locale) to a default currency code.
const REGION_TO_CURRENCY: Record<string, string> = {
  MY: "MYR",
  US: "USD",
  SG: "SGD",
  GB: "GBP",
  JP: "JPY",
  CN: "CNY",
  IN: "INR",
  ID: "IDR",
  TH: "THB",
  VN: "VND",
  PH: "PHP",
  KR: "KRW",
  AU: "AUD",
  NZ: "NZD",
  CA: "CAD",
  HK: "HKD",
  TW: "TWD",
  CH: "CHF",
  AE: "AED",
  SA: "SAR",
  PK: "PKR",
  BD: "BDT",
  ZA: "ZAR",
  NG: "NGN",
  BR: "BRL",
  MX: "MXN",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  RU: "RUB",
  TR: "TRY",
  PL: "PLN",
  DE: "EUR",
  FR: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  IE: "EUR",
  PT: "EUR",
  FI: "EUR",
  AT: "EUR",
  BE: "EUR",
};

export function getCurrency(code: string): Currency {
  return (
    CURRENCIES.find((c) => c.code === code) ?? {
      code,
      symbol: code,
      name: code,
    }
  );
}

/** Detects a sensible default currency from the user's browser/OS locale. */
export function detectDefaultCurrency(): string {
  try {
    const locales =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language];

    for (const loc of locales) {
      const region: string | undefined = new Intl.Locale(loc).maximize().region;
      if (region && REGION_TO_CURRENCY[region]) {
        return REGION_TO_CURRENCY[region];
      }
    }
  } catch {
    // Intl.Locale unsupported — fall through to default.
  }
  return "USD";
}

/** Formats an amount with the given currency's symbol, always to 2 decimal places. */
export function formatCurrency(amount: number, currencyCode: string): string {
  const { symbol } = getCurrency(currencyCode);
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return `${symbol} ${safeAmount.toFixed(2)}`;
}

export function formatSignedCurrency(
  amount: number,
  currencyCode: string,
): string {
  const sign = amount > 0 ? "+" : amount < 0 ? "−" : "";
  return `${sign}${formatCurrency(Math.abs(amount), currencyCode)}`;
}
