import { mangaProps } from "@/components/Info/LeftComic";
import { doc, DocumentData, DocumentReference, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { bookmarks as setBookmarks } from '@/store/action';
import { db } from "@/utils/firebase";
import { mangaObj } from "@/constants/index";

export const useBookmarks = (info: any, slug: string) => {
  const dispatch = useAppDispatch();
  const { reducer4: { user, bookmarks }, reducer: select } = useAppSelector(state => state);
  const docRef = useRef<DocumentReference<DocumentData>>();
  const manga = mangaObj(info, slug, select, 'bookmarks');

  const addFollow = useCallback(async () => {
    if (!user) {
      return alert('Login to add to your bookmarks');
    }

    dispatch(setBookmarks([...bookmarks, manga]));

    await updateDoc(docRef.current!, {
      bookmarks: [...bookmarks, manga]
    });
  }, [user, bookmarks, manga])

  const removeFollow = useCallback(async () => {
    dispatch(setBookmarks(bookmarks.filter((item: mangaProps) => item.url !== manga.url)));

    await updateDoc(docRef.current!, {
      bookmarks: bookmarks.filter((item: mangaProps) => (item.url !== manga.url))
    });
  }, [bookmarks, manga])

  useEffect(() => {
    if (user) docRef.current = doc(db, "users", user.docid);
  }, [user])

  return { addFollow, removeFollow }
}