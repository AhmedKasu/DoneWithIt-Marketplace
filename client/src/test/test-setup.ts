import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
