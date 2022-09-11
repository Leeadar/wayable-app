import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../../Core/Config";

const dbRef = ref(db, '/places');

function getData(){
    const placeRef = ref(db, 'places/');
    onValue(placeRef, (snapshot) => {
        const data = snapshot.val();
        if(data != null){
            console.log(data)
        }
    })
}



export default setReviews();