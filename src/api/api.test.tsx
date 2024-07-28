import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchItems, HOST } from './api';

describe('fetchItems', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch items successfully with a searchTerm', async () => {
    const searchTerm = 'rick';
    const mockResponse = { results: [] };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchItems(searchTerm);

    expect(global.fetch).toHaveBeenCalledWith(`${HOST}/${searchTerm}`, { method: 'GET' });
    expect(result).toEqual(mockResponse);
  });

  it('should fetch items successfully without a searchTerm', async () => {
    const mockResponse = { results: [] };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchItems();

    expect(global.fetch).toHaveBeenCalledWith(`${HOST}/`, { method: 'GET' });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchItems()).rejects.toThrow('Failed to fetch');
  });

  it('should handle fetch errors gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchItems()).rejects.toThrow('Network error');
  });
});
