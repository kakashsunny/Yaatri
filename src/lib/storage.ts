/**
 * YAATRI STORAGE ENGINE
 * Robust localStorage wrapper with graceful in-memory fallback
 * for iframe environments where third-party localStorage might be restricted.
 */

import { ItineraryResponse } from '../types/itinerary.ts';

export interface SavedTripEntry {
  id: string;
  createdAt: string;
  title: string;
  titleKannada?: string;
  city: string;
  daysCount: number;
  totalBudgetInr: number;
  itinerary: ItineraryResponse;
}

export interface StoredPackingItem {
  id: string;
  category: 'clothing' | 'nature' | 'coastal' | 'gadgets';
  labelEn: string;
  labelKn: string;
  checked: boolean;
  essential?: boolean;
}

export interface StoredExpenseEntry {
  id: string;
  category: 'stay' | 'transport' | 'food' | 'tickets' | 'shopping';
  title: string;
  amountInr: number;
}

// In-memory fallback if localStorage throws SecurityError in iframes
const memoryStore: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {
    // Fallback to memoryStore
  }
  return memoryStore[key] || null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {
    // Fallback to memoryStore
  }
  memoryStore[key] = value;
}

function safeRemoveItem(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (e) {
    // Fallback to memoryStore
  }
  delete memoryStore[key];
}

// === SAVED TRIPS VAULT ===

const SAVED_TRIPS_KEY = 'yaatri_saved_trips_v1';
const CURRENT_ITINERARY_KEY = 'yaatri_current_itinerary_v1';

/**
 * Retrieves all saved trips from storage
 */
export function getSavedTrips(): SavedTripEntry[] {
  try {
    const raw = safeGetItem(SAVED_TRIPS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

/**
 * Saves a trip to local storage
 */
export function saveTripToVault(itinerary: ItineraryResponse): SavedTripEntry {
  const existing = getSavedTrips();
  const id = `trip_${Date.now()}`;
  const firstLocationCity = itinerary.days[0]?.locations[0]?.name || 'Karnataka';

  const newEntry: SavedTripEntry = {
    id,
    createdAt: new Date().toISOString(),
    title: itinerary.title,
    titleKannada: itinerary.title_kannada,
    city: firstLocationCity,
    daysCount: itinerary.days.length,
    totalBudgetInr: itinerary.total_estimated_budget_inr,
    itinerary,
  };

  // Avoid duplicate identical titles
  const updated = [newEntry, ...existing.filter((item) => item.title !== itinerary.title)].slice(0, 20);
  safeSetItem(SAVED_TRIPS_KEY, JSON.stringify(updated));
  return newEntry;
}

/**
 * Deletes a trip by id from storage
 */
export function deleteTripFromVault(id: string): SavedTripEntry[] {
  const existing = getSavedTrips();
  const filtered = existing.filter((t) => t.id !== id);
  safeSetItem(SAVED_TRIPS_KEY, JSON.stringify(filtered));
  return filtered;
}

/**
 * Persists the current active itinerary
 */
export function setCurrentItineraryInStorage(itinerary: ItineraryResponse | null): void {
  if (!itinerary) {
    safeRemoveItem(CURRENT_ITINERARY_KEY);
    return;
  }
  try {
    safeSetItem(CURRENT_ITINERARY_KEY, JSON.stringify(itinerary));
  } catch (e) {
    // safe fallback
  }
}

/**
 * Retrieves the persisted active itinerary if present
 */
export function getCurrentItineraryFromStorage(): ItineraryResponse | null {
  try {
    const raw = safeGetItem(CURRENT_ITINERARY_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

// === PACKING LIST PERSISTENCE ===

const PACKING_KEY = 'yaatri_packing_items_v1';

export function getStoredPackingList(): StoredPackingItem[] | null {
  try {
    const raw = safeGetItem(PACKING_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function setStoredPackingList(items: StoredPackingItem[]): void {
  safeSetItem(PACKING_KEY, JSON.stringify(items));
}

// === EXPENSE TRACKER PERSISTENCE ===

const EXPENSES_KEY_PREFIX = 'yaatri_expenses_';

export function getStoredExpenses(tripKey: string): StoredExpenseEntry[] | null {
  try {
    const raw = safeGetItem(`${EXPENSES_KEY_PREFIX}${tripKey}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function setStoredExpenses(tripKey: string, expenses: StoredExpenseEntry[]): void {
  safeSetItem(`${EXPENSES_KEY_PREFIX}${tripKey}`, JSON.stringify(expenses));
}

// === USER PREFERENCES ===

const LANG_KEY = 'yaatri_user_lang_pref';

export function getStoredLanguage(): 'en' | 'kn' {
  const stored = safeGetItem(LANG_KEY);
  return stored === 'kn' ? 'kn' : 'en';
}

export function setStoredLanguage(lang: 'en' | 'kn'): void {
  safeSetItem(LANG_KEY, lang);
}
