const Gtag = (() => {
  return {
    pageView(url: string) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!window.gtag) return;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.gtag('config', 'G-20GMQTM36F', {
        page_path: url
      });
    }
  };
})();

export default Gtag;
