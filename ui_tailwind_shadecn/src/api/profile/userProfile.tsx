import axios from 'axios';
import { getEnvVariable } from '@/utils/load.utils';
import { UserProfile } from '@/types/ViewProfile.type';
import { ComponentDatas } from '@/store/Auth';
import { ComponentData } from '@/types/ComponentData.type';

export const fetchUserProfile = async (userName: string): Promise<UserProfile | null> => {
  const baseUri = getEnvVariable('BASE_URI');
  try {
    const response = await axios.post(`${baseUri}/profile/getprofileinfo`, {
      user_name: userName,
    });

    const responseData = response.data.response;

    // Process components if available
    const processedComponents: ComponentData[] | null = responseData.components
      ? responseData.components.map((component: ComponentDatas) => {
          return component.component_details.post_details;
        })
      : null;

    // Create UserProfile object
    const userProfile: UserProfile = {
      ...responseData,
      components: processedComponents,
    };

    console.log('UserProfile:', userProfile);
    return userProfile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};
