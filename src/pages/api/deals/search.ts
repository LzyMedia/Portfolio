import type { NextApiRequest, NextApiResponse } from 'next';

interface DealItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  website: string;
  url: string;
  inStock: boolean;
  imageUrl?: string;
  description?: string;
  lastUpdated: string;
}

interface SearchResponse {
  success: boolean;
  query: string;
  results: DealItem[];
  error?: string;
}

// Mock data - In production, this would be replaced with actual web scraping
// Using popular auto parts websites
const mockDeals: Record<string, DealItem[]> = {
  'cold air intake': [
    {
      id: '1',
      name: 'K&N Cold Air Intake Kit',
      price: 349.99,
      currency: 'USD',
      website: 'Amazon',
      url: 'https://www.amazon.com/s?k=cold+air+intake',
      inStock: true,
      description: 'High-performance cold air intake system',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Spectre Cold Air Intake',
      price: 289.99,
      currency: 'USD',
      website: 'AutoZone',
      url: 'https://www.autozone.com/search?searchText=cold+air+intake',
      inStock: true,
      description: 'Performance air intake with heat shield',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'AEM Cold Air Intake System',
      price: 399.99,
      currency: 'USD',
      website: 'Summit Racing',
      url: 'https://www.summitracing.com/search/keyword/cold+air+intake',
      inStock: false,
      description: 'Premium cold air intake',
      lastUpdated: new Date().toISOString(),
    },
  ],
  exhaust: [
    {
      id: '4',
      name: 'Magnaflow Cat-Back Exhaust',
      price: 899.99,
      currency: 'USD',
      website: 'Summit Racing',
      url: 'https://www.summitracing.com/search/keyword/exhaust',
      inStock: true,
      description: 'Stainless steel cat-back exhaust system',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Borla Exhaust System',
      price: 1199.99,
      currency: 'USD',
      website: 'Amazon',
      url: 'https://www.amazon.com/s?k=borla+exhaust',
      inStock: true,
      description: 'Performance exhaust with aggressive tone',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'Flowmaster Exhaust Kit',
      price: 749.99,
      currency: 'USD',
      website: 'AutoZone',
      url: 'https://www.autozone.com/search?searchText=flowmaster+exhaust',
      inStock: true,
      description: 'Classic muscle car sound',
      lastUpdated: new Date().toISOString(),
    },
  ],
  coilovers: [
    {
      id: '7',
      name: 'BC Racing Coilovers',
      price: 1099.99,
      currency: 'USD',
      website: 'Amazon',
      url: 'https://www.amazon.com/s?k=bc+racing+coilovers',
      inStock: true,
      description: 'Adjustable coilover suspension system',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '8',
      name: 'KW V3 Coilovers',
      price: 2499.99,
      currency: 'USD',
      website: 'Summit Racing',
      url: 'https://www.summitracing.com/search/keyword/kw+coilovers',
      inStock: false,
      description: 'Premium adjustable suspension',
      lastUpdated: new Date().toISOString(),
    },
  ],
  'turbo kit': [
    {
      id: '9',
      name: 'Garrett Turbo Kit',
      price: 3499.99,
      currency: 'USD',
      website: 'Summit Racing',
      url: 'https://www.summitracing.com/search/keyword/turbo+kit',
      inStock: true,
      description: 'Complete turbocharger kit with all hardware',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '10',
      name: 'Precision Turbo System',
      price: 2999.99,
      currency: 'USD',
      website: 'Amazon',
      url: 'https://www.amazon.com/s?k=turbo+kit',
      inStock: true,
      description: 'High-performance turbo system',
      lastUpdated: new Date().toISOString(),
    },
  ],
  wheels: [
    {
      id: '11',
      name: 'Enkei RPF1 Wheels (Set of 4)',
      price: 1399.99,
      currency: 'USD',
      website: 'Tire Rack',
      url: 'https://www.tirerack.com/wheels/',
      inStock: true,
      description: 'Lightweight racing wheels',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '12',
      name: 'BBS CH-R Wheels (Set of 4)',
      price: 2199.99,
      currency: 'USD',
      website: 'Amazon',
      url: 'https://www.amazon.com/s?k=bbs+wheels',
      inStock: true,
      description: 'Premium forged wheels',
      lastUpdated: new Date().toISOString(),
    },
  ],
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      query: '',
      results: [],
      error: 'Method not allowed',
    });
  }

  const { q } = req.query;

  if (!q || typeof q !== 'string') {
    return res.status(400).json({
      success: false,
      query: '',
      results: [],
      error: 'Query parameter is required',
    });
  }

  const query = q.toLowerCase().trim();

  // Simple keyword matching for mock data
  let results: DealItem[] = [];

  // Check for exact matches first
  if (mockDeals[query]) {
    results = mockDeals[query];
  } else {
    // Check for partial matches
    Object.keys(mockDeals).forEach((key) => {
      if (query.includes(key) || key.includes(query)) {
        results = [...results, ...mockDeals[key]];
      }
    });
  }

  // Sort by price (lowest first) and in-stock items first
  results.sort((a, b) => {
    if (a.inStock && !b.inStock) return -1;
    if (!a.inStock && b.inStock) return 1;
    return a.price - b.price;
  });

  // Remove duplicates
  results = results.filter((item, index, self) =>
    index === self.findIndex((t) => t.id === item.id)
  );

  return res.status(200).json({
    success: true,
    query: q,
    results,
  });
}

/*
 * TO IMPLEMENT REAL WEB SCRAPING:
 *
 * 1. Install dependencies:
 *    npm install axios cheerio puppeteer
 *
 * 2. Replace the mock data logic with actual scraping:
 *    - Use axios + cheerio for static sites
 *    - Use puppeteer for JavaScript-heavy sites
 *
 * 3. Example implementation:
 *
 * import axios from 'axios';
 * import * as cheerio from 'cheerio';
 *
 * async function scrapeAmazon(query: string) {
 *   const response = await axios.get(`https://www.amazon.com/s?k=${encodeURIComponent(query)}`);
 *   const $ = cheerio.load(response.data);
 *   const results: DealItem[] = [];
 *
 *   $('.s-result-item').each((i, element) => {
 *     const name = $(element).find('h2 .a-text-normal').text();
 *     const priceWhole = $(element).find('.a-price-whole').text();
 *     const priceFraction = $(element).find('.a-price-fraction').text();
 *     const price = parseFloat(`${priceWhole}.${priceFraction}`);
 *     const url = 'https://www.amazon.com' + $(element).find('h2 a').attr('href');
 *
 *     if (name && price) {
 *       results.push({
 *         id: generateId(),
 *         name,
 *         price,
 *         currency: 'USD',
 *         website: 'Amazon',
 *         url,
 *         inStock: true,
 *         lastUpdated: new Date().toISOString(),
 *       });
 *     }
 *   });
 *
 *   return results;
 * }
 *
 * 4. Important considerations:
 *    - Respect robots.txt and terms of service
 *    - Implement rate limiting to avoid being blocked
 *    - Use proxy rotation for large-scale scraping
 *    - Handle errors gracefully
 *    - Cache results to reduce load
 *    - Consider using official APIs when available
 */
