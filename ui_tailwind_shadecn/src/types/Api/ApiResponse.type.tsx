import {ComponentData} from '@/types/ComponentData.type';
import { User } from '../User.types';

export interface ApiResponse {
    error?: boolean;
    statusCode?: number;
    message?: string;
    response?: {
      user: User;
      components: ComponentData[];
    };
    count?: number;
  }