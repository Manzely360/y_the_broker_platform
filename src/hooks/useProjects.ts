import useSWR from 'swr';
import { apiClient, ProjectsResponse, Project } from '@/lib/api';

// Hook for fetching projects with filters
export function useProjects(params?: {
  category?: string;
  q?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  
  if (params?.category) searchParams.append('category', params.category);
  if (params?.q) searchParams.append('q', params.q);
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());

  const queryString = searchParams.toString();
  const key = `/api/projects${queryString ? `?${queryString}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR<ProjectsResponse>(
    key,
    () => apiClient.getProjects(params),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    projects: data?.projects || [],
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || 12,
    totalPages: data?.totalPages || 0,
    isLoading,
    error,
    mutate,
  };
}

// Hook for fetching a single project
export function useProject(slug: string) {
  const { data, error, isLoading, mutate } = useSWR<Project>(
    slug ? `/api/projects/${slug}` : null,
    () => apiClient.getProject(slug),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    project: data,
    isLoading,
    error,
    mutate,
  };
}

// Hook for fetching agents
export function useAgents() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/agents',
    () => apiClient.getAgents(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 600000, // 10 minutes
    }
  );

  return {
    agents: data || [],
    isLoading,
    error,
    mutate,
  };
}

// Hook for health check
export function useHealthCheck() {
  const { data, error, isLoading } = useSWR(
    '/api/health',
    () => apiClient.healthCheck(),
    {
      refreshInterval: 30000, // 30 seconds
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    isHealthy: !!data && data.status === 'OK',
    isLoading,
    error,
    lastChecked: data?.timestamp,
  };
}
