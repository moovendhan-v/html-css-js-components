import { userPopularComponents } from '@/store/components/popular.components';
import api from '@/api'; // Import your axios instance
import { ComponentData } from '@/types/ComponentData.type';

type ResponseItem = {
    post_details: ComponentData;
};


export const fetchPopularComponents = async () => {
  try {
    console.log('Fetching popular components')
    const response = await api.get('/components/get-popular-components');
    
    const { response: dataResponse } = response.data;
    console.log(dataResponse);

    // Add popular components to the store
    const details: ComponentData[] = dataResponse.map((item: ResponseItem) => item.post_details);
    userPopularComponents.setState({popularComponents: details});
    console.log('details', details)

    return details;
  } catch (error) {
    console.error('Error fetching popular components:', error);
  }
};
