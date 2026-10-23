import { jsPDF } from 'jspdf';
import { ItineraryResponse } from '../types/itinerary.ts';

export function exportItineraryToPDF(itinerary: ItineraryResponse, lang: 'en' | 'kn' = 'en'): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 20;

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 18) {
      doc.addPage();
      yPos = 20;
      addPageHeader();
    }
  };

  const addPageHeader = () => {
    // Subtle top running header on subsequent pages
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text('Yaatri (ಯಾತ್ರಿ) — Karnataka AI Travel Itinerary', margin, 12);
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.2);
    doc.line(margin, 14, pageWidth - margin, 14);
  };

  // 1. Cover / Top Header Banner
  doc.setFillColor(19, 19, 26);
  doc.rect(margin, yPos, contentWidth, 26, 'F');

  // Saffron left accent bar
  doc.setFillColor(232, 93, 4);
  doc.rect(margin, yPos, 4, 26, 'F');

  // Title inside banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('YAATRI  |  ಯಾತ್ರಿ', margin + 9, yPos + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 214, 10); // Gold
  doc.text('Karnataka AI Travel Planner • Offline Itinerary', margin + 9, yPos + 18);

  yPos += 34;

  // 2. Trip Title & Overview
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(20, 20, 25);
  const titleLines = doc.splitTextToSize(itinerary.title, contentWidth);
  doc.text(titleLines, margin, yPos);
  yPos += titleLines.length * 7 + 2;

  // Summary box
  doc.setFillColor(248, 249, 250);
  doc.setDrawColor(232, 93, 4);
  doc.setLineWidth(0.3);

  const summaryLines = doc.splitTextToSize(itinerary.summary, contentWidth - 8);
  const summaryBoxHeight = summaryLines.length * 4.5 + 8;
  doc.roundedRect(margin, yPos, contentWidth, summaryBoxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text(summaryLines, margin + 4, yPos + 6);

  yPos += summaryBoxHeight + 6;

  // 3. Key Metrics Strip (Budget, Days, Best Time)
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(margin, yPos, contentWidth, 14, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(232, 93, 4); // Saffron
  doc.text(`Total Budget: INR ${itinerary.total_estimated_budget_inr.toLocaleString('en-IN')}`, margin + 4, yPos + 9);

  doc.setTextColor(40, 40, 40);
  doc.text(`Duration: ${itinerary.days.length} Days`, margin + 65, yPos + 9);
  doc.text(`Best Season: ${itinerary.best_time_to_visit}`, margin + 115, yPos + 9);

  yPos += 20;

  // 4. Day-by-Day Schedule
  itinerary.days.forEach((day) => {
    checkPageBreak(35);

    // Day Section Header
    doc.setFillColor(232, 93, 4);
    doc.roundedRect(margin, yPos, contentWidth, 8, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`DAY ${day.day}: ${day.theme.toUpperCase()}`, margin + 4, yPos + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 214, 10);
    doc.text(`Est. INR ${day.estimated_daily_budget_inr}`, pageWidth - margin - 35, yPos + 5.5);

    yPos += 12;

    // Day Attractions
    day.locations.forEach((loc, locIndex) => {
      checkPageBreak(25);

      // Location card container
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(220, 224, 230);
      doc.setLineWidth(0.2);

      const descLines = doc.splitTextToSize(loc.description, contentWidth - 10);
      const tipLines = loc.tip ? doc.splitTextToSize(`Local Tip: ${loc.tip}`, contentWidth - 10) : [];
      const cardHeight = 10 + descLines.length * 4.2 + (tipLines.length ? tipLines.length * 4 + 4 : 0);

      doc.roundedRect(margin, yPos, contentWidth, cardHeight, 1.5, 1.5, 'D');

      // Stop badge & Place name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(20, 20, 20);
      doc.text(`${locIndex + 1}. ${loc.name}`, margin + 4, yPos + 5.5);

      // Category and duration info on right
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(110, 110, 110);
      const costStr = loc.estimated_cost_inr === 0 ? 'Free Entry' : `INR ${loc.estimated_cost_inr}`;
      doc.text(`[${loc.type.toUpperCase()}] • ${loc.duration_hours} hrs • ${costStr}`, pageWidth - margin - 60, yPos + 5.5);

      // Description
      doc.setFontSize(8.5);
      doc.setTextColor(60, 60, 60);
      doc.text(descLines, margin + 4, yPos + 10);

      // Tip if available
      if (tipLines.length > 0) {
        const tipY = yPos + 10 + descLines.length * 4.2;
        doc.setFillColor(254, 249, 195);
        doc.roundedRect(margin + 3, tipY - 2.5, contentWidth - 6, tipLines.length * 4 + 2, 1, 1, 'F');

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(133, 77, 14);
        doc.text(tipLines, margin + 5, tipY + 1);
      }

      yPos += cardHeight + 4;
    });

    // Daily Food Recommendation
    if (day.food_recommendation) {
      checkPageBreak(14);
      doc.setFillColor(254, 243, 199);
      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(0.2);
      doc.roundedRect(margin, yPos, contentWidth, 10, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(180, 83, 9);
      doc.text('FOOD HIGHLIGHT:', margin + 4, yPos + 6);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 40, 10);
      const foodText = doc.splitTextToSize(day.food_recommendation, contentWidth - 45);
      doc.text(foodText, margin + 35, yPos + 6);

      yPos += 14;
    }

    yPos += 4;
  });

  // 5. Packing Tips & Cultural Advice
  if (itinerary.packing_tips?.length) {
    checkPageBreak(40);

    doc.setFillColor(243, 244, 246);
    doc.roundedRect(margin, yPos, contentWidth, 7, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text('PACKING & TRAVEL ESSENTIALS', margin + 4, yPos + 5);

    yPos += 11;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(60, 60, 60);

    itinerary.packing_tips.forEach((tip) => {
      checkPageBreak(7);
      const tipLines = doc.splitTextToSize(`• ${tip}`, contentWidth - 6);
      doc.text(tipLines, margin + 4, yPos);
      yPos += tipLines.length * 4.2;
    });

    yPos += 6;
  }

  // 6. Running Page Numbers on all pages
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Yaatri (ಯಾತ್ರಿ) • Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  // Generate and save file
  const sanitizedTitle = (itinerary.title || 'Karnataka_Trip')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 30);

  doc.save(`Yaatri_${sanitizedTitle}_Itinerary.pdf`);
}
