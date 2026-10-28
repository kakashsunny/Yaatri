import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { LocationItem } from '../types/itinerary.ts';
import { MapPin, Navigation } from 'lucide-react';

interface MapViewProps {
  locations: LocationItem[];
  lang: 'en' | 'kn';
  selectedDay?: number;
  activeLocationIndex?: number;
}

export const MapView: React.FC<MapViewProps> = ({ locations, lang, selectedDay, activeLocationIndex }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map once safely
    if (!mapInstanceRef.current) {
      if ((mapContainerRef.current as any)._leaflet_id) {
        delete (mapContainerRef.current as any)._leaflet_id;
      }
      try {
        const map = L.map(mapContainerRef.current, {
          center: [14.5, 75.8], // Central Karnataka coordinates
          zoom: 7,
          scrollWheelZoom: false,
        });

        // OpenStreetMap Free Tiles (No API key required)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);

        const layerGroup = L.layerGroup().addTo(map);
        layerGroupRef.current = layerGroup;
        mapInstanceRef.current = map;
      } catch (err) {
        // Safe initialization handling
      }
    }

    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // Filter valid coordinates
    const validLocations = locations.filter(
      (loc) => typeof loc.lat === 'number' && typeof loc.lng === 'number' && !isNaN(loc.lat) && !isNaN(loc.lng)
    );

    if (validLocations.length === 0) return;

    const latLngs: L.LatLngExpression[] = [];
    const markers: L.Marker[] = [];

    validLocations.forEach((loc, index) => {
      const latLng: [number, number] = [loc.lat, loc.lng];
      latLngs.push(latLng);

      // Custom Saffron Pin Icon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            position: relative;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #E85D04, #C44601);
            color: #FFFFFF;
            font-weight: 700;
            font-size: 13px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 14px rgba(232, 93, 4, 0.6);
            border: 2px solid #FFD60A;
          ">
            <span style="transform: rotate(45deg); line-height: 1;">${index + 1}</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 2px;">
          <div style="color: #FFD60A; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            Stop ${index + 1}
          </div>
          <div style="color: #FFFFFF; font-size: 14px; font-weight: 700; margin-top: 2px;">
            ${loc.name}
          </div>
          ${loc.name_kannada ? `<div style="color: #E85D04; font-size: 12px; font-weight: 600; font-family: 'Noto Sans Kannada', sans-serif;">${loc.name_kannada}</div>` : ''}
          <div style="color: #94A3B8; font-size: 12px; margin-top: 6px; line-height: 1.4;">
            ${lang === 'kn' && loc.description_kannada ? loc.description_kannada : loc.description}
          </div>
          ${loc.tip ? `<div style="margin-top: 8px; padding: 6px; background: rgba(232,93,4,0.1); border-radius: 6px; border: 1px solid rgba(232,93,4,0.2); font-size: 11px; color: #FCD34D;">💡 ${loc.tip}</div>` : ''}
        </div>
      `;

      const marker = L.marker(latLng, { icon: customIcon }).bindPopup(popupContent);
      layerGroup.addLayer(marker);
      markers.push(marker);
    });

    markersRef.current = markers;

    // Draw route polyline
    if (latLngs.length > 1) {
      const polyline = L.polyline(latLngs, {
        color: '#E85D04',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '6, 8',
      });
      layerGroup.addLayer(polyline);
    }

    // Auto fit bounds
    if (latLngs.length > 0 && (activeLocationIndex === undefined || activeLocationIndex === null)) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [locations, lang, selectedDay]);

  // Synchronize active marker with activeLocationIndex from timeline scrubber
  useEffect(() => {
    if (
      typeof activeLocationIndex === 'number' &&
      markersRef.current[activeLocationIndex] &&
      mapInstanceRef.current
    ) {
      try {
        const targetMarker = markersRef.current[activeLocationIndex];
        const targetLatLng = targetMarker.getLatLng();
        mapInstanceRef.current.panTo(targetLatLng, { animate: true, duration: 0.8 });
        targetMarker.openPopup();
      } catch (err) {
        // Safe marker pan handling
      }
    }
  }, [activeLocationIndex]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          // Safe map instance cleanup
        }
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current && (mapContainerRef.current as any)._leaflet_id) {
        delete (mapContainerRef.current as any)._leaflet_id;
      }
    };
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#E85D04]/30 bg-[#0A0A0F] shadow-2xl shadow-black/80">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 z-[1000] px-3.5 py-1.5 rounded-full bg-[#13131A]/90 backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs text-slate-300 pointer-events-none shadow-lg">
        <Navigation className="w-3.5 h-3.5 text-[#E85D04]" />
        <span className="font-medium text-white">
          {lang === 'kn' ? 'ಕರ್ನಾಟಕ ಪ್ರವಾಸ ನಕ್ಷೆ' : 'Interactive Route Map'}
        </span>
        <span className="text-slate-500">·</span>
        <span className="text-[#FFD60A] tabular-nums font-semibold">
          {locations.length} {lang === 'kn' ? 'ತಾಣಗಳು' : 'Stops'}
        </span>
      </div>

      <div ref={mapContainerRef} className="w-full h-[360px] sm:h-[440px] z-10" />
    </div>
  );
};
