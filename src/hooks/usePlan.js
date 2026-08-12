import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const STORAGE_KEY = "askHerOut:plan";

function readStoredPlan() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStoredPlan(plan) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch {
    // sessionStorage unavailable — non-critical, the flow still works via
    // react-router state for a single-session walkthrough.
  }
}

/**
 * Tracks { name, day, place } across the Ask -> Plan -> Celebrate flow.
 * - `name` is seeded from the ?name= URL query param on first load, so the
 *   same page can be shared/reused for different people.
 * - Everything is mirrored to sessionStorage so a refresh on /plan or
 *   /celebrate doesn't lose progress.
 */
export function usePlan() {
  const [searchParams] = useSearchParams();
  const [plan, setPlan] = useState(() => {
    const stored = readStoredPlan();
    const nameFromUrl = searchParams.get("name")?.trim();
    return {
      name: nameFromUrl || stored.name || "",
      day: stored.day || "",
      place: stored.place || "",
    };
  });

  useEffect(() => {
    writeStoredPlan(plan);
  }, [plan]);

  const updatePlan = useCallback((updates) => {
    setPlan((prev) => ({ ...prev, ...updates }));
  }, []);

  return [plan, updatePlan];
}
