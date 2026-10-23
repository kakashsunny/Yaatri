/**
 * YAATRI iCALENDAR EXPORT ENGINE
 * Generates RFC 5545 standard .ics calendar files so travelers can import
 * their complete multi-day Karnataka itinerary into Google Calendar, Apple Calendar, or Outlook.
 */

import { ItineraryResponse } from '../types/itinerary.ts';

/**
 * Formats a JavaScript Date object into standard iCalendar UTC timestamp: YYYYMMDDTHHmmSSZ
 */
function formatICalDate(date: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}

/**
 * Sanitizes text strings for .ics format (escaping commas, semicolons, and newlines)
 */
function cleanICalText(str: string): string {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\n|\r/g, '\\n');
}

/**
 * Generates an .ics string and triggers a browser file download
 *
 * @param itinerary - The complete ItineraryResponse object
 * @param lang - 'en' | 'kn' language preference
 */
export function exportItineraryToICal(itinerary: ItineraryResponse, lang: 'en' | 'kn'): void {
  const title = lang === 'kn' && itinerary.title_kannada ? itinerary.title_kannada : itinerary.title;
  const now = new Date();
  const stamp = formatICalDate(now);

  // Default start date: tomorrow morning at 08:30 AM local time
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  startDate.setHours(8, 30, 0, 0);

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Yaatri//Karnataka AI Travel Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${cleanICalText(title)}`,
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  itinerary.days.forEach((day, dayIndex) => {
    const dayTheme = lang === 'kn' && day.theme_kannada ? day.theme_kannada : day.theme;

    // Approximate stop start times across the day
    const hourOffsets = [9, 12, 15, 18, 20];

    day.locations.forEach((loc, locIndex) => {
      const locName = lang === 'kn' && loc.name_kannada ? loc.name_kannada : loc.name;
      const locDesc = lang === 'kn' && loc.description_kannada ? loc.description_kannada : loc.description;
      const durationHours = loc.duration_hours || 2;

      // Calculate start and end datetime
      const eventStart = new Date(startDate);
      eventStart.setDate(startDate.getDate() + dayIndex);
      const startHour = hourOffsets[locIndex % hourOffsets.length];
      eventStart.setHours(startHour, 0, 0, 0);

      const eventEnd = new Date(eventStart);
      eventEnd.setHours(eventStart.getHours() + durationHours);

      const uid = `yaatri-${itinerary.title.toLowerCase().replace(/[^a-z0-9]/g, '')}-d${day.day}-s${locIndex}-${Date.now()}@yaatri.karnataka`;

      let description = `${locDesc}\\n\\nTheme: ${dayTheme}\\nEst. Duration: ${durationHours}h`;
      if (loc.tip) {
        description += `\\nInsider Tip: ${loc.tip}`;
      }
      if (day.food_recommendation) {
        description += `\\nRecommended Delicacy: ${day.food_recommendation}`;
      }
      description += '\\n\\nCrafted by Yaatri (ಯಾತ್ರಿ) - Karnataka AI Travel Planner';

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${stamp}`);
      lines.push(`DTSTART:${formatICalDate(eventStart)}`);
      lines.push(`DTEND:${formatICalDate(eventEnd)}`);
      lines.push(`SUMMARY:${cleanICalText(`[Day ${day.day}] ${locName}`)}`);
      lines.push(`DESCRIPTION:${cleanICalText(description)}`);
      lines.push(`LOCATION:${cleanICalText(locName + ', Karnataka, India')}`);

      if (typeof loc.lat === 'number' && typeof loc.lng === 'number' && !isNaN(loc.lat) && !isNaN(loc.lng)) {
        lines.push(`GEO:${loc.lat.toFixed(6)};${loc.lng.toFixed(6)}`);
      }

      lines.push('STATUS:CONFIRMED');
      lines.push('TRANSP:OPAQUE');
      lines.push('END:VEVENT');
    });
  });

  lines.push('END:VCALENDAR');

  const icsContent = lines.join('\r\n');
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const safeFilename = `${itinerary.title.replace(/[^a-zA-Z0-9]/g, '_')}_Yaatri_Calendar.ics`;
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', safeFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
