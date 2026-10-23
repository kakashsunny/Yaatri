import { ItineraryResponse, PlanTripRequest, PlaceType } from '../types/itinerary.ts';

export function generateFallbackItinerary(req: PlanTripRequest): ItineraryResponse {
  const { city, days, budget, interests } = req;
  const isKn = req.language === 'kn';

  // Comprehensive database of 16 authentic Karnataka hubs and places
  const cityThemes: Record<string, { en: string; kn: string; baseLat: number; baseLng: number }> = {
    Bangalore: { en: 'Garden City & Heritage Blend', kn: 'ಉದ್ಯಾನ ನಗರಿ ಮತ್ತು ಪರಂಪರೆಯ ಸಂಗಮ', baseLat: 12.9716, baseLng: 77.5946 },
    Mysuru: { en: 'Royal Grandeur & Silk Culture', kn: 'ರಾಜಮನೆತನದ ವೈಭವ ಮತ್ತು ರೇಷ್ಮೆ ಸಂಸ್ಕೃತಿ', baseLat: 12.2958, baseLng: 76.6394 },
    Mangaluru: { en: 'Coastal Flavors & Serene Shores', kn: 'ಕರಾವಳಿ ರುಚಿಗಳು ಮತ್ತು ಶಾಂತ ಕಡಲತೀರಗಳು', baseLat: 12.9141, baseLng: 74.8560 },
    Hubli: { en: 'Heart of North Karnataka Heritage', kn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಪರಂಪರೆಯ ಹೃದಯ', baseLat: 15.3647, baseLng: 75.1240 },
    Belagavi: { en: 'Forts, Waterfalls & Kundas', kn: 'ಕೋಟೆಗಳು, ಜಲಪಾತಗಳು ಮತ್ತು ಕುಂದಾ', baseLat: 15.8497, baseLng: 74.4977 },
    Hampi: { en: 'Vijayanagara Empire Wonders', kn: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಅಪ್ರತಿಮ ಅದ್ಭುತಗಳು', baseLat: 15.3350, baseLng: 76.4600 },
    Chikmagalur: { en: 'Coffee Hills & Cloud Treks', kn: 'ಕಾಫಿ ಗಿರಿಧಾಮಗಳು ಮತ್ತು ಮೋಡಗಳ ಚಾರಣ', baseLat: 13.3161, baseLng: 75.7720 },
    Gokarna: { en: 'Sacred Shores & Coastal Cliffs', kn: 'ಪವಿತ್ರ ತೀರಗಳು ಮತ್ತು ಕರಾವಳಿಯ ಗುಡ್ಡಗಳು', baseLat: 14.5479, baseLng: 74.3188 },
    Udupi: { en: 'Temple Heritage & Volcanic Islands', kn: 'ದೇವಾಲಯದ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಜ್ವಾಲಾಮುಖಿ ದ್ವೀಪಗಳು', baseLat: 13.3409, baseLng: 74.7421 },
    Badami: { en: 'Cradle of Chalukyan Architecture', kn: 'ಚಾಲುಕ್ಯ ಶಿಲ್ಪಕಲೆಯ ತೊಟ್ಟಿಲು', baseLat: 15.9186, baseLng: 75.6766 },
    Belur: { en: 'Jewel of Hoysala Architecture', kn: 'ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆಯ ಕಿರೀಟ', baseLat: 13.1623, baseLng: 75.8576 },
    Murudeshwar: { en: 'Colossal Shiva Shrine & Arabian Waters', kn: 'ಮಹಾ ಶಿವನ ಸನ್ನಿಧಿ ಮತ್ತು ಅರಬ್ಬೀ ಕಡಲ ತೀರ', baseLat: 14.0940, baseLng: 74.4899 },
    Dandeli: { en: 'Raging Rapids & Hornbill Rainforests', kn: 'ದಾಂಡೇಲಿಯ ಕಲಿ ನದಿಯ ರಾಫ್ಟಿಂಗ್ ಮತ್ತು ದಟ್ಟ ಅರಣ್ಯ', baseLat: 15.2417, baseLng: 74.6288 },
    Bandipur: { en: 'Elephant Corridors & Jungle Safaris', kn: 'ಆನೆ ಕಾರಿಡಾರ್ ಮತ್ತು ಹುಲಿ ಸಂರಕ್ಷಿತಾರಣ್ಯ', baseLat: 11.6664, baseLng: 76.6291 },
    Agumbe: { en: 'Cherrapunji of the South & Cloud Valleys', kn: 'ದಕ್ಷಿಣದ ಚಿರಾಪುಂಜಿ ಮತ್ತು ಮಂಜಿನ ಕಣಿವೆಗಳು', baseLat: 13.5074, baseLng: 75.0931 },
    Vijayapura: { en: 'Adil Shahi Forts & Whispering Domes', kn: 'ಆದಿಲ್ ಶಾಹಿ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಪಿಸುಗುಟ್ಟುವ ಗೋಲಗುಮ್ಮಟ', baseLat: 16.8302, baseLng: 75.7100 },
  };

  const samplePlacesByCity: Record<string, Array<{
    name: string;
    name_kannada: string;
    description: string;
    description_kannada: string;
    type: PlaceType;
    duration_hours: number;
    estimated_cost_inr: number;
    tip: string;
    tip_kannada: string;
    lat: number;
    lng: number;
  }>> = {
    Bangalore: [
      {
        name: 'Bangalore Palace & Grounds',
        name_kannada: 'ಬೆಂಗಳೂರು ಅರಮನೆ',
        description: 'Tudor-style royal estate built in 1878 with ornate wooden carvings, gothic windows, and sprawling courtyards.',
        description_kannada: '1878 ರಲ್ಲಿ ಟ್ಯೂಡರ್ ಶೈಲಿಯಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಭವ್ಯ ಅರಮನೆ, ಸುಂದರ ಮರದ ಕೆತ್ತನೆಗಳು ಮತ್ತು ಹಸಿರು ತೋಟಗಳು.',
        type: 'heritage',
        duration_hours: 2.5,
        estimated_cost_inr: Math.min(budget * 0.25, 450),
        tip: 'Opt for the audio guide; it reveals hidden rooms and royal carriage secrets.',
        tip_kannada: 'ಆಡಿಯೊ ಗೈಡ್ ಬಳಸಿ; ಇದು ಗುಪ್ತ ಕೋಣೆಗಳು ಮತ್ತು ರಥದ ಇತಿಹಾಸವನ್ನು ವಿವರಿಸುತ್ತದೆ.',
        lat: 12.9988,
        lng: 77.5921
      },
      {
        name: 'Cubbon Park & Bamboo Groves',
        name_kannada: 'ಕಬ್ಬನ್ ಪಾರ್ಕ್',
        description: '300-acre historic lung space dotted with century-old mahogany trees, Victorian statues, and the State Central Library.',
        description_kannada: 'ಶತಮಾನಗಳಷ್ಟು ಹಳೆಯ ಮರಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಗ್ರಂಥಾಲಯವನ್ನು ಹೊಂದಿರುವ 300 ಎಕರೆಗಳ ಸುಂದರ ಉದ್ಯಾನ.',
        type: 'nature',
        duration_hours: 2,
        estimated_cost_inr: 0,
        tip: 'Visit before 8 AM to join local birdwatchers and grab filter coffee outside.',
        tip_kannada: 'ಬೆಳಗ್ಗೆ 8 ಗಂಟೆಯ ಮೊದಲು ಭೇಟಿ ನೀಡಿ ಶುದ್ಧ ಗಾಳಿ ಮತ್ತು ಫಿಲ್ಟರ್ ಕಾಫಿ ಸವಿಯಿರಿ.',
        lat: 12.9763,
        lng: 77.5929
      },
      {
        name: 'Malleswaram Heritage Walk & CTR',
        name_kannada: 'ಮಲ್ಲೇಶ್ವರಂ ಮತ್ತು ಸಿಟಿಆರ್',
        description: 'Walk through traditional flower markets, temple courtyards, and taste legendary crisp Benne Masala Dosa.',
        description_kannada: 'ಸಾಂಪ್ರದಾಯಿಕ ಹೂವಿನ ಮಾರುಕಟ್ಟೆ, ದೇವಸ್ಥಾನಗಳು ಮತ್ತು ಪ್ರಸಿದ್ಧ ಬೆಣ್ಣೆ ಮಸಾಲೆ ದೋಸೆಯ ಅನುಭವ.',
        type: 'food',
        duration_hours: 2,
        estimated_cost_inr: Math.min(budget * 0.15, 200),
        tip: 'Ask for "single crisp benne dosa" with hot filter kaapi at CTR Shri Sagar.',
        tip_kannada: 'ಸಿಟಿಆರ್‌ನಲ್ಲಿ ಗರಿಗರಿಯಾದ ಬೆಣ್ಣೆ ದೋಸೆ ಜೊತೆ ಬಿಸಿ ಫಿಲ್ಟರ್ ಕಾಫಿ ಮರೆಯಬೇಡಿ.',
        lat: 13.0031,
        lng: 77.5696
      }
    ],
    Mysuru: [
      {
        name: 'Mysore Palace (Amba Vilas)',
        name_kannada: 'ಮೈಸೂರು ಅರಮನೆ (ಅಂಬಾ ವಿಲಾಸ)',
        description: 'World-renowned Indo-Saracenic palace adorned with stained glass domes, ivory doors, and golden royal throne.',
        description_kannada: 'ಇಂಡೋ-ಸಾರ್ಸೆನಿಕ್ ಶೈಲಿಯ ಜಗತ್ಪ್ರಸಿದ್ಧ ಅರಮನೆ, ಸುಂದರ ಬಣ್ಣದ ಗಾಜುಗಳು ಮತ್ತು ರಾಜ ಸಿಂಹಾಸನ.',
        type: 'heritage',
        duration_hours: 3,
        estimated_cost_inr: Math.min(budget * 0.2, 300),
        tip: 'If visiting on Sunday evening, stay for the majestic 100,000 bulb illumination.',
        tip_kannada: 'ಭಾನುವಾರ ಸಂಜೆ 7 ಗಂಟೆಗೆ 1 ಲಕ್ಷ ಬಲ್ಬ್‌ಗಳ ಅರಮನೆ ದೀಪಾಲಂಕಾರವನ್ನು ತಪ್ಪದೇ ನೋಡಿ.',
        lat: 12.3051,
        lng: 76.6551
      },
      {
        name: 'Chamundi Hills & Monolithic Nandi',
        name_kannada: 'ಚಾಮುಂಡಿ ಬೆಟ್ಟ ಮತ್ತು ಬಸವಣ್ಣ',
        description: 'Sacred hilltop shrine of Goddess Chamundeshwari with panoramic city vistas and the 16-foot monolithic granite Nandi bull.',
        description_kannada: 'ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಸ್ಥಾನ ಮತ್ತು ಬೆಟ್ಟದ ಹಾದಿಯಲ್ಲಿರುವ 16 ಅಡಿ ಎತ್ತರದ ಏಕಶಿಲಾ ಬೃಹತ್ ನಂದಿ ವಿಗ್ರಹ.',
        type: 'temple',
        duration_hours: 2.5,
        estimated_cost_inr: Math.min(budget * 0.1, 100),
        tip: 'Climb down via the 1,000 stone steps built by Dodda Devaraja Wodeyar in 1659.',
        tip_kannada: '1659 ರ ಐತಿಹಾಸಿಕ 1,000 ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲುಗಳ ಮೂಲಕ ನಡೆದು ಇಳಿಯುವುದು ಮಧುರ ಅನುಭವ.',
        lat: 12.2724,
        lng: 76.6710
      }
    ],
    Chikmagalur: [
      {
        name: 'Mullayanagiri Peak & Trek',
        name_kannada: 'ಮುಳ್ಳಯ್ಯನಗಿರಿ ಶಿಖರ & ಚಾರಣ',
        description: 'Highest peak in Karnataka at 1,930m offering breathtaking cloud-top vistas, cool mountain winds, and serene Shiva shrine at the summit.',
        description_kannada: 'ಕರ್ನಾಟಕದ ಅತ್ಯುನ್ನತ ಶಿಖರ (1,930 ಮೀಟರ್), ಮೋಡಗಳ ಸಾಗರ ಮತ್ತು ತುದಿಯಲ್ಲಿರುವ ಪುರಾತನ ತಪೋವನ.',
        type: 'adventure',
        duration_hours: 3.5,
        estimated_cost_inr: 0,
        tip: 'Reach the starting steps before 6:30 AM to catch the sea of clouds phenomenon.',
        tip_kannada: 'ಮೋಡಗಳ ಸಮುದ್ರವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಲು ಬೆಳಗ್ಗೆ 6:30 ರ ಮೊದಲು ಮೆಟ್ಟಿಲುಗಳನ್ನು ತಲುಪಿ.',
        lat: 13.3912,
        lng: 75.7208
      },
      {
        name: 'Baba Budangiri & Manikyadhara Falls',
        name_kannada: 'ಬಾಬಾ ಬುಡನ್‌ಗಿರಿ & ಮಾಣಿಕ್ಯಧಾರ ಜಲಪಾತ',
        description: 'Historic mountain range where the first seven coffee seeds were planted in India, featuring sacred caves and healing waterfall streams.',
        description_kannada: 'ಭಾರತಕ್ಕೆ ಮೊದಲ ಕಾಫಿ ಬೀಜಗಳನ್ನು ಪರಿಚಯಿಸಿದ ಪವಿತ್ರ ಗಿರಿಶ್ರೇಣಿ ಮತ್ತು ಔಷಧಿ ಗುಣವುಳ್ಳ ಮಾಣಿಕ್ಯಧಾರ ಜಲಪಾತ.',
        type: 'nature',
        duration_hours: 3,
        estimated_cost_inr: Math.min(budget * 0.1, 100),
        tip: 'Sample fresh estate roasted Arabica coffee directly from the planter kiosks along the road.',
        tip_kannada: 'ರಸ್ತೆ ಬದಿಯ ತೋಟಗಾರರ ಮಳಿಗೆಗಳಲ್ಲಿ ತಾಜಾ ಅರೇಬಿಕಾ ಕಾಫಿ ಪುಡಿಯನ್ನು ಕೊಳ್ಳಿ.',
        lat: 13.4375,
        lng: 75.7667
      }
    ],
    Gokarna: [
      {
        name: 'Om Beach & Cliff Trail Hike',
        name_kannada: 'ಗೋಕರ್ಣ ಓಂ ಬೀಚ್ & ಕ್ಲಿಫ್ ಟ್ರೆಕ್',
        description: 'Naturally formed spiritual Om-shaped coastline framed by laterite sea cliffs, crashing Arabian waves, and dolphin watching.',
        description_kannada: 'ನೈಸರ್ಗಿಕವಾಗಿ ಓಂ ಆಕಾರದಲ್ಲಿರುವ ಕರಾವಳಿ ತೀರ, ಸಮುದ್ರದ ಬಂಡೆಗಳು ಮತ್ತು ಡಾಲ್ಫಿನ್ ವೀಕ್ಷಣೆ.',
        type: 'beach',
        duration_hours: 3,
        estimated_cost_inr: Math.min(budget * 0.15, 200),
        tip: 'Trek along the scenic cliff path connecting Kudle, Om, and Half Moon beaches in the afternoon.',
        tip_kannada: 'ಕುಡ್ಲೆ ಬೀಚ್‌ನಿಂದ ಓಂ ಬೀಚ್‌ಗೆ ಬಂಡೆಗಳ ಹಾದಿಯಲ್ಲಿ ನಡೆದು ಸೂರ್ಯಾಸ್ತ ವೀಕ್ಷಿಸಿ.',
        lat: 14.5173,
        lng: 74.3168
      },
      {
        name: 'Mahabaleshwara Temple & Kotiteertha',
        name_kannada: 'ಮಹಾಬಲೇಶ್ವರ ದೇವಾಲಯ & ಕೋಟಿತೀರ್ಥ',
        description: '4th-century Classical Dravidian sacred shrine housing the revered Atmalinga, situated next to the holy temple tank.',
        description_kannada: 'ರಾವಣನಿಂದ ಪ್ರತಿಷ್ಠಾಪಿತವಾದ ಆತ್ಮಲಿಂಗವನ್ನು ಹೊಂದಿರುವ 4ನೇ ಶತಮಾನದ ಐತಿಹಾಸಿಕ ಮುಕ್ತಿ ಕ್ಷೇತ್ರ.',
        type: 'temple',
        duration_hours: 2,
        estimated_cost_inr: 0,
        tip: 'Traditional dhotis are required for men entering the inner sanctum touching the Atmalinga.',
        tip_kannada: 'ಗರ್ಭಗುಡಿಯಲ್ಲಿ ಆತ್ಮಲಿಂಗ ಸ್ಪರ್ಶಕ್ಕೆ ಸಾಂಪ್ರದಾಯಿಕ ಧೋತಿ ಕಡ್ಡಾಯ.',
        lat: 14.5428,
        lng: 74.3175
      }
    ],
    Udupi: [
      {
        name: 'Sri Krishna Matha & Kanakana Kindi',
        name_kannada: 'ಉಡುಪಿ ಶ್ರೀ ಕೃಷ್ಣ ಮಠ & ಕನಕನ ಕಿಂಡಿ',
        description: '13th-century sacred Vaishnavite pilgrimage founded by saint Madhvacharya, where Lord Krishna is worshipped through a silver-plated window.',
        description_kannada: 'ಶ್ರೀ ಮಧ್ವಾಚಾರ್ಯರಿಂದ ಸ್ಥಾಪಿತವಾದ 13ನೇ ಶತಮಾನದ ಪ್ರಸಿದ್ಧ ಮಠ ಮತ್ತು ಕನಕದಾಸರಿಗೆ ದರ್ಶನ ನೀಡಿದ ಕಿಂಡಿ.',
        type: 'temple',
        duration_hours: 2.5,
        estimated_cost_inr: 0,
        tip: 'Do not miss the legendary traditional afternoon anna-santarpana (temple lunch) served on plantain leaves.',
        tip_kannada: 'ಬಾಳೆ ಎಲೆಯಲ್ಲಿ ಉಚಿತವಾಗಿ ಬಡಿಸುವ ಸಾಂಪ್ರದಾಯಿಕ ಮಧ್ಯಾಹ್ನದ ಮಹಾ ಪ್ರಸಾದವನ್ನು ತಪ್ಪದೇ ಸವಿಯಿರಿ.',
        lat: 13.3409,
        lng: 74.7421
      },
      {
        name: "St. Mary's Island & Columnar Basalt",
        name_kannada: 'ಸೇಂಟ್ ಮೇರಿಸ್ ದ್ವೀಪ & ಬಸಾಲ್ಟ್ ಶಿಲೆಗಳು',
        description: 'National Geological Monument of unique hexagonal columnar basaltic rock formations carved by prehistoric volcanic activity in the Arabian Sea.',
        description_kannada: 'ಲಕ್ಷಾಂತರ ವರ್ಷಗಳ ಹಿಂದಿನ ಜ್ವಾಲಾಮುಖಿ ಲಾವಾರಸದಿಂದ ರೂಪಿತವಾದ ಷಟ್ಕೋನ ಸ್ತಂಭಾಕಾರದ ಕಪ್ಪು ಶಿಲೆಯ ದ್ವೀಪ.',
        type: 'nature',
        duration_hours: 3.5,
        estimated_cost_inr: Math.min(budget * 0.25, 400),
        tip: 'Take the ferry from Malpe beach jetty; remember that plastics and shells removal are strictly prohibited.',
        tip_kannada: 'ಮಲ್ಪೆ ಜೆಟ್ಟಿಯಿಂದ ಬೋಟ್ ಮೂಲಕ ತೆರಳಿ; ದ್ವೀಪದಲ್ಲಿ ಪ್ಲಾಸ್ಟಿಕ್ ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ.',
        lat: 13.3806,
        lng: 74.6732
      }
    ],
    Badami: [
      {
        name: 'Badami Cave Temples & Agastya Lake',
        name_kannada: 'ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು & ಅಗಸ್ತ್ಯ ಕೆರೆ',
        description: '6th-century rock-cut sandstone cave temples celebrating Shiva Nataraja, Vishnu avatars, and ancient Jain tirthankaras.',
        description_kannada: '6ನೇ ಶತಮಾನದ ಬಾದಾಮಿ ಚಾಲುಕ್ಯರ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಗುಹೆಗಳು ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರ.',
        type: 'heritage',
        duration_hours: 3,
        estimated_cost_inr: Math.min(budget * 0.25, 300),
        tip: 'The 18-armed Nataraja sculpture in Cave 1 demonstrates 81 distinct classical dance poses.',
        tip_kannada: 'ಗುಹೆ 1 ರ 18-ಕೈಗಳ ನಟರಾಜ ಕೆತ್ತನೆಯು 81 ಭರತನಾಟ್ಯ ಭಂಗಿಗಳನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತದೆ.',
        lat: 15.9186,
        lng: 75.6766
      },
      {
        name: 'Pattadakal UNESCO Heritage Monuments',
        name_kannada: 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ಸ್ಮಾರಕಗಳು',
        description: '7th-8th century royal coronation city where northern Nagara and southern Dravidian temple architectures converge along the Malaprabha river.',
        description_kannada: 'ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತೀಯ ವಾಸ್ತುಶಿಲ್ಪಗಳ ಅದ್ಭುತ ಸಂಗಮ ಹೊಂದಿರುವ ಚಾಲುಕ್ಯರ ಪಟ್ಟಾಭಿಷೇಕ ಕ್ಷೇತ್ರ.',
        type: 'heritage',
        duration_hours: 2.5,
        estimated_cost_inr: Math.min(budget * 0.2, 250),
        tip: 'Observe Virupaksha Temple; it served as the direct architectural inspiration for the Ellora Kailasa temple.',
        tip_kannada: 'ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯವನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಗಮನಿಸಿ; ಇದು ಎಲ್ಲೋರಾ ಕೈಲಾಸ ದೇವಾಲಯಕ್ಕೆ ಪ್ರೇರಣೆಯಾಗಿದೆ.',
        lat: 15.9490,
        lng: 75.8160
      }
    ],
    Belur: [
      {
        name: 'Belur Chennakeshava Temple',
        name_kannada: 'ಬೇಲೂರು ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ',
        description: '12th-century star-shaped soapstone Hoysala architectural marvel adorned with 42 bracket figures (Madanikas) depicting classical arts.',
        description_kannada: 'ವಿಷ್ಣುವರ್ಧನ ಮಹಾರಾಜನಿಂದ ನಿರ್ಮಿತವಾದ ನಕ್ಷತ್ರಾಕಾರದ ಪೀಠದ ಮೇಲಿರುವ ಜಗತ್ಪ್ರಸಿದ್ಧ ಶಿಲ್ಪಕಲೆಯ ರತ್ನ.',
        type: 'heritage',
        duration_hours: 3,
        estimated_cost_inr: 0,
        tip: 'Hire an authorized ASI guide to explain the mirror illusion and bead-chain carvings in the soapstone.',
        tip_kannada: 'ದರ್ಪಣ ಸುಂದರಿ ಮತ್ತು ಕಲ್ಲಿನಲ್ಲಿ ಕೆತ್ತಲಾದ ಸರಪಳಿಗಳ ರಹಸ್ಯ ತಿಳಿಯಲು ಪ್ರಮಾಣೀಕೃತ ಗೈಡ್ ಪಡೆಯಿರಿ.',
        lat: 13.1623,
        lng: 75.8576
      },
      {
        name: 'Halebidu Hoysaleshwara Temple',
        name_kannada: 'ಹಳೇಬೀಡು ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ',
        description: 'Twin-temple dedicated to Shiva boasting thousands of relief friezes of war elephants, lions, makaras, and Mahabharata epics.',
        description_kannada: 'ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ, ಸಾವಿರಾರು ಆನೆಗಳು, ಸಿಂಹಗಳು ಮತ್ತು ಪುರಾಣ ಕಥೆಗಳ ಅದ್ಭುತ ಕಲ್ಲಿನ ಕೆತ್ತನೆಗಳು.',
        type: 'heritage',
        duration_hours: 2.5,
        estimated_cost_inr: 0,
        tip: 'Look closely at the lower baseline: over 1,200 elephants are carved, and no two elephants share the same pose.',
        tip_kannada: 'ದೇವಾಲಯದ ಕೆಳಭಾಗದಲ್ಲಿರುವ 1,200 ಆನೆಗಳ ಪೈಕಿ ಯಾವುದೇ ಎರಡು ಆನೆಗಳ ಭಂಗಿ ಒಂದೇ ರೀತಿ ಇಲ್ಲ.',
        lat: 13.2139,
        lng: 75.9942
      }
    ],
    Murudeshwar: [
      {
        name: 'Murudeshwar 123-ft Shiva Statue & Temple',
        name_kannada: 'ಮುರುಡೇಶ್ವರ 123 ಅಡಿ ಶಿವನ ಪ್ರತಿಮೆ',
        description: 'World’s second-tallest Lord Shiva statue situated dramatically on Kanduka hill surrounded by Arabian sea waters on three sides.',
        description_kannada: 'ಮೂರು ಕಡೆ ಅರಬ್ಬೀ ಸಮುದ್ರದಿಂದ ಆವೃತವಾದ ಕಂದುಕ ಗಿರಿಯ ಮೇಲಿರುವ ವಿಶ್ವದ ಎರಡನೇ ಅತಿ ಎತ್ತರದ ಶಿವನ ಪ್ರತಿಮೆ.',
        type: 'temple',
        duration_hours: 3,
        estimated_cost_inr: Math.min(budget * 0.1, 100),
        tip: 'Take the elevator to the 18th floor of the 20-story Rajagopuram for an aerial sea view of the Shiva statue.',
        tip_kannada: '20 ಅಂತಸ್ತಿನ ರಾಜಗೋಪುರದ 18ನೇ ಮಹಡಿಗೆ ಲಿಫ್ಟ್ ಮೂಲಕ ತೆರಳಿ ಸಮುದ್ರ ಮತ್ತು ಶಿವನ ವಿಹಂಗಮ ನೋಟ ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.',
        lat: 14.0940,
        lng: 74.4899
      },
      {
        name: 'Netrani Island Scuba & Marine Coral',
        name_kannada: 'ನೇತ್ರಾಣಿ ದ್ವೀಪ ಸ್ಕೂಬಾ ಡೈವಿಂಗ್',
        description: 'Heart-shaped coral island 19km into the sea offering the best scuba diving and snorkeling in Karnataka with butterflyfish and turtles.',
        description_kannada: 'ಅರಬ್ಬೀ ಸಮುದ್ರದಲ್ಲಿರುವ ಹೃದಯಾಕಾರದ ಹವಳದ ದ್ವೀಪ, ಕರ್ನಾಟಕದ ಅತ್ಯುತ್ತಮ ಸ್ಕೂಬಾ ಡೈವಿಂಗ್ ತಾಣ.',
        type: 'adventure',
        duration_hours: 4.5,
        estimated_cost_inr: Math.min(budget * 0.5, 3500),
        tip: 'Advance booking is mandatory for licensed PADI dive boats departing from Murudeshwar beach.',
        tip_kannada: 'ಸ್ಕೂಬಾ ಡೈವಿಂಗ್‌ಗಾಗಿ ಮುಂಚಿತವಾಗಿ ಅಧಿಕೃತ ಏಜೆನ್ಸಿಗಳಲ್ಲಿ ಬುಕ್ ಮಾಡಿಕೊಳ್ಳಿ.',
        lat: 14.0197,
        lng: 74.3278
      }
    ],
    Dandeli: [
      {
        name: 'Kali River White Water Rafting',
        name_kannada: 'ಕಾಳಿ ನದಿ ವೈಟ್ ವಾಟರ್ ರಾಫ್ಟಿಂಗ್',
        description: 'Grade 3 and 4 thrilling river rapids navigating through the dense deciduous forests and gorges of the Western Ghats.',
        description_kannada: 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ದಟ್ಟ ಕಾಡಿನ ನಡುವೆ ಹರಿಯುವ ಕಾಳಿ ನದಿಯ ರಭಸದ ನೀರಿನಲ್ಲಿ ರೋಮಾಂಚಕ ರಾಫ್ಟಿಂಗ್.',
        type: 'adventure',
        duration_hours: 4,
        estimated_cost_inr: Math.min(budget * 0.35, 1200),
        tip: 'Opt for the 9-kilometer run during morning dam water release times for the most exhilarating rapids.',
        tip_kannada: 'ಬೆಳಗ್ಗಿನ ಜಲಾಶಯದ ನೀರು ಬಿಡುವ ಸಮಯದಲ್ಲಿ 9 ಕಿಲೋಮೀಟರ್ ರಾಫ್ಟಿಂಗ್ ಆಯ್ದುಕೊಳ್ಳಿ.',
        lat: 15.2417,
        lng: 74.6288
      },
      {
        name: 'Dandeli Wildlife & Hornbill Reserve',
        name_kannada: 'ದಾಂಡೇಲಿ ವನ್ಯಜೀವಿ & ಮಲಬಾರ್ ಹಾರ್ನ್‌ಬಿಲ್',
        description: 'Biodiversity hotspot home to the majestic Great Pied Hornbill, black panthers, crocodiles, and river canopy walkways.',
        description_kannada: 'ಮಲಬಾರ್ ಹಾರ್ನ್‌ಬಿಲ್ ಪಕ್ಷಿಗಳು, ಕಪ್ಪು ಚಿರತೆಗಳು ಮತ್ತು ಮೊಸಳೆಗಳ ನೆಲೆಬೀಡಾದ ನಿತ್ಯಹರಿದ್ವರ್ಣ ಅರಣ್ಯ.',
        type: 'nature',
        duration_hours: 3,
        estimated_cost_inr: Math.min(budget * 0.2, 300),
        tip: 'Carry binoculars early morning near Ganeshgudi bridge to spot all four species of South Indian hornbills.',
        tip_kannada: 'ಗಣೇಶಗುಡಿ ಸೇತುವೆಯ ಬಳಿ ಬೆಳಗ್ಗೆ 7 ಗಂಟೆಗೆ ಹಾರ್ನ್‌ಬಿಲ್ ಪಕ್ಷಿಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ವೀಕ್ಷಿಸಬಹುದು.',
        lat: 15.2750,
        lng: 74.6180
      }
    ],
    Bandipur: [
      {
        name: 'Bandipur Tiger Reserve Jeep Safari',
        name_kannada: 'ಬಂಡೀಪುರ ಹುಲಿ ಸಂರಕ್ಷಿತಾರಣ್ಯ ಸಫಾರಿ',
        description: '874 sq km Nilgiri biosphere reserve renowned for royal Bengal tigers, Asiatic elephants, dholes, and Indian gaurs.',
        description_kannada: 'ನೀಲಗಿರಿ ಜೀವಗೋಳದ ಭಾಗವಾದ ಜಗತ್ಪ್ರಸಿದ್ಧ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ, ಹುಲಿ ಮತ್ತು ಕಾಡಾನೆಗಳ ಸಫಾರಿ.',
        type: 'nature',
        duration_hours: 3.5,
        estimated_cost_inr: Math.min(budget * 0.35, 800),
        tip: 'Book the 6:00 AM forest department open-top Gypsy safari for the highest predator sighting probabilities.',
        tip_kannada: 'ಮುಂಜಾನೆ 6:00 ಗಂಟೆಯ ಅರಣ್ಯ ಇಲಾಖೆಯ ಜಿಪ್ಸಿ ಸಫಾರಿಯನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಮುಂಚಿತವಾಗಿ ಬುಕ್ ಮಾಡಿ.',
        lat: 11.6664,
        lng: 76.6291
      },
      {
        name: 'Himavad Gopalaswamy Betta',
        name_kannada: 'ಹಿಮವದ್ ಗೋಪಾಲಸ್ವಾಮಿ ಬೆಟ್ಟ',
        description: '1,450m mist-shrouded peak inside the national park crowned by a 14th-century temple and frequented by grazing wild elephants.',
        description_kannada: 'ವರ್ಷದ ಎಲ್ಲ ದಿನವೂ ಹಿಮದಿಂದ ಆವೃತವಾಗಿರುವ 14ನೇ ಶತಮಾನದ ಗೋಪಾಲಸ್ವಾಮಿ ಬೆಟ್ಟ ಮತ್ತು ಕಾಡಾನೆಗಳ ತಾಣ.',
        type: 'nature',
        duration_hours: 2.5,
        estimated_cost_inr: Math.min(budget * 0.15, 150),
        tip: 'Private vehicles are prohibited; board the official KSRTC electric shuttle at the hill base.',
        tip_kannada: 'ಬೆಟ್ಟದ ಬುಡದಿಂದ ಸರ್ಕಾರಿ ಬಸ್ ಮೂಲಕ ಮಾತ್ರ ಬೆಟ್ಟಕ್ಕೆ ಹೋಗಲು ಅವಕಾಶವಿದೆ.',
        lat: 11.7225,
        lng: 76.5861
      }
    ],
    Agumbe: [
      {
        name: 'Agumbe Rainforest Research & Sunset Point',
        name_kannada: 'ಆಗುಂಬೆ ಮಳೆಕಾಡು & ಸೂರ್ಯಾಸ್ತ ತಾಣ',
        description: 'Renowned as the Cherrapunji of South India and King Cobra sanctuary, featuring misty valleys and views of the distant Arabian Sea.',
        description_kannada: 'ದಕ್ಷಿಣ ಭಾರತದ ಚಿರಾಪುಂಜಿ, ನಿತ್ಯಹರಿದ್ವರ್ಣ ಮಳೆಕಾಡು ಮತ್ತು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಮೇಲಿಂದ ಸೂರ್ಯಾಸ್ತದ ರಮಣೀಯ ನೋಟ.',
        type: 'nature',
        duration_hours: 3,
        estimated_cost_inr: 0,
        tip: 'On clear winter evenings, the sun appears to dip directly into the Arabian Sea 40 kilometers away.',
        tip_kannada: 'ಚಳಿಗಾಲದ ಸಂಜೆ ವೇಳೆ 40 ಕಿಲೋಮೀಟರ್ ದೂರದಲ್ಲಿರುವ ಸಮುದ್ರಕ್ಕೆ ಸೂರ್ಯ ಮುಳುಗುವ ನೋಟ ಗೋಚರಿಸುತ್ತದೆ.',
        lat: 13.5074,
        lng: 75.0931
      },
      {
        name: 'Kundadri Hill & 17th Century Jain Temple',
        name_kannada: 'ಕುಂದಾದ್ರಿ ಬೆಟ್ಟ & ಪುರಾತನ ಜೈನ ಬಸದಿ',
        description: 'Monolithic rock hill rising 3,200 feet above thick evergreen canopy with two natural lotus ponds and an ancient stone shrine.',
        description_kannada: '3,200 ಅಡಿ ಎತ್ತರದ ಕಲ್ಲಿನ ಬೆಟ್ಟ, ನೈಸರ್ಗಿಕ ಕಮಲದ ಕೊಳಗಳು ಮತ್ತು ಪ್ರಾಚೀನ ಜೈನ ಬಸದಿ.',
        type: 'adventure',
        duration_hours: 3,
        estimated_cost_inr: 0,
        tip: 'Drive up the winding 7km hairpin road early morning to sit above the rolling clouds.',
        tip_kannada: 'ಮುಂಜಾನೆ 7 ಕಡಿದಾದ ಹೇರ್‌ಪಿನ್ ತಿರುವುಗಳನ್ನು ದಾಟಿ ಬೆಟ್ಟದ ಮೇಲೆ ಕುಳಿತರೆ ಮೋಡಗಳ ಮೇಲಿದ್ದಂತೆ ಭಾಸವಾಗುತ್ತದೆ.',
        lat: 13.5578,
        lng: 75.1683
      }
    ],
    Vijayapura: [
      {
        name: 'Gol Gumbaz & Acoustical Whispering Gallery',
        name_kannada: 'ಗೋಲಗುಮ್ಮಟ & ಪಿಸುಗುಟ್ಟುವ ಹಜಾರ',
        description: 'Mausoleum of Mohammed Adil Shah featuring the second largest dome in the world unsupported by pillars, echoing the faintest whisper 11 times.',
        description_kannada: 'ಯಾವುದೇ ಕಂಬಗಳ ಆಧಾರವಿಲ್ಲದ ವಿಶ್ವದ ಎರಡನೇ ಅತಿ ದೊಡ್ಡ ಗುಮ್ಮಟ, ಒಂದು ಸಣ್ಣ ಧ್ವನಿ 11 ಬಾರಿ ಪ್ರತಿಧ್ವನಿಸುವ ಅದ್ಭುತ.',
        type: 'heritage',
        duration_hours: 3,
        estimated_cost_inr: Math.min(budget * 0.2, 250),
        tip: 'Arrive at 8:00 AM when the monument opens to test the whisper echo gallery before crowd noise sets in.',
        tip_kannada: 'ಜನಜಂಗುಳಿ ಇಲ್ಲದ ಬೆಳಗ್ಗೆ 8 ಗಂಟೆಗೆ ಹೋದರೆ ಪಿಸುಗುಟ್ಟುವ ಹಜಾರದ ಪ್ರತಿಧ್ವನಿಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಆನಂದಿಸಬಹುದು.',
        lat: 16.8302,
        lng: 75.7356
      },
      {
        name: 'Ibrahim Rauza (Taj of the Deccan)',
        name_kannada: 'ಇಬ್ರಾಹಿಂ ರೋಜಾ (ದಖ್ಖನ್ ತಾಜ್ ಮಹಲ್)',
        description: '17th-century palatial mausoleum noted for its delicate minarets, perforated stone Quranic inscriptions, and lotus finials.',
        description_kannada: 'ಆಗ್ರಾ ತಾಜ್ ಮಹಲ್‌ಗೆ ಸ್ಫೂರ್ತಿ ನೀಡಿದ ವಾಸ್ತುಶಿಲ್ಪ, ಸುಂದರ ಮಿನಾರುಗಳು ಮತ್ತು ಕಲ್ಲಿನ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಗಳು.',
        type: 'heritage',
        duration_hours: 2,
        estimated_cost_inr: Math.min(budget * 0.15, 150),
        tip: 'Stroll around the surrounding charbagh garden during sunset for radiant architectural photographs.',
        tip_kannada: 'ಸೂರ್ಯಾಸ್ತದ ಹೊಂಬಿಸಿಲಿನಲ್ಲಿ ಉದ್ಯಾನದ ನಡುವೆ ಇಬ್ರಾಹಿಂ ರೋಜಾ ಭವ್ಯವಾಗಿ ಕಂಗೊಳಿಸುತ್ತದೆ.',
        lat: 16.8247,
        lng: 75.6983
      }
    ],
    Hampi: [
      {
        name: 'Vijaya Vittala Temple & Stone Chariot',
        name_kannada: 'ವಿಜಯ ವಿಠ್ಠಲ ದೇವಾಲಯ ಮತ್ತು ಕಲ್ಲಿನ ರಥ',
        description: '16th-century architectural masterpiece with the iconic Garuda stone chariot and resonant musical pillars.',
        description_kannada: 'ವಿಶ್ವವಿಖ್ಯಾತ ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಸಂಗೀತ ಹೊರಹೊಮ್ಮಿಸುವ ಸ್ತಂಭಗಳನ್ನು ಹೊಂದಿರುವ 16ನೇ ಶತಮಾನದ ದೇವಾಲಯ.',
        type: 'heritage',
        duration_hours: 3,
        estimated_cost_inr: Math.min(budget * 0.2, 250),
        tip: 'Rent an e-cart at sunset; the golden light reflecting off Tungabhadra river boulders is magical.',
        tip_kannada: 'ಸೂರ್ಯಾಸ್ತದ ಸಮಯದಲ್ಲಿ ಭೇಟಿ ನೀಡಿ; ಕಲ್ಲಿನ ರಥದ ಮೇಲೆ ಬೀಳುವ ಸಂಜೆಯ ಹೊಂಬಿಸಿಲು ಅದ್ಭುತ.',
        lat: 15.3350,
        lng: 76.4600
      },
      {
        name: 'Virupaksha Temple & Sanapur Lake',
        name_kannada: 'ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ ಮತ್ತು ಸಾನಾಪುರ ಸರೋವರ',
        description: 'Sacred 7th-century active temple tower followed by a traditional coracle boat ride amidst giant granite boulders.',
        description_kannada: '7ನೇ ಶತಮಾನದಿಂದ ನಿರಂತರ ಪೂಜೆ ನಡೆಯುತ್ತಿರುವ ವಿರೂಪಾಕ್ಷ ಗೋಪುರ ಮತ್ತು ಸಾನಾಪುರ ಕೆರೆಯಲ್ಲಿ ತೆಪ್ಪದ ಸವಾರಿ.',
        type: 'temple',
        duration_hours: 3.5,
        estimated_cost_inr: Math.min(budget * 0.2, 350),
        tip: 'Take a coracle boat at Sanapur lake for cliff views and cliff jumping spots.',
        tip_kannada: 'ಸಾನಾಪುರ ಕೆರೆಯಲ್ಲಿ ದುಂಡು ತೆಪ್ಪದ (ಕೊರಾಕಲ್) ಸವಾರಿ ಮಾಡಿ ನಿಸರ್ಗ ಸೌಂದರ್ಯ ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.',
        lat: 15.3358,
        lng: 76.4590
      }
    ],
    Mangaluru: [
      {
        name: 'Panambur Beach & Sunset Promenade',
        name_kannada: 'ಪಣಂಬೂರು ಬೀಚ್',
        description: 'Golden sand coastline along the Arabian Sea renowned for water sports, dolphin sightings, and evening food shacks.',
        description_kannada: 'ಅರಬ್ಬೀ ಸಮುದ್ರದ ತೀರದಲ್ಲಿರುವ ಸುವರ್ಣ ಮರಳಿನ ಬೀಚ್, ಜಲ ಕ್ರೀಡೆಗಳು ಮತ್ತು ಸೂರ್ಯಾಸ್ತದ ಸೌಂದರ್ಯ.',
        type: 'beach',
        duration_hours: 2.5,
        estimated_cost_inr: Math.min(budget * 0.15, 200),
        tip: 'Try fresh tender coconut and coastal anjal fish fry at the beachfront stalls.',
        tip_kannada: 'ಬೀಚ್ ಬಳಿಯ ಅಂಗಡಿಗಳಲ್ಲಿ ಎಳನೀರು ಮತ್ತು ಕರಾವಳಿಯ ಅಂಜಲ್ ಮೀನು ಫ್ರೈ ಸವಿಯಿರಿ.',
        lat: 12.9547,
        lng: 74.8016
      },
      {
        name: 'Kudroli Gokarnath Temple',
        name_kannada: 'ಕುದ್ರೋಳಿ ಗೋಕರ್ಣನಾಥ ಕ್ಷೇತ್ರ',
        description: 'Glorious Dravidian and Chola architectural shrine founded by social reformer Narayana Guru, glowing with golden towers.',
        description_kannada: 'ಶ್ರೀ ನಾರಾಯಣ ಗುರುಗಳಿಂದ ಸ್ಥಾಪಿತವಾದ ಭವ್ಯ ಕ್ಷೇತ್ರ, ಸುವರ್ಣ ಗೋಪುರಗಳು ಮತ್ತು ದಸರಾ ವೈಭವ.',
        type: 'temple',
        duration_hours: 2,
        estimated_cost_inr: 0,
        tip: 'Visit in the early evening when the temple water fountains and lights are fully turned on.',
        tip_kannada: 'ಸಂಜೆ ವೇಳೆ ಭೇಟಿ ನೀಡಿದರೆ ಬೆಳಕಿನ ದೀಪಾಲಂಕಾರ ಮತ್ತು ಕಾರಂಜಿಗಳು ಮನಸೆಳೆಯುತ್ತವೆ.',
        lat: 12.8797,
        lng: 74.8322
      }
    ],
    Hubli: [
      {
        name: 'Unkal Lake & Swami Vivekananda Statue',
        name_kannada: 'ಉಣಕಲ್ ಕೆರೆ',
        description: 'Sprawling natural lake with a 100-year history featuring a majestic Vivekananda statue right at the lake center.',
        description_kannada: 'ನಡುವೆ ಸ್ವಾಮಿ ವಿವೇಕಾನಂದರ ಭವ್ಯ ಪ್ರತಿಮೆ ಹೊಂದಿರುವ 100 ವರ್ಷಗಳ ಐತಿಹಾಸಿಕ ಉಣಕಲ್ ಕೆರೆ.',
        type: 'nature',
        duration_hours: 2,
        estimated_cost_inr: Math.min(budget * 0.1, 100),
        tip: 'Take pedal boats during golden hour and buy authentic Dharwad Peda at Mishra Pedha.',
        tip_kannada: 'ಸಂಜೆ ಬೋಟಿಂಗ್ ಮಾಡಿ ನಂತರ ಪ್ರಸಿದ್ಧ ಮಿಶ್ರಾ ಪೇಡಾ ಅಂಗಡಿಯಲ್ಲಿ ಧಾರ್ವಾಡ್ ಪೇಡಾ ಸವಿಯಿರಿ.',
        lat: 15.3857,
        lng: 75.1098
      }
    ],
    Belagavi: [
      {
        name: 'Belagavi Fort & Kamal Basti',
        name_kannada: 'ಬೆಳಗಾವಿ ಕೋಟೆ ಮತ್ತು ಕಮಲ ಬಸದಿ',
        description: '12th-century Ratta dynasty stone ramparts enclosing the exquisite Kamal Basti with its lotus-carved ceiling.',
        description_kannada: '12ನೇ ಶತಮಾನದ ರಟ್ಟ ವಂಶದ ಕೋಟೆ ಮತ್ತು 72 ದಳಗಳ ಕಮಲದ ಕೆತ್ತನೆಯ ಛಾವಣಿ ಹೊಂದಿರುವ ಕಮಲ ಬಸದಿ.',
        type: 'heritage',
        duration_hours: 2.5,
        estimated_cost_inr: Math.min(budget * 0.1, 100),
        tip: 'Pick up famous Belagavi Kunda at Camp sweet shops right outside.',
        tip_kannada: 'ಕೋಟೆಯ ಹೊರಗಿನ ಕ್ಯಾಂಪ್ ಪ್ರದೇಶದಲ್ಲಿ ಬಿಸಿ ಬೆಳಗಾವಿ ಕುಂದಾ ಸವಿಯಲು ಮರೆಯದಿರಿ.',
        lat: 15.8596,
        lng: 74.5218
      },
      {
        name: 'Gokak Falls & Suspension Bridge',
        name_kannada: 'ಗೋಕಾಕ್ ಜಲಪಾತ ಮತ್ತು ತೂಗು ಸೇತುವೆ',
        description: 'Spectacular 177-ft horseshoe waterfall over sandstone cliffs, often called Karnataka’s mini Niagara Falls.',
        description_kannada: 'ಘಟಪ್ರಭಾ ನದಿಯ 177 ಅಡಿ ಎತ್ತರದ ಭವ್ಯ ಜಲಪಾತ ಮತ್ತು ರೋಮಾಂಚಕ ತೂಗು ಸೇತುವೆ.',
        type: 'waterfall',
        duration_hours: 3,
        estimated_cost_inr: Math.min(budget * 0.2, 250),
        tip: 'Walk across the 201-meter suspension bridge built in 1907 for panoramic waterfall mist.',
        tip_kannada: '1907 ರ ಬ್ರಿಟಿಷ್ ಕಾಲದ ತೂಗು ಸೇತುವೆಯ ಮೇಲೆ ನಿಂತು ಜಲಪಾತದ ಹನಿಗಳನ್ನು ಅನುಭವಿಸಿ.',
        lat: 16.1843,
        lng: 74.8213
      }
    ]
  };

  const cityDishes: Record<string, { en: string; kn: string }> = {
    Bangalore: { en: 'Crisp Benne Dosa at CTR Malleswaram and hot Badam Milk', kn: 'ಮಲ್ಲೇಶ್ವರಂ ಸಿಟಿಆರ್‌ನಲ್ಲಿ ಬೆಣ್ಣೆ ದೋಸೆ ಮತ್ತು ಬಾದಾಮಿ ಹಾಲು' },
    Mysuru: { en: 'Authentic melt-in-mouth Mysore Pak & Mylari Butter Dosa', kn: 'ಮೈಲಾರಿ ಬೆಣ್ಣೆ ದೋಸೆ ಮತ್ತು ಅಸಲಿ ತುಪ್ಪದ ಮೈಸೂರು ಪಾಕ್' },
    Mangaluru: { en: 'Steaming Neer Dosa with Coastal Coconut Chutney & Ghee Roast', kn: 'ಕರಾವಳಿಯ ಬಿಸಿ ನೀರು ದೋಸೆ, ತೆಂಗಿನಕಾಯಿ ಚಟ್ನಿ ಮತ್ತು ತುಪ್ಪದ ರೋಸ್ಟ್' },
    Hubli: { en: 'Authentic Dharwad Peda & Jolada Rotti with Ennegai brinjal curry', kn: 'ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ ಪಲ್ಯ ಮತ್ತು ಧಾರವಾಡ ಪೇಡಾ' },
    Belagavi: { en: 'Fresh Belagavi Kunda sweet & authentic spicy Kolhapuri Misal', kn: 'ಬಿಸಿ ಬೆಳಗಾವಿ ಕುಂದಾ ಮತ್ತು ಖಾರವಾದ ಮಿಸಳ್ ರೊಟ್ಟಿ' },
    Hampi: { en: 'South Indian Thali served on banana leaf with cool pomegranate juice', kn: 'ಬಾಳೆ ಎಲೆಯಲ್ಲಿ ಬಡಿಸುವ ಸಾಂಪ್ರದಾಯಿಕ ಊಟ ಮತ್ತು ದಾಳಿಂಬೆ ರಸ' },
    Chikmagalur: { en: 'Akki Rotti with Yennegai & fresh estate-brewed chicory Filter Kaapi', kn: 'ಅಕ್ಕಿ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ ಮತ್ತು ತಾಜಾ ಫಿಲ್ಟರ್ ಕಾಫಿ' },
    Gokarna: { en: 'Fresh Coastal Seafood Thali or traditional Satvik temple meal with Kokum juice', kn: 'ಕರಾವಳಿಯ ತಾಜಾ ಊಟ ಮತ್ತು ತಂಪಾದ ಕೋಕಂ ಜ್ಯೂಸ್' },
    Udupi: { en: 'Original Udupi Masala Dosa, Goli Baje and Gadbad Ice Cream at Diana', kn: 'ಅಸಲಿ ಉಡುಪಿ ಮಸಾಲೆ ದೋಸೆ, ಗರಿಗರಿ ಗೋಳಿ ಬಜೆ ಮತ್ತು ಪ್ರಸಿದ್ಧ ಗಡ್‌ಬಡ್' },
    Badami: { en: 'North Karnataka Jolada Rotti, Shenga Chutney and Junka Vadi', kn: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಜೋಳದ ರೊಟ್ಟಿ, ಶೇಂಗಾ ಚಟ್ನಿ ಮತ್ತು ಜುಣಕದ ವಡಿ' },
    Belur: { en: 'Traditional Hassan Ragi Mudde with organic Bassaru and ghee', kn: 'ಹಾಸನದ ಸಾಂಪ್ರದಾಯಿಕ ತುಪ್ಪದ ರಾಗಿ ಮುದ್ದೆ ಮತ್ತು ಬಸ್ಸಾರು' },
    Murudeshwar: { en: 'Coastal Anjal Tawa Fry and sweet Uttara Kannada Appi Payasa', kn: 'ಕರಾವಳಿಯ ಅಂಜಲ್ ತವಾ ಫ್ರೈ ಮತ್ತು ಸಿಹಿಯಾದ ಅಪ್ಪಿ ಪಾಯಸ' },
    Dandeli: { en: 'Malaprabha bamboo shoot curry (Kalale) and chilled kokum sarbat', kn: 'ಕಳಲೆ ಸಾಂಬಾರು ಮತ್ತು ತಂಪಾದ ಪುನರ್ಪುಳಿ (ಕೋಕಂ) ಶರ್ಬತ್' },
    Bandipur: { en: 'Maddur Vada and South Indian filter coffee with local forest honey', kn: 'ಗರಿಗರಿ ಮದ್ದೂರು ವಡೆ ಮತ್ತು ಶುದ್ಧ ಕಾಡಿನ ಜೇನುತುಪ್ಪ' },
    Agumbe: { en: 'Hot medicinal Agumbe Herbal Kashaya and Jackfruit Gatti', kn: 'ಆಗುಂಬೆಯ ಪ್ರಸಿದ್ಧ ಗಿಡಮೂಲಿಕೆ ಕಷಾಯ ಮತ್ತು ಹಲಸಿನ ಹಣ್ಣಿನ ಗಟ್ಟಿ' },
    Vijayapura: { en: 'Crispy Jolada Rotti, Shengada Chutney and Vijayapura Kulfi', kn: 'ಗರಿಗರಿ ಜೋಳದ ರೊಟ್ಟಿ, ಶೇಂಗಾ ಚಟ್ನಿ ಮತ್ತು ವಿಜಯಪುರದ ಕುಲ್ಫಿ' },
  };

  const defaultDish = cityDishes[city] || cityDishes['Bangalore'];
  const startPlaces = samplePlacesByCity[city] || samplePlacesByCity['Bangalore'];

  // Flatten additional places from other regions to fill multi-day trips
  const otherPlaces: Array<{
    name: string;
    name_kannada: string;
    description: string;
    description_kannada: string;
    type: PlaceType;
    duration_hours: number;
    estimated_cost_inr: number;
    tip: string;
    tip_kannada: string;
    lat: number;
    lng: number;
  }> = [];

  Object.keys(samplePlacesByCity).forEach((k) => {
    if (k !== city) {
      otherPlaces.push(...samplePlacesByCity[k]);
    }
  });

  const allAvailablePlaces = [...startPlaces, ...otherPlaces];

  const daysList = [];
  const totalDays = Math.min(Math.max(days, 1), 10);

  for (let i = 1; i <= totalDays; i++) {
    const startIndex = (i - 1) * 2;
    const dayPlaces = [
      allAvailablePlaces[startIndex % allAvailablePlaces.length],
      allAvailablePlaces[(startIndex + 1) % allAvailablePlaces.length]
    ];

    const dayThemes = [
      { en: `Arrival & City Highlights in ${city}`, kn: `${city} ಆಗಮನ ಮತ್ತು ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು` },
      { en: `Heritage Marvels & Cultural Traditions`, kn: `ಪರಂಪರೆ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ಇತಿಹಾಸದ ಸವಾರಿ` },
      { en: `Western Ghats Waterfalls & Sacred Hills`, kn: `ಪಶ್ಚಿಮ ಘಟ್ಟದ ಜಲಪಾತಗಳು ಮತ್ತು ಪವಿತ್ರ ಬೆಟ್ಟಗಳು` },
      { en: `Offbeat Trails & Authentic Local Flavors`, kn: `ಅಜ್ಞಾತ ಸುಂದರ ತಾಣಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಭೋಜನ` },
      { en: `Ancient Caves & Architectural Splendor`, kn: `ಪ್ರಾಚೀನ ಗುಹೆಗಳು ಮತ್ತು ಶಿಲ್ಪಕಲೆಯ ಸೊಬಗು` },
      { en: `Coastal Breezes & Golden Sunset Shores`, kn: `ಕರಾವಳಿಯ ತಂಗಾಳಿ ಮತ್ತು ರಮಣೀಯ ಸೂರ್ಯಾಸ್ತ` },
      { en: `Spice Plantations & Coffee Estate Discovery`, kn: `ಕಾಫಿ ಮತ್ತು ಸಾಂಬಾರ ತೋಟಗಳ ಪರಿಶೋಧನೆ` },
      { en: `Forest Sanctuaries & Sacred River Banks`, kn: `ವನ್ಯಜೀವಿ ಧಾಮಗಳು ಮತ್ತು ನದಿಯ ಶಾಂತ ತೀರಗಳು` },
      { en: `Bazaar Walks & Handloom Crafts`, kn: `ಕರಕುಶಲ ಕಲೆಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಅನುಭವ` },
      { en: `Grand Finale: Karnataka Royal Farewell`, kn: `ಅಂತಿಮ ದಿನ: ಕರ್ನಾಟಕದ ಸಿಹಿ ನೆನಪುಗಳೊಂದಿಗೆ ಬೀಳ್ಕೊಡುಗೆ` }
    ];

    const theme = dayThemes[(i - 1) % dayThemes.length];
    const dailyEstBudget = Math.round(budget * 0.9);

    daysList.push({
      day: i,
      theme: theme.en,
      theme_kannada: theme.kn,
      locations: dayPlaces,
      food_recommendation: defaultDish.en,
      food_recommendation_kannada: defaultDish.kn,
      estimated_daily_budget_inr: dailyEstBudget
    });
  }

  const totalBudget = daysList.reduce((acc, d) => acc + d.estimated_daily_budget_inr, 0);

  return {
    title: `${city} & Scenic Karnataka Discovery (${totalDays} Days)`,
    title_kannada: `${city} ಮತ್ತು ಕರ್ನಾಟಕದ ರಮಣೀಯ ದರ್ಶನ (${totalDays} ದಿನಗಳು)`,
    summary: `A carefully paced Karnataka journey originating in ${city}, balancing storied UNESCO architecture with pristine nature, coastal beauty, and culinary soul.`,
    summary_kannada: `${city} ನಿಂದ ಆರಂಭವಾಗುವ ಅದ್ಭುತ ಪ್ರವಾಸ, ಪಾರಂಪರಿಕ ಶಿಲ್ಪಕಲೆ, ಮಲೆನಾಡಿನ ಹಸಿರು, ಕಡಲತೀರ ಮತ್ತು ಕರಾವಳಿಯ ರುಚಿಗಳ ಪರಿಪೂರ್ಣ ಸಂಗಮ.`,
    days: daysList,
    total_estimated_budget_inr: totalBudget,
    packing_tips: [
      'Light cotton clothing for daytime, and a light jacket for hill stations like Coorg/Chikmagalur/Nandi Hills',
      'Slip-on footwear for frequent temple entrances and historical monuments',
      'Refillable water bottle, sunhat, and local cash for remote village tender coconut stalls',
      'Comfortable walking shoes with good grip for granite boulder walks in Hampi or Badami'
    ],
    packing_tips_kannada: [
      'ಹಗಲಿನ ಪ್ರವಾಸಕ್ಕೆ ಹತ್ತಿ ಬಟ್ಟೆಗಳು, ಮತ್ತು ಚಿಕ್ಕಮಗಳೂರು/ಕೊಡಗು ಶೀತ ಹವಮಾನಕ್ಕೆ ಶಾಲು',
      'ದೇವಸ್ಥಾನಗಳಿಗೆ ಭೇಟಿ ನೀಡಲು ಸುಲಭವಾಗಿ ತೆಗೆಯಬಹುದಾದ ಚಪ್ಪಲಿಗಳು',
      'ನೀರಿನ ಬಾಟಲ್, ಟೋಪಿ ಮತ್ತು ಸಣ್ಣ ವ್ಯಾಪಾರಿಗಳಿಗಾಗಿ ನಗದು ಹಣ',
      'ಹಂಪಿ ಅಥವಾ ಬಾದಾಮಿ ಬಂಡೆಗಳ ಮೇಲೆ ನಡೆಯಲು ಉತ್ತಮ ಹಿಡಿತವಿರುವ ಶೂಗಳು'
    ],
    best_time_to_visit: 'October – March (Pleasant weather across plains, ghats & coast)',
    highlights: [
      'Authentic regional food spots loved by locals',
      'Carefully optimized daily travel radius',
      'Blend of iconic landmarks and peaceful hidden wonders',
      'Real-time bilingual Kannada & English guidance'
    ]
  };
}
