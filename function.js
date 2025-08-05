// `inputs` is an object with one key: urls (the comma-separated list)
async function getPageCount(inputs) {
  const urls = inputs.urls.split(',').map(url => url.trim());

  const fetchPDFAndCountPages = async (url) => {
    try {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(buffer);
      return pdf.getPageCount();
    } catch (e) {
      return 0; // Return 0 if PDF fails to load
    }
  };

  let totalPages = 0;
  for (let url of urls) {
    totalPages += await fetchPDFAndCountPages(url);
  }

  return totalPages;
}

return await getPageCount(inputs);
