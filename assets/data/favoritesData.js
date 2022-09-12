import { db } from '../../Core/Config';
import * as React from 'react';
import { getDatabase, ref, set, onValue, update } from "firebase/database";


const favoritsData = [
    {
        id: 1,
        image: require('../images/Habima-Squere.jpg'),
        title: 'Habima Square',
        rate: 4.33,
        selected: true,
        photoReference:'AeJbb3dt93RCqkz3PFk9w7UzRr6Vmtu2L23ICkBuyN_WHEtygOsRF__hUzMMoxmfLmiPf2-aJGXKNCbZemh9k7rvD3mnvfrlKiTU3X-R10h2DTkA_vmbF-ULmQAdFimtqT32RVDVp6dfW4KFIEZAF6okw8X43l8_Ga-ddi4h4mp6d7xBzcUR'
    },
    {
        id: 2,
        image: require('../images/Rabin-Squere.jpg'),
        title: 'Rabin Square',
        rate: '3.8',
        selected: true,
        photoReference:'AeJbb3frYkf6np6km5F24s_9l6DlG3SC2t2e8lGm5cJoC30cMO5XFRFUVL-BQaEj4IBbo1kIPZEZZZP16bS8IdfBRMciisVaBlivemfSh7O-ybK6UVhs5WFDouv5LyqIjOx3ya7TLMjuwhSqhCnrB_dTxZrpoTtOC-U9t9h8T3_zX5u6VDkl'
    },
    {
        id: 3,
        image: require('../images/Academic-Tel-Aviv-Yafo.jpg'),
        title: 'Academic College',
        rate: '3.88',
        selected: true,
        photoReference:'AeJbb3fjewtiFUT8FqgnTpym_SGnQ2Uyw--Rl0wafuUg4gPpcKqTVXP2y0oWqn9d43jwMW_yA8RlbvIukGkJf6BMTX6nBkXGpAw-x4em6l4Jqa-cHqSRYJpnZr20G8IDlynfLb23-02MoIgbUWoWOt7XTCZp1fNNQv-CeUgglaoyattx4PEV'
    },
    {
        id: 4,
        image: require('../images/Neve-Tzedek.jpg'),
        title: 'Neve Tzedek',
        rate: '3.9',
        selected: true,
    },
]; 

export default favoritsData;