declare namespace L {
  type Map = {
    remove(): void
  }
  type Marker = {
    addTo: (m: Map) => Marker
    bindPopup: (content: string) => Marker
  }
  function map(el: HTMLElement, options?: Record<string, unknown>): Map
  function tileLayer(
    url: string,
    options?: Record<string, unknown>
  ): { addTo: (m: Map) => void }
  function marker(latlng: [number, number], options?: Record<string, unknown>): Marker
}

declare const L: typeof L
