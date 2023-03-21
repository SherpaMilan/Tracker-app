import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../../firebase/firebase-configuration";
import { setTrans } from "./transSlice";

export const getTransaction = (userId) => async (dispatch) => {
  try {
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", userId)
    );

    let trans = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const { id } = doc;
      const data = { ...doc.data(), id };
      trans.push(data);
    });

    dispatch(setTrans(trans));
  } catch (error) {
    console.log(error);
  }
};
