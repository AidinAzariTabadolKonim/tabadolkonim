"use client";

import { useState } from "react";
import { InstagramAccount } from "../types";

export function useFilters(accounts: InstagramAccount[]) {
  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterWouldLikeBack, setFilterWouldLikeBack] = useState(false);
  const [filterWouldShareBack, setFilterWouldShareBack] = useState(false);
  const [filterWouldFollowBack, setFilterWouldFollowBack] = useState(false);
  const [filterWouldCommentBack, setFilterWouldCommentBack] = useState(false);
  const [filterHasSupportGroup, setFilterHasSupportGroup] = useState(false);
  const [
    filterHasInstagramMarketingBusiness,
    setFilterHasInstagramMarketingBusiness,
  ] = useState(false);

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.$id.toLowerCase().includes(filterId.toLowerCase()) &&
      acc.username.toLowerCase().includes(filterName.toLowerCase()) &&
      (!filterCategory || acc.category === filterCategory) &&
      (!filterWouldLikeBack || acc.wouldLikeBack) &&
      (!filterWouldShareBack || acc.wouldShareBack) &&
      (!filterWouldFollowBack || acc.wouldFollowBack) &&
      (!filterWouldCommentBack || acc.wouldCommentBack) &&
      (!filterHasSupportGroup || acc.hasSupportGroup) &&
      (!filterHasInstagramMarketingBusiness ||
        acc.hasInstagramMarketingBusiness)
  );

  return {
    filterId,
    setFilterId,
    filterName,
    setFilterName,
    filterCategory,
    setFilterCategory,
    filterWouldLikeBack,
    setFilterWouldLikeBack,
    filterWouldShareBack,
    setFilterWouldShareBack,
    filterWouldFollowBack,
    setFilterWouldFollowBack,
    filterWouldCommentBack,
    setFilterWouldCommentBack,
    filterHasSupportGroup,
    setFilterHasSupportGroup,
    filterHasInstagramMarketingBusiness,
    setFilterHasInstagramMarketingBusiness,
    filteredAccounts,
  };
}
