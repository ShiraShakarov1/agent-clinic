/**
 * Shared TypeScript type definitions for Agent Clinic
 */

export const AGENT_STATUSES = ['active', 'inactive', 'busy'] as const;
export type AgentStatus = (typeof AGENT_STATUSES)[number];

export const AILMENT_SEVERITIES = ['low', 'medium', 'high'] as const;
export type AilmentSeverity = (typeof AILMENT_SEVERITIES)[number];

export interface Agent {
  id: number;
  name: string;
  type: string;
  status: AgentStatus;
  created_at: string;
}

export interface CreateAgentInput {
  name: string;
  type: string;
  status?: AgentStatus;
}

export interface UpdateAgentInput {
  name?: string;
  type?: string;
  status?: AgentStatus;
}

export interface Ailment {
  id: number;
  name: string;
  severity: AilmentSeverity;
  description: string;
  created_at: string;
}

export interface CreateAilmentInput {
  name: string;
  severity?: AilmentSeverity;
  description?: string;
}

export interface UpdateAilmentInput {
  name?: string;
  severity?: AilmentSeverity;
  description?: string;
}

export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ListResponse<T> {
  data: T[];
  count: number;
}