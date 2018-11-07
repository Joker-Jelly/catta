export default function getScript(url, opts) {  
  if (!url) {
    return;
  }
  const layoutScript = document.createElement('script');
  layoutScript.src = url;
  layoutScript.charset = 'UTF-8';
  
  return new Promise((resolve, reject) => {
    layoutScript.onload = function() {
      resolve();
      document.body.removeChild(layoutScript);
    };
  
    layoutScript.onerror = function(err) {
      reject(new Error(`Fail to load: ${err.target.src}`));
    };
  
    document.body.appendChild(layoutScript);
  });
}