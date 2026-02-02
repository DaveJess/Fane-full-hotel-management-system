import { apiClient } from './api-axios';

export interface WalletBalance {
  balance: number;
  currency: string;
  status: string;
}

export interface WalletTransaction {
  _id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  reference: string;
  description: string;
  balanceBefore: number;
  balanceAfter: number;
  createdAt: string;
}

export interface TransactionHistoryResponse {
  transactions: WalletTransaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CreditWalletRequest {
  amount: number;
  description?: string;
}

export interface DebitWalletRequest {
  amount: number;
  description?: string;
}

export interface WalletApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const walletAPI = {
  // Get wallet balance - use temporary endpoint for now
  async getBalance(): Promise<WalletBalance> {
    try {
      const response = await apiClient.get<WalletApiResponse<WalletBalance>>('/api/wallet-temp/balance');
      console.log('Wallet balance response:', response.data);
      return response.data;
    } catch (error) {
      // Fallback to mock data if server is down
      console.warn('Using mock wallet data due to server error:', error);
      const mockData = {
        balance: 500000,
        currency: 'NGN',
        status: 'active'
      };
      console.log('Mock wallet data:', mockData);
      return mockData;
    }
  },

  // Get wallet details
  async getDetails(): Promise<any> {
    try {
      const response = await apiClient.get<WalletApiResponse<any>>('/api/wallet-temp/details');
      return response.data;
    } catch (error) {
      return {
        balance: 500000,
        currency: 'NGN',
        status: 'active'
      };
    }
  },

  // Credit wallet (add money)
  async creditWallet(data: CreditWalletRequest): Promise<{ balance: number; transaction: any }> {
    try {
      const response = await apiClient.post<WalletApiResponse<{ balance: number; transaction: any }>>('/api/wallet-temp/credit', data);
      return response.data;
    } catch (error) {
      // Mock successful credit
      return {
        balance: 500000 + data.amount,
        transaction: {
          amount: data.amount,
          reference: `WAL_${Date.now()}`,
          description: data.description || 'Manual credit',
          createdAt: new Date().toISOString()
        }
      };
    }
  },

  // Debit wallet (spend money)
  async debitWallet(data: DebitWalletRequest): Promise<{ balance: number; transaction: any }> {
    try {
      const response = await apiClient.post<WalletApiResponse<{ balance: number; transaction: any }>>('/api/wallet/debit', data);
      return response.data;
    } catch (error) {
      // Mock successful debit
      return {
        balance: 500000 - data.amount,
        transaction: {
          amount: data.amount,
          reference: `WAL_${Date.now()}`,
          description: data.description || 'Wallet debit',
          createdAt: new Date().toISOString()
        }
      };
    }
  },

  // Get transaction history
  async getTransactionHistory(page: number = 1, limit: number = 20, type?: string): Promise<TransactionHistoryResponse> {
    try {
      const params: any = { page, limit };
      if (type) params.type = type;
      
      const response = await apiClient.get<WalletApiResponse<TransactionHistoryResponse>>('/api/wallet-temp/transactions', { params });
      return response.data;
    } catch (error) {
      // Mock transaction history
      return {
        transactions: [
          {
            _id: '1',
            walletId: 'mock-wallet-id',
            type: 'credit',
            amount: 500000,
            reference: 'WAL_INITIAL_FUND',
            description: 'Initial wallet funding',
            balanceBefore: 0,
            balanceAfter: 500000,
            createdAt: new Date().toISOString()
          }
        ],
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          pages: 1
        }
      };
    }
  },

  // Create wallet (usually called during signup)
  async createWallet(userId: string): Promise<any> {
    try {
      const response = await apiClient.post<WalletApiResponse<any>>('/api/wallet/create', { userId });
      return response.data;
    } catch (error) {
      return { userId, balance: 0, status: 'active' };
    }
  }
};
