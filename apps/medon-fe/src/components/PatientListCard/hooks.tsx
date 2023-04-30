import { useEffect, useState } from 'react';
import { ShowMoreTextHookReturnType } from './types';

export function useShowMoreText(
  initialText?: string,
  minChars = 50,
  showChars = 200
) {
  const [showMore, setShowMore] = useState(false);
  const [isShowMorePossible, setIsShowMorePossible] = useState(false);

  const formattedText =
    showMore || !initialText
      ? initialText
      : `${initialText.slice(0, showChars)}...`;

  function handleShowToggle() {
    setShowMore(!showMore);
  }

  useEffect(() => {
    if (!initialText || initialText.length < minChars) {
      setIsShowMorePossible(false);
      setShowMore(true);
    } else if (initialText.length > showChars) {
      setIsShowMorePossible(true);
    }
  }, [initialText, showChars, minChars]);

  return { formattedText, showMore, handleShowToggle, isShowMorePossible };
}
