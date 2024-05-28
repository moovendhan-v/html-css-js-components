import { User } from './User.types'
import { ComponentData } from './ComponentData.type';


export interface UserProfile {
    user: User;
    components: ComponentData[] | null;
}


// interface Component {
//     component_details: {
//         post_details: ComponentData |  null;
//     };
// }

