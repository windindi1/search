export const USER_SEARCH_DATA_FETCHED = 'USER_SEARCH_DATA_FETCHED';

export const updateSearchData =  data => ({
  type: USER_SEARCH_DATA_FETCHED,
  data: data
});
