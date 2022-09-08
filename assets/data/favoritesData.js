import { db } from '../../Core/Config';
import * as React from 'react';
import { getDatabase, ref, set, onValue, update } from "firebase/database";







const favoritsData = [
    {
        id: 1,
        image: require('../images/Habima-Squere.jpg'),
        title: 'Habima Square',
        rate: 3,
        selected: true,
    },
    {
        id: 2,
        image: require('../images/Rabin-Squere.jpg'),
        title: 'Rabin Square',
        rate: '4.8',
        selected: true,
    },
    {
        id: 3,
        image: require('../images/Academic-Tel-Aviv-Yafo.jpg'),
        title: 'Academic College',
        rate: '4.7',
        selected: true,
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