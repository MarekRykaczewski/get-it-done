import './index.css'

const Popup = () => {

  const handleOpenTab = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
  };

  return (
    <div>
      <h1>Popup Page</h1>
      <p>This is the content of the popup page.</p>
      <button onClick={handleOpenTab}>Open Tab</button>
    </div>
  );
};

export default Popup;