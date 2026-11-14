const SHEET_BASE =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdmkCRRZ7U_i7mxZvl5R-pFvQCebJa000IkerBkFhxt2e36QSJWeUJSEkK7vbRsTATTVs3Mbm6Hyj5/pub";

export const SHEET_TABS = {
  metrics: `${SHEET_BASE}?gid=1703766040&single=true&output=csv`,
  topPosts: `${SHEET_BASE}?gid=1767961707&single=true&output=csv`,
} as const;

export function parseNumber(raw: string | undefined): number | null {
  if (raw == null) return null;
  const trimmed = raw.trim().replace(/,/g, "");
  if (!trimmed) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (ch !== "\r") {
      cell += ch;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

export function csvToObjects(text: string): Record<string, string>[] {
  const table = parseCsv(text);
  if (table.length < 2) return [];
  const headers = table[0].map((h) => h.trim().toLowerCase());
  return table.slice(1).map((cells) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = cells[i] ?? "";
    });
    return obj;
  });
}

export async function fetchSheetCsv(url: string): Promise<string> {
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "text/csv,text/plain,*/*" },
  });
  if (!res.ok) {
    throw new Error(`Sheet CSV fetch failed: ${res.status}`);
  }
  return res.text();
}
