import axios from 'axios';
import { getEnvVariable } from '@/utils/load.utils';

export const fetchUserProfile = async (userName: string) => {
  const baseUri = getEnvVariable('BASE_URI');
  try {
    const response = await axios.post(`${baseUri}/profile/getprofileinfo`, {
      user_name: userName,
    });
    const postDetails = response.data.response.post_details;
    console.log(postDetails);
    return postDetails;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};
