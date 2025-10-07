// API configuration and utilities
const API_BASE = process.env.NEXT_PUBLIC_MANIFEST_API_BASE || 'http://localhost:3001';

export interface Project {
  id: number;
  slug: string;
  name: string;
  location: string;
  category: 'Residential' | 'Commercial' | 'Coastal';
  area: string;
  price: string;
  description: string;
  features: string[];
  gallery: string[];
  heroVideo?: string;
  status: string;
  developer: string;
  bedrooms: string | null;
  bathrooms: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  projectId?: string;
  createdAt?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  specialties: string[];
  createdAt: string;
}

export interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status: number;
}

// API client with error handling
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Projects API
  async getProjects(params?: {
    category?: string;
    q?: string;
    page?: number;
    limit?: number;
  }): Promise<ProjectsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.category) searchParams.append('category', params.category);
    if (params?.q) searchParams.append('q', params.q);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/api/projects${queryString ? `?${queryString}` : ''}`;
    
    return this.request<ProjectsResponse>(endpoint);
  }

  async getProject(slug: string): Promise<Project> {
    return this.request<Project>(`/api/projects/${slug}`);
  }

  // Inquiries API
  async createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry> {
    return this.request<Inquiry>('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiry),
    });
  }

  // Agents API
  async getAgents(): Promise<Agent[]> {
    return this.request<Agent[]>('/api/agents');
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/api');
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE);

// Utility functions
export const formatPrice = (price: string): string => {
  // Extract number from price string and format it
  const match = price.match(/(\d+(?:,\d+)*)/);
  if (match) {
    const number = parseInt(match[1].replace(/,/g, ''));
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }
  return price;
};

export const formatArea = (area: string): string => {
  const match = area.match(/(\d+(?:,\d+)*)/);
  if (match) {
    const number = parseInt(match[1].replace(/,/g, ''));
    return `${number.toLocaleString()} sq ft`;
  }
  return area;
};

export const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'residential':
      return 'bg-blue-100 text-blue-800';
    case 'commercial':
      return 'bg-green-100 text-green-800';
    case 'coastal':
      return 'bg-cyan-100 text-cyan-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getCategoryIcon = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'residential':
      return '🏠';
    case 'commercial':
      return '🏢';
    case 'coastal':
      return '🏖️';
    default:
      return '🏘️';
  }
};
