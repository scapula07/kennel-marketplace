onmessage = async function () {
    try {
       
      postMessage("done");  // Send the result back to the main thread
    } catch (error) {
      postMessage({ error: 'Failed to fetch data' });
    }
  };